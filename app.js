const templateConfig = window.FOTOCOLLAGE_TEMPLATE_CONFIG;
const exportConfig = window.FOTOCOLLAGE_EXPORT_CONFIG;
const i18nConfig = window.FOTOCOLLAGE_I18N_CONFIG;
const tipsConfig = window.FOTOCOLLAGE_TIPS_CONFIG;
const stencilConfig = window.FOTOCOLLAGE_STENCIL_CONFIG;

if (!templateConfig || !Array.isArray(templateConfig.PRESETS) || typeof templateConfig.PRESET_LABELS !== "object") {
  throw new Error("Missing or invalid templates config (window.FOTOCOLLAGE_TEMPLATE_CONFIG).");
}
if (!exportConfig || !Array.isArray(exportConfig.EXPORT_PRESETS) || typeof exportConfig.EXPORT_PRESET_LABELS !== "object") {
  throw new Error("Missing or invalid export config (window.FOTOCOLLAGE_EXPORT_CONFIG).");
}
if (!i18nConfig || typeof i18nConfig.I18N !== "object") {
  throw new Error("Missing or invalid i18n config (window.FOTOCOLLAGE_I18N_CONFIG).");
}
if (!tipsConfig || typeof tipsConfig.DAILY_TIPS !== "object") {
  throw new Error("Missing or invalid tips config (window.FOTOCOLLAGE_TIPS_CONFIG).");
}
if (!stencilConfig || !Array.isArray(stencilConfig.STENCIL_OPTIONS)) {
  throw new Error("Missing or invalid stencil config (window.FOTOCOLLAGE_STENCIL_CONFIG).");
}

const PRESETS = templateConfig.PRESETS;
const PRESET_LABELS = templateConfig.PRESET_LABELS;

const EXPORT_WIDTH_MIN = Number(exportConfig.EXPORT_WIDTH_MIN);
const EXPORT_WIDTH_MAX = Number(exportConfig.EXPORT_WIDTH_MAX);
const GIF_EXPORT_MIN_WIDTH = Number(exportConfig.GIF_EXPORT_MIN_WIDTH);
const GIF_EXPORT_MAX_WIDTH = Number(exportConfig.GIF_EXPORT_MAX_WIDTH);
const GIF_EXPORT_DEFAULT_WIDTH = Number(exportConfig.GIF_EXPORT_DEFAULT_WIDTH);
const EXPORT_PRESETS = exportConfig.EXPORT_PRESETS;
const EXPORT_PRESET_LABELS = exportConfig.EXPORT_PRESET_LABELS;
const DEFAULT_SOCIAL_SAFE_AREA = exportConfig.DEFAULT_SOCIAL_SAFE_AREA;
const SAFE_AREA_RATIOS_BY_PRESET = exportConfig.SAFE_AREA_RATIOS_BY_PRESET || {};

const I18N = i18nConfig.I18N;
const DAILY_TIPS = tipsConfig.DAILY_TIPS;
const STENCIL_OPTIONS = stencilConfig.STENCIL_OPTIONS;
const STENCIL_SVG_BY_ID = new Map(
  STENCIL_OPTIONS.filter((entry) => entry && typeof entry.id === "string" && typeof entry.src === "string")
    .map((entry) => [entry.id, entry])
);
const stencilPathCache = new Map();
let stencilSvgLoadPromise = null;

const DEFAULT_VERSION_INFO = Object.freeze({
  appVersion: "1.3.93",
  cacheVersion: "v180",
  label: "Frontend-Skill: visuelles Mode-Redesign fuer Foto- und Form-Collage",
});

const ZOOM_MIN = 0.35;
const ZOOM_MAX = 4;
const TEXT_INSET_PX = 6;
const DEFAULT_TEXT_Y = 0.9;
const SLOT_SHAPES = Object.freeze(["rect", "rounded-rect", "circle", "diamond", "hexagon"]);
const HEX_PACK_STEP_X_RATIO = 0.86;
const HEX_PACK_STEP_Y_RATIO = 1.0;
const HEX_PACK_ODD_COLUMN_OFFSET_RATIO = 0.5;
const HEX_PACK_UNIT_SCALE_X = 1.0;
const HEX_PACK_UNIT_SCALE_Y = 1.0;

const STORAGE_KEYS = {
  language: "fotocollage-language",
  layout: "fotocollage-layout",
  watermark: "fotocollage-watermark",
  exif: "fotocollage-exif",
  tipsEnabled: "fotocollage-tips-enabled",
};

const WORD_MASK_PRESET_SIZES = Object.freeze({
  postcard: Object.freeze({ width: 1500, height: 1000 }),
  "a4-portrait": Object.freeze({ width: 1240, height: 1754 }),
  "a4-landscape": Object.freeze({ width: 1754, height: 1240 }),
  poster: Object.freeze({ width: 1200, height: 1800 }),
});
const state = {
  activePresetId: "grid-2x2",
  layoutMode: "grid",
  hexStepXRatio: HEX_PACK_STEP_X_RATIO,
  hexStepYRatio: HEX_PACK_STEP_Y_RATIO,
  hexUnitScaleX: HEX_PACK_UNIT_SCALE_X,
  hexUnitScaleY: HEX_PACK_UNIT_SCALE_Y,
  gap: 12,
  outerGap: 12,
  background: "#101828",
  activeStep: 1,
  uiMode: "launcher",
  cells: [],
  slotShapeOverrides: [],
  selectedCell: 0,
  dragging: null,
  textDragging: null,
  dragIndex: null,
  reorderMode: false,
  reorderSourceIndex: null,
  pinch: null,
  touchPoints: new Map(),
  exportWidth: 3000,
  customExportWidth: 3000,
  exportPresetId: "free",
  exportWidthLocked: false,
  hasOpenedExportStep: false,
  watermark: {
    text: "",
    position: "bottom-right",
    fontFamily: "Segoe UI, system-ui, sans-serif",
    color: "#ffffff",
    size: 32,
    enabled: false,
  },
  exif: {
    enabled: false,
    artist: "",
    copyright: "",
    description: "",
    software: "Foto-Collage PWA",
  },
  exportFormat: "png",
  autoFitToSafeArea: false,
  gifDelaySeconds: 1,
  languagePreference: "auto",
  language: "de",
  readmeText: "",
  tipAutoShowEnabled: true,
  versionInfo: { ...DEFAULT_VERSION_INFO },
  serviceWorkerRegistration: null,
  updateInProgress: false,
  assistantFiles: [],
  assistantSuggestions: [],
  assistantRequestToken: 0,
  wordMask: {
    preset: "postcard",
    freeWidth: 1500,
    freeHeight: 1000,
    mode: "word",
    word: "DANKE",
    stencil: "word",
    fontFamily: "Impact, Haettenschweiler, 'Arial Narrow Bold', sans-serif",
    fontSize: 1300,
    letterSpacing: 8,
    bold: true,
    italic: false,
    subtitle: "",
    subtitleFontFamily: "'Times New Roman', Times, serif",
    subtitleSize: 56,
    subtitleColor: "#222222",
    subtitleBold: false,
    subtitleItalic: false,
    subtitleX: 0.5,
    subtitleY: 0.93,
    background: "#f5f5f3",
    outputFormat: "png",
    activeTab: "photos",
    photos: [],
    reorderMode: false,
    reorderSourceIndex: null,
    subtitleDrag: null,
    subtitleBounds: null,
  },
  isSyncingSlotShapeSelect: false,
  hasLoadedPhotosEver: false,
};

const els = {
  heroEyebrow: document.getElementById("heroEyebrow"),
  appTitle: document.getElementById("appTitle"),
  heroLede: document.getElementById("heroLede"),
  heroCard: document.getElementById("heroCard"),
  homeButton: document.getElementById("homeButton"),
  homeButtonLabel: document.getElementById("homeButtonLabel"),
  settingsButton: document.getElementById("settingsButton"),
  settingsButtonLabel: document.getElementById("settingsButtonLabel"),
  helpButton: document.getElementById("helpButton"),
  helpButtonLabel: document.getElementById("helpButtonLabel"),
  modeSelector: document.getElementById("modeSelector"),
  modeSelectorTitle: document.getElementById("modeSelectorTitle"),
  modeSelectorDesc: document.getElementById("modeSelectorDesc"),
  photoCollageStartButton: document.getElementById("photoCollageStartButton"),
  photoModeTitle: document.getElementById("photoModeTitle"),
  photoModeDesc: document.getElementById("photoModeDesc"),
  wordMaskModeTitle: document.getElementById("wordMaskModeTitle"),
  photoModeArea: document.getElementById("photoModeArea"),
  assistantStartButton: document.getElementById("assistantStartButton"),
  assistantLaunchHint: document.getElementById("assistantLaunchHint"),
  wordMaskStartButton: document.getElementById("wordMaskStartButton"),
  wordMaskLaunchHint: document.getElementById("wordMaskLaunchHint"),
  wordMaskStage: document.getElementById("wordMaskStage"),
  wordMaskStageTitle: document.getElementById("wordMaskStageTitle"),
  wordMaskIntro: document.getElementById("wordMaskIntro"),
  wordMaskStepA: document.getElementById("wordMaskStepA"),
  wordMaskPresetLabel: document.getElementById("wordMaskPresetLabel"),
  wordMaskWidthLabel: document.getElementById("wordMaskWidthLabel"),
  wordMaskHeightLabel: document.getElementById("wordMaskHeightLabel"),
  wordMaskStepB: document.getElementById("wordMaskStepB"),
  wordMaskWordLabel: document.getElementById("wordMaskWordLabel"),
  wordMaskFontLabel: document.getElementById("wordMaskFontLabel"),
  wordMaskSizeLabel: document.getElementById("wordMaskSizeLabel"),
  wordMaskWordBoldLabel: document.getElementById("wordMaskWordBoldLabel"),
  wordMaskWordItalicLabel: document.getElementById("wordMaskWordItalicLabel"),
  wordMaskSpacingLabel: document.getElementById("wordMaskSpacingLabel"),
  wordMaskStepC: document.getElementById("wordMaskStepC"),
  wordMaskBackgroundLabel: document.getElementById("wordMaskBackgroundLabel"),
  wordMaskPhotosLabel: document.getElementById("wordMaskPhotosLabel"),
  wordMaskSubtitleFontLabel: document.getElementById("wordMaskSubtitleFontLabel"),
  wordMaskSubtitleSizeLabel: document.getElementById("wordMaskSubtitleSizeLabel"),
  wordMaskSubtitleBoldLabel: document.getElementById("wordMaskSubtitleBoldLabel"),
  wordMaskSubtitleItalicLabel: document.getElementById("wordMaskSubtitleItalicLabel"),
  wordMaskSubtitleColorLabel: document.getElementById("wordMaskSubtitleColorLabel"),
  wordMaskOutputFormatLabel: document.getElementById("wordMaskOutputFormatLabel"),
  wizardRoot: document.getElementById("wizardRoot"),
  restartLaunchContainer: document.getElementById("restartLaunchContainer"),
  restartLaunchHint: document.getElementById("restartLaunchHint"),
  versionLabel: document.getElementById("versionLabel"),
  gridSummary: document.getElementById("gridSummary"),
  filledSummary: document.getElementById("filledSummary"),
  stepSummary: document.getElementById("stepSummary"),
  presetGrid: document.getElementById("presetGrid"),
  layoutModeLabel: document.getElementById("layoutModeLabel"),
  layoutModeSelect: document.getElementById("layoutModeSelect"),
  layoutModeSuggestion: document.getElementById("layoutModeSuggestion"),
  layoutModeSuggestionText: document.getElementById("layoutModeSuggestionText"),
  layoutModeSuggestionApply: document.getElementById("layoutModeSuggestionApply"),
  hexTuningPanel: document.getElementById("hexTuningPanel"),
  hexTuningTitle: document.getElementById("hexTuningTitle"),
  hexStepXLabel: document.getElementById("hexStepXLabel"),
  hexStepYLabel: document.getElementById("hexStepYLabel"),
  hexScaleXLabel: document.getElementById("hexScaleXLabel"),
  hexScaleYLabel: document.getElementById("hexScaleYLabel"),
  hexStepXInput: document.getElementById("hexStepXInput"),
  hexStepYInput: document.getElementById("hexStepYInput"),
  hexScaleXInput: document.getElementById("hexScaleXInput"),
  hexScaleYInput: document.getElementById("hexScaleYInput"),
  hexStepXValue: document.getElementById("hexStepXValue"),
  hexStepYValue: document.getElementById("hexStepYValue"),
  hexScaleXValue: document.getElementById("hexScaleXValue"),
  hexScaleYValue: document.getElementById("hexScaleYValue"),
  resetHexLayoutButton: document.getElementById("resetHexLayoutButton"),
  gapLabel: document.getElementById("gapLabel"),
  gapInput: document.getElementById("gapInput"),
  gapValue: document.getElementById("gapValue"),
  outerGapLabel: document.getElementById("outerGapLabel"),
  outerGapInput: document.getElementById("outerGapInput"),
  outerGapValue: document.getElementById("outerGapValue"),
  backgroundInput: document.getElementById("backgroundInput"),
  restartButton: document.getElementById("restartButton"),
  toStep2: document.getElementById("toStep2"),
  toStep3: document.getElementById("toStep3"),
  toStep4: document.getElementById("toStep4"),
  slotGrid: document.getElementById("slotGrid"),
  slotStatus: document.getElementById("slotStatus"),
  fileInput: document.getElementById("fileInput"),
  dropZone: document.getElementById("dropZone"),
  collagePreview: document.getElementById("collagePreview"),
  editorFrame: document.getElementById("editorFrame"),
  editorImage: document.getElementById("editorImage"),
  activeCellInfo: document.getElementById("activeCellInfo"),
  toggleReorderMode: document.getElementById("toggleReorderMode"),
  prevCell: document.getElementById("prevCell"),
  nextCell: document.getElementById("nextCell"),
  flipHorizontalButton: document.getElementById("flipHorizontalButton"),
  flipVerticalButton: document.getElementById("flipVerticalButton"),
  rotateLeftButton: document.getElementById("rotateLeftButton"),
  replaceCell: document.getElementById("replaceCell"),
  deleteCell: document.getElementById("deleteCell"),
  replaceInput: document.getElementById("replaceInput"),
  resetFocus: document.getElementById("resetFocus"),
  zoomInput: document.getElementById("zoomInput"),
  zoomValue: document.getElementById("zoomValue"),
  zoomLabel: document.getElementById("zoomLabel"),
  resetZoom: document.getElementById("resetZoom"),
  slotShapeField: document.getElementById("slotShapeField"),
  slotShapeLabel: document.getElementById("slotShapeLabel"),
  slotShapeSelect: document.getElementById("slotShapeSelect"),
  editorTextOverlay: document.getElementById("editorTextOverlay"),
  textEditorTitle: document.getElementById("textEditorTitle"),
  textLabel: document.getElementById("textLabel"),
  textInput: document.getElementById("textInput"),
  textSizeLabel: document.getElementById("textSizeLabel"),
  textSizeInput: document.getElementById("textSizeInput"),
  textSizeValue: document.getElementById("textSizeValue"),
  textFontLabel: document.getElementById("textFontLabel"),
  textFontSelect: document.getElementById("textFontSelect"),
  textBoldInput: document.getElementById("textBoldInput"),
  textBoldLabel: document.getElementById("textBoldLabel"),
  textItalicInput: document.getElementById("textItalicInput"),
  textItalicLabel: document.getElementById("textItalicLabel"),
  textColorLabel: document.getElementById("textColorLabel"),
  textColorInput: document.getElementById("textColorInput"),
  resetTextPosition: document.getElementById("resetTextPosition"),
  textWarning: document.getElementById("textWarning"),
  exportWidthInput: document.getElementById("exportWidthInput"),
  exportWidthValue: document.getElementById("exportWidthValue"),
  exportPresetLabel: document.getElementById("exportPresetLabel"),
  exportPresetGrid: document.getElementById("exportPresetGrid"),
  exportPresetSelect: document.getElementById("exportPresetSelect"),
  exportFormatLabel: document.getElementById("exportFormatLabel"),
  exportFormatSelect: document.getElementById("exportFormatSelect"),
  gifDelayField: document.getElementById("gifDelayField"),
  gifDelayLabel: document.getElementById("gifDelayLabel"),
  gifDelayInput: document.getElementById("gifDelayInput"),
  gifDelayValue: document.getElementById("gifDelayValue"),
  shareButton: document.getElementById("shareButton"),
  downloadButton: document.getElementById("downloadButton"),
  exportStatus: document.getElementById("exportStatus"),
  exportCanvas: document.getElementById("exportCanvas"),
  watermarkTitle: document.getElementById("watermarkTitle"),
  watermarkTextLabel: document.getElementById("watermarkTextLabel"),
  watermarkTextInput: document.getElementById("watermarkTextInput"),
  watermarkPositionLabel: document.getElementById("watermarkPositionLabel"),
  watermarkPositionSelect: document.getElementById("watermarkPositionSelect"),
  watermarkFontLabel: document.getElementById("watermarkFontLabel"),
  watermarkFontSelect: document.getElementById("watermarkFontSelect"),
  watermarkColorLabel: document.getElementById("watermarkColorLabel"),
  watermarkColorInput: document.getElementById("watermarkColorInput"),
  watermarkSizeLabel: document.getElementById("watermarkSizeLabel"),
  watermarkSizeInput: document.getElementById("watermarkSizeInput"),
  watermarkSizeValue: document.getElementById("watermarkSizeValue"),
  watermarkEnabledLabel: document.getElementById("watermarkEnabledLabel"),
  watermarkEnabledInput: document.getElementById("watermarkEnabledInput"),
  exifTitle: document.getElementById("exifTitle"),
  exifEnabledInput: document.getElementById("exifEnabledInput"),
  exifEnabledLabel: document.getElementById("exifEnabledLabel"),
  exifUserCommentHint: document.getElementById("exifUserCommentHint"),
  exifJpegOnlyHint: document.getElementById("exifJpegOnlyHint"),
  exifArtistLabel: document.getElementById("exifArtistLabel"),
  exifArtistInput: document.getElementById("exifArtistInput"),
  exifCopyrightLabel: document.getElementById("exifCopyrightLabel"),
  exifCopyrightInput: document.getElementById("exifCopyrightInput"),
  exifDescriptionLabel: document.getElementById("exifDescriptionLabel"),
  exifDescriptionInput: document.getElementById("exifDescriptionInput"),
  exifSoftwareLabel: document.getElementById("exifSoftwareLabel"),
  exifSoftwareInput: document.getElementById("exifSoftwareInput"),
  settingsDialog: document.getElementById("settingsDialog"),
  settingsForm: document.getElementById("settingsForm"),
  helpDialog: document.getElementById("helpDialog"),
  helpForm: document.getElementById("helpForm"),
  helpTitle: document.getElementById("helpTitle"),
  readmeStatus: document.getElementById("readmeStatus"),
  readmeContent: document.getElementById("readmeContent"),
  tipDialog: document.getElementById("tipDialog"),
  tipForm: document.getElementById("tipForm"),
  tipDialogTitle: document.getElementById("tipDialogTitle"),
  tipDialogText: document.getElementById("tipDialogText"),
  tipDisableInput: document.getElementById("tipDisableInput"),
  tipDisableLabel: document.getElementById("tipDisableLabel"),
  nextTipButton: document.getElementById("nextTipButton"),
  tipsTitle: document.getElementById("tipsTitle"),
  tipsResetButton: document.getElementById("tipsResetButton"),
  tipsStatus: document.getElementById("tipsStatus"),
  assistantDialog: document.getElementById("assistantDialog"),
  assistantForm: document.getElementById("assistantForm"),
  assistantTitle: document.getElementById("assistantTitle"),
  assistantIntro: document.getElementById("assistantIntro"),
  assistantFilesLabel: document.getElementById("assistantFilesLabel"),
  assistantFileInput: document.getElementById("assistantFileInput"),
  assistantStatus: document.getElementById("assistantStatus"),
  assistantSuggestions: document.getElementById("assistantSuggestions"),
  wordMaskPresetSelect: document.getElementById("wordMaskPresetSelect"),
  wordMaskFreeSizeRow: document.getElementById("wordMaskFreeSizeRow"),
  wordMaskWidthInput: document.getElementById("wordMaskWidthInput"),
  wordMaskHeightInput: document.getElementById("wordMaskHeightInput"),
  wordMaskModeLabel: document.getElementById("wordMaskModeLabel"),
  wordMaskModeWordButton: document.getElementById("wordMaskModeWordButton"),
  wordMaskModeMotifButton: document.getElementById("wordMaskModeMotifButton"),
  wordMaskMotifField: document.getElementById("wordMaskMotifField"),
  wordMaskMotifGrid: document.getElementById("wordMaskMotifGrid"),
  wordMaskStencilLabel: document.getElementById("wordMaskStencilLabel"),
  wordMaskWordInput: document.getElementById("wordMaskWordInput"),
  wordMaskShapeSizeField: document.getElementById("wordMaskShapeSizeField"),
  wordMaskShapeSizeLabel: document.getElementById("wordMaskShapeSizeLabel"),
  wordMaskShapeSizeInput: document.getElementById("wordMaskShapeSizeInput"),
  wordMaskShapeSizeValue: document.getElementById("wordMaskShapeSizeValue"),
  wordMaskFontSelect: document.getElementById("wordMaskFontSelect"),
  wordMaskSizeInput: document.getElementById("wordMaskSizeInput"),
  wordMaskSpacingInput: document.getElementById("wordMaskSpacingInput"),
  wordMaskWordBoldInput: document.getElementById("wordMaskWordBoldInput"),
  wordMaskWordItalicInput: document.getElementById("wordMaskWordItalicInput"),
  wordMaskPhotosInput: document.getElementById("wordMaskPhotosInput"),
  wordMaskTabs: document.getElementById("wordMaskTabs"),
  wordMaskTabPhotos: document.getElementById("wordMaskTabPhotos"),
  wordMaskTabSubtitle: document.getElementById("wordMaskTabSubtitle"),
  wordMaskTabExport: document.getElementById("wordMaskTabExport"),
  wordMaskPanelPhotos: document.getElementById("wordMaskPanelPhotos"),
  wordMaskPanelSubtitle: document.getElementById("wordMaskPanelSubtitle"),
  wordMaskPanelExport: document.getElementById("wordMaskPanelExport"),
  wordMaskShufflePhotosButton: document.getElementById("wordMaskShufflePhotosButton"),
  wordMaskToggleReorderButton: document.getElementById("wordMaskToggleReorderButton"),
  wordMaskPhotosStatus: document.getElementById("wordMaskPhotosStatus"),
  wordMaskReorderHint: document.getElementById("wordMaskReorderHint"),
  wordMaskPhotoOrderField: document.getElementById("wordMaskPhotoOrderField"),
  wordMaskPhotoOrderLabel: document.getElementById("wordMaskPhotoOrderLabel"),
  wordMaskPhotoOrder: document.getElementById("wordMaskPhotoOrder"),
  wordMaskBackgroundInput: document.getElementById("wordMaskBackgroundInput"),
  wordMaskSubtitleLabel: document.getElementById("wordMaskSubtitleLabel"),
  wordMaskSubtitleInput: document.getElementById("wordMaskSubtitleInput"),
  wordMaskSubtitleFontSelect: document.getElementById("wordMaskSubtitleFontSelect"),
  wordMaskSubtitleSizeInput: document.getElementById("wordMaskSubtitleSizeInput"),
  wordMaskSubtitleBoldInput: document.getElementById("wordMaskSubtitleBoldInput"),
  wordMaskSubtitleItalicInput: document.getElementById("wordMaskSubtitleItalicInput"),
  wordMaskSubtitleColorInput: document.getElementById("wordMaskSubtitleColorInput"),
  wordMaskOutputFormatSelect: document.getElementById("wordMaskOutputFormatSelect"),
  wordMaskCanvas: document.getElementById("wordMaskCanvas"),
  wordMaskShareButton: document.getElementById("wordMaskShareButton"),
  wordMaskSaveButton: document.getElementById("wordMaskSaveButton"),
  confirmDialog: document.getElementById("confirmDialog"),
  confirmForm: document.getElementById("confirmForm"),
  confirmDialogTitle: document.getElementById("confirmDialogTitle"),
  confirmDialogMessage: document.getElementById("confirmDialogMessage"),
  confirmCloseButton: document.getElementById("confirmCloseButton"),
  confirmCancelButton: document.getElementById("confirmCancelButton"),
  confirmAcceptButton: document.getElementById("confirmAcceptButton"),
  settingsTitle: document.getElementById("settingsTitle"),
  settingsIntro: document.getElementById("settingsIntro"),
  updatesTitle: document.getElementById("updatesTitle"),
  languageLabel: document.getElementById("languageLabel"),
  languageSelect: document.getElementById("languageSelect"),
  checkForUpdatesButton: document.getElementById("checkForUpdatesButton"),
  updateCheckStatus: document.getElementById("updateCheckStatus"),
  reloadAppButton: document.getElementById("reloadAppButton"),
  step1Title: document.getElementById("step1Title"),
  step1Desc: document.getElementById("step1Desc"),
  step2Title: document.getElementById("step2Title"),
  step2Desc: document.getElementById("step2Desc"),
  uploadTitle: document.getElementById("uploadTitle"),
  uploadDesc: document.getElementById("uploadDesc"),
  step3Title: document.getElementById("step3Title"),
  step3Desc: document.getElementById("step3Desc"),
  activeCellTitle: document.getElementById("activeCellTitle"),
  dragHint: document.getElementById("dragHint"),
  step4Title: document.getElementById("step4Title"),
  step4Desc: document.getElementById("step4Desc"),
  exportWidthLabel: document.getElementById("exportWidthLabel"),
  exportHelp: document.getElementById("exportHelp"),
  safeAreaInfo: document.getElementById("safeAreaInfo"),
  safeAreaInfoText: document.getElementById("safeAreaInfoText"),
  safeAreaHelpButton: document.getElementById("safeAreaHelpButton"),
  autoFitSafeAreaButton: document.getElementById("autoFitSafeAreaButton"),
  safeAreaDialog: document.getElementById("safeAreaDialog"),
  safeAreaForm: document.getElementById("safeAreaForm"),
  safeAreaDialogTitle: document.getElementById("safeAreaDialogTitle"),
  safeAreaDialogBody: document.getElementById("safeAreaDialogBody"),
  safeAreaDialogClose: document.getElementById("safeAreaDialogClose"),
  exportWarning: document.getElementById("exportWarning"),
  stepChip1: document.getElementById("stepChip1"),
  stepChip2: document.getElementById("stepChip2"),
  stepChip3: document.getElementById("stepChip3"),
  stepChip4: document.getElementById("stepChip4"),
};

function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value));
}

function parseHexColor(hex) {
  const normalized = String(hex || "").trim();
  const long = /^#([0-9a-f]{6})$/i.exec(normalized);
  if (long) {
    const value = long[1];
    return {
      r: Number.parseInt(value.slice(0, 2), 16),
      g: Number.parseInt(value.slice(2, 4), 16),
      b: Number.parseInt(value.slice(4, 6), 16),
    };
  }
  const short = /^#([0-9a-f]{3})$/i.exec(normalized);
  if (short) {
    const value = short[1];
    return {
      r: Number.parseInt(`${value[0]}${value[0]}`, 16),
      g: Number.parseInt(`${value[1]}${value[1]}`, 16),
      b: Number.parseInt(`${value[2]}${value[2]}`, 16),
    };
  }
  return null;
}

function toLinearChannel(value) {
  const s = value / 255;
  return s <= 0.03928 ? s / 12.92 : ((s + 0.055) / 1.055) ** 2.4;
}

function getRelativeLuminance(rgb) {
  const r = toLinearChannel(rgb.r);
  const g = toLinearChannel(rgb.g);
  const b = toLinearChannel(rgb.b);
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

function getContrastRatio(first, second) {
  const l1 = getRelativeLuminance(first);
  const l2 = getRelativeLuminance(second);
  const lighter = Math.max(l1, l2);
  const darker = Math.min(l1, l2);
  return (lighter + 0.05) / (darker + 0.05);
}

function getActiveOutlineColor(backgroundHex) {
  const background = parseHexColor(backgroundHex);
  if (!background) return "rgba(116, 192, 252, 0.9)";
  const candidates = [
    { hex: "#74c0fc", rgb: { r: 116, g: 192, b: 252 } },
    { hex: "#ffd43b", rgb: { r: 255, g: 212, b: 59 } },
    { hex: "#ff8787", rgb: { r: 255, g: 135, b: 135 } },
    { hex: "#ffffff", rgb: { r: 255, g: 255, b: 255 } },
    { hex: "#0b1220", rgb: { r: 11, g: 18, b: 32 } },
  ];
  let best = candidates[0];
  let bestContrast = 0;
  for (const candidate of candidates) {
    const contrast = getContrastRatio(background, candidate.rgb);
    if (contrast > bestContrast) {
      bestContrast = contrast;
      best = candidate;
    }
  }
  return best.hex;
}

function format(template, values) {
  return Object.keys(values).reduce((result, key) => result.replaceAll(`{${key}}`, String(values[key])), template);
}

function detectBrowserLanguage() {
  const code = String(navigator.language || navigator.languages?.[0] || "de").toLowerCase();
  if (code.startsWith("fr")) return "fr";
  if (code.startsWith("en")) return "en";
  return "de";
}

function normalizeLanguage(value) {
  return value === "de" || value === "en" || value === "fr" ? value : detectBrowserLanguage();
}

function getEffectiveLanguage(preference) {
  return preference === "auto" ? detectBrowserLanguage() : normalizeLanguage(preference);
}

function t(key) {
  return I18N[state.language]?.[key] ?? I18N.de[key] ?? key;
}

function getTipsForLanguage(language = state.language) {
  return DAILY_TIPS[language] || DAILY_TIPS.de || [];
}

function getDailyTipStartIndex(tips) {
  if (!Array.isArray(tips) || tips.length === 0) return 0;
  const now = new Date();
  const key = Number(
    `${now.getFullYear()}${String(now.getMonth() + 1).padStart(2, "0")}${String(now.getDate()).padStart(2, "0")}`
  );
  return key % tips.length;
}

function renderTipOfDay(index) {
  const tips = getTipsForLanguage();
  if (!tips.length || !els.tipDialogText || !els.tipDialog) return;
  const safeIndex = ((index % tips.length) + tips.length) % tips.length;
  els.tipDialogText.textContent = tips[safeIndex];
  els.tipDialog.dataset.tipIndex = String(safeIndex);
}

function showTipOfDayDialog(options = {}) {
  const { force = false } = options;
  if (!els.tipDialog || typeof els.tipDialog.showModal !== "function") return;
  if (!force && !state.tipAutoShowEnabled) return;
  const tips = getTipsForLanguage();
  if (!tips.length) return;
  if (els.tipDisableInput) {
    els.tipDisableInput.checked = false;
  }
  renderTipOfDay(getDailyTipStartIndex(tips));
  els.tipDialog.showModal();
}

function showConfirmDialog(options = {}) {
  const {
    title = t("confirmDialogTitle"),
    message = "",
    confirmLabel = t("confirmContinue"),
    cancelLabel = t("confirmCancel"),
  } = options;
  if (!els.confirmDialog || typeof els.confirmDialog.showModal !== "function") {
    return Promise.resolve(false);
  }
  if (els.confirmDialog.open) {
    els.confirmDialog.close("cancel");
  }
  if (els.confirmDialogTitle) els.confirmDialogTitle.textContent = title;
  if (els.confirmDialogMessage) els.confirmDialogMessage.textContent = message;
  if (els.confirmCancelButton) els.confirmCancelButton.textContent = cancelLabel;
  if (els.confirmAcceptButton) els.confirmAcceptButton.textContent = confirmLabel;
  return new Promise((resolve) => {
    const handleClose = () => {
      resolve(els.confirmDialog.returnValue === "confirm");
    };
    els.confirmDialog.addEventListener("close", handleClose, { once: true });
    els.confirmDialog.showModal();
  });
}

function setText(el, key) {
  if (el) el.textContent = t(key);
}

function updateAutoFitSafeAreaButtonLabel() {
  if (!els.autoFitSafeAreaButton) return;
  els.autoFitSafeAreaButton.textContent = state.autoFitToSafeArea
    ? t("autoFitSafeAreaDisable")
    : t("autoFitSafeAreaEnable");
  els.autoFitSafeAreaButton.classList.toggle("active", state.autoFitToSafeArea);
}

function safeStorageGet(key) {
  try {
    return localStorage.getItem(key);
  } catch {
    return null;
  }
}

function safeStorageSet(key, value) {
  try {
    localStorage.setItem(key, value);
  } catch {
    // Ignore storage errors.
  }
}

function isTouchLikeDevice() {
  const coarse = typeof window !== "undefined" && typeof window.matchMedia === "function"
    ? window.matchMedia("(pointer: coarse)").matches
    : false;
  return coarse || (typeof navigator !== "undefined" && navigator.maxTouchPoints > 0);
}

function updateUploadUiForDevice() {
  const touchLike = isTouchLikeDevice();
  document.body.classList.toggle("touch-upload-mode", touchLike);
  if (touchLike) {
    els.dropZone.setAttribute("role", "button");
    els.dropZone.setAttribute("tabindex", "0");
    els.uploadTitle.textContent = t("uploadTitleMobile");
    els.uploadDesc.textContent = t("uploadDescMobile");
    return;
  }
  els.dropZone.removeAttribute("role");
  els.dropZone.removeAttribute("tabindex");
  setText(els.uploadTitle, "uploadTitle");
  setText(els.uploadDesc, "uploadDesc");
}

function safeStorageRemove(key) {
  try {
    localStorage.removeItem(key);
  } catch {
    // Ignore storage errors.
  }
}

function loadTipPreference() {
  const stored = safeStorageGet(STORAGE_KEYS.tipsEnabled);
  state.tipAutoShowEnabled = stored !== "0";
  updateTipsControls();
}

function saveTipPreference(enabled) {
  state.tipAutoShowEnabled = Boolean(enabled);
  safeStorageSet(STORAGE_KEYS.tipsEnabled, state.tipAutoShowEnabled ? "1" : "0");
  updateTipsControls();
}

function setTipsStatus(message) {
  if (!els.tipsStatus) return;
  els.tipsStatus.textContent = message || "";
  els.tipsStatus.hidden = !message;
}

function updateTipsControls() {
  if (!els.tipsResetButton) return;
  els.tipsResetButton.disabled = state.tipAutoShowEnabled;
}

function updateRestartLaunchVisibility() {
  if (!els.restartLaunchContainer) return;
  els.restartLaunchContainer.hidden = false;
}

function getSuggestedFreeExportWidth() {
  const layout = getActiveLayoutDefinition();
  const unitWidthCandidates = [];
  for (let i = 0; i < state.cells.length; i += 1) {
    const cell = state.cells[i];
    const slot = layout.slots[i];
    if (!cell?.bitmap || !slot?.w) continue;
    if (!Number.isFinite(cell.width) || cell.width <= 0) continue;
    unitWidthCandidates.push(cell.width / slot.w);
  }
  if (unitWidthCandidates.length > 0) {
    const sorted = [...unitWidthCandidates].sort((a, b) => a - b);
    const mid = Math.floor(sorted.length / 2);
    const median = sorted.length % 2 === 0
      ? (sorted[mid - 1] + sorted[mid]) / 2
      : sorted[mid];
    const derivedWidth = Math.round(median * layout.cols);
    return clamp(derivedWidth, 600, 6000);
  }
  const fromPreview = Math.round(els.collagePreview?.clientWidth || 0);
  const fromCanvas = Math.round(els.exportCanvas?.clientWidth || 0);
  const fallback = 1200;
  return clamp(Math.max(fromPreview, fromCanvas, fallback), 600, 6000);
}

function getDefaultLayoutSettings() {
  return {
    layoutMode: "grid",
    hexStepXRatio: HEX_PACK_STEP_X_RATIO,
    hexStepYRatio: HEX_PACK_STEP_Y_RATIO,
    hexUnitScaleX: HEX_PACK_UNIT_SCALE_X,
    hexUnitScaleY: HEX_PACK_UNIT_SCALE_Y,
    gap: 12,
    outerGap: 12,
    background: "#101828",
    presetId: "grid-2x2",
  };
}

function normalizeLayoutMode(value) {
  return value === "hex-pack" ? "hex-pack" : "grid";
}

function normalizeLayoutSettings(raw) {
  const defaults = getDefaultLayoutSettings();
  const layoutMode = normalizeLayoutMode(raw?.layoutMode);
  const hexStepXRatio = clamp(Number(raw?.hexStepXRatio) || defaults.hexStepXRatio, 0.6, 1.2);
  const hexStepYRatio = clamp(Number(raw?.hexStepYRatio) || defaults.hexStepYRatio, 0.6, 1.4);
  const hexUnitScaleX = clamp(Number(raw?.hexUnitScaleX) || defaults.hexUnitScaleX, 0.6, 1.2);
  const hexUnitScaleY = clamp(Number(raw?.hexUnitScaleY) || defaults.hexUnitScaleY, 0.6, 1.2);
  const gap = clamp(Number(raw?.gap) || defaults.gap, 0, 60);
  const outerGap = clamp(Number(raw?.outerGap) || defaults.outerGap, 0, 80);
  const background = /^#[0-9a-f]{6}$/i.test(String(raw?.background || ""))
    ? String(raw.background)
    : defaults.background;
  const presetId = typeof raw?.presetId === "string" ? raw.presetId : "";
  return { layoutMode, hexStepXRatio, hexStepYRatio, hexUnitScaleX, hexUnitScaleY, gap, outerGap, background, presetId };
}

function saveLayoutSettings(layout) {
  safeStorageSet(STORAGE_KEYS.layout, JSON.stringify(layout));
}

function getDefaultWatermarkSettings() {
  return {
    text: "",
    position: "bottom-right",
    fontFamily: "Segoe UI, system-ui, sans-serif",
    color: "#ffffff",
    size: 32,
    enabled: false,
  };
}

function loadWatermarkSettings() {
  const defaults = getDefaultWatermarkSettings();
  let settings = defaults;
  const persisted = safeStorageGet(STORAGE_KEYS.watermark);
  if (persisted) {
    try {
      const parsed = JSON.parse(persisted);
      settings = { ...defaults, ...parsed };
    } catch {
      settings = defaults;
    }
  }
  state.watermark = settings;
  applyWatermarkToUi();
}

function saveWatermarkSettings() {
  safeStorageSet(STORAGE_KEYS.watermark, JSON.stringify(state.watermark));
}

function applyWatermarkToUi() {
  const { text, position, fontFamily, color, size, enabled } = state.watermark;
  if (els.watermarkTextInput) els.watermarkTextInput.value = text;
  if (els.watermarkPositionSelect) els.watermarkPositionSelect.value = position;
  if (els.watermarkFontSelect) els.watermarkFontSelect.value = fontFamily;
  if (els.watermarkColorInput) els.watermarkColorInput.value = color;
  if (els.watermarkSizeInput) {
    els.watermarkSizeInput.value = String(size);
  }
  if (els.watermarkSizeValue) {
    els.watermarkSizeValue.textContent = String(size);
  }
  if (els.watermarkEnabledInput) {
    els.watermarkEnabledInput.checked = Boolean(enabled);
  }
}

function getDefaultExifSettings() {
  return {
    enabled: false,
    artist: "",
    copyright: "",
    description: "",
    software: "Foto-Collage PWA",
  };
}

function loadExifSettings() {
  const defaults = getDefaultExifSettings();
  let settings = defaults;
  const persisted = safeStorageGet(STORAGE_KEYS.exif);
  if (persisted) {
    try {
      const parsed = JSON.parse(persisted);
      settings = { ...defaults, ...parsed };
    } catch {
      settings = defaults;
    }
  }
  state.exif = settings;
  applyExifToUi();
}

function saveExifSettings() {
  safeStorageSet(STORAGE_KEYS.exif, JSON.stringify(state.exif));
}

function updateExifUiEnabledState() {
  const enabled = Boolean(state.exif.enabled);
  const controls = [
    els.exifArtistInput,
    els.exifCopyrightInput,
    els.exifDescriptionInput,
    els.exifSoftwareInput,
  ];
  controls.forEach((control) => {
    if (!control) return;
    control.disabled = !enabled;
    control.closest(".field")?.classList.toggle("exif-disabled", !enabled);
  });
}

function applyExifToUi() {
  const { enabled, artist, copyright, description, software } = state.exif;
  if (els.exifEnabledInput) els.exifEnabledInput.checked = Boolean(enabled);
  if (els.exifArtistInput) els.exifArtistInput.value = artist || "";
  if (els.exifCopyrightInput) els.exifCopyrightInput.value = copyright || "";
  if (els.exifDescriptionInput) els.exifDescriptionInput.value = description || "";
  if (els.exifSoftwareInput) els.exifSoftwareInput.value = software || "";
  updateExifUiEnabledState();
}

function normalizeVersionInfo(raw) {
  return {
    appVersion: raw?.appVersion ? String(raw.appVersion) : DEFAULT_VERSION_INFO.appVersion,
    cacheVersion: raw?.cacheVersion ? String(raw.cacheVersion) : DEFAULT_VERSION_INFO.cacheVersion,
    label: raw?.label ? String(raw.label) : DEFAULT_VERSION_INFO.label,
  };
}

function versionSignature(info) {
  return `${info.appVersion}|${info.cacheVersion}`;
}

function createEmptyCell() {
  return {
    fileName: "",
    objectUrl: "",
    bitmap: null,
    width: 0,
    height: 0,
    focusX: 0,
    focusY: 0,
    zoom: 1,
    flipX: false,
    flipY: false,
    rotation: 0,
    text: "",
    textX: 0.5,
    textY: DEFAULT_TEXT_Y,
    fontSize: 48,
    fontFamily: "Segoe UI, system-ui, sans-serif",
    bold: false,
    italic: false,
    color: "#ffffff",
  };
}

function disposeCell(cell) {
  if (cell?.objectUrl) URL.revokeObjectURL(cell.objectUrl);
  if (cell?.bitmap && "close" in cell.bitmap) {
    cell.bitmap.close();
  }
}

function applyLanguagePreference(preference) {
  state.languagePreference = preference;
  safeStorageSet(STORAGE_KEYS.language, preference);
  state.language = getEffectiveLanguage(preference);
  document.documentElement.lang = state.language;
  els.languageSelect.value = preference;
  translateStaticUi();
  renderPresets();
  renderAll();
  renderVersionLabel();
}

function getStencilLabel(entry, language) {
  const lang = language === "de" || language === "fr" || language === "en" ? language : "en";
  if (!entry || typeof entry !== "object") return "";
  if (entry.label && typeof entry.label === "object") {
    if (typeof entry.label[lang] === "string" && entry.label[lang].trim().length) return entry.label[lang];
    if (typeof entry.label.en === "string" && entry.label.en.trim().length) return entry.label.en;
    if (typeof entry.label.de === "string" && entry.label.de.trim().length) return entry.label.de;
    if (typeof entry.label.fr === "string" && entry.label.fr.trim().length) return entry.label.fr;
  }
  return typeof entry.id === "string" ? entry.id : "";
}

function getMotifStencilOptions() {
  return STENCIL_OPTIONS.filter((entry) => entry && typeof entry.id === "string" && entry.id !== "word" && typeof entry.src === "string");
}

function normalizeWordMaskMode(mode) {
  return mode === "motif" ? "motif" : "word";
}

function setWordMaskMode(mode) {
  state.wordMask.mode = normalizeWordMaskMode(mode);
  if (state.wordMask.mode === "word") {
    state.wordMask.stencil = "word";
    return;
  }
  if (state.wordMask.stencil === "word") {
    const firstMotif = getMotifStencilOptions()[0];
    state.wordMask.stencil = firstMotif?.id || "heart";
  }
}

function renderWordMaskStencilOptions() {
  if (!els.wordMaskMotifGrid) return;
  const motifOptions = getMotifStencilOptions();
  els.wordMaskMotifGrid.innerHTML = "";
  for (const optionDef of motifOptions) {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "wordmask-motif";
    button.dataset.stencilId = optionDef.id;
    if (optionDef.id === state.wordMask.stencil) {
      button.classList.add("active");
    }
    const image = document.createElement("img");
    image.src = optionDef.src;
    image.alt = getStencilLabel(optionDef, state.language);
    const caption = document.createElement("span");
    caption.textContent = getStencilLabel(optionDef, state.language);
    button.append(image, caption);
    button.addEventListener("click", () => {
      state.wordMask.stencil = optionDef.id;
      setWordMaskMode("motif");
      updateWordMaskStencilUi();
      renderWordMaskStencilOptions();
      syncWordMaskInputsFromState();
      renderWordMaskPreview();
    });
    els.wordMaskMotifGrid.append(button);
  }
}

function translateStaticUi() {
  document.title = t("appTitle");
  setText(els.heroEyebrow, "heroEyebrow");
  setText(els.appTitle, "appTitle");
  setText(els.heroLede, "heroLede");
  setText(els.homeButtonLabel, "homeButtonLabel");
  setText(els.settingsButtonLabel, "settingsButtonLabel");
  setText(els.helpButtonLabel, "helpButtonLabel");
  setText(els.modeSelectorTitle, "modeSelectorTitle");
  setText(els.modeSelectorDesc, "modeSelectorDesc");
  setText(els.photoModeTitle, "photoModeTitle");
  setText(els.photoModeDesc, "photoModeDesc");
  setText(els.wordMaskModeTitle, "wordMaskStageTitle");
  setText(els.assistantStartButton, "assistantStartButton");
  setText(els.wordMaskLaunchHint, "wordMaskLaunchHint");
  setText(els.wordMaskStageTitle, "wordMaskStageTitle");
  setText(els.wordMaskIntro, "wordMaskIntro");
  setText(els.wordMaskStepA, "wordMaskStepA");
  setText(els.wordMaskPresetLabel, "wordMaskPresetLabel");
  setText(els.wordMaskWidthLabel, "wordMaskWidthLabel");
  setText(els.wordMaskHeightLabel, "wordMaskHeightLabel");
  setText(els.wordMaskStepB, "wordMaskStepB");
  setText(els.wordMaskModeLabel, "wordMaskModeLabel");
  setText(els.wordMaskModeWordButton, "wordMaskModeWord");
  setText(els.wordMaskModeMotifButton, "wordMaskModeMotif");
  setText(els.wordMaskStencilLabel, "wordMaskStencilLabel");
  setText(els.wordMaskShapeSizeLabel, "wordMaskShapeSizeLabel");
  setText(els.wordMaskWordLabel, "wordMaskWordLabel");
  setText(els.wordMaskFontLabel, "wordMaskFontLabel");
  setText(els.wordMaskSizeLabel, "wordMaskSizeLabel");
  setText(els.wordMaskWordBoldLabel, "wordMaskWordBoldLabel");
  setText(els.wordMaskWordItalicLabel, "wordMaskWordItalicLabel");
  setText(els.wordMaskSpacingLabel, "wordMaskSpacingLabel");
  setText(els.wordMaskStepC, "wordMaskStepC");
  setText(els.wordMaskBackgroundLabel, "wordMaskBackgroundLabel");
  setText(els.wordMaskPhotosLabel, "wordMaskPhotosLabel");
  setText(els.wordMaskTabPhotos, "wordMaskTabPhotos");
  setText(els.wordMaskTabSubtitle, "wordMaskTabSubtitle");
  setText(els.wordMaskTabExport, "wordMaskTabExport");
  setText(els.wordMaskShufflePhotosButton, "wordMaskShufflePhotosButton");
  setText(els.wordMaskToggleReorderButton, "reorderModeEnable");
  setText(els.wordMaskPhotoOrderLabel, "wordMaskPhotoOrderLabel");
  setText(els.wordMaskSubtitleLabel, "wordMaskSubtitleLabel");
  setText(els.wordMaskSubtitleFontLabel, "wordMaskSubtitleFontLabel");
  setText(els.wordMaskSubtitleSizeLabel, "wordMaskSubtitleSizeLabel");
  setText(els.wordMaskSubtitleBoldLabel, "wordMaskSubtitleBoldLabel");
  setText(els.wordMaskSubtitleItalicLabel, "wordMaskSubtitleItalicLabel");
  setText(els.wordMaskSubtitleColorLabel, "wordMaskSubtitleColorLabel");
  setText(els.wordMaskOutputFormatLabel, "wordMaskOutputFormatLabel");
  setText(els.wordMaskShareButton, "wordMaskShareButton");
  setText(els.wordMaskSaveButton, "wordMaskSaveButton");
  setText(els.assistantLaunchHint, "assistantLaunchHint");
  setText(els.restartLaunchHint, "restartLaunchHint");
  els.settingsButton.setAttribute("aria-label", t("settingsAria"));
  els.homeButton?.setAttribute("aria-label", t("homeAria"));
  els.helpButton.setAttribute("aria-label", t("helpAria"));
  setText(els.step1Title, "step1Title");
  setText(els.step1Desc, "step1Desc");
  setText(els.step2Title, "step2Title");
  setText(els.step2Desc, "step2Desc");
  updateUploadUiForDevice();
  setText(els.step3Title, "step3Title");
  setText(els.step3Desc, "step3Desc");
  setText(els.activeCellTitle, "activeCellTitle");
  setText(els.dragHint, "dragHint");
  setText(els.step4Title, "step4Title");
  setText(els.step4Desc, "step4Desc");
  setText(els.layoutModeLabel, "layoutModeLabel");
  if (els.layoutModeSelect?.options?.[0]) {
    els.layoutModeSelect.options[0].textContent = t("layoutModeGrid");
  }
  if (els.layoutModeSelect?.options?.[1]) {
    els.layoutModeSelect.options[1].textContent = t("layoutModeHexPack");
  }
  setText(els.layoutModeSuggestionText, "layoutModeSuggestionText");
  setText(els.layoutModeSuggestionApply, "layoutModeSuggestionApply");
  setText(els.hexTuningTitle, "hexTuningTitle");
  setText(els.hexStepXLabel, "hexStepXLabel");
  setText(els.hexStepYLabel, "hexStepYLabel");
  setText(els.hexScaleXLabel, "hexScaleXLabel");
  setText(els.hexScaleYLabel, "hexScaleYLabel");
  setText(els.resetHexLayoutButton, "resetHexLayout");
  setText(els.exportPresetLabel, "exportPresetLabel");
  setText(els.gapLabel, "gapLabel");
  setText(els.outerGapLabel, "outerGapLabel");
  setText(els.exportFormatLabel, "exportFormatLabel");
  setText(els.gifDelayLabel, "gifDelayLabel");
  setText(els.exportWidthLabel, "exportWidthLabel");
  setText(els.exportHelp, "exportHelp");
  setText(els.safeAreaInfoText, "safeAreaHint");
  updateAutoFitSafeAreaButtonLabel();
  setText(els.safeAreaDialogTitle, "safeAreaDialogTitle");
  setText(els.safeAreaDialogBody, "safeAreaDialogBody");
  setText(els.safeAreaDialogClose, "close");
  els.safeAreaHelpButton?.setAttribute("aria-label", t("safeAreaHelpAria"));
  setText(els.settingsTitle, "settingsTitle");
  setText(els.settingsIntro, "settingsIntro");
  setText(els.tipDialogTitle, "tipDialogTitle");
  setText(els.tipDisableLabel, "tipDisableLabel");
  setText(els.nextTipButton, "nextTipButton");
  setText(els.assistantTitle, "assistantTitle");
  setText(els.assistantIntro, "assistantIntro");
  setText(els.assistantFilesLabel, "assistantFilesLabel");
  setText(els.confirmDialogTitle, "confirmDialogTitle");
  setText(els.confirmCancelButton, "confirmCancel");
  setText(els.confirmAcceptButton, "confirmContinue");
  els.confirmCloseButton?.setAttribute("aria-label", t("close"));
  setText(els.tipsTitle, "tipsTitle");
  setText(els.tipsResetButton, "tipsResetButton");
  updateTipsControls();
  setText(els.helpTitle, "helpTitle");
  setText(els.updatesTitle, "updatesTitle");
  setText(els.languageLabel, "languageLabel");
  setText(els.checkForUpdatesButton, "checkForUpdates");
  setText(els.reloadAppButton, "reload");
  setText(els.toStep2, "toPhotos");
  setText(els.restartButton, "restart");
  setText(els.toStep3, "toFineTune");
  setText(els.toStep4, "toExport");
  setText(els.shareButton, "share");
  setText(els.downloadButton, "savePng");
  setText(els.prevCell, "prevCell");
  setText(els.nextCell, "nextCell");
  setText(els.flipHorizontalButton, "flipHorizontal");
  setText(els.flipVerticalButton, "flipVertical");
  setText(els.rotateLeftButton, "rotateLeft90");
  setText(els.replaceCell, "replaceCell");
  setText(els.deleteCell, "deleteCell");
  updateReorderModeUi();
  setText(els.resetFocus, "resetFocus");
  setText(els.zoomLabel, "zoomLabel");
  setText(els.resetZoom, "resetZoom");
  setText(els.slotShapeLabel, "slotShapeLabel");
  if (els.slotShapeSelect?.options?.[0]) {
    els.slotShapeSelect.options[0].textContent = t("slotShapeRect");
  }
  if (els.slotShapeSelect?.options?.[1]) {
    els.slotShapeSelect.options[1].textContent = t("slotShapeRoundedRect");
  }
  if (els.slotShapeSelect?.options?.[2]) {
    els.slotShapeSelect.options[2].textContent = t("slotShapeCircle");
  }
  if (els.slotShapeSelect?.options?.[3]) {
    els.slotShapeSelect.options[3].textContent = t("slotShapeDiamond");
  }
  if (els.slotShapeSelect?.options?.[4]) {
    els.slotShapeSelect.options[4].textContent = t("slotShapeHexagon");
  }
  setText(els.textEditorTitle, "textEditorTitle");
  setText(els.textLabel, "textLabel");
  setText(els.textSizeLabel, "textSizeLabel");
  setText(els.textFontLabel, "textFontLabel");
  setText(els.textBoldLabel, "textBold");
  setText(els.textItalicLabel, "textItalic");
  setText(els.textColorLabel, "textColorLabel");
  setText(els.resetTextPosition, "resetTextPosition");
  els.textInput.placeholder = t("textPlaceholder");
  setText(els.watermarkTitle, "watermarkTitle");
  setText(els.watermarkTextLabel, "watermarkTextLabel");
  setText(els.watermarkPositionLabel, "watermarkPositionLabel");
  setText(els.watermarkFontLabel, "watermarkFontLabel");
  setText(els.watermarkColorLabel, "watermarkColorLabel");
  setText(els.watermarkSizeLabel, "watermarkSizeLabel");
  setText(els.watermarkEnabledLabel, "watermarkEnabledLabel");
  setText(els.exifTitle, "exifTitle");
  setText(els.exifEnabledLabel, "exifEnabledLabel");
  setText(els.exifUserCommentHint, "exifUserCommentHint");
  setText(els.exifJpegOnlyHint, "exifJpegOnlyHint");
  setText(els.exifArtistLabel, "exifArtistLabel");
  setText(els.exifCopyrightLabel, "exifCopyrightLabel");
  setText(els.exifDescriptionLabel, "exifDescriptionLabel");
  setText(els.exifSoftwareLabel, "exifSoftwareLabel");
  setText(els.stepChip1, "step1Chip");
  setText(els.stepChip2, "step2Chip");
  setText(els.stepChip3, "step3Chip");
  setText(els.stepChip4, "step4Chip");
  updateHexTuningUi();
  if (els.settingsDialog.open) {
    setText(els.settingsTitle, "settingsTitle");
  }
  if (els.languageSelect.options[0]) {
    els.languageSelect.options[0].textContent = t("autoLanguage");
  }
  if (els.languageSelect.options[1]) {
    els.languageSelect.options[1].textContent = "Deutsch";
  }
  if (els.languageSelect.options[2]) {
    els.languageSelect.options[2].textContent = "English";
  }
  if (els.languageSelect.options[3]) {
    els.languageSelect.options[3].textContent = "Fran\u00e7ais";
  }
  if (els.exportFormatSelect.options[0]) {
    els.exportFormatSelect.options[0].textContent = t("exportFormatPng");
  }
  if (els.exportFormatSelect.options[1]) {
    els.exportFormatSelect.options[1].textContent = t("exportFormatJpeg");
  }
  if (els.exportFormatSelect.options[2]) {
    els.exportFormatSelect.options[2].textContent = t("exportFormatPdf");
  }
  if (els.exportFormatSelect.options[3]) {
    els.exportFormatSelect.options[3].textContent = t("exportFormatGif");
  }
  if (els.wordMaskPresetSelect?.options?.[0]) {
    els.wordMaskPresetSelect.options[0].textContent = t("wordMaskPresetPostcard");
  }
  if (els.wordMaskPresetSelect?.options?.[1]) {
    els.wordMaskPresetSelect.options[1].textContent = t("wordMaskPresetA4Portrait");
  }
  if (els.wordMaskPresetSelect?.options?.[2]) {
    els.wordMaskPresetSelect.options[2].textContent = t("wordMaskPresetA4Landscape");
  }
  if (els.wordMaskPresetSelect?.options?.[3]) {
    els.wordMaskPresetSelect.options[3].textContent = t("wordMaskPresetPoster");
  }
  if (els.wordMaskPresetSelect?.options?.[4]) {
    els.wordMaskPresetSelect.options[4].textContent = t("wordMaskPresetFree");
  }
  if (els.wordMaskOutputFormatSelect?.options?.[0]) {
    els.wordMaskOutputFormatSelect.options[0].textContent = t("exportFormatPng");
  }
  if (els.wordMaskOutputFormatSelect?.options?.[1]) {
    els.wordMaskOutputFormatSelect.options[1].textContent = t("exportFormatJpeg");
  }
  if (els.wordMaskOutputFormatSelect?.options?.[2]) {
    els.wordMaskOutputFormatSelect.options[2].textContent = t("exportFormatPdf");
  }
  if (els.wordMaskSubtitleInput) {
    els.wordMaskSubtitleInput.placeholder = t("wordMaskSubtitlePlaceholder");
  }
  renderWordMaskStencilOptions();
  updateWordMaskReorderUi();
  if (els.helpDialog.open && !state.readmeText) {
    els.readmeStatus.textContent = t("helpLoading");
  }
  updateRestartLaunchVisibility();
  renderAssistantSuggestions();
  renderExportPresets();
}

function renderVersionLabel() {
  const info = state.versionInfo;
  const parts = [
    `${t("versionPrefix")} ${info.appVersion}`,
    `${t("offlineVersion")} ${info.cacheVersion}`,
  ];
  if (info.label) {
    parts.push(info.label);
  }
  els.versionLabel.textContent = parts.join(" \u00b7 ");
}

function updateReorderModeUi() {
  if (!els.toggleReorderMode) return;
  const enabled = Boolean(state.reorderMode);
  els.toggleReorderMode.textContent = enabled ? t("reorderModeDisable") : t("reorderModeEnable");
  els.toggleReorderMode.setAttribute("aria-pressed", String(enabled));
  els.toggleReorderMode.classList.toggle("active", enabled);
}

function updateWordMaskReorderUi() {
  const active = Boolean(state.wordMask?.reorderMode);
  if (els.wordMaskToggleReorderButton) {
    els.wordMaskToggleReorderButton.textContent = active ? t("reorderModeDisable") : t("reorderModeEnable");
    els.wordMaskToggleReorderButton.setAttribute("aria-pressed", String(active));
    els.wordMaskToggleReorderButton.classList.toggle("active", active);
  }
  if (els.wordMaskReorderHint) {
    const hint = active
      ? (state.wordMask.reorderSourceIndex === null ? t("reorderModeHintIdle") : t("reorderModeHintSource"))
      : "";
    els.wordMaskReorderHint.textContent = hint;
    els.wordMaskReorderHint.hidden = !hint;
  }
  if (!els.wordMaskStage) return;
  const controls = els.wordMaskStage.querySelectorAll("button, input, select, textarea");
  controls.forEach((control) => {
    if (control === els.wordMaskToggleReorderButton) return;
    control.disabled = active;
  });
  if (!active) {
    updateWordMaskStencilUi();
  }
}

function setWordMaskTab(nextTab) {
  const tab = nextTab === "subtitle" || nextTab === "export" ? nextTab : "photos";
  state.wordMask.activeTab = tab;
  const tabs = [
    { button: els.wordMaskTabPhotos, panel: els.wordMaskPanelPhotos, id: "photos" },
    { button: els.wordMaskTabSubtitle, panel: els.wordMaskPanelSubtitle, id: "subtitle" },
    { button: els.wordMaskTabExport, panel: els.wordMaskPanelExport, id: "export" },
  ];
  tabs.forEach((entry) => {
    const active = entry.id === tab;
    if (entry.button) {
      entry.button.classList.toggle("active", active);
      entry.button.setAttribute("aria-pressed", String(active));
      if (active) {
        entry.button.setAttribute("aria-current", "true");
      } else {
        entry.button.removeAttribute("aria-current");
      }
    }
    if (entry.panel) {
      entry.panel.hidden = !active;
    }
  });
}

function isActiveFieldLockedByReorder() {
  return Boolean(state.reorderMode);
}

async function loadReadmeContent() {
  if (state.readmeText) {
    els.readmeStatus.textContent = "";
    els.readmeContent.innerHTML = renderMarkdownAsHtml(state.readmeText);
    return;
  }
  els.readmeStatus.textContent = t("helpLoading");
  els.readmeContent.innerHTML = "";
  try {
    const response = await fetch("./README.md", { cache: "no-cache" });
    if (!response.ok) {
      throw new Error("README unavailable");
    }
    const text = await response.text();
    state.readmeText = text;
    els.readmeStatus.textContent = "";
    els.readmeContent.innerHTML = renderMarkdownAsHtml(text);
  } catch {
    els.readmeStatus.textContent = t("helpFailed");
    if (!state.readmeText) {
      els.readmeContent.innerHTML = "";
    }
  }
}

function renderMarkdownAsHtml(markdown) {
  const lines = markdown.replace(/\r/g, "").split("\n");
  const parts = [];
  let listType = null;
  let listItems = [];
  let paragraphLines = [];
  let codeLines = [];
  let blockquoteLines = [];
  let tableLines = [];
  let inCodeBlock = false;

  const flushList = () => {
    if (!listItems.length) return;
    const tag = listType || "ul";
    parts.push(`<${tag}>${listItems.map((item) => `<li>${renderInlineMarkdown(item)}</li>`).join("")}</${tag}>`);
    listType = null;
    listItems = [];
  };

  const flushParagraph = () => {
    if (!paragraphLines.length) return;
    parts.push(`<p>${renderInlineMarkdown(paragraphLines.join(" "))}</p>`);
    paragraphLines = [];
  };

  const flushCode = () => {
    if (!codeLines.length) return;
    parts.push(`<pre><code>${escapeHtml(codeLines.join("\n"))}</code></pre>`);
    codeLines = [];
  };

  const flushBlockquote = () => {
    if (!blockquoteLines.length) return;
    parts.push(`<blockquote>${renderInlineMarkdown(blockquoteLines.join(" "))}</blockquote>`);
    blockquoteLines = [];
  };

  const flushTable = () => {
    if (tableLines.length < 2 || !/^\s*\|?[\s:-]+\|[\s|:-]*$/.test(tableLines[1])) {
      paragraphLines.push(...tableLines);
      tableLines = [];
      return;
    }
    const rows = tableLines.map((line) => line.trim().replace(/^\||\|$/g, "").split("|").map((cell) => cell.trim()));
    const [header, , ...body] = rows;
    const headerMarkup = header.map((cell) => `<th>${renderInlineMarkdown(cell)}</th>`).join("");
    const bodyMarkup = body.map((row) => `<tr>${row.map((cell) => `<td>${renderInlineMarkdown(cell)}</td>`).join("")}</tr>`).join("");
    parts.push(`<table><thead><tr>${headerMarkup}</tr></thead><tbody>${bodyMarkup}</tbody></table>`);
    tableLines = [];
  };

  const flushAll = () => {
    flushList();
    flushParagraph();
    flushBlockquote();
    flushTable();
  };

  for (const line of lines) {
    if (line.startsWith("```")) {
      flushAll();
      if (inCodeBlock) {
        flushCode();
      }
      inCodeBlock = !inCodeBlock;
      continue;
    }

    if (inCodeBlock) {
      codeLines.push(line);
      continue;
    }

    if (!line.trim()) {
      flushAll();
      continue;
    }

    const headingMatch = /^(#{1,3})\s+(.+)$/.exec(line);
    if (headingMatch) {
      flushAll();
      const level = headingMatch[1].length;
      parts.push(`<h${level}>${renderInlineMarkdown(headingMatch[2])}</h${level}>`);
      continue;
    }

    if (/^\|.+\|\s*$/.test(line.trim())) {
      flushList();
      flushParagraph();
      flushBlockquote();
      tableLines.push(line);
      continue;
    }

    flushTable();

    const unorderedListMatch = /^[-*]\s+(.+)$/.exec(line);
    if (unorderedListMatch) {
      flushParagraph();
      flushBlockquote();
      if (listType && listType !== "ul") {
        flushList();
      }
      listType = "ul";
      listItems.push(unorderedListMatch[1]);
      continue;
    }

    const orderedListMatch = /^\d+\.\s+(.+)$/.exec(line);
    if (orderedListMatch) {
      flushParagraph();
      flushBlockquote();
      if (listType && listType !== "ol") {
        flushList();
      }
      listType = "ol";
      listItems.push(orderedListMatch[1]);
      continue;
    }

    const blockquoteMatch = /^>\s?(.*)$/.exec(line);
    if (blockquoteMatch) {
      flushList();
      flushParagraph();
      blockquoteLines.push(blockquoteMatch[1]);
      continue;
    }

    if (/^(-{3,}|\*{3,}|_{3,})$/.test(line.trim())) {
      flushAll();
      parts.push("<hr>");
      continue;
    }

    const imageMatch = /^!\[([^\]]*)\]\(([^)]+)\)$/.exec(line.trim());
    if (imageMatch) {
      flushAll();
      const src = sanitizeMarkdownUrl(imageMatch[2]);
      if (src) {
        parts.push(`<figure><img src="${escapeAttribute(src)}" alt="${escapeAttribute(imageMatch[1])}" loading="lazy"></figure>`);
      }
      continue;
    }

    paragraphLines.push(line.trim());
  }

  flushAll();
  flushCode();
  return parts.join("");
}

function renderInlineMarkdown(text) {
  let html = escapeHtml(text);
  html = html.replace(/`([^`]+)`/g, "<code>$1</code>");
  html = html.replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>");
  html = html.replace(/(^|[^\*])\*([^*]+)\*/g, "$1<em>$2</em>");
  html = html.replace(/\[([^\]]+)\]\(([^)]+)\)/g, (_match, label, href) => {
    const safeHref = sanitizeMarkdownUrl(href);
    if (safeHref) {
      const external = /^https?:\/\//i.test(safeHref);
      return `<a href="${escapeAttribute(safeHref)}"${external ? ' target="_blank" rel="noreferrer"' : ""}>${escapeHtml(label)}</a>`;
    }
    return escapeHtml(label);
  });
  return html;
}

function sanitizeMarkdownUrl(url) {
  if (typeof url !== "string") {
    return "";
  }
  const trimmed = url.trim();
  if (!trimmed || /^javascript:/i.test(trimmed)) {
    return "";
  }
  return trimmed;
}

function escapeHtml(text) {
  return String(text)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll("\"", "&quot;")
    .replaceAll("'", "&#39;");
}

function escapeAttribute(value) {
  return escapeHtml(value).replaceAll("`", "&#96;");
}

function getActiveLayoutDefinition() {
  const preset = PRESETS.find((entry) => entry.id === state.activePresetId);
  return preset || PRESETS[0];
}

function getPresetLabel(preset, language = state.language) {
  const labels = PRESET_LABELS[preset.id];
  if (labels) {
    return labels[language] || labels.de || labels.en;
  }
  return preset.label || preset.id;
}

function presetIsNormalGrid(preset) {
  if (!preset || !Array.isArray(preset.slots)) return false;
  if (preset.slots.length !== preset.rows * preset.cols) return false;
  for (const slot of preset.slots) {
    if ((slot.w || 1) !== 1 || (slot.h || 1) !== 1) return false;
    if (slot.shape && slot.shape !== "rect") return false;
  }
  return true;
}

function presetIsHex(preset) {
  if (!preset || !Array.isArray(preset.slots) || preset.slots.length === 0) return false;
  return preset.slots.every((slot) => slot?.shape === "hexagon");
}

function getPresetSortGroup(preset) {
  if (presetIsNormalGrid(preset)) return 0;
  if (presetIsHex(preset)) return 2;
  return 1;
}

function getSortedPresets(presets = PRESETS, language = state.language) {
  return [...presets].sort((a, b) => {
    const groupDiff = getPresetSortGroup(a) - getPresetSortGroup(b);
    if (groupDiff !== 0) return groupDiff;
    const countDiff = (a?.slots?.length || 0) - (b?.slots?.length || 0);
    if (countDiff !== 0) return countDiff;
    return getPresetLabel(a, language).localeCompare(getPresetLabel(b, language), language);
  });
}

function getExportPresetDefinition() {
  return EXPORT_PRESETS.find((preset) => preset.id === state.exportPresetId) || EXPORT_PRESETS[0];
}

function getExportPresetCopy(preset, language = state.language) {
  const labels = EXPORT_PRESET_LABELS[preset.id];
  return labels?.[language] || labels?.de || labels?.en || { title: preset.id, subtitle: "" };
}

function isSocialExportPreset(preset) {
  return String(preset?.group || "").trim().toLowerCase() === "social";
}

function getLayoutUnitCells(layout) {
  const cells = [];
  for (const slot of layout.slots) {
    for (let y = slot.y; y < slot.y + slot.h; y += 1) {
      for (let x = slot.x; x < slot.x + slot.w; x += 1) {
        cells.push({ x, y });
      }
    }
  }
  return cells;
}

function getHexPackSpacingProfile(layout) {
  return {
    stepXRatio: clamp(Number(state.hexStepXRatio) || HEX_PACK_STEP_X_RATIO, 0.6, 1.2),
    stepYRatio: clamp(Number(state.hexStepYRatio) || HEX_PACK_STEP_Y_RATIO, 0.6, 1.4),
    oddColumnOffsetRatio: HEX_PACK_ODD_COLUMN_OFFSET_RATIO,
    unitScaleX: clamp(Number(state.hexUnitScaleX) || HEX_PACK_UNIT_SCALE_X, 0.6, 1.2),
    unitScaleY: clamp(Number(state.hexUnitScaleY) || HEX_PACK_UNIT_SCALE_Y, 0.6, 1.2),
  };
}

function getHexPackBounds(layout, unitWidth, unitHeight, gap) {
  const cells = getLayoutUnitCells(layout);
  if (!cells.length) {
    return { minX: 0, minY: 0, maxX: unitWidth, maxY: unitHeight, width: unitWidth, height: unitHeight };
  }
  const spacing = getHexPackSpacingProfile(layout);
  const stepX = unitWidth * spacing.stepXRatio + gap;
  const stepY = unitHeight * spacing.stepYRatio + gap;
  const drawWidth = unitWidth * (spacing.unitScaleX || 1);
  const drawHeight = unitHeight * (spacing.unitScaleY || 1);
  const insetX = (unitWidth - drawWidth) * 0.5;
  const insetY = (unitHeight - drawHeight) * 0.5;
  let minX = Number.POSITIVE_INFINITY;
  let minY = Number.POSITIVE_INFINITY;
  let maxX = Number.NEGATIVE_INFINITY;
  let maxY = Number.NEGATIVE_INFINITY;
  for (const cell of cells) {
    const x = cell.x * stepX + insetX;
    const y = cell.y * stepY + (cell.x % 2 === 1 ? unitHeight * spacing.oddColumnOffsetRatio : 0) + insetY;
    minX = Math.min(minX, x);
    minY = Math.min(minY, y);
    maxX = Math.max(maxX, x + drawWidth);
    maxY = Math.max(maxY, y + drawHeight);
  }
  return {
    minX,
    minY,
    maxX,
    maxY,
    width: Math.max(1, maxX - minX),
    height: Math.max(1, maxY - minY),
  };
}

function getLayoutAspectRatio(layout = getActiveLayoutDefinition()) {
  if (state.layoutMode === "hex-pack") {
    const probeBounds = getHexPackBounds(layout, 100, 100, state.gap);
    return probeBounds.height / Math.max(1, probeBounds.width);
  }
  return layout.rows / layout.cols;
}

function renderPresetMiniGrid(mini, preset, options = {}) {
  if (!mini || !preset) return;
  const cellSize = Number(options.cellSize) || 14;
  const miniGap = Number(options.gap) || 4;
  const hasHexagon = preset.slots.some((slot) => slot?.shape === "hexagon");
  const hexYOffset = hasHexagon ? (cellSize + miniGap) * 0.5 : 0;
  const miniWidth = preset.cols * cellSize + Math.max(0, preset.cols - 1) * miniGap;
  const miniHeight = preset.rows * cellSize + Math.max(0, preset.rows - 1) * miniGap + hexYOffset;
  mini.style.gridTemplateColumns = `repeat(${preset.cols}, 1fr)`;
  mini.style.gridTemplateRows = `repeat(${preset.rows}, 1fr)`;
  mini.style.width = `${miniWidth}px`;
  mini.style.height = `${miniHeight}px`;
  mini.innerHTML = "";
  preset.slots.forEach((slot) => {
    const span = document.createElement("span");
    span.style.gridColumn = `${slot.x + 1} / span ${slot.w}`;
    span.style.gridRow = `${slot.y + 1} / span ${slot.h}`;
    const shape = SLOT_SHAPES.includes(slot?.shape) ? slot.shape : "rect";
    if (shape === "circle") {
      span.style.borderRadius = "50%";
    } else if (shape === "rounded-rect") {
      span.style.borderRadius = "6px";
    } else if (shape === "diamond") {
      span.style.borderRadius = "0";
      span.style.clipPath = "polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)";
    } else if (shape === "hexagon") {
      span.style.borderRadius = "0";
      span.style.clipPath = "polygon(20% 0%, 80% 0%, 100% 50%, 80% 100%, 20% 100%, 0% 50%)";
      span.style.transform = `translateY(${slot.x % 2 === 1 ? hexYOffset : 0}px)`;
    } else {
      span.style.borderRadius = "5px";
    }
    mini.appendChild(span);
  });
}

function getPresetUnitBounds(preset) {
  if (!preset?.slots?.length) {
    return { width: Math.max(1, preset?.cols || 1), height: Math.max(1, preset?.rows || 1) };
  }
  let minX = Number.POSITIVE_INFINITY;
  let minY = Number.POSITIVE_INFINITY;
  let maxX = Number.NEGATIVE_INFINITY;
  let maxY = Number.NEGATIVE_INFINITY;
  for (const slot of preset.slots) {
    if (!slot) continue;
    minX = Math.min(minX, slot.x);
    minY = Math.min(minY, slot.y);
    maxX = Math.max(maxX, slot.x + slot.w);
    maxY = Math.max(maxY, slot.y + slot.h);
  }
  return {
    width: Math.max(1, maxX - minX),
    height: Math.max(1, maxY - minY),
  };
}

function getPresetAspectRatioForSuggestion(preset) {
  const bounds = getPresetUnitBounds(preset);
  return bounds.width / Math.max(1, bounds.height);
}

function getOrientationBucket(ratio) {
  const safeRatio = Number.isFinite(ratio) && ratio > 0 ? ratio : 1;
  if (safeRatio >= 1.15) return "landscape";
  if (safeRatio <= 0.87) return "portrait";
  return "square";
}

function buildOrientationProfile(ratios) {
  const profile = { portrait: 0, landscape: 0, square: 0 };
  for (const ratio of ratios) {
    const bucket = getOrientationBucket(ratio);
    profile[bucket] += 1;
  }
  return profile;
}

function countNonZeroOrientationBuckets(profile) {
  return ["portrait", "landscape", "square"].filter((bucket) => (Number(profile?.[bucket]) || 0) > 0).length;
}

function hasMixedOrientation(profile) {
  return countNonZeroOrientationBuckets(profile) > 1;
}

function getPresetSlotOrientationProfile(preset) {
  if (!preset?.slots?.length) {
    return { portrait: 0, landscape: 0, square: 1 };
  }
  const ratios = preset.slots.map((slot) => {
    const w = Number(slot?.w) || 1;
    const h = Number(slot?.h) || 1;
    return w / Math.max(1, h);
  });
  return buildOrientationProfile(ratios);
}

function getSlotAspectRatio(slot) {
  const w = Number(slot?.w) || 1;
  const h = Number(slot?.h) || 1;
  return w / Math.max(1, h);
}

async function assignAssistantFilesToSlots(files, preset) {
  const slotCount = Math.max(0, Number(preset?.slots?.length) || 0);
  const useCount = Math.min(slotCount, files.length);
  if (!useCount) return [];

  const scopedFiles = files.slice(0, useCount);
  const ratios = await Promise.all(scopedFiles.map((file) => getFileAspectRatio(file)));
  const filePool = scopedFiles.map((file, index) => ({
    file,
    ratio: ratios[index],
    bucket: getOrientationBucket(ratios[index]),
  }));

  const slots = preset.slots.slice(0, useCount).map((slot, index) => {
    const ratio = getSlotAspectRatio(slot);
    return {
      index,
      ratio,
      bucket: getOrientationBucket(ratio),
    };
  });

  const assignments = new Array(useCount).fill(null);
  const remainingFiles = [...filePool];

  // Phase 1: orientation match first, then closest ratio.
  for (const slot of slots) {
    const sameBucketCandidates = remainingFiles.filter((item) => item.bucket === slot.bucket);
    if (!sameBucketCandidates.length) continue;
    sameBucketCandidates.sort((a, b) => Math.abs(a.ratio - slot.ratio) - Math.abs(b.ratio - slot.ratio));
    const winner = sameBucketCandidates[0];
    assignments[slot.index] = winner.file;
    const winnerIndex = remainingFiles.indexOf(winner);
    if (winnerIndex >= 0) remainingFiles.splice(winnerIndex, 1);
  }

  // Phase 2: fill gaps with nearest ratio from remaining files.
  for (const slot of slots) {
    if (assignments[slot.index]) continue;
    if (!remainingFiles.length) break;
    remainingFiles.sort((a, b) => Math.abs(a.ratio - slot.ratio) - Math.abs(b.ratio - slot.ratio));
    const winner = remainingFiles.shift();
    assignments[slot.index] = winner?.file || null;
  }

  return assignments;
}

function calculateOrientationMismatchPenalty(imageProfile, presetProfile, limit) {
  const total = Math.max(1, Number(limit) || 1);
  const imagePortrait = imageProfile.portrait / total;
  const imageLandscape = imageProfile.landscape / total;
  const imageSquare = imageProfile.square / total;
  const slotPortrait = presetProfile.portrait / total;
  const slotLandscape = presetProfile.landscape / total;
  const slotSquare = presetProfile.square / total;
  const diff =
    Math.abs(imagePortrait - slotPortrait) +
    Math.abs(imageLandscape - slotLandscape) +
    Math.abs(imageSquare - slotSquare);
  return diff * 3.2;
}

function calculateOrientationMismatchCount(imageProfile, presetProfile, limit) {
  const total = Math.max(1, Number(limit) || 1);
  const imageCounts = {
    portrait: Math.min(total, Math.max(0, Number(imageProfile?.portrait) || 0)),
    landscape: Math.min(total, Math.max(0, Number(imageProfile?.landscape) || 0)),
    square: Math.min(total, Math.max(0, Number(imageProfile?.square) || 0)),
  };
  const slotCounts = {
    portrait: Math.min(total, Math.max(0, Number(presetProfile?.portrait) || 0)),
    landscape: Math.min(total, Math.max(0, Number(presetProfile?.landscape) || 0)),
    square: Math.min(total, Math.max(0, Number(presetProfile?.square) || 0)),
  };
  const matches =
    Math.min(imageCounts.portrait, slotCounts.portrait) +
    Math.min(imageCounts.landscape, slotCounts.landscape) +
    Math.min(imageCounts.square, slotCounts.square);
  return Math.max(0, total - matches);
}

function evaluateAspectFit(imageRatios, slotRatios) {
  const cleanImages = (Array.isArray(imageRatios) ? imageRatios : [])
    .map((value) => Number(value))
    .filter((value) => Number.isFinite(value) && value > 0)
    .sort((a, b) => a - b);
  const cleanSlots = (Array.isArray(slotRatios) ? slotRatios : [])
    .map((value) => Number(value))
    .filter((value) => Number.isFinite(value) && value > 0)
    .sort((a, b) => a - b);
  const pairCount = Math.min(cleanImages.length, cleanSlots.length);
  if (!pairCount) {
    return {
      avgDiff: 0,
      maxDiff: 0,
      warnCount: 0,
      severeCount: 0,
      penalty: 0,
    };
  }
  let diffSum = 0;
  let maxDiff = 0;
  let warnCount = 0;
  let severeCount = 0;
  for (let i = 0; i < pairCount; i += 1) {
    const diff = Math.abs(Math.log(cleanImages[i] / cleanSlots[i]));
    diffSum += diff;
    maxDiff = Math.max(maxDiff, diff);
    if (diff >= 0.55) warnCount += 1;
    if (diff >= 0.9) severeCount += 1;
  }
  const avgDiff = diffSum / pairCount;
  return {
    avgDiff,
    maxDiff,
    warnCount,
    severeCount,
    penalty: avgDiff * 3.6 + severeCount * 0.9 + warnCount * 0.35,
  };
}

function getSquareAffinity(ratios) {
  const values = (Array.isArray(ratios) ? ratios : [])
    .map((value) => Number(value))
    .filter((value) => Number.isFinite(value) && value > 0);
  if (!values.length) return 0;
  const score = values.reduce((sum, ratio) => {
    const logDiff = Math.abs(Math.log(ratio));
    return sum + Math.exp(-logDiff * 1.2);
  }, 0) / values.length;
  return clamp(score, 0, 1);
}

function getExtremeAspectShare(ratios) {
  const values = (Array.isArray(ratios) ? ratios : [])
    .map((value) => Number(value))
    .filter((value) => Number.isFinite(value) && value > 0);
  if (!values.length) return 0;
  const extremeCount = values.filter((ratio) => Math.abs(Math.log(ratio)) >= 0.75).length;
  return extremeCount / values.length;
}

function getPresetSquareSlotShare(preset, limit = Number.POSITIVE_INFINITY) {
  const slots = Array.isArray(preset?.slots) ? preset.slots.slice(0, Math.max(0, Number(limit) || 0)) : [];
  if (!slots.length) return 0;
  const nearSquare = slots.filter((slot) => {
    const ratio = getSlotAspectRatio(slot);
    return Math.abs(Math.log(ratio || 1)) <= 0.36;
  }).length;
  return nearSquare / slots.length;
}

function getAssistantAspectTone(suggestion) {
  const severeCount = Math.max(0, Number(suggestion?.aspectSevereCount) || 0);
  const warnCount = Math.max(0, Number(suggestion?.aspectWarnCount) || 0);
  const avgDiff = Math.max(0, Number(suggestion?.aspectAvgDiff) || 0);
  const maxDiff = Math.max(0, Number(suggestion?.aspectMaxDiff) || 0);
  if (severeCount > 0 || maxDiff >= 0.95 || avgDiff >= 0.75) return "bad";
  if (warnCount > 0 || avgDiff >= 0.4) return "warn";
  return "good";
}

function getAssistantHintTone(suggestion) {
  const fileCount = Math.max(0, Number(suggestion?.fileCount) || 0);
  const slotCount = Math.max(0, Number(suggestion?.slotCount) || 0);
  const useCount = Math.max(1, Math.min(fileCount, slotCount));
  const mismatchCount = Math.max(0, Number(suggestion?.orientationMismatchCount) || 0);
  const mismatchRatio = mismatchCount / useCount;
  const aspectTone = getAssistantAspectTone(suggestion);
  if (aspectTone === "bad") {
    return "bad";
  }
  if (mismatchRatio >= 0.5) {
    return "bad";
  }
  if (mismatchCount > 0) {
    return "warn";
  }
  if (aspectTone === "warn") {
    return "warn";
  }
  if (fileCount !== slotCount || suggestion?.hasMixedImages) {
    return "warn";
  }
  return "good";
}

function getDominantOrientationBucket(profile) {
  const entries = [
    ["portrait", Number(profile?.portrait) || 0],
    ["landscape", Number(profile?.landscape) || 0],
    ["square", Number(profile?.square) || 0],
  ].sort((a, b) => b[1] - a[1]);
  const [topBucket, topValue] = entries[0];
  const secondValue = entries[1]?.[1] || 0;
  if (topValue <= 0) return null;
  if (topValue === secondValue) return null;
  return topBucket;
}

function getAssistantOrientationHintText(suggestion) {
  const fileCount = Math.max(0, Number(suggestion?.fileCount) || 0);
  const slotCount = Math.max(0, Number(suggestion?.slotCount) || 0);
  const useCount = Math.max(1, Math.min(fileCount, slotCount));
  const mismatchCount = Math.max(0, Number(suggestion?.orientationMismatchCount) || 0);
  const mismatchRatio = mismatchCount / useCount;
  if (mismatchRatio >= 0.5) {
    return format(t("assistantOrientationHintMismatchBad"), { mismatch: mismatchCount, total: useCount });
  }
  if (mismatchCount > 0) {
    return format(t("assistantOrientationHintMismatchWarn"), { mismatch: mismatchCount, total: useCount });
  }
  const imageDominant = getDominantOrientationBucket(suggestion?.imageOrientationProfile);
  const slotDominant = getDominantOrientationBucket(suggestion?.slotOrientationProfile);
  if (!imageDominant || !slotDominant) {
    return t("assistantOrientationHintMixed");
  }
  if (imageDominant !== slotDominant) {
    return t("assistantOrientationHintMixed");
  }
  if (imageDominant === "portrait") return t("assistantOrientationHintPortrait");
  if (imageDominant === "landscape") return t("assistantOrientationHintLandscape");
  return t("assistantOrientationHintSquare");
}

function getAssistantAspectHintText(suggestion) {
  const tone = getAssistantAspectTone(suggestion);
  if (tone === "bad") return t("assistantAspectHintBad");
  if (tone === "warn") return t("assistantAspectHintWarn");
  return t("assistantAspectHintGood");
}

function getAssistantReasonText(suggestion) {
  const { fileCount, slotCount } = suggestion;
  if (slotCount === fileCount) {
    return format(t("assistantReasonExact"), { count: fileCount });
  }
  if (slotCount > fileCount) {
    return format(t("assistantReasonExtra"), {
      count: fileCount,
      slots: slotCount,
      extra: slotCount - fileCount,
    });
  }
  return format(t("assistantReasonMissing"), {
    count: fileCount,
    slots: slotCount,
    missing: fileCount - slotCount,
  });
}

function renderAssistantSuggestions() {
  if (!els.assistantSuggestions) return;
  els.assistantSuggestions.innerHTML = "";
  const suggestions = Array.isArray(state.assistantSuggestions) ? state.assistantSuggestions : [];
  if (!suggestions.length) {
    const empty = document.createElement("p");
    empty.className = "settings-status";
    empty.textContent = t("assistantNoSuggestions");
    els.assistantSuggestions.appendChild(empty);
    return;
  }
  const heading = document.createElement("strong");
  heading.className = "assistant-suggestions-title";
  heading.textContent = t("assistantSuggestionsTitle");
  els.assistantSuggestions.appendChild(heading);
  suggestions.forEach((suggestion) => {
    const { preset } = suggestion;
    if (!preset) return;
    const card = document.createElement("article");
    card.className = "assistant-suggestion-card";
    const tooltip = `${getPresetLabel(preset)} (${preset.slots.length} ${t("cells")})`;
    const thumb = document.createElement("span");
    thumb.className = "grid-mini";
    thumb.setAttribute("aria-hidden", "true");
    renderPresetMiniGrid(thumb, preset, { cellSize: 12, gap: 3 });
    const title = document.createElement("strong");
    title.textContent = getPresetLabel(preset);
    const reason = document.createElement("p");
    reason.className = "settings-status";
    reason.textContent = getAssistantReasonText(suggestion);
    const orientationHint = document.createElement("p");
    const hintTone = getAssistantHintTone(suggestion);
    orientationHint.className = `assistant-orientation-hint assistant-orientation-hint--${hintTone} assistant-orientation-hint--multiline`;
    orientationHint.textContent = `${getAssistantOrientationHintText(suggestion)}\n${getAssistantAspectHintText(suggestion)}`;
    const applyButton = document.createElement("button");
    applyButton.type = "button";
    applyButton.className = "primary";
    applyButton.textContent = t("assistantUseTemplate");
    applyButton.title = tooltip;
    applyButton.addEventListener("click", () => {
      void applyAssistantSelection(preset.id);
    });
    card.appendChild(thumb);
    card.appendChild(title);
    card.appendChild(reason);
    card.appendChild(orientationHint);
    card.appendChild(applyButton);
    els.assistantSuggestions.appendChild(card);
  });
}

function setAssistantStatus(message, isError = false) {
  if (!els.assistantStatus) return;
  els.assistantStatus.textContent = message || "";
  els.assistantStatus.classList.toggle("warning-text", Boolean(isError && message));
}

async function getFileAspectRatio(file) {
  try {
    const objectUrl = URL.createObjectURL(file);
    const ratio = await new Promise((resolve) => {
      const img = new Image();
      img.onload = () => {
        const width = Number(img.naturalWidth) || Number(img.width) || 1;
        const height = Number(img.naturalHeight) || Number(img.height) || 1;
        resolve(width / Math.max(1, height));
      };
      img.onerror = () => resolve(1);
      img.src = objectUrl;
    });
    URL.revokeObjectURL(objectUrl);
    return Number.isFinite(ratio) && ratio > 0 ? ratio : 1;
  } catch {
    return 1;
  }
}

async function buildAssistantSuggestions(files) {
  const fileCount = files.length;
  if (!fileCount) return [];
  const probeFiles = files.slice(0, 24);
  const aspectRatios = await Promise.all(probeFiles.map((file) => getFileAspectRatio(file)));
  const averageAspect = aspectRatios.reduce((sum, value) => sum + value, 0) / Math.max(1, aspectRatios.length);
  const imageOrientationProfile = buildOrientationProfile(aspectRatios);
  const sortedPresetOrder = getSortedPresets(PRESETS, state.language);
  const rankById = new Map(sortedPresetOrder.map((preset, index) => [preset.id, index]));
  return PRESETS
    .map((preset) => {
      const slotCount = preset.slots.length;
      const shortage = Math.max(0, fileCount - slotCount);
      const spare = Math.max(0, slotCount - fileCount);
      const capacityPenalty = shortage * 5 + spare * 1.2;
      const presetAspect = getPresetAspectRatioForSuggestion(preset);
      const aspectPenalty = Math.abs(Math.log((presetAspect || 1) / (averageAspect || 1)));
      const slotOrientationProfile = getPresetSlotOrientationProfile(preset);
      const useCount = Math.max(1, Math.min(fileCount, slotCount));
      const aspectCount = Math.max(1, Math.min(useCount, aspectRatios.length));
      const aspectFit = evaluateAspectFit(
        aspectRatios.slice(0, aspectCount),
        preset.slots.slice(0, aspectCount).map((slot) => getSlotAspectRatio(slot))
      );
      const imageSquareAffinity = getSquareAffinity(aspectRatios.slice(0, aspectCount));
      const imageExtremeShare = getExtremeAspectShare(aspectRatios.slice(0, aspectCount));
      const imageBalancedShare = 1 - imageExtremeShare;
      const presetSquareShare = getPresetSquareSlotShare(preset, aspectCount);
      const squareTemplateBonus = imageSquareAffinity * presetSquareShare * (1.1 + imageBalancedShare * 1.3);
      const squareMismatchPenalty = Math.max(0, imageSquareAffinity - presetSquareShare) * 0.9;
      const orientationMismatchCount = calculateOrientationMismatchCount(
        imageOrientationProfile,
        slotOrientationProfile,
        useCount
      );
      const orientationPenalty = calculateOrientationMismatchPenalty(
        imageOrientationProfile,
        slotOrientationProfile,
        useCount
      );
      const hardMismatchPenalty = orientationMismatchCount * 4.2;
      const presetHasMixedOrientation = hasMixedOrientation(slotOrientationProfile);
      const mixedToSinglePenalty =
        hasMixedOrientation(imageOrientationProfile) && !presetHasMixedOrientation ? 1.8 : 0;
      const hasSpecialShape = preset.slots.some((slot) => slot?.shape && slot.shape !== "rect");
      const score =
        capacityPenalty +
        aspectPenalty +
        aspectFit.penalty +
        squareMismatchPenalty +
        orientationPenalty +
        hardMismatchPenalty +
        mixedToSinglePenalty +
        (hasSpecialShape ? 0.25 : 0) -
        squareTemplateBonus;
      return {
        preset,
        score,
        fileCount,
        slotCount,
        imageOrientationProfile,
        slotOrientationProfile,
        orientationMismatchCount,
        aspectAvgDiff: aspectFit.avgDiff,
        aspectMaxDiff: aspectFit.maxDiff,
        aspectWarnCount: aspectFit.warnCount,
        aspectSevereCount: aspectFit.severeCount,
        hasMixedImages: hasMixedOrientation(imageOrientationProfile),
      };
    })
    .sort((a, b) => {
      const scoreDiff = a.score - b.score;
      if (Math.abs(scoreDiff) > 0.0001) return scoreDiff;
      return (rankById.get(a.preset.id) || 0) - (rankById.get(b.preset.id) || 0);
    })
    .slice(0, 6);
}

async function analyzeAssistantFiles(fileList) {
  const token = state.assistantRequestToken + 1;
  state.assistantRequestToken = token;
  const files = Array.from(fileList || []).filter((file) => file.type.startsWith("image/"));
  state.assistantFiles = files;
  state.assistantSuggestions = [];
  if (!files.length) {
    setAssistantStatus(t("assistantNoFiles"), true);
    renderAssistantSuggestions();
    return;
  }
  setAssistantStatus(format(t("assistantAnalyzing"), { count: files.length }), false);
  const suggestions = await buildAssistantSuggestions(files);
  if (token !== state.assistantRequestToken) return;
  state.assistantSuggestions = suggestions;
  setAssistantStatus(format(t("assistantLoaded"), { count: files.length }), false);
  renderAssistantSuggestions();
}

async function applyAssistantSelection(presetId) {
  const preset = PRESETS.find((entry) => entry.id === presetId);
  if (!preset) return;
  const files = state.assistantFiles.filter((file) => file?.type?.startsWith("image/"));
  if (!files.length) {
    setAssistantStatus(t("assistantNoFiles"), true);
    return;
  }
  state.activePresetId = preset.id;
  resetSlotShapeOverrides(preset);
  applyGrid();
  for (let i = 0; i < state.cells.length; i += 1) {
    disposeCell(state.cells[i]);
    state.cells[i] = createEmptyCell();
  }
  const useCount = Math.min(files.length, state.cells.length);
  const assignments = await assignAssistantFilesToSlots(files, preset);
  for (let i = 0; i < useCount; i += 1) {
    const file = assignments[i] || files[i];
    if (!file) continue;
    await setCellImage(i, file);
  }
  state.selectedCell = 0;
  setStep(3);
  renderAll();
  if (files.length > state.cells.length) {
    setAssistantStatus(
      format(t("assistantOnlyUsed"), { used: state.cells.length, count: files.length }),
      false
    );
  }
  if (els.assistantDialog?.open) {
    els.assistantDialog.close();
  }
}

function renderExportPresets() {
  els.exportPresetGrid.innerHTML = "";
  els.exportPresetSelect.innerHTML = "";
  const freeGroup = document.createElement("optgroup");
  freeGroup.label = t("exportPresetGroupFree");
  const socialGroup = document.createElement("optgroup");
  socialGroup.label = t("exportPresetGroupSocial");
  let currentGroup = "";
  for (const preset of EXPORT_PRESETS) {
    if (preset.group !== currentGroup) {
      currentGroup = preset.group;
      const title = document.createElement("div");
      title.className = "export-preset-group-title";
      title.textContent = preset.group === "social" ? t("exportPresetGroupSocial") : t("exportPresetGroupFree");
      els.exportPresetGrid.appendChild(title);
    }
    const copy = getExportPresetCopy(preset);
    const option = document.createElement("option");
    option.value = preset.id;
    option.textContent = copy.title;
    option.selected = preset.id === state.exportPresetId;
    if (preset.group === "social") {
      socialGroup.appendChild(option);
    } else {
      freeGroup.appendChild(option);
    }
    const button = document.createElement("button");
    button.type = "button";
    button.className = "export-preset";
    button.dataset.exportPresetId = preset.id;
    button.innerHTML = `<strong>${copy.title}</strong><small>${copy.subtitle}</small>`;
    button.classList.toggle("active", preset.id === state.exportPresetId);
    button.addEventListener("click", () => {
      state.exportPresetId = preset.id;
      updateExportFormatUi();
      renderExportPresets();
      renderExportPreview();
    });
    els.exportPresetGrid.appendChild(button);
  }
  if (freeGroup.children.length) {
    els.exportPresetSelect.appendChild(freeGroup);
  }
  if (socialGroup.children.length) {
    els.exportPresetSelect.appendChild(socialGroup);
  }
  els.exportPresetSelect.value = state.exportPresetId;
}

function getExportTargetSize() {
  const layout = getActiveLayoutDefinition();
  const preset = getExportPresetDefinition();
  const width = state.exportFormat === "gif"
    ? clamp(Number(state.exportWidth) || GIF_EXPORT_DEFAULT_WIDTH, GIF_EXPORT_MIN_WIDTH, GIF_EXPORT_MAX_WIDTH)
    : clamp(Number(state.exportWidth) || 3000, EXPORT_WIDTH_MIN, EXPORT_WIDTH_MAX);
  const aspectWidth = preset.aspectWidth || layout.cols;
  const aspectHeight = preset.aspectHeight || layout.rows;
  const height = Math.max(1, Math.round(width * (aspectHeight / aspectWidth)));
  return { width, height };
}

function getCollageContentRect(canvasWidth, canvasHeight) {
  const layout = getActiveLayoutDefinition();
  const collageRatio = getLayoutAspectRatio(layout);
  let width = canvasWidth;
  let height = Math.round(width * collageRatio);
  if (height > canvasHeight) {
    height = canvasHeight;
    width = Math.round(height / collageRatio);
  }
  return {
    x: Math.round((canvasWidth - width) / 2),
    y: Math.round((canvasHeight - height) / 2),
    width,
    height,
  };
}

function getSafeAreaFittedContentRect(canvasWidth, canvasHeight, preset = getExportPresetDefinition()) {
  const safeRect = getSafeAreaRect(canvasWidth, canvasHeight, preset);
  if (!safeRect) return null;
  const inner = getCollageContentRect(safeRect.width, safeRect.height);
  return {
    x: safeRect.x + inner.x,
    y: safeRect.y + inner.y,
    width: inner.width,
    height: inner.height,
  };
}

function buildAxis(totalSize, count, innerGap, outerGap) {
  const usable = Math.max(count, totalSize - outerGap * 2 - innerGap * (count - 1));
  const base = Math.floor(usable / count);
  let remainder = usable - base * count;
  const axis = [];
  let cursor = outerGap;
  for (let i = 0; i < count; i += 1) {
    const size = base + (remainder > 0 ? 1 : 0);
    if (remainder > 0) remainder -= 1;
    axis.push({ start: cursor, size });
    cursor += size + innerGap;
  }
  return axis;
}

function buildLayoutRectsHexPack(width, height, layout) {
  const outerGap = Math.max(0, Number(state.outerGap) || 0);
  const innerGap = Math.max(0, Number(state.gap) || 0);
  const availWidth = Math.max(1, width - outerGap * 2);
  const availHeight = Math.max(1, height - outerGap * 2);

  const widthAt0 = getHexPackBounds(layout, 0, 100, innerGap).width;
  const widthAt1 = getHexPackBounds(layout, 1, 100, innerGap).width;
  const widthFactor = Math.max(0.0001, widthAt1 - widthAt0);
  const unitWidth = Math.max(1, (availWidth - widthAt0) / widthFactor);

  const heightAt0 = getHexPackBounds(layout, 100, 0, innerGap).height;
  const heightAt1 = getHexPackBounds(layout, 100, 1, innerGap).height;
  const heightFactor = Math.max(0.0001, heightAt1 - heightAt0);
  const unitHeight = Math.max(1, (availHeight - heightAt0) / heightFactor);

  const bounds = getHexPackBounds(layout, unitWidth, unitHeight, innerGap);
  const startX = outerGap + (availWidth - bounds.width) / 2;
  const startY = outerGap + (availHeight - bounds.height) / 2;
  const spacing = getHexPackSpacingProfile(layout);
  const stepX = unitWidth * spacing.stepXRatio + innerGap;
  const stepY = unitHeight * spacing.stepYRatio + innerGap;
  const drawWidth = unitWidth * (spacing.unitScaleX || 1);
  const drawHeight = unitHeight * (spacing.unitScaleY || 1);
  const insetX = (unitWidth - drawWidth) * 0.5;
  const insetY = (unitHeight - drawHeight) * 0.5;

  const unitRect = (x, y) => {
    const rectX = startX + x * stepX + insetX - bounds.minX;
    const rectY = startY + y * stepY + (x % 2 === 1 ? unitHeight * spacing.oddColumnOffsetRatio : 0) + insetY - bounds.minY;
    return { x: rectX, y: rectY, width: drawWidth, height: drawHeight };
  };

  return layout.slots.map((slot) => {
    let minX = Number.POSITIVE_INFINITY;
    let minY = Number.POSITIVE_INFINITY;
    let maxX = Number.NEGATIVE_INFINITY;
    let maxY = Number.NEGATIVE_INFINITY;
    for (let yy = slot.y; yy < slot.y + slot.h; yy += 1) {
      for (let xx = slot.x; xx < slot.x + slot.w; xx += 1) {
        const rect = unitRect(xx, yy);
        minX = Math.min(minX, rect.x);
        minY = Math.min(minY, rect.y);
        maxX = Math.max(maxX, rect.x + rect.width);
        maxY = Math.max(maxY, rect.y + rect.height);
      }
    }
    return {
      x: Math.floor(minX),
      y: Math.floor(minY),
      width: Math.max(1, Math.ceil(maxX - minX)),
      height: Math.max(1, Math.ceil(maxY - minY)),
    };
  });
}

function buildLayoutRects(width, height, layout) {
  if (state.layoutMode === "hex-pack") {
    return buildLayoutRectsHexPack(width, height, layout);
  }
  const innerGap = state.gap;
  const outerGap = state.outerGap;
  const colAxis = buildAxis(width, layout.cols, innerGap, outerGap);
  const rowAxis = buildAxis(height, layout.rows, innerGap, outerGap);

  return layout.slots.map((slot) => {
    const x = colAxis[slot.x].start;
    const y = rowAxis[slot.y].start;
    const w = Array.from({ length: slot.w }, (_, i) => colAxis[slot.x + i].size).reduce((a, b) => a + b, 0)
      + innerGap * (slot.w - 1);
    const h = Array.from({ length: slot.h }, (_, i) => rowAxis[slot.y + i].size).reduce((a, b) => a + b, 0)
      + innerGap * (slot.h - 1);
    return { x, y, width: w, height: h };
  });
}

function getPresetSlotBaseShape(layout, index) {
  const slot = layout?.slots?.[index];
  const shape = typeof slot?.shape === "string" ? slot.shape : "rect";
  return SLOT_SHAPES.includes(shape) ? shape : "rect";
}

function isSquareSlot(layout, index) {
  const slot = layout?.slots?.[index];
  return Boolean(slot && slot.w === slot.h);
}

function canUseCircleShape(layout, index) {
  return isSquareSlot(layout, index);
}

function getSlotShape(layout, index) {
  const baseShape = getPresetSlotBaseShape(layout, index);
  const override = state.slotShapeOverrides[index];
  const shape = SLOT_SHAPES.includes(override) ? override : baseShape;
  if (shape === "circle" && !canUseCircleShape(layout, index)) {
    return "rect";
  }
  return shape;
}

function hasHexagonSlots(layout = getActiveLayoutDefinition()) {
  for (let i = 0; i < layout.slots.length; i += 1) {
    if (getSlotShape(layout, i) === "hexagon") {
      return true;
    }
  }
  return false;
}

function updateLayoutModeSuggestion() {
  if (!els.layoutModeSuggestion) return;
  const showSuggestion = state.layoutMode === "grid" && hasHexagonSlots(getActiveLayoutDefinition());
  if (els.layoutModeSuggestionText && !showSuggestion) {
    els.layoutModeSuggestionText.textContent = "";
  }
  els.layoutModeSuggestion.hidden = !showSuggestion;
  if (showSuggestion) {
    setText(els.layoutModeSuggestionText, "layoutModeSuggestionText");
    setText(els.layoutModeSuggestionApply, "layoutModeSuggestionApply");
  }
}

function updateHexTuningUi() {
  if (els.hexTuningPanel) {
    const shouldShow = state.activeStep === 3 && state.layoutMode === "hex-pack";
    els.hexTuningPanel.hidden = !shouldShow;
    els.hexTuningPanel.style.display = shouldShow ? "" : "none";
  }
  const stepX = clamp(Number(state.hexStepXRatio) || HEX_PACK_STEP_X_RATIO, 0.6, 1.2);
  const stepY = clamp(Number(state.hexStepYRatio) || HEX_PACK_STEP_Y_RATIO, 0.6, 1.4);
  const scaleX = clamp(Number(state.hexUnitScaleX) || HEX_PACK_UNIT_SCALE_X, 0.6, 1.2);
  const scaleY = clamp(Number(state.hexUnitScaleY) || HEX_PACK_UNIT_SCALE_Y, 0.6, 1.2);
  if (els.hexStepXInput) els.hexStepXInput.value = stepX.toFixed(2);
  if (els.hexStepYInput) els.hexStepYInput.value = stepY.toFixed(2);
  if (els.hexScaleXInput) els.hexScaleXInput.value = scaleX.toFixed(2);
  if (els.hexScaleYInput) els.hexScaleYInput.value = scaleY.toFixed(2);
  if (els.hexStepXValue) els.hexStepXValue.textContent = stepX.toFixed(2);
  if (els.hexStepYValue) els.hexStepYValue.textContent = stepY.toFixed(2);
  if (els.hexScaleXValue) els.hexScaleXValue.textContent = scaleX.toFixed(2);
  if (els.hexScaleYValue) els.hexScaleYValue.textContent = scaleY.toFixed(2);
}

function ensureSlotShapeOverrides(count) {
  while (state.slotShapeOverrides.length < count) state.slotShapeOverrides.push(null);
  while (state.slotShapeOverrides.length > count) state.slotShapeOverrides.pop();
}

function resetSlotShapeOverrides(layout = getActiveLayoutDefinition()) {
  state.slotShapeOverrides = layout.slots.map(() => null);
}

function setSelectedSlotShape(nextShape) {
  if (!SLOT_SHAPES.includes(nextShape)) return;
  const layout = getActiveLayoutDefinition();
  const index = state.selectedCell;
  if (nextShape === "circle" && !canUseCircleShape(layout, index)) return;
  const baseShape = getPresetSlotBaseShape(layout, index);
  state.slotShapeOverrides[index] = nextShape === baseShape ? null : nextShape;
}

function applyCanvasSlotPath(ctx, shape, x, y, width, height) {
  if (shape === "circle") {
    ctx.ellipse(
      x + width / 2,
      y + height / 2,
      Math.max(1, width / 2),
      Math.max(1, height / 2),
      0,
      0,
      Math.PI * 2
    );
    return;
  }
  if (shape === "rounded-rect") {
    const radius = Math.max(1, Math.min(width, height) * 0.12);
    const right = x + width;
    const bottom = y + height;
    ctx.moveTo(x + radius, y);
    ctx.lineTo(right - radius, y);
    ctx.arcTo(right, y, right, y + radius, radius);
    ctx.lineTo(right, bottom - radius);
    ctx.arcTo(right, bottom, right - radius, bottom, radius);
    ctx.lineTo(x + radius, bottom);
    ctx.arcTo(x, bottom, x, bottom - radius, radius);
    ctx.lineTo(x, y + radius);
    ctx.arcTo(x, y, x + radius, y, radius);
    ctx.closePath();
    return;
  }
  if (shape === "diamond") {
    ctx.moveTo(x + width / 2, y);
    ctx.lineTo(x + width, y + height / 2);
    ctx.lineTo(x + width / 2, y + height);
    ctx.lineTo(x, y + height / 2);
    ctx.closePath();
    return;
  }
  if (shape === "hexagon") {
    const inset = Math.max(1, width * 0.2);
    ctx.moveTo(x + inset, y);
    ctx.lineTo(x + width - inset, y);
    ctx.lineTo(x + width, y + height / 2);
    ctx.lineTo(x + width - inset, y + height);
    ctx.lineTo(x + inset, y + height);
    ctx.lineTo(x, y + height / 2);
    ctx.closePath();
    return;
  }
  ctx.rect(x, y, width, height);
}

function resizeCells(count) {
  while (state.cells.length < count) state.cells.push(createEmptyCell());
  while (state.cells.length > count) disposeCell(state.cells.pop());
  ensureSlotShapeOverrides(count);
  if (state.selectedCell >= state.cells.length) {
    state.selectedCell = Math.max(0, state.cells.length - 1);
  }
}

async function restartWorkflow() {
  const confirmed = await showConfirmDialog({
    title: t("restartConfirmTitle"),
    message: t("restartConfirm"),
    confirmLabel: t("restart"),
  });
  if (!confirmed) {
    return;
  }
  const keepGap = state.gap;
  const keepOuterGap = state.outerGap;
  const keepBackground = state.background;
  const defaults = getDefaultLayoutSettings();
  safeStorageRemove(STORAGE_KEYS.layout);
  state.activePresetId = defaults.presetId;
  state.layoutMode = defaults.layoutMode;
  if (els.layoutModeSelect) {
    els.layoutModeSelect.value = defaults.layoutMode;
  }
  if (els.gapInput) {
    els.gapInput.value = String(keepGap);
  }
  if (els.outerGapInput) {
    els.outerGapInput.value = String(keepOuterGap);
  }
  if (els.backgroundInput) {
    els.backgroundInput.value = keepBackground;
  }
  state.gap = keepGap;
  state.outerGap = keepOuterGap;
  state.background = keepBackground;
  state.hexStepXRatio = defaults.hexStepXRatio;
  state.hexStepYRatio = defaults.hexStepYRatio;
  state.hexUnitScaleX = defaults.hexUnitScaleX;
  state.hexUnitScaleY = defaults.hexUnitScaleY;
  state.selectedCell = 0;
  state.dragging = null;
  state.textDragging = null;
  state.dragIndex = null;
  state.reorderMode = false;
  state.reorderSourceIndex = null;
  state.pinch = null;
  state.touchPoints.clear();
  state.hasOpenedExportStep = false;
  state.assistantRequestToken += 1;
  state.assistantFiles = [];
  state.assistantSuggestions = [];
  if (els.fileInput) {
    els.fileInput.value = "";
  }
  if (els.assistantFileInput) {
    els.assistantFileInput.value = "";
  }
  if (els.replaceInput) {
    els.replaceInput.value = "";
  }
  setAssistantStatus(t("assistantIdle"), false);
  renderAssistantSuggestions();
  if (els.assistantDialog?.open) {
    els.assistantDialog.close();
  }
  resetSlotShapeOverrides(getActiveLayoutDefinition());
  applyGrid();
  for (let i = 0; i < state.cells.length; i += 1) {
    disposeCell(state.cells[i]);
    state.cells[i] = createEmptyCell();
  }
  setStep(1);
  renderAll();
}

function setUiMode(mode, options = {}) {
  const nextMode = mode === "photo" || mode === "form" ? mode : "launcher";
  const { scrollToTop = true } = options;
  state.uiMode = nextMode;
  document.body.classList.toggle("ui-launcher", nextMode === "launcher");
  document.body.classList.toggle("ui-photo", nextMode === "photo");
  document.body.classList.toggle("ui-form", nextMode === "form");
  const isPhoto = nextMode === "photo";
  const isForm = nextMode === "form";
  const isLauncher = nextMode === "launcher";
  if (!isForm) {
    state.wordMask.subtitleDrag = null;
  }
  if (els.modeSelector) {
    els.modeSelector.hidden = !isLauncher;
  }
  if (els.photoModeArea) {
    els.photoModeArea.hidden = !isPhoto;
  }
  if (els.wordMaskStage) {
    els.wordMaskStage.hidden = !isForm;
  }
  if (els.heroCard) {
    els.heroCard.hidden = !isPhoto;
  }
  if (els.wizardRoot) {
    els.wizardRoot.classList.toggle("wordmask-open", isForm);
    els.wizardRoot.classList.toggle("launcher-open", isLauncher);
  }
  if (isPhoto) {
    setStep(state.activeStep || 1);
    renderAllWithoutExport();
  } else if (isForm) {
    state.wordMask.reorderMode = false;
    state.wordMask.reorderSourceIndex = null;
    syncWordMaskInputsFromState();
    renderWordMaskPhotoOrder();
    updateWordMaskReorderUi();
    renderWordMaskPreview();
    void ensureSvgStencilsLoaded().then(() => {
      if (state.uiMode === "form") {
        renderWordMaskPreview();
      }
    });
  } else {
    state.wordMask.reorderMode = false;
    state.wordMask.reorderSourceIndex = null;
    updateWordMaskReorderUi();
    els.gridSummary.textContent = "\u2013";
    els.filledSummary.textContent = "\u2013";
    els.stepSummary.textContent = "\u2013";
  }
  if (scrollToTop) {
    els.wizardRoot?.scrollIntoView({ behavior: "smooth", block: "start" });
  }
}

function setStep(step) {
  state.activeStep = step;
  if (step === 4 && !state.hasOpenedExportStep) {
    state.hasOpenedExportStep = true;
    if (state.exportPresetId === "free" && state.exportFormat !== "gif") {
      const width = getSuggestedFreeExportWidth();
      state.customExportWidth = width;
      state.exportWidth = width;
    }
  }
  document.querySelectorAll(".step-panel").forEach((panel) => {
    panel.classList.toggle("active", Number(panel.dataset.step) === step);
  });
  document.querySelectorAll(".step-chip").forEach((chip) => {
    chip.classList.toggle("active", Number(chip.dataset.stepTarget) === step);
  });
  const totalSteps = Math.max(1, document.querySelectorAll(".step-chip").length);
  els.stepSummary.textContent = `${step} / ${totalSteps}`;
  if (step >= 3) {
    renderPreview();
    renderExportPreview();
  }
  updateHexTuningUi();
  syncEditor();
}

function applyGrid(options = {}) {
  const { persist = true } = options;
  state.layoutMode = normalizeLayoutMode(els.layoutModeSelect?.value || state.layoutMode);
  if (els.layoutModeSelect) {
    els.layoutModeSelect.value = state.layoutMode;
  }
  state.gap = clamp(Number(els.gapInput.value) || 0, 0, 60);
  state.outerGap = clamp(Number(els.outerGapInput.value) || 0, 0, 80);
  state.hexStepXRatio = clamp(Number(els.hexStepXInput?.value) || state.hexStepXRatio || HEX_PACK_STEP_X_RATIO, 0.6, 1.2);
  state.hexStepYRatio = clamp(Number(els.hexStepYInput?.value) || state.hexStepYRatio || HEX_PACK_STEP_Y_RATIO, 0.6, 1.4);
  state.hexUnitScaleX = clamp(Number(els.hexScaleXInput?.value) || state.hexUnitScaleX || HEX_PACK_UNIT_SCALE_X, 0.6, 1.2);
  state.hexUnitScaleY = clamp(Number(els.hexScaleYInput?.value) || state.hexUnitScaleY || HEX_PACK_UNIT_SCALE_Y, 0.6, 1.2);
  state.background = els.backgroundInput.value;
  els.backgroundInput.value = state.background;
  els.gapValue.textContent = state.gap;
  els.outerGapInput.value = state.outerGap;
  els.outerGapValue.textContent = state.outerGap;
  updateHexTuningUi();
  document.documentElement.style.setProperty("--gap", `${state.gap}px`);
  const layout = getActiveLayoutDefinition();
  if (persist) {
    saveLayoutSettings({
      layoutMode: state.layoutMode,
      hexStepXRatio: state.hexStepXRatio,
      hexStepYRatio: state.hexStepYRatio,
      hexUnitScaleX: state.hexUnitScaleX,
      hexUnitScaleY: state.hexUnitScaleY,
      gap: state.gap,
      outerGap: state.outerGap,
      background: state.background,
      presetId: state.activePresetId,
    });
  }
  resizeCells(layout.slots.length);
  renderAll();
}

function renderPresets() {
  els.presetGrid.innerHTML = "";
  const sortedPresets = getSortedPresets(PRESETS, state.language);
  for (const preset of sortedPresets) {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "preset";
    btn.dataset.rows = String(preset.rows);
    btn.dataset.cols = String(preset.cols);
    btn.dataset.presetId = preset.id;
    const tooltip = `${getPresetLabel(preset)} (${preset.slots.length} ${t("cells")})`;
    btn.title = tooltip;
    btn.setAttribute("aria-label", tooltip);
    btn.innerHTML = `
      <span class="grid-mini" aria-hidden="true"></span>
      <span class="sr-only">${tooltip}</span>
    `;
    const mini = btn.querySelector(".grid-mini");
    renderPresetMiniGrid(mini, preset, { cellSize: 14, gap: 4 });
    btn.addEventListener("click", () => {
      state.activePresetId = preset.id;
      resetSlotShapeOverrides(preset);
      applyGrid();
      updateLayoutModeSuggestion();
    });
    els.presetGrid.appendChild(btn);
  }
}

function updatePresetActive() {
  document.querySelectorAll(".preset").forEach((btn) => {
    const matches = btn.dataset.presetId === state.activePresetId;
    btn.classList.toggle("active", matches);
  });
}

function renderStatus() {
  const total = state.cells.length;
  const filled = state.cells.filter((cell) => cell.bitmap).length;
  if (filled > 0) {
    state.hasLoadedPhotosEver = true;
  }
  const complete = total > 0 && filled === total;
  const activePreset = PRESETS.find((preset) => preset.id === state.activePresetId);
  els.gridSummary.textContent = activePreset
    ? `${getPresetLabel(activePreset)} (${activePreset.slots.length} ${t("cells")})`
    : "-";
  els.filledSummary.textContent = `${filled} / ${total}`;
  els.slotStatus.textContent = complete
    ? t("slotStatusReady")
    : format(t("slotStatusMissing"), { filled, total });
  els.toStep3.disabled = false;
  els.toStep4.disabled = false;
  updateUploadConstraints();
  updateRestartLaunchVisibility();
}

function getRemainingUploadSlots() {
  const emptyCount = state.cells.filter((cell) => !cell.bitmap).length;
  return Math.max(0, emptyCount);
}

function updateUploadConstraints() {
  const remaining = getRemainingUploadSlots();
  els.fileInput.disabled = remaining === 0;
  els.fileInput.multiple = remaining !== 1;
  els.fileInput.setAttribute("data-max-files", String(remaining));
  els.dropZone.classList.toggle("disabled", remaining === 0);
}

function renderSlots() {
  els.slotGrid.innerHTML = "";
  const template = document.getElementById("slotTemplate");
  state.cells.forEach((cell, index) => {
    const node = template.content.firstElementChild.cloneNode(true);
    const img = node.querySelector("img");
    const label = node.querySelector(".slot-label");
    node.querySelector(".slot-index").textContent = `#${index + 1}`;
    node.draggable = false;
    node.dataset.index = String(index);
    if (cell.bitmap) {
      node.classList.remove("empty");
      img.src = cell.objectUrl;
      img.alt = cell.fileName;
      label.textContent = cell.fileName;
    } else {
      node.classList.add("empty");
      img.removeAttribute("src");
      resetImagePlacement(img);
      label.textContent = t("emptySlot");
    }
    node.addEventListener("click", () => {
      state.selectedCell = index;
      if (hasCompleteGrid()) {
        setStep(3);
      }
      renderAll();
    });
    node.addEventListener("keydown", (event) => {
      if (event.key !== "Enter" && event.key !== " ") return;
      event.preventDefault();
      state.selectedCell = index;
      if (hasCompleteGrid()) {
        setStep(3);
      }
      renderAll();
    });
    els.slotGrid.appendChild(node);
    if (cell.bitmap) {
      applyImagePlacement(img, node, cell);
    }
  });
}

function moveCell(from, to) {
  if (from === to || from < 0 || to < 0 || from >= state.cells.length || to >= state.cells.length) return;
  const [cell] = state.cells.splice(from, 1);
  state.cells.splice(to, 0, cell);
  state.selectedCell = to;
  renderAll();
}

function swapCells(first, second) {
  if (first === second || first < 0 || second < 0 || first >= state.cells.length || second >= state.cells.length) return;
  const tmp = state.cells[first];
  state.cells[first] = state.cells[second];
  state.cells[second] = tmp;
  state.selectedCell = second;
}

function handleReorderModeTap(index) {
  const cell = state.cells[index];
  if (state.reorderSourceIndex === null) {
    state.reorderSourceIndex = index;
    state.selectedCell = index;
    syncEditor();
    renderPreview();
    return;
  }
  if (state.reorderSourceIndex === index) {
    state.reorderSourceIndex = null;
    renderPreview();
    return;
  }
  const sourceCell = state.cells[state.reorderSourceIndex];
  const hasSourceBitmap = Boolean(sourceCell?.bitmap);
  const hasTargetBitmap = Boolean(cell?.bitmap);
  if (!hasSourceBitmap && !hasTargetBitmap) {
    state.reorderSourceIndex = null;
    renderPreview();
    return;
  }
  swapCells(state.reorderSourceIndex, index);
  state.reorderSourceIndex = null;
  renderAll();
}

function getPreviewCellNode(index = state.selectedCell) {
  return els.collagePreview.querySelector(`.preview-cell[data-index="${index}"]`);
}

function getCellFrameSize(index = state.selectedCell) {
  const previewNode = getPreviewCellNode(index);
  if (previewNode) {
    const rect = previewNode.getBoundingClientRect();
    if (rect.width > 0 && rect.height > 0) {
      return { width: rect.width, height: rect.height };
    }
  }
  const layout = getActiveLayoutDefinition();
  const width = Math.max(1, els.collagePreview.clientWidth || 1);
  const height = Math.max(1, els.collagePreview.clientHeight || 1);
  const rects = buildLayoutRects(width, height, layout);
  const rect = rects[index];
  if (rect) {
    return { width: Math.max(1, rect.width), height: Math.max(1, rect.height) };
  }
  return { width: 1, height: 1 };
}

function renderPreview() {
  const layout = getActiveLayoutDefinition();
  const ratio = getLayoutAspectRatio(layout);
  const safeRatio = Number.isFinite(ratio) && ratio > 0 ? ratio : (layout.rows / layout.cols);
  els.collagePreview.style.aspectRatio = `${1 / safeRatio}`;
  els.collagePreview.style.setProperty("--grid-gap", `${state.gap}px`);
  els.collagePreview.style.setProperty("--outer-gap", `${state.outerGap}px`);
  els.collagePreview.style.setProperty("--active-outline-color", getActiveOutlineColor(state.background));
  els.collagePreview.style.background = state.background;
  els.collagePreview.innerHTML = "";
  const template = document.getElementById("previewCellTemplate");
  const nodes = [];
  state.cells.forEach((cell, index) => {
    const node = template.content.firstElementChild.cloneNode(true);
    const img = node.querySelector("img");
    const emptyNote = node.querySelector(".empty-note");
    const textOverlay = document.createElement("div");
    textOverlay.className = "preview-text-overlay";
    textOverlay.hidden = true;
    node.appendChild(textOverlay);
    node.dataset.index = String(index);
    node.querySelector(".cell-index").textContent = `#${index + 1}`;
    node.classList.toggle("selected", index === state.selectedCell);
    node.classList.toggle("reorder-source", state.reorderMode && state.reorderSourceIndex === index);
    if (cell.bitmap) {
      node.classList.remove("empty");
      img.src = cell.objectUrl;
      img.alt = cell.fileName;
      img.setAttribute("draggable", "false");
      img.addEventListener("contextmenu", (event) => {
        event.preventDefault();
      });
      if (emptyNote) emptyNote.hidden = true;
    } else {
      node.classList.add("empty");
      img.removeAttribute("src");
      resetImagePlacement(img);
      if (emptyNote) {
        emptyNote.hidden = false;
        emptyNote.textContent = t("emptySlot");
      }
    }
    node.addEventListener("pointerdown", (event) => handlePreviewPointerDown(event, index, node));
    node.addEventListener("wheel", (event) => handlePreviewWheel(event, index), { passive: false });
    node.addEventListener("click", () => {
      if (state.reorderMode) {
        handleReorderModeTap(index);
        return;
      }
      state.selectedCell = index;
      syncEditor();
      renderPreview();
    });
    node.addEventListener("keydown", (event) => {
      if (event.key !== "Enter" && event.key !== " ") return;
      event.preventDefault();
      if (state.reorderMode) {
        handleReorderModeTap(index);
        return;
      }
      state.selectedCell = index;
      syncEditor();
      renderPreview();
    });
    textOverlay.addEventListener("pointerdown", (event) => startTextDrag(event, index, node, textOverlay));
    els.collagePreview.appendChild(node);
    nodes.push({ node, img, cell, textOverlay });
  });

  const width = Math.max(1, els.collagePreview.clientWidth);
  const height = Math.max(1, els.collagePreview.clientHeight);
  const rects = buildLayoutRects(width, height, layout);
  nodes.forEach((entry, index) => {
    const rect = rects[index];
    if (!rect) return;
    const { node, img, cell, textOverlay } = entry;
    const slotShape = getSlotShape(layout, index);
    node.classList.remove("shape-rect", "shape-rounded-rect", "shape-circle", "shape-diamond", "shape-hexagon");
    node.classList.add(`shape-${slotShape}`);
    node.style.left = `${rect.x}px`;
    node.style.top = `${rect.y}px`;
    node.style.width = `${rect.width}px`;
    node.style.height = `${rect.height}px`;
    node.style.background = state.background;
    if (cell.bitmap) {
      applyImagePlacement(img, node, cell);
    }
    applyTextOverlayStyle(textOverlay, cell, rect.width, rect.height);
    textOverlay.classList.toggle("interactive", !state.reorderMode && index === state.selectedCell && hasCellText(cell));
  });
}

function syncEditor() {
  const cell = state.cells[state.selectedCell];
  if (!cell) return;
  const controlsLocked = isActiveFieldLockedByReorder();
  const layout = getActiveLayoutDefinition();
  const circleAllowed = canUseCircleShape(layout, state.selectedCell);
  const baseInfo = cell.bitmap
    ? `${state.selectedCell + 1}. ${t("field")}: ${cell.fileName}`
    : `${state.selectedCell + 1}. ${t("fieldEmpty")}`;
  els.activeCellInfo.textContent = baseInfo;
  if (els.dragHint) {
    const hintText = state.reorderMode
      ? (state.reorderSourceIndex === null ? t("reorderModeHintIdle") : t("reorderModeHintSource"))
      : t("dragHint");
    els.dragHint.textContent = hintText;
  }
  if (cell.bitmap) {
    els.zoomInput.value = String(cell.zoom || 1);
    els.zoomValue.textContent = String(Math.round((cell.zoom || 1) * 100));
  } else {
    els.zoomInput.value = "1";
    els.zoomValue.textContent = "100";
  }
  if (els.deleteCell) {
    els.deleteCell.disabled = controlsLocked || !cell.bitmap;
  }
  if (els.flipHorizontalButton) {
    els.flipHorizontalButton.disabled = controlsLocked || !cell.bitmap;
  }
  if (els.flipVerticalButton) {
    els.flipVerticalButton.disabled = controlsLocked || !cell.bitmap;
  }
  if (els.rotateLeftButton) {
    els.rotateLeftButton.disabled = controlsLocked || !cell.bitmap;
  }
  if (els.replaceCell) {
    els.replaceCell.disabled = controlsLocked;
  }
  if (els.prevCell) {
    els.prevCell.disabled = controlsLocked;
  }
  if (els.nextCell) {
    els.nextCell.disabled = controlsLocked;
  }
  if (els.resetFocus) {
    els.resetFocus.disabled = controlsLocked;
  }
  if (els.zoomInput) {
    els.zoomInput.disabled = controlsLocked;
  }
  if (els.resetZoom) {
    els.resetZoom.disabled = controlsLocked;
  }
  if (els.slotShapeField && els.slotShapeSelect) {
    els.slotShapeField.hidden = false;
    els.slotShapeSelect.disabled = controlsLocked;
    if (els.slotShapeSelect.options[2]) {
      els.slotShapeSelect.options[2].disabled = !circleAllowed;
    }
    const selectedShape = getSlotShape(layout, state.selectedCell);
    let targetShape = selectedShape;
    if (!circleAllowed && selectedShape === "circle") {
      setSelectedSlotShape("rect");
      targetShape = "rect";
    }
    state.isSyncingSlotShapeSelect = true;
    for (const option of Array.from(els.slotShapeSelect.options)) {
      option.selected = option.value === targetShape;
    }
    els.slotShapeSelect.value = targetShape;
    state.isSyncingSlotShapeSelect = false;
  }
  els.textInput.value = cell.text || "";
  els.textInput.disabled = controlsLocked;
  els.textSizeInput.value = String(clamp(Number(cell.fontSize) || 48, 12, 160));
  els.textSizeInput.disabled = controlsLocked;
  els.textSizeValue.textContent = String(clamp(Number(cell.fontSize) || 48, 12, 160));
  els.textFontSelect.value = cell.fontFamily || "Segoe UI, system-ui, sans-serif";
  els.textFontSelect.disabled = controlsLocked;
  els.textBoldInput.checked = Boolean(cell.bold);
  els.textBoldInput.disabled = controlsLocked;
  els.textItalicInput.checked = Boolean(cell.italic);
  els.textItalicInput.disabled = controlsLocked;
  els.textColorInput.value = /^#[0-9a-f]{6}$/i.test(String(cell.color || "")) ? cell.color : "#ffffff";
  els.textColorInput.disabled = controlsLocked;
  if (els.resetTextPosition) {
    els.resetTextPosition.disabled = controlsLocked || !hasCellText(cell);
  }
  updateTextWarnings();
}

function renderExportPreview() {
  updateExportFormatUi();
  const canvas = els.exportCanvas;
  const ctx = canvas.getContext("2d");
  const targetSize = getExportTargetSize();
  canvas.width = targetSize.width;
  canvas.height = targetSize.height;
  drawCollage(ctx, canvas.width, canvas.height);
  drawSafeAreaOverlay(ctx, canvas.width, canvas.height);
  updateTextWarnings();
}

function hasCompleteGrid() {
  return state.cells.length > 0 && state.cells.every((cell) => cell.bitmap);
}

function drawCollage(ctx, width, height, options = {}) {
  const visibleCount = typeof options.visibleCount === "number" ? options.visibleCount : state.cells.length;
  const layout = getActiveLayoutDefinition();
  const preset = getExportPresetDefinition();
  const contentRect = options.contentRect
    || (
      state.autoFitToSafeArea
      ? (getSafeAreaFittedContentRect(width, height, preset) || getCollageContentRect(width, height))
      : getCollageContentRect(width, height)
    );
  ctx.save();
  ctx.fillStyle = state.background;
  ctx.fillRect(0, 0, width, height);
  const rects = buildLayoutRects(contentRect.width, contentRect.height, layout).map((rect) => ({
    x: rect.x + contentRect.x,
    y: rect.y + contentRect.y,
    width: rect.width,
    height: rect.height,
  }));
  for (let i = 0; i < state.cells.length; i += 1) {
    const cell = state.cells[i];
    const rect = rects[i];
    if (!rect) continue;
    const slotShape = getSlotShape(layout, i);
    const x = rect.x;
    const y = rect.y;
    const cellWidth = rect.width;
    const cellHeight = rect.height;
    ctx.save();
    ctx.beginPath();
    applyCanvasSlotPath(ctx, slotShape, x, y, cellWidth, cellHeight);
    ctx.clip();
    ctx.fillStyle = "rgba(255,255,255,0.04)";
    ctx.fillRect(x, y, cellWidth, cellHeight);
    ctx.restore();
    if (cell?.bitmap && i < visibleCount) {
      const metrics = getImageRenderMetrics(cell, cellWidth, cellHeight);
      ctx.save();
      ctx.beginPath();
      applyCanvasSlotPath(ctx, slotShape, x, y, cellWidth, cellHeight);
      ctx.clip();
      const centerX = x + metrics.drawX + metrics.baseWidth / 2;
      const centerY = y + metrics.drawY + metrics.baseHeight / 2;
      ctx.translate(centerX, centerY);
      ctx.rotate((metrics.rotation * Math.PI) / 180);
      ctx.scale(metrics.flipX ? -1 : 1, metrics.flipY ? -1 : 1);
      ctx.drawImage(
        cell.bitmap,
        -metrics.baseWidth / 2,
        -metrics.baseHeight / 2,
        metrics.baseWidth,
        metrics.baseHeight
      );
      ctx.restore();
    } else {
      ctx.save();
      ctx.beginPath();
      applyCanvasSlotPath(ctx, slotShape, x, y, cellWidth, cellHeight);
      ctx.clip();
      ctx.fillStyle = state.background;
      ctx.fillRect(x, y, cellWidth, cellHeight);
      ctx.restore();
    }
    drawCellText(ctx, cell, x, y, cellWidth, cellHeight, slotShape);
  }

  ctx.save();
  ctx.strokeStyle = "rgba(255,255,255,0.18)";
  ctx.lineWidth = 1;
  for (let i = 0; i < state.cells.length; i += 1) {
    const rect = rects[i];
    if (!rect) continue;
    const slotShape = getSlotShape(layout, i);
    const x = rect.x + 0.5;
    const y = rect.y + 0.5;
    const cellWidth = Math.max(1, rect.width - 1);
    const cellHeight = Math.max(1, rect.height - 1);
    ctx.beginPath();
    applyCanvasSlotPath(ctx, slotShape, x, y, cellWidth, cellHeight);
    ctx.stroke();
  }
  ctx.restore();
  ctx.restore();
  const watermarkBounds = state.autoFitToSafeArea ? getSafeAreaRect(width, height, preset) : null;
  drawWatermark(ctx, width, height, { bounds: watermarkBounds });
}

function renderAll() {
  updateLayoutModeSuggestion();
  updateReorderModeUi();
  updatePresetActive();
  renderSlots();
  renderStatus();
  renderPreview();
  syncEditor();
  renderExportPreview();
}

async function setCellImage(index, file) {
  const cell = state.cells[index];
  if (!cell) return;
  if (cell.objectUrl) URL.revokeObjectURL(cell.objectUrl);
  if (cell.bitmap && "close" in cell.bitmap) cell.bitmap.close();
  const bitmap = await createImageBitmap(file);
  cell.fileName = file.name;
  cell.objectUrl = URL.createObjectURL(file);
  cell.bitmap = bitmap;
  cell.width = bitmap.width;
  cell.height = bitmap.height;
  cell.focusX = 0;
  cell.focusY = 0;
  cell.zoom = 1;
  cell.flipX = false;
  cell.flipY = false;
  cell.rotation = 0;
}

function clearCellImage(index) {
  const cell = state.cells[index];
  if (!cell) return;
  if (cell.objectUrl) {
    URL.revokeObjectURL(cell.objectUrl);
  }
  if (cell.bitmap && "close" in cell.bitmap) {
    cell.bitmap.close();
  }
  cell.fileName = "";
  cell.objectUrl = "";
  cell.bitmap = null;
  cell.width = 0;
  cell.height = 0;
  cell.focusX = 0;
  cell.focusY = 0;
  cell.zoom = 1;
  cell.flipX = false;
  cell.flipY = false;
  cell.rotation = 0;
}

async function loadFiles(fileList) {
  const remaining = getRemainingUploadSlots();
  if (remaining <= 0) return;
  const imageFiles = Array.from(fileList).filter((file) => file.type.startsWith("image/"));
  const files = imageFiles.slice(0, remaining);
  if (files.length === 0) return;
  let insertIndex = state.cells.findIndex((cell) => !cell.bitmap);
  if (insertIndex === -1) insertIndex = state.cells.length;
  for (const file of files) {
    if (insertIndex >= state.cells.length) break;
    await setCellImage(insertIndex, file);
    insertIndex += 1;
  }
  renderAll();
  if (hasCompleteGrid()) setStep(Math.max(state.activeStep, 3));
}

function getImageRenderMetrics(cell, frameWidth, frameHeight) {
  const rotation = normalizeRotation(cell.rotation || 0);
  const isQuarterTurn = rotation % 180 !== 0;
  const rotatedSourceWidth = isQuarterTurn ? cell.height : cell.width;
  const rotatedSourceHeight = isQuarterTurn ? cell.width : cell.height;
  const scale = Math.max(frameWidth / rotatedSourceWidth, frameHeight / rotatedSourceHeight);
  const zoom = clamp(cell.zoom || 1, ZOOM_MIN, ZOOM_MAX);
  const baseWidth = cell.width * scale * zoom;
  const baseHeight = cell.height * scale * zoom;
  const rotatedCoverWidth = isQuarterTurn ? baseHeight : baseWidth;
  const rotatedCoverHeight = isQuarterTurn ? baseWidth : baseHeight;
  const panRangeX = Math.abs(rotatedCoverWidth - frameWidth);
  const panRangeY = Math.abs(rotatedCoverHeight - frameHeight);
  const focusX = clamp(cell.focusX || 0, -1, 1);
  const focusY = clamp(cell.focusY || 0, -1, 1);
  const rotatedDrawX = (frameWidth - rotatedCoverWidth) / 2 - focusX * (panRangeX / 2);
  const rotatedDrawY = (frameHeight - rotatedCoverHeight) / 2 - focusY * (panRangeY / 2);
  const drawX = rotatedDrawX + (rotatedCoverWidth - baseWidth) / 2;
  const drawY = rotatedDrawY + (rotatedCoverHeight - baseHeight) / 2;
  return {
    baseWidth,
    baseHeight,
    rotatedCoverWidth,
    rotatedCoverHeight,
    panRangeX,
    panRangeY,
    drawX,
    drawY,
    rotation,
    flipX: Boolean(cell.flipX),
    flipY: Boolean(cell.flipY),
  };
}

function applyImagePlacement(img, frame, cell) {
  const rect = frame.getBoundingClientRect();
  if (rect.width <= 0 || rect.height <= 0) {
    resetImagePlacement(img);
    return;
  }
  const metrics = getImageRenderMetrics(cell, rect.width, rect.height);
  img.style.inset = "auto";
  img.style.right = "auto";
  img.style.bottom = "auto";
  img.style.width = `${metrics.baseWidth}px`;
  img.style.height = `${metrics.baseHeight}px`;
  img.style.left = `${metrics.drawX}px`;
  img.style.top = `${metrics.drawY}px`;
  img.style.objectFit = "fill";
  img.style.objectPosition = "50% 50%";
  img.style.transformOrigin = "center center";
  img.style.transform = `rotate(${metrics.rotation}deg) scale(${metrics.flipX ? -1 : 1}, ${metrics.flipY ? -1 : 1})`;
}

function resetImagePlacement(img) {
  img.style.inset = "0";
  img.style.right = "";
  img.style.bottom = "";
  img.style.left = "";
  img.style.top = "";
  img.style.width = "100%";
  img.style.height = "100%";
  img.style.objectFit = "cover";
  img.style.objectPosition = "50% 50%";
  img.style.transform = "none";
}

function hasCellText(cell) {
  return Boolean(cell && typeof cell.text === "string" && cell.text.trim().length > 0);
}

function getCellFontDeclaration(cell, sizePx) {
  const weight = cell.bold ? "700" : "400";
  const style = cell.italic ? "italic" : "normal";
  return `${style} ${weight} ${Math.max(10, sizePx)}px ${cell.fontFamily || "Segoe UI, system-ui, sans-serif"}`;
}

function wrapCellTextLines(ctx, text, maxWidth) {
  const sourceLines = String(text || "").replace(/\r/g, "").split("\n");
  const lines = [];
  for (const source of sourceLines) {
    const trimmed = source.trim();
    if (!trimmed) {
      lines.push("");
      continue;
    }
    const words = source.split(/\s+/).filter(Boolean);
    if (!words.length) {
      lines.push("");
      continue;
    }
    let current = words[0];
    for (let i = 1; i < words.length; i += 1) {
      const next = `${current} ${words[i]}`;
      if (ctx.measureText(next).width <= maxWidth) {
        current = next;
      } else {
        lines.push(current);
        current = words[i];
      }
    }
    lines.push(current);
  }
  return lines.length ? lines : [""];
}

function getCellTextLayout(ctx, cell, width, height) {
  const baseSize = clamp(cell.fontSize || 48, 10, 220);
  const scale = Math.max(0.35, Math.min(width, height) / 1000);
  const fontSize = clamp(baseSize * scale, 10, 240);
  const lineHeight = fontSize * 1.2;
  const inset = Math.max(4, Math.min(TEXT_INSET_PX, Math.min(width, height) * 0.1));
  const maxWidth = Math.max(1, width - inset * 2);
  ctx.save();
  ctx.font = getCellFontDeclaration(cell, fontSize);
  const lines = wrapCellTextLines(ctx, cell.text, maxWidth);
  const lineWidths = lines.map((line) => ctx.measureText(line).width);
  ctx.restore();
  const centerX = clamp(Number(cell.textX ?? 0.5), 0, 1) * width;
  const centerY = clamp(Number(cell.textY ?? DEFAULT_TEXT_Y), 0, 1) * height;
  const totalHeight = lines.length * lineHeight;
  const rawStartY = centerY - totalHeight / 2;
  const minStartY = inset;
  const maxStartY = Math.max(minStartY, height - inset - totalHeight);
  const startY = clamp(rawStartY, minStartY, maxStartY);
  const adjustedCenterY = startY + totalHeight / 2;
  const overflowX = lineWidths.some((lineWidth) => lineWidth > maxWidth + 0.5);
  const overflowY = totalHeight > (height - inset * 2) + 0.5;
  return {
    fontSize,
    lineHeight,
    lines,
    lineWidths,
    centerX,
    centerY: adjustedCenterY,
    startY,
    inset,
    maxWidth,
    overflowX,
    overflowY,
    hasOverflow: overflowX || overflowY,
  };
}

function getSafeAreaRatiosForPreset(preset = getExportPresetDefinition()) {
  if (!isSocialExportPreset(preset)) return null;
  return SAFE_AREA_RATIOS_BY_PRESET[preset.id] || DEFAULT_SOCIAL_SAFE_AREA;
}

function getSafeAreaRect(width, height, preset = getExportPresetDefinition()) {
  const ratios = getSafeAreaRatiosForPreset(preset);
  if (!ratios) return null;
  const left = Math.round(width * ratios.left);
  const top = Math.round(height * ratios.top);
  const right = Math.round(width * (1 - ratios.right));
  const bottom = Math.round(height * (1 - ratios.bottom));
  return {
    x: left,
    y: top,
    width: Math.max(1, right - left),
    height: Math.max(1, bottom - top),
  };
}

function drawSafeAreaOverlay(ctx, width, height, preset = getExportPresetDefinition()) {
  const rect = getSafeAreaRect(width, height, preset);
  if (!rect) return null;
  ctx.save();
  ctx.strokeStyle = "rgba(255, 180, 80, 0.95)";
  ctx.lineWidth = 2;
  ctx.setLineDash([10, 8]);
  ctx.strokeRect(rect.x + 0.5, rect.y + 0.5, Math.max(1, rect.width - 1), Math.max(1, rect.height - 1));
  ctx.restore();
  return rect;
}

function getTextBoundsForAllCells(ctx, width, height) {
  const layout = getActiveLayoutDefinition();
  const contentRect = getCollageContentRect(width, height);
  const rects = buildLayoutRects(contentRect.width, contentRect.height, layout).map((rect) => ({
    x: rect.x + contentRect.x,
    y: rect.y + contentRect.y,
    width: rect.width,
    height: rect.height,
  }));
  const bounds = [];
  for (let i = 0; i < state.cells.length; i += 1) {
    const cell = state.cells[i];
    const rect = rects[i];
    if (!rect || !hasCellText(cell)) continue;
    const textLayout = getCellTextLayout(ctx, cell, rect.width, rect.height);
    const maxLineWidth = textLayout.lineWidths.length ? Math.max(...textLayout.lineWidths) : 0;
    const textWidth = Math.min(textLayout.maxWidth, maxLineWidth);
    const textHeight = textLayout.lines.length * textLayout.lineHeight;
    bounds.push({
      index: i,
      x: rect.x + textLayout.centerX - textWidth / 2,
      y: rect.y + textLayout.startY,
      width: textWidth,
      height: textHeight,
      overflow: textLayout.hasOverflow,
    });
  }
  return bounds;
}

function updateTextWarnings() {
  if (!els.textWarning || !els.exportWarning) {
    return;
  }
  const activeCell = state.cells[state.selectedCell];
  if (!activeCell || !hasCellText(activeCell)) {
    els.textWarning.hidden = true;
    els.textWarning.textContent = "";
  } else {
    const frameSize = getCellFrameSize(state.selectedCell);
    const probeCtx = document.createElement("canvas").getContext("2d");
    const textLayout = probeCtx
      ? getCellTextLayout(
        probeCtx,
        activeCell,
        Math.max(1, frameSize.width),
        Math.max(1, frameSize.height)
      )
      : null;
    if (textLayout?.hasOverflow) {
      els.textWarning.textContent = t("textOverflowWarning");
      els.textWarning.hidden = false;
    } else {
      els.textWarning.hidden = true;
      els.textWarning.textContent = "";
    }
  }

  const exportCtx = els.exportCanvas.getContext("2d");
  if (!exportCtx) return;
  const preset = getExportPresetDefinition();
  const socialPresetActive = isSocialExportPreset(preset);
  const safeRect = socialPresetActive
    ? getSafeAreaRect(els.exportCanvas.width, els.exportCanvas.height, preset)
    : null;
  if (els.autoFitSafeAreaButton) {
    const supportsSafeAreaFit = Boolean(safeRect);
    els.autoFitSafeAreaButton.hidden = !supportsSafeAreaFit;
    if (!supportsSafeAreaFit && state.autoFitToSafeArea) {
      state.autoFitToSafeArea = false;
    }
    updateAutoFitSafeAreaButtonLabel();
  }
  const textBounds = getTextBoundsForAllCells(exportCtx, els.exportCanvas.width, els.exportCanvas.height);
  const hasOverflowText = textBounds.some((entry) => entry.overflow);
  const hasSafeAreaViolation = safeRect
    ? textBounds.some((entry) =>
      entry.x < safeRect.x
      || entry.y < safeRect.y
      || (entry.x + entry.width) > (safeRect.x + safeRect.width)
      || (entry.y + entry.height) > (safeRect.y + safeRect.height))
    : false;
  const messages = [];
  if (els.safeAreaInfo) {
    els.safeAreaInfo.hidden = !safeRect;
  }
  if (els.safeAreaInfoText && safeRect) {
    els.safeAreaInfoText.textContent = t("safeAreaHint");
  } else if (els.safeAreaInfoText) {
    els.safeAreaInfoText.textContent = "";
  }
  if (hasSafeAreaViolation) {
    messages.push(t("safeAreaTextWarning"));
  }
  if (hasOverflowText) {
    messages.push(t("textOverflowWarning"));
  }
  els.exportWarning.textContent = messages.join(" ");
  els.exportWarning.hidden = messages.length === 0;
}

function applyTextOverlayStyle(element, cell, frameWidth, frameHeight) {
  element.hidden = !hasCellText(cell);
  if (!hasCellText(cell)) {
    element.textContent = "";
    return;
  }
  const probeCtx = document.createElement("canvas").getContext("2d");
  if (!probeCtx) {
    element.textContent = String(cell.text || "");
    return;
  }
  const layout = getCellTextLayout(probeCtx, cell, frameWidth, frameHeight);
  element.textContent = layout.lines.join("\n");
  element.style.left = `${clamp(Number(cell.textX ?? 0.5), 0, 1) * 100}%`;
  element.style.top = `${(layout.centerY / Math.max(1, frameHeight)) * 100}%`;
  element.style.maxWidth = `${Math.max(1, frameWidth - layout.inset * 2)}px`;
  element.style.font = getCellFontDeclaration(cell, layout.fontSize);
  element.style.lineHeight = `${layout.lineHeight}px`;
  element.style.color = cell.color || "#ffffff";
}

function drawCellText(ctx, cell, x, y, width, height, slotShape = "rect") {
  if (!hasCellText(cell)) {
    return;
  }
  const layout = getCellTextLayout(ctx, cell, width, height);

  ctx.save();
  ctx.beginPath();
  applyCanvasSlotPath(ctx, slotShape, x, y, width, height);
  ctx.clip();
  ctx.font = getCellFontDeclaration(cell, layout.fontSize);
  ctx.fillStyle = cell.color || "#ffffff";
  ctx.textAlign = "center";
  ctx.textBaseline = "top";
  ctx.shadowColor = "rgba(0,0,0,0.55)";
  ctx.shadowBlur = Math.max(2, layout.fontSize * 0.14);
  for (let i = 0; i < layout.lines.length; i += 1) {
    const line = layout.lines[i];
    const lineY = y + layout.startY + i * layout.lineHeight;
    ctx.fillText(line, x + layout.centerX, lineY);
  }
  ctx.restore();
}

function drawWatermark(ctx, canvasWidth, canvasHeight, options = {}) {
  const { text, position, fontFamily, color, size, enabled } = state.watermark;
  if (!enabled || !text) return;
  const cleaned = String(text || "").trim();
  if (!cleaned) return;
  const lineHeight = clamp(Number(size) || 32, 12, 200) * 1.2;
  const scaleFont = Math.max(12, Math.min(240, size));
  ctx.save();
  ctx.font = `normal ${scaleFont}px ${fontFamily || "Segoe UI, system-ui, sans-serif"}`;
  ctx.fillStyle = color || "#ffffff";
  ctx.textBaseline = "top";
  ctx.textAlign = position === "center" ? "center" : position.endsWith("right") ? "right" : "left";
  ctx.shadowColor = "rgba(0,0,0,0.55)";
  ctx.shadowBlur = Math.max(2, scaleFont * 0.2);
  const bounds = options?.bounds;
  const areaX = Number.isFinite(bounds?.x) ? bounds.x : 0;
  const areaY = Number.isFinite(bounds?.y) ? bounds.y : 0;
  const areaWidth = Number.isFinite(bounds?.width) ? bounds.width : canvasWidth;
  const areaHeight = Number.isFinite(bounds?.height) ? bounds.height : canvasHeight;
  const padding = Math.max(12, Math.min(24, Math.min(areaWidth, areaHeight) * 0.05));
  const lines = cleaned.split("\n");
  let baseX = areaX + padding;
  let baseY = areaY + padding;
  if (position === "top-right") {
    baseX = areaX + areaWidth - padding;
    baseY = areaY + padding;
  } else if (position === "bottom-left") {
    baseX = areaX + padding;
    baseY = areaY + areaHeight - padding - (lines.length * lineHeight);
  } else if (position === "bottom-right") {
    baseX = areaX + areaWidth - padding;
    baseY = areaY + areaHeight - padding - (lines.length * lineHeight);
  } else if (position === "center") {
    baseX = areaX + areaWidth / 2;
    baseY = areaY + (areaHeight - lines.length * lineHeight) / 2;
  }
  for (let i = 0; i < lines.length; i += 1) {
    const line = lines[i];
    const lineY = baseY + i * lineHeight;
    ctx.fillText(line, baseX, lineY);
  }
  ctx.restore();
}

function getFrameMetrics(frame, cell) {
  const rect = frame.getBoundingClientRect();
  const metrics = getImageRenderMetrics(cell, rect.width, rect.height);
  return {
    frameWidth: rect.width,
    frameHeight: rect.height,
    panRangeX: metrics.panRangeX,
    panRangeY: metrics.panRangeY,
  };
}

function setCellZoom(index, nextZoom) {
  const cell = state.cells[index];
  if (!cell?.bitmap) return;
  cell.zoom = clamp(nextZoom, ZOOM_MIN, ZOOM_MAX);
  syncEditor();
  renderPreview();
  renderExportPreview();
}

function normalizeRotation(value) {
  const num = Number(value) || 0;
  return ((num % 360) + 360) % 360;
}

function toggleCellFlipX(index) {
  const cell = state.cells[index];
  if (!cell?.bitmap) return;
  cell.flipX = !cell.flipX;
  renderAll();
}

function toggleCellFlipY(index) {
  const cell = state.cells[index];
  if (!cell?.bitmap) return;
  cell.flipY = !cell.flipY;
  renderAll();
}

function rotateCellLeft(index) {
  const cell = state.cells[index];
  if (!cell?.bitmap) return;
  cell.rotation = normalizeRotation((cell.rotation || 0) - 90);
  renderAll();
}

function handlePreviewWheel(event, index) {
  if (state.reorderMode) return;
  const cell = state.cells[index];
  if (!cell?.bitmap) return;
  event.preventDefault();
  if (state.selectedCell !== index) {
    state.selectedCell = index;
    syncEditor();
    renderPreview();
  }
  const delta = -event.deltaY;
  const factor = 1 + delta * 0.0015;
  const nextZoom = clamp((cell.zoom || 1) * factor, ZOOM_MIN, ZOOM_MAX);
  setCellZoom(index, nextZoom);
}

function distance(a, b) {
  const dx = a.x - b.x;
  const dy = a.y - b.y;
  return Math.sqrt(dx * dx + dy * dy);
}

function handlePreviewPointerDown(event, index, node) {
  if (state.reorderMode) {
    if (event.pointerType === "touch") {
      event.preventDefault();
    }
    return;
  }
  if (state.selectedCell !== index) {
    state.selectedCell = index;
    syncEditor();
    renderPreview();
  }
  if (event.pointerType !== "touch") {
    startDrag(event, index, node);
    return;
  }
  state.touchPoints.set(event.pointerId, { x: event.clientX, y: event.clientY });
  if (state.touchPoints.size === 1) {
    startDrag(event, index, node);
    return;
  }
  if (state.touchPoints.size >= 2) {
    stopDrag();
    const points = Array.from(state.touchPoints.values());
    const cell = state.cells[index];
    if (!cell?.bitmap) return;
    state.pinch = {
      startDistance: distance(points[0], points[1]),
      startZoom: cell.zoom || 1,
      index,
    };
  }
}

function handlePreviewPointerMove(event) {
  if (event.pointerType !== "touch") return;
  if (!state.touchPoints.has(event.pointerId)) return;
  event.preventDefault();
  state.touchPoints.set(event.pointerId, { x: event.clientX, y: event.clientY });
  if (!state.pinch || state.touchPoints.size < 2) return;
  const points = Array.from(state.touchPoints.values());
  const nextDistance = distance(points[0], points[1]);
  if (state.pinch.startDistance <= 0) return;
  const ratio = nextDistance / state.pinch.startDistance;
  setCellZoom(state.pinch.index, state.pinch.startZoom * ratio);
}

function handlePreviewPointerUp(event) {
  state.touchPoints.delete(event.pointerId);
  if (state.touchPoints.size < 2) {
    state.pinch = null;
  }
}

function startDrag(event, index, targetNode) {
  const cell = state.cells[index];
  if (!cell?.bitmap) return;
  event.preventDefault();
  state.selectedCell = index;
  syncEditor();
  const frame = targetNode || els.editorFrame;
  if (frame === els.editorFrame) {
    renderPreview();
  }
  const metrics = getFrameMetrics(frame, cell);
  state.dragging = {
    index,
    pointerId: event.pointerId,
    startX: event.clientX,
    startY: event.clientY,
    startFocusX: cell.focusX,
    startFocusY: cell.focusY,
    ...metrics,
  };
  const captureTarget = event.currentTarget instanceof Element
    ? event.currentTarget
    : (event.target instanceof Element ? event.target : frame);
  if (captureTarget?.setPointerCapture) {
    try {
      captureTarget.setPointerCapture(event.pointerId);
    } catch {
      // Pointer capture can fail for non-active pointers or detached nodes.
    }
  }
  window.addEventListener("pointermove", onDragMove, { passive: false });
  window.addEventListener("pointerup", stopDrag, { once: true });
}

function onDragMove(event) {
  if (!state.dragging || event.pointerId !== state.dragging.pointerId) return;
  const cell = state.cells[state.dragging.index];
  if (!cell?.bitmap) return;
  event.preventDefault();
  if (state.dragging.panRangeX > 0.0001) {
    const deltaX = event.clientX - state.dragging.startX;
    cell.focusX = clamp(state.dragging.startFocusX - deltaX / (state.dragging.panRangeX / 2), -1, 1);
  }
  if (state.dragging.panRangeY > 0.0001) {
    const deltaY = event.clientY - state.dragging.startY;
    cell.focusY = clamp(state.dragging.startFocusY - deltaY / (state.dragging.panRangeY / 2), -1, 1);
  }
  syncEditor();
  renderPreview();
  renderExportPreview();
}

function stopDrag() {
  window.removeEventListener("pointermove", onDragMove);
  state.dragging = null;
}

function startTextDrag(event, index = state.selectedCell, frame = els.editorFrame, overlay = els.editorTextOverlay) {
  if (isActiveFieldLockedByReorder()) return;
  const cell = state.cells[index];
  if (!cell) return;
  event.preventDefault();
  event.stopPropagation();
  const frameRect = frame.getBoundingClientRect();
  state.textDragging = {
    pointerId: event.pointerId,
    index,
    startX: event.clientX,
    startY: event.clientY,
    startTextX: clamp(cell.textX ?? 0.5, 0, 1),
    startTextY: clamp(cell.textY ?? DEFAULT_TEXT_Y, 0, 1),
    frameWidth: Math.max(1, frameRect.width),
    frameHeight: Math.max(1, frameRect.height),
    overlay,
  };
  overlay?.classList.add("dragging");
  overlay?.setPointerCapture?.(event.pointerId);
  window.addEventListener("pointermove", onTextDragMove, { passive: false });
  window.addEventListener("pointerup", stopTextDrag, { once: true });
}

function onTextDragMove(event) {
  if (!state.textDragging || event.pointerId !== state.textDragging.pointerId) return;
  const cell = state.cells[state.textDragging.index];
  if (!cell) return;
  event.preventDefault();
  if (state.selectedCell !== state.textDragging.index) {
    state.selectedCell = state.textDragging.index;
  }
  const deltaX = (event.clientX - state.textDragging.startX) / state.textDragging.frameWidth;
  const deltaY = (event.clientY - state.textDragging.startY) / state.textDragging.frameHeight;
  cell.textX = clamp(state.textDragging.startTextX + deltaX, 0, 1);
  cell.textY = clamp(state.textDragging.startTextY + deltaY, 0, 1);
  syncEditor();
  renderPreview();
  renderExportPreview();
}

function stopTextDrag() {
  window.removeEventListener("pointermove", onTextDragMove);
  state.textDragging?.overlay?.classList.remove("dragging");
  state.textDragging = null;
}

function buildTimestampFilename(extension, now = new Date()) {
  const pad2 = (value) => String(value).padStart(2, "0");
  const y = String(now.getFullYear());
  const m = pad2(now.getMonth() + 1);
  const d = pad2(now.getDate());
  const hh = pad2(now.getHours());
  const mm = pad2(now.getMinutes());
  const ss = pad2(now.getSeconds());
  return `fotocollage_${y}${m}${d}_${hh}${mm}${ss}.${extension}`;
}

function downloadBlob(blob, filename) {
  const objectUrl = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.download = filename;
  link.href = objectUrl;
  link.click();
  setTimeout(() => URL.revokeObjectURL(objectUrl), 0);
}

function canShareFiles(file) {
  if (typeof navigator === "undefined" || typeof navigator.share !== "function") {
    return false;
  }
  if (typeof navigator.canShare !== "function") {
    return true;
  }
  try {
    return navigator.canShare({ files: [file] });
  } catch {
    return false;
  }
}

function updateExportActionButtons() {
  let canShare = false;
  try {
    const probe = new File([new Blob(["probe"], { type: "text/plain" })], "probe.txt", { type: "text/plain" });
    canShare = canShareFiles(probe);
  } catch {
    canShare = typeof navigator !== "undefined" && typeof navigator.share === "function";
  }
  const desktopLike = !isTouchLikeDevice();
  els.downloadButton.hidden = desktopLike ? false : canShare;
}

function updateExportFormatUi() {
  state.exportFormat = String(els.exportFormatSelect.value || "png").toLowerCase();
  const preset = getExportPresetDefinition();
  const isGif = state.exportFormat === "gif";
  const widthLocked = !isGif && Boolean(preset.width);
  if (!widthLocked && state.exportWidthLocked) {
    state.customExportWidth = getSuggestedFreeExportWidth();
  }
  if (isGif) {
    const nextGifWidth = clamp(
      Number(els.exportWidthInput.value) || state.exportWidth || GIF_EXPORT_DEFAULT_WIDTH,
      GIF_EXPORT_MIN_WIDTH,
      GIF_EXPORT_MAX_WIDTH
    );
    state.exportWidth = nextGifWidth;
  } else if (preset.width) {
    state.exportWidth = preset.width;
  } else {
    state.customExportWidth = clamp(
      Number(els.exportWidthInput.value) || state.customExportWidth,
      EXPORT_WIDTH_MIN,
      EXPORT_WIDTH_MAX
    );
    state.exportWidth = state.customExportWidth;
  }
  els.gifDelayField.hidden = !isGif;
  els.gifDelayField.style.display = isGif ? "" : "none";
  els.gifDelayInput.disabled = !isGif;
  els.exportWidthInput.min = String(isGif ? GIF_EXPORT_MIN_WIDTH : EXPORT_WIDTH_MIN);
  els.exportWidthInput.max = String(isGif ? GIF_EXPORT_MAX_WIDTH : EXPORT_WIDTH_MAX);
  els.exportWidthInput.step = "10";
  els.exportWidthInput.disabled = widthLocked;
  els.exportWidthInput.value = String(state.exportWidth);
  els.exportWidthValue.textContent = String(state.exportWidth);
  if (isGif) {
    const delay = clamp(Number(els.gifDelayInput.value) || 1, 0.1, 10);
    state.gifDelaySeconds = delay;
    els.gifDelayInput.value = delay.toFixed(1);
    els.gifDelayValue.textContent = delay.toFixed(1);
  }
  state.exportWidthLocked = widthLocked;
  if (els.autoFitSafeAreaButton) {
    const target = getExportTargetSize();
    const safeRect = getSafeAreaRect(target.width, target.height, preset);
    const supportsSafeAreaFit = Boolean(safeRect);
    els.autoFitSafeAreaButton.hidden = !supportsSafeAreaFit;
    if (!supportsSafeAreaFit && state.autoFitToSafeArea) {
      state.autoFitToSafeArea = false;
    }
    updateAutoFitSafeAreaButtonLabel();
  }
}

function setExportStatus(message, loading = false) {
  els.exportStatus.textContent = message;
  els.exportStatus.hidden = !message;
  els.exportStatus.classList.toggle("loading", Boolean(loading && message));
}

function getWordMaskTargetSize() {
  const presetId = String(state.wordMask.preset || "postcard");
  if (presetId !== "free") {
    return WORD_MASK_PRESET_SIZES[presetId] || WORD_MASK_PRESET_SIZES.postcard;
  }
  return {
    width: clamp(Number(state.wordMask.freeWidth) || 1500, 600, 6000),
    height: clamp(Number(state.wordMask.freeHeight) || 1000, 600, 6000),
  };
}

function updateWordMaskFreeSizeUi() {
  const isFree = String(els.wordMaskPresetSelect?.value || state.wordMask.preset) === "free";
  if (els.wordMaskFreeSizeRow) {
    els.wordMaskFreeSizeRow.hidden = !isFree;
    els.wordMaskFreeSizeRow.style.display = isFree ? "grid" : "none";
  }
}

function updateWordMaskStencilUi() {
  const isWordStencil = normalizeWordMaskMode(state.wordMask.mode) === "word";
  const isReorderActive = Boolean(state.wordMask.reorderMode);
  const wordField = document.getElementById("wordMaskWordField");
  const wordStyleRow = document.getElementById("wordMaskWordStyleRow");
  const wordToggleRow = document.getElementById("wordMaskWordToggleRow");
  const spacingField = document.getElementById("wordMaskSpacingField");
  const shapeSizeField = els.wordMaskShapeSizeField;
  const motifField = els.wordMaskMotifField;
  if (wordField) {
    wordField.hidden = !isWordStencil;
    wordField.style.display = isWordStencil ? "" : "none";
  }
  if (wordStyleRow) {
    wordStyleRow.hidden = !isWordStencil;
    wordStyleRow.style.display = isWordStencil ? "" : "none";
  }
  if (wordToggleRow) {
    wordToggleRow.hidden = !isWordStencil;
    wordToggleRow.style.display = isWordStencil ? "" : "none";
  }
  if (spacingField) {
    spacingField.hidden = !isWordStencil;
    spacingField.style.display = isWordStencil ? "" : "none";
  }
  if (shapeSizeField) {
    shapeSizeField.hidden = isWordStencil;
    shapeSizeField.style.display = isWordStencil ? "none" : "";
  }
  if (motifField) {
    motifField.hidden = isWordStencil;
    motifField.style.display = isWordStencil ? "none" : "";
  }
  if (els.wordMaskModeWordButton) {
    els.wordMaskModeWordButton.classList.toggle("active", isWordStencil);
    els.wordMaskModeWordButton.setAttribute("aria-pressed", String(isWordStencil));
  }
  if (els.wordMaskModeMotifButton) {
    els.wordMaskModeMotifButton.classList.toggle("active", !isWordStencil);
    els.wordMaskModeMotifButton.setAttribute("aria-pressed", String(!isWordStencil));
  }
  if (els.wordMaskWordInput) els.wordMaskWordInput.disabled = !isWordStencil || isReorderActive;
  if (els.wordMaskFontSelect) els.wordMaskFontSelect.disabled = !isWordStencil || isReorderActive;
  if (els.wordMaskSpacingInput) els.wordMaskSpacingInput.disabled = !isWordStencil || isReorderActive;
  if (els.wordMaskWordBoldInput) els.wordMaskWordBoldInput.disabled = !isWordStencil || isReorderActive;
  if (els.wordMaskWordItalicInput) els.wordMaskWordItalicInput.disabled = !isWordStencil || isReorderActive;
  if (els.wordMaskShapeSizeInput) els.wordMaskShapeSizeInput.disabled = isWordStencil || isReorderActive;
  if (els.wordMaskSizeInput) els.wordMaskSizeInput.disabled = !isWordStencil || isReorderActive;
  renderWordMaskStencilOptions();
}

function syncWordMaskStateFromInputs() {
  state.wordMask.preset = String(els.wordMaskPresetSelect?.value || state.wordMask.preset);
  state.wordMask.freeWidth = clamp(Number(els.wordMaskWidthInput?.value) || state.wordMask.freeWidth, 600, 6000);
  state.wordMask.freeHeight = clamp(Number(els.wordMaskHeightInput?.value) || state.wordMask.freeHeight, 600, 6000);
  state.wordMask.mode = normalizeWordMaskMode(state.wordMask.mode);
  state.wordMask.word = String(els.wordMaskWordInput?.value || state.wordMask.word);
  if (state.wordMask.mode === "word") {
    state.wordMask.stencil = "word";
  }
  state.wordMask.fontFamily = String(els.wordMaskFontSelect?.value || state.wordMask.fontFamily);
  const isWordStencil = state.wordMask.stencil === "word";
  const sizeInputValue = isWordStencil
    ? Number(els.wordMaskSizeInput?.value)
    : Number(els.wordMaskShapeSizeInput?.value);
  state.wordMask.fontSize = clamp(sizeInputValue || state.wordMask.fontSize, 10, 6000);
  state.wordMask.letterSpacing = clamp(Number(els.wordMaskSpacingInput?.value) || state.wordMask.letterSpacing, 0, 120);
  state.wordMask.bold = Boolean(els.wordMaskWordBoldInput?.checked);
  state.wordMask.italic = Boolean(els.wordMaskWordItalicInput?.checked);
  state.wordMask.subtitle = String(els.wordMaskSubtitleInput?.value || state.wordMask.subtitle);
  state.wordMask.background = String(els.wordMaskBackgroundInput?.value || state.wordMask.background);
  state.wordMask.subtitleFontFamily = String(els.wordMaskSubtitleFontSelect?.value || state.wordMask.subtitleFontFamily);
  state.wordMask.subtitleSize = clamp(Number(els.wordMaskSubtitleSizeInput?.value) || state.wordMask.subtitleSize, 18, 140);
  state.wordMask.subtitleBold = Boolean(els.wordMaskSubtitleBoldInput?.checked);
  state.wordMask.subtitleItalic = Boolean(els.wordMaskSubtitleItalicInput?.checked);
  state.wordMask.subtitleColor = String(els.wordMaskSubtitleColorInput?.value || state.wordMask.subtitleColor);
  state.wordMask.outputFormat = String(els.wordMaskOutputFormatSelect?.value || state.wordMask.outputFormat).toLowerCase();
  if (els.wordMaskSizeInput) els.wordMaskSizeInput.value = String(state.wordMask.fontSize);
  if (els.wordMaskShapeSizeInput) els.wordMaskShapeSizeInput.value = String(state.wordMask.fontSize);
  if (els.wordMaskShapeSizeValue) els.wordMaskShapeSizeValue.textContent = String(state.wordMask.fontSize);
}

function syncWordMaskInputsFromState() {
  if (state.wordMask.mode !== "word" && state.wordMask.mode !== "motif") {
    state.wordMask.mode = state.wordMask.stencil === "word" ? "word" : "motif";
  }
  state.wordMask.mode = normalizeWordMaskMode(state.wordMask.mode);
  if (state.wordMask.mode === "word") {
    state.wordMask.stencil = "word";
  }
  if (els.wordMaskPresetSelect) els.wordMaskPresetSelect.value = state.wordMask.preset;
  if (els.wordMaskWidthInput) els.wordMaskWidthInput.value = String(state.wordMask.freeWidth);
  if (els.wordMaskHeightInput) els.wordMaskHeightInput.value = String(state.wordMask.freeHeight);
  if (els.wordMaskWordInput) els.wordMaskWordInput.value = state.wordMask.word;
  if (els.wordMaskFontSelect) els.wordMaskFontSelect.value = state.wordMask.fontFamily;
  if (els.wordMaskSizeInput) els.wordMaskSizeInput.value = String(state.wordMask.fontSize);
  if (els.wordMaskShapeSizeInput) els.wordMaskShapeSizeInput.value = String(state.wordMask.fontSize);
  if (els.wordMaskShapeSizeValue) els.wordMaskShapeSizeValue.textContent = String(state.wordMask.fontSize);
  if (els.wordMaskSpacingInput) els.wordMaskSpacingInput.value = String(state.wordMask.letterSpacing);
  if (els.wordMaskWordBoldInput) els.wordMaskWordBoldInput.checked = state.wordMask.bold;
  if (els.wordMaskWordItalicInput) els.wordMaskWordItalicInput.checked = state.wordMask.italic;
  if (els.wordMaskSubtitleInput) els.wordMaskSubtitleInput.value = state.wordMask.subtitle;
  if (els.wordMaskBackgroundInput) els.wordMaskBackgroundInput.value = state.wordMask.background;
  if (els.wordMaskSubtitleFontSelect) els.wordMaskSubtitleFontSelect.value = state.wordMask.subtitleFontFamily;
  if (els.wordMaskSubtitleSizeInput) els.wordMaskSubtitleSizeInput.value = String(state.wordMask.subtitleSize);
  if (els.wordMaskSubtitleBoldInput) els.wordMaskSubtitleBoldInput.checked = state.wordMask.subtitleBold;
  if (els.wordMaskSubtitleItalicInput) els.wordMaskSubtitleItalicInput.checked = state.wordMask.subtitleItalic;
  if (els.wordMaskSubtitleColorInput) els.wordMaskSubtitleColorInput.value = state.wordMask.subtitleColor;
  if (els.wordMaskOutputFormatSelect) els.wordMaskOutputFormatSelect.value = state.wordMask.outputFormat;
  updateWordMaskFreeSizeUi();
  updateWordMaskStencilUi();
  updateWordMaskReorderUi();
}

function openWordMaskStage() {
  if (!els.wordMaskStage || !els.wizardRoot) return;
  state.wordMask.reorderMode = false;
  state.wordMask.reorderSourceIndex = null;
  setWordMaskTab(state.wordMask.activeTab || "photos");
  setUiMode("form");
}

function closeWordMaskStage() {
  if (!els.wordMaskStage || !els.wizardRoot) return;
  state.wordMask.reorderMode = false;
  state.wordMask.reorderSourceIndex = null;
  state.wordMask.subtitleDrag = null;
  updateWordMaskReorderUi();
  setUiMode("launcher");
}

function closeWordMaskPhotos() {
  for (const photo of state.wordMask.photos) {
    if (photo?.source && "close" in photo.source) {
      photo.source.close();
    }
    if (photo?.objectUrl) {
      URL.revokeObjectURL(photo.objectUrl);
    }
  }
  state.wordMask.photos = [];
  state.wordMask.reorderMode = false;
  state.wordMask.reorderSourceIndex = null;
  updateWordMaskReorderUi();
  renderWordMaskPhotoOrder();
}

function drawBitmapCover(ctx, source, targetX, targetY, targetWidth, targetHeight) {
  if (!source) return;
  const sourceWidth = Number(source.width || source.naturalWidth || 0);
  const sourceHeight = Number(source.height || source.naturalHeight || 0);
  if (!sourceWidth || !sourceHeight) return;
  const targetRatio = targetWidth / targetHeight;
  const sourceRatio = sourceWidth / sourceHeight;
  let sx = 0;
  let sy = 0;
  let sw = sourceWidth;
  let sh = sourceHeight;
  if (sourceRatio > targetRatio) {
    sw = Math.max(1, Math.round(sourceHeight * targetRatio));
    sx = Math.max(0, Math.round((sourceWidth - sw) / 2));
  } else {
    sh = Math.max(1, Math.round(sourceWidth / targetRatio));
    sy = Math.max(0, Math.round((sourceHeight - sh) / 2));
  }
  ctx.drawImage(source, sx, sy, sw, sh, targetX, targetY, targetWidth, targetHeight);
}

function measureSpacedText(ctx, text, spacing) {
  const chars = Array.from(text || "");
  if (!chars.length) return 0;
  let width = 0;
  for (let i = 0; i < chars.length; i += 1) {
    width += ctx.measureText(chars[i]).width;
    if (i < chars.length - 1) width += spacing;
  }
  return width;
}

function drawSpacedText(ctx, text, centerX, centerY, spacing) {
  const chars = Array.from(text || "");
  if (!chars.length) return;
  const previousAlign = ctx.textAlign;
  const totalWidth = measureSpacedText(ctx, text, spacing);
  let x = centerX - totalWidth / 2;
  ctx.textAlign = "left";
  for (let i = 0; i < chars.length; i += 1) {
    const char = chars[i];
    const w = ctx.measureText(char).width;
    ctx.fillText(char, x, centerY);
    x += w + spacing;
  }
  ctx.textAlign = previousAlign;
}

function parseSvgViewBox(viewBoxValue) {
  const fallback = { x: 0, y: 0, width: 100, height: 100 };
  if (!viewBoxValue) return fallback;
  const values = String(viewBoxValue)
    .trim()
    .split(/[\s,]+/)
    .map((value) => Number(value))
    .filter((value) => Number.isFinite(value));
  if (values.length !== 4) return fallback;
  const [, , width, height] = values;
  if (width <= 0 || height <= 0) return fallback;
  return {
    x: values[0],
    y: values[1],
    width,
    height,
  };
}

async function loadSvgStencilById(stencilId) {
  if (stencilPathCache.has(stencilId)) {
    return stencilPathCache.get(stencilId);
  }
  const stencilEntry = STENCIL_SVG_BY_ID.get(stencilId);
  if (!stencilEntry) return null;
  try {
    const response = await fetch(stencilEntry.src);
    if (!response.ok) {
      stencilPathCache.set(stencilId, null);
      return null;
    }
    const svgText = await response.text();
    const xml = new DOMParser().parseFromString(svgText, "image/svg+xml");
    const svgElement = xml.querySelector("svg");
    if (!svgElement) {
      stencilPathCache.set(stencilId, null);
      return null;
    }
    const viewBox = parseSvgViewBox(svgElement.getAttribute("viewBox"));
    const svgBlob = new Blob([svgText], { type: "image/svg+xml" });
    const svgObjectUrl = URL.createObjectURL(svgBlob);
    const image = await new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => resolve(img);
      img.onerror = () => reject(new Error("SVG image decode failed"));
      img.src = svgObjectUrl;
    }).finally(() => {
      URL.revokeObjectURL(svgObjectUrl);
    });
    const loaded = { image, viewBox };
    stencilPathCache.set(stencilId, loaded);
    return loaded;
  } catch {
    stencilPathCache.set(stencilId, null);
    return null;
  }
}

function ensureSvgStencilsLoaded() {
  if (!stencilSvgLoadPromise) {
    const stencilIds = Array.from(STENCIL_SVG_BY_ID.keys());
    stencilSvgLoadPromise = Promise.all(stencilIds.map((stencilId) => loadSvgStencilById(stencilId))).catch(() => []);
  }
  return stencilSvgLoadPromise;
}

function drawSvgStencil(ctx, width, height, stencilId, scale = 1) {
  const stencilDef = stencilPathCache.get(stencilId);
  if (!stencilDef || !stencilDef.image || !stencilDef.viewBox) {
    return false;
  }
  const viewBox = stencilDef.viewBox;
  const shapeScale = Math.max(0.2, Math.min(3, Number(scale) || 1));
  const drawWidth = Math.max(1, Math.round(viewBox.width * Math.min((width * 0.9 * shapeScale) / Math.max(1, viewBox.width), (height * 0.9 * shapeScale) / Math.max(1, viewBox.height))));
  const drawHeight = Math.max(1, Math.round(viewBox.height * Math.min((width * 0.9 * shapeScale) / Math.max(1, viewBox.width), (height * 0.9 * shapeScale) / Math.max(1, viewBox.height))));
  if (!Number.isFinite(drawWidth) || !Number.isFinite(drawHeight) || drawWidth <= 0 || drawHeight <= 0) {
    return false;
  }
  const x = Math.round((width - drawWidth) / 2);
  const y = Math.round((height - drawHeight) / 2);
  ctx.drawImage(stencilDef.image, x, y, drawWidth, drawHeight);
  return true;
}

function drawHeartStencil(ctx, width, height, scale = 1) {
  const size = Math.min(width, height) * 0.42 * scale;
  const x = width / 2;
  const y = height / 2;
  ctx.beginPath();
  ctx.moveTo(x, y + size * 0.9);
  ctx.bezierCurveTo(x - size * 1.1, y + size * 0.28, x - size * 1.05, y - size * 0.58, x, y - size * 0.15);
  ctx.bezierCurveTo(x + size * 1.05, y - size * 0.58, x + size * 1.1, y + size * 0.28, x, y + size * 0.9);
  ctx.closePath();
  ctx.fill();
}

function drawFlowerStencil(ctx, width, height, scale = 1) {
  const radius = Math.min(width, height) * 0.16 * scale;
  const centerX = width / 2;
  const centerY = height / 2;
  const petalOffset = radius * 1.25;
  for (let i = 0; i < 8; i += 1) {
    const angle = (Math.PI * 2 * i) / 8;
    const px = centerX + Math.cos(angle) * petalOffset;
    const py = centerY + Math.sin(angle) * petalOffset;
    ctx.beginPath();
    ctx.arc(px, py, radius, 0, Math.PI * 2);
    ctx.fill();
  }
  ctx.beginPath();
  ctx.arc(centerX, centerY, radius * 0.95, 0, Math.PI * 2);
  ctx.fill();
}

function drawStarStencil(ctx, width, height, scale = 1) {
  const cx = width / 2;
  const cy = height / 2;
  const outer = Math.min(width, height) * 0.34 * scale;
  const inner = outer * 0.45;
  ctx.beginPath();
  for (let i = 0; i < 10; i += 1) {
    const angle = -Math.PI / 2 + (Math.PI * i) / 5;
    const r = i % 2 === 0 ? outer : inner;
    const x = cx + Math.cos(angle) * r;
    const y = cy + Math.sin(angle) * r;
    if (i === 0) ctx.moveTo(x, y);
    else ctx.lineTo(x, y);
  }
  ctx.closePath();
  ctx.fill();
}

function drawCloverStencil(ctx, width, height, scale = 1) {
  const cx = width / 2;
  const cy = height / 2;
  const radius = Math.min(width, height) * 0.125 * scale;
  const offset = radius * 1.35;
  const drawLeaf = (x, y) => {
    ctx.beginPath();
    ctx.moveTo(x, y - radius);
    ctx.bezierCurveTo(x + radius, y - radius * 1.4, x + radius * 1.35, y + radius * 0.2, x, y + radius);
    ctx.bezierCurveTo(x - radius * 1.35, y + radius * 0.2, x - radius, y - radius * 1.4, x, y - radius);
    ctx.closePath();
    ctx.fill();
  };
  drawLeaf(cx - offset, cy - offset * 0.15);
  drawLeaf(cx + offset, cy - offset * 0.15);
  drawLeaf(cx, cy - offset * 1.05);
  drawLeaf(cx, cy + offset * 0.85);
  ctx.beginPath();
  ctx.moveTo(cx + radius * 0.2, cy + offset * 1.5);
  ctx.bezierCurveTo(cx + radius * 0.9, cy + offset * 2.3, cx - radius * 0.1, cy + offset * 2.9, cx - radius * 0.75, cy + offset * 3.3);
  ctx.lineWidth = Math.max(8, radius * 0.42);
  ctx.lineCap = "round";
  ctx.strokeStyle = "#ffffff";
  ctx.stroke();
}

function drawLightningStencil(ctx, width, height, scale = 1) {
  const cx = width / 2;
  const cy = height / 2;
  const w = Math.min(width, height) * 0.5 * scale;
  const h = Math.min(width, height) * 0.75 * scale;
  ctx.beginPath();
  ctx.moveTo(cx - w * 0.18, cy - h * 0.5);
  ctx.lineTo(cx + w * 0.08, cy - h * 0.5);
  ctx.lineTo(cx - w * 0.02, cy - h * 0.05);
  ctx.lineTo(cx + w * 0.2, cy - h * 0.05);
  ctx.lineTo(cx - w * 0.12, cy + h * 0.5);
  ctx.lineTo(cx - w * 0.02, cy + h * 0.1);
  ctx.lineTo(cx - w * 0.22, cy + h * 0.1);
  ctx.closePath();
  ctx.fill();
}

function getWordMaskCanvasContext() {
  if (!els.wordMaskCanvas) return null;
  return els.wordMaskCanvas.getContext("2d");
}

function getWordMaskPhotoRects(count, width, height) {
  const safeCount = Math.max(0, Math.floor(Number(count) || 0));
  if (!safeCount) return [];
  if (safeCount === 1) {
    return [{ x: 0, y: 0, width, height }];
  }
  if (safeCount === 2) {
    if (width >= height) {
      const w = width / 2;
      return [{ x: 0, y: 0, width: w, height }, { x: w, y: 0, width: width - w, height }];
    }
    const h = height / 2;
    return [{ x: 0, y: 0, width, height: h }, { x: 0, y: h, width, height: height - h }];
  }

  const targetCols = Math.max(1, Math.round(Math.sqrt((safeCount * width) / Math.max(1, height))));
  const rows = Math.max(1, Math.ceil(safeCount / Math.max(1, targetCols)));
  const basePerRow = Math.floor(safeCount / rows);
  const extra = safeCount % rows;
  const rowCounts = Array.from({ length: rows }, (_, rowIndex) => basePerRow + (rowIndex < extra ? 1 : 0));
  const rects = [];
  let y = 0;
  for (let row = 0; row < rowCounts.length; row += 1) {
    const cellsInRow = Math.max(1, rowCounts[row]);
    const rowHeight = row === rowCounts.length - 1 ? (height - y) : Math.round(height / rowCounts.length);
    const cellWidth = width / cellsInRow;
    let x = 0;
    for (let col = 0; col < cellsInRow; col += 1) {
      const w = col === cellsInRow - 1 ? (width - x) : Math.round(cellWidth);
      rects.push({ x, y, width: w, height: rowHeight });
      x += w;
    }
    y += rowHeight;
  }
  return rects.slice(0, safeCount);
}

function getWordMaskPointerPosition(event) {
  if (!els.wordMaskCanvas) return null;
  const rect = els.wordMaskCanvas.getBoundingClientRect();
  if (rect.width <= 0 || rect.height <= 0) return null;
  const scaleX = els.wordMaskCanvas.width / rect.width;
  const scaleY = els.wordMaskCanvas.height / rect.height;
  return {
    x: (event.clientX - rect.left) * scaleX,
    y: (event.clientY - rect.top) * scaleY,
  };
}

function isPointInsideRect(point, rect) {
  if (!point || !rect) return false;
  return point.x >= rect.x && point.x <= rect.x + rect.width && point.y >= rect.y && point.y <= rect.y + rect.height;
}

function startWordMaskSubtitleDrag(event) {
  if (!els.wordMaskCanvas || !state.wordMask.subtitleBounds) return;
  const pointer = getWordMaskPointerPosition(event);
  if (!isPointInsideRect(pointer, state.wordMask.subtitleBounds)) return;
  event.preventDefault();
  const width = Math.max(1, els.wordMaskCanvas.width);
  const height = Math.max(1, els.wordMaskCanvas.height);
  const centerX = clamp(Number(state.wordMask.subtitleX) || 0.5, 0.01, 0.99) * width;
  const centerY = clamp(Number(state.wordMask.subtitleY) || 0.93, 0.01, 0.99) * height;
  state.wordMask.subtitleDrag = {
    pointerId: event.pointerId,
    offsetX: pointer.x - centerX,
    offsetY: pointer.y - centerY,
  };
  try {
    els.wordMaskCanvas.setPointerCapture(event.pointerId);
  } catch {
    // Pointer capture can fail on some browsers; dragging still works without it.
  }
}

function moveWordMaskSubtitleDrag(event) {
  const drag = state.wordMask.subtitleDrag;
  if (!drag || !els.wordMaskCanvas || event.pointerId !== drag.pointerId) return;
  const pointer = getWordMaskPointerPosition(event);
  if (!pointer) return;
  event.preventDefault();
  const canvasWidth = Math.max(1, els.wordMaskCanvas.width);
  const canvasHeight = Math.max(1, els.wordMaskCanvas.height);
  const bounds = state.wordMask.subtitleBounds || { width: canvasWidth * 0.3, height: canvasHeight * 0.08 };
  const halfW = bounds.width / 2;
  const halfH = bounds.height / 2;
  const nextX = clamp(pointer.x - drag.offsetX, halfW, canvasWidth - halfW);
  const nextY = clamp(pointer.y - drag.offsetY, halfH, canvasHeight - halfH);
  state.wordMask.subtitleX = nextX / canvasWidth;
  state.wordMask.subtitleY = nextY / canvasHeight;
  renderWordMaskPreview();
}

function endWordMaskSubtitleDrag(event) {
  const drag = state.wordMask.subtitleDrag;
  if (!drag || !els.wordMaskCanvas) return;
  if (event?.pointerId != null && event.pointerId !== drag.pointerId) return;
  state.wordMask.subtitleDrag = null;
}

function renderWordMaskPreview() {
  const ctx = getWordMaskCanvasContext();
  if (!ctx || !els.wordMaskCanvas) return;
  const target = getWordMaskTargetSize();
  const width = Math.max(1, Math.round(target.width));
  const height = Math.max(1, Math.round(target.height));
  if (els.wordMaskCanvas.width !== width) els.wordMaskCanvas.width = width;
  if (els.wordMaskCanvas.height !== height) els.wordMaskCanvas.height = height;
  if (els.wordMaskStage) {
    els.wordMaskStage.style.setProperty("--wordmask-canvas-ratio", (width / Math.max(1, height)).toFixed(4));
  }

  const maskRect = {
    x: 0,
    y: 0,
    width: Math.max(1, width),
    height: Math.max(1, height),
  };

  ctx.clearRect(0, 0, width, height);
  ctx.fillStyle = state.wordMask.background || "#f5f5f3";
  ctx.fillRect(0, 0, width, height);

  const maskCanvas = document.createElement("canvas");
  maskCanvas.width = maskRect.width;
  maskCanvas.height = maskRect.height;
  const maskCtx = maskCanvas.getContext("2d");
  if (!maskCtx) return;
  maskCtx.clearRect(0, 0, maskRect.width, maskRect.height);

  const rawWord = String(state.wordMask.word || "").trim();
  const word = rawWord || "DANKE";
  const requestedWordSize = clamp(Number(state.wordMask.fontSize) || 1500, 10, 6000);
  let fitSize = 1200;
  const stencil = String(state.wordMask.stencil || "word");

  // Layer 1: Text alpha mask.
  const textCanvas = document.createElement("canvas");
  textCanvas.width = maskRect.width;
  textCanvas.height = maskRect.height;
  const textCtx = textCanvas.getContext("2d");
  if (!textCtx) return;
  textCtx.clearRect(0, 0, textCanvas.width, textCanvas.height);
  textCtx.fillStyle = "#ffffff";
  textCtx.textAlign = "center";
  textCtx.textBaseline = "middle";
  textCtx.lineJoin = "round";

  const spacing = clamp(Number(state.wordMask.letterSpacing) || 0, 0, 120);
  if (stencil === "word") {
    for (let pass = 0; pass < 8; pass += 1) {
      textCtx.font = `${state.wordMask.italic ? "italic " : ""}${state.wordMask.bold ? "900" : "600"} ${fitSize}px ${state.wordMask.fontFamily}`;
      const metricsWidth = Math.max(1, measureSpacedText(textCtx, word, spacing));
      if (metricsWidth <= maskRect.width * 0.92 && fitSize <= maskRect.height * 0.9) {
        break;
      }
      const fitByWidth = (maskRect.width * 0.92) / metricsWidth;
      const fitByHeight = (maskRect.height * 0.9) / Math.max(1, fitSize);
      const factor = Math.max(0.5, Math.min(fitByWidth, fitByHeight));
      fitSize = Math.max(36, Math.floor(fitSize * factor));
    }
    const sizeFactor = requestedWordSize / 1200;
    const finalWordSize = clamp(Math.round(fitSize * sizeFactor), 8, 6000);
    textCtx.font = `${state.wordMask.italic ? "italic " : ""}${state.wordMask.bold ? "900" : "600"} ${finalWordSize}px ${state.wordMask.fontFamily}`;
    drawSpacedText(textCtx, word, maskRect.width / 2, maskRect.height / 2, spacing);
  } else {
    const shapeScale = clamp(requestedWordSize / 1200, 0.08, 6);
    const drewSvgStencil = drawSvgStencil(textCtx, maskRect.width, maskRect.height, stencil, shapeScale);
    if (!drewSvgStencil) {
      if (stencil === "heart") {
        drawHeartStencil(textCtx, maskRect.width, maskRect.height, shapeScale);
      } else if (stencil === "flower") {
        drawFlowerStencil(textCtx, maskRect.width, maskRect.height, shapeScale);
      } else if (stencil === "clover") {
        drawCloverStencil(textCtx, maskRect.width, maskRect.height, shapeScale);
      } else if (stencil === "lightning") {
        drawLightningStencil(textCtx, maskRect.width, maskRect.height, shapeScale);
      } else {
        drawFlowerStencil(textCtx, maskRect.width, maskRect.height, shapeScale);
      }
    }
  }

  // Layer 2: Photo/gradient fill.
  const fillCanvas = document.createElement("canvas");
  fillCanvas.width = maskRect.width;
  fillCanvas.height = maskRect.height;
  const fillCtx = fillCanvas.getContext("2d");
  if (!fillCtx) return;
  fillCtx.clearRect(0, 0, fillCanvas.width, fillCanvas.height);
  fillCtx.imageSmoothingEnabled = true;
  fillCtx.imageSmoothingQuality = "high";

  const photos = state.wordMask.photos;
  let drawnPhotos = 0;
  if (photos.length) {
    const photoRects = getWordMaskPhotoRects(photos.length, maskRect.width, maskRect.height);
    for (let i = 0; i < photos.length; i += 1) {
      const photo = photos[i];
      const rect = photoRects[i];
      if (!rect) continue;
      try {
        drawBitmapCover(fillCtx, photo.source, rect.x, rect.y, rect.width, rect.height);
        drawnPhotos += 1;
      } catch {
        // Keep rendering remaining files.
      }
    }
  }
  if (!drawnPhotos) {
    const gradient = fillCtx.createLinearGradient(0, 0, maskRect.width, maskRect.height);
    gradient.addColorStop(0, "#b9c8d8");
    gradient.addColorStop(1, "#8ea3b8");
    fillCtx.fillStyle = gradient;
    fillCtx.fillRect(0, 0, maskRect.width, maskRect.height);
  }

  // Apply text mask.
  fillCtx.globalCompositeOperation = "destination-in";
  fillCtx.drawImage(textCanvas, 0, 0);
  fillCtx.globalCompositeOperation = "source-over";

  ctx.drawImage(fillCanvas, maskRect.x, maskRect.y);

  if (!photos.length) {
    ctx.save();
    ctx.fillStyle = "#5f6368";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.font = `600 ${Math.max(18, Math.round(width * 0.023))}px "Segoe UI", system-ui, sans-serif`;
    ctx.fillText("Fotos laden für die Form-Collage", width / 2, maskRect.y + maskRect.height / 2);
    ctx.restore();
  }

  const subtitle = String(state.wordMask.subtitle || "").trim();
  if (subtitle) {
    const subtitleXNorm = clamp(Number(state.wordMask.subtitleX) || 0.5, 0.01, 0.99);
    const subtitleYNorm = clamp(Number(state.wordMask.subtitleY) || 0.93, 0.01, 0.99);
    const subtitleX = subtitleXNorm * width;
    const subtitleY = subtitleYNorm * height;
    ctx.save();
    ctx.fillStyle = state.wordMask.subtitleColor || "#222222";
    ctx.textAlign = "left";
    ctx.textBaseline = "middle";
    const subtitleSize = clamp(Number(state.wordMask.subtitleSize) || 56, 12, 220);
    ctx.font = `${state.wordMask.subtitleItalic ? "italic " : ""}${state.wordMask.subtitleBold ? "700" : "500"} ${subtitleSize}px ${state.wordMask.subtitleFontFamily}`;
    const maxWidth = Math.max(1, width - 16);
    const measuredWidth = Math.min(maxWidth, Math.max(1, ctx.measureText(subtitle).width));
    const textLeft = clamp(subtitleX - measuredWidth / 2, 8, Math.max(8, width - 8 - measuredWidth));
    const textTop = subtitleY - subtitleSize / 2;
    state.wordMask.subtitleBounds = {
      x: textLeft - 10,
      y: textTop - 8,
      width: measuredWidth + 20,
      height: subtitleSize + 16,
    };
    ctx.fillText(subtitle, textLeft, subtitleY, maxWidth);
    ctx.restore();
  } else {
    state.wordMask.subtitleBounds = null;
  }
}

async function loadWordMaskFiles(fileList) {
  closeWordMaskPhotos();
  const files = Array.from(fileList || []).filter((file) => file.type.startsWith("image/"));
  const loadViaImageElement = (file) =>
    new Promise((resolve, reject) => {
      const objectUrl = URL.createObjectURL(file);
      const image = new Image();
      image.onload = () => {
        resolve({ image, objectUrl });
      };
      image.onerror = () => {
        URL.revokeObjectURL(objectUrl);
        reject(new Error("Image decode failed"));
      };
      image.src = objectUrl;
    });
  for (const file of files) {
    try {
      const loaded = await loadViaImageElement(file);
      state.wordMask.photos.push({ source: loaded.image, objectUrl: loaded.objectUrl, fileName: file.name });
    } catch {
      // Ignore single-file decode errors and continue with remaining files.
    }
  }
  if (els.wordMaskPhotosStatus) {
    els.wordMaskPhotosStatus.textContent = state.wordMask.photos.length
      ? `${state.wordMask.photos.length} Foto(s) geladen.`
      : "Keine Fotos geladen.";
  }
  renderWordMaskPhotoOrder();
  renderWordMaskPreview();
}

function shuffleWordMaskPhotos() {
  if (!Array.isArray(state.wordMask.photos) || state.wordMask.photos.length < 2) return;
  for (let i = state.wordMask.photos.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    const tmp = state.wordMask.photos[i];
    state.wordMask.photos[i] = state.wordMask.photos[j];
    state.wordMask.photos[j] = tmp;
  }
  renderWordMaskPhotoOrder();
  renderWordMaskPreview();
}

function handleWordMaskReorderTap(index) {
  const photos = state.wordMask.photos;
  if (!Array.isArray(photos) || index < 0 || index >= photos.length) return;
  if (!state.wordMask.reorderMode) return;
  if (state.wordMask.reorderSourceIndex === null) {
    state.wordMask.reorderSourceIndex = index;
    updateWordMaskReorderUi();
    renderWordMaskPhotoOrder();
    return;
  }
  if (state.wordMask.reorderSourceIndex === index) {
    state.wordMask.reorderSourceIndex = null;
    updateWordMaskReorderUi();
    renderWordMaskPhotoOrder();
    return;
  }
  const source = state.wordMask.reorderSourceIndex;
  const tmp = photos[source];
  photos[source] = photos[index];
  photos[index] = tmp;
  state.wordMask.reorderSourceIndex = null;
  updateWordMaskReorderUi();
  renderWordMaskPhotoOrder();
  renderWordMaskPreview();
}

function renderWordMaskPhotoOrder() {
  if (!els.wordMaskPhotoOrder || !els.wordMaskPhotoOrderField) return;
  const photos = Array.isArray(state.wordMask.photos) ? state.wordMask.photos : [];
  els.wordMaskPhotoOrder.innerHTML = "";
  const showOrder = photos.length > 1;
  els.wordMaskPhotoOrderField.hidden = !showOrder;
  if (!showOrder) return;
  photos.forEach((photo, index) => {
    const item = document.createElement("div");
    item.className = "wordmask-photo-item";
    item.dataset.photoIndex = String(index);
    item.classList.toggle("reorder-source", state.wordMask.reorderMode && state.wordMask.reorderSourceIndex === index);
    const image = document.createElement("img");
    image.src = photo?.objectUrl || photo?.source?.src || "";
    image.alt = `Foto ${index + 1}`;
    const caption = document.createElement("span");
    caption.textContent = `#${index + 1}`;
    item.append(image, caption);
    item.addEventListener("click", () => {
      handleWordMaskReorderTap(index);
    });
    els.wordMaskPhotoOrder.append(item);
  });
}

async function buildWordMaskPayload() {
  renderWordMaskPreview();
  const format = String(state.wordMask.outputFormat || "png").toLowerCase();
  if (format === "pdf") {
    const jpegBlob = await canvasToBlob(els.wordMaskCanvas, "image/jpeg", 0.92);
    const jpegBytes = new Uint8Array(await jpegBlob.arrayBuffer());
    const pdfBlob = createPdfFromJpegBytes(jpegBytes, els.wordMaskCanvas.width, els.wordMaskCanvas.height);
    return {
      blob: pdfBlob,
      filename: buildTimestampFilename("pdf"),
      mimeType: "application/pdf",
    };
  }
  const isJpeg = format === "jpeg" || format === "jpg";
  const blob = await canvasToBlob(els.wordMaskCanvas, isJpeg ? "image/jpeg" : "image/png", isJpeg ? 0.92 : undefined);
  return {
    blob,
    filename: buildTimestampFilename(isJpeg ? "jpg" : "png"),
    mimeType: isJpeg ? "image/jpeg" : "image/png",
  };
}

async function saveWordMaskResult() {
  if (!els.wordMaskSaveButton) return;
  try {
    els.wordMaskSaveButton.disabled = true;
    const payload = await buildWordMaskPayload();
    downloadBlob(payload.blob, payload.filename);
  } finally {
    els.wordMaskSaveButton.disabled = false;
  }
}

async function shareWordMaskResult() {
  if (!els.wordMaskShareButton) return;
  try {
    els.wordMaskShareButton.disabled = true;
    const payload = await buildWordMaskPayload();
    const file = new File([payload.blob], payload.filename, { type: payload.mimeType });
    if (canShareFiles(file)) {
      await navigator.share({ files: [file], title: payload.filename });
      return;
    }
    downloadBlob(payload.blob, payload.filename);
  } catch {
    // ignore user-cancel share errors
  } finally {
    els.wordMaskShareButton.disabled = false;
  }
}

function canvasToBlob(canvas, mimeType = "image/png", quality) {
  return new Promise((resolve, reject) => {
    canvas.toBlob((blob) => {
      if (blob) {
        resolve(blob);
        return;
      }
      reject(new Error("Canvas export failed"));
    }, mimeType, quality);
  });
}

function createExportCanvas() {
  const canvas = document.createElement("canvas");
  const targetSize = getExportTargetSize();
  canvas.width = targetSize.width;
  canvas.height = targetSize.height;
  const ctx = canvas.getContext("2d");
  drawCollage(ctx, canvas.width, canvas.height);
  return canvas;
}

function createGifPalette() {
  const palette = [];
  const steps = [0, 51, 102, 153, 204, 255];
  for (const r of steps) {
    for (const g of steps) {
      for (const b of steps) {
        palette.push(r, g, b);
      }
    }
  }
  for (let i = 0; i < 40; i += 1) {
    const v = Math.round((i / 39) * 255);
    palette.push(v, v, v);
  }
  while (palette.length < 256 * 3) {
    palette.push(0, 0, 0);
  }
  return new Uint8Array(palette.slice(0, 256 * 3));
}

function nearestPaletteIndex(palette, r, g, b) {
  let best = 0;
  let bestDist = Number.POSITIVE_INFINITY;
  for (let i = 0; i < 256; i += 1) {
    const p = i * 3;
    const dr = r - palette[p];
    const dg = g - palette[p + 1];
    const db = b - palette[p + 2];
    const dist = dr * dr + dg * dg + db * db;
    if (dist < bestDist) {
      bestDist = dist;
      best = i;
      if (dist === 0) break;
    }
  }
  return best;
}

function imageDataToIndexed(imageData, palette) {
  const { data, width, height } = imageData;
  const indices = new Uint8Array(width * height);
  for (let i = 0, px = 0; i < data.length; i += 4, px += 1) {
    indices[px] = nearestPaletteIndex(palette, data[i], data[i + 1], data[i + 2]);
  }
  return indices;
}

function lzwEncodeLiteral(indices, minCodeSize = 8) {
  const clearCode = 1 << minCodeSize;
  const endCode = clearCode + 1;
  let codeSize = minCodeSize + 1;
  let nextCode = endCode + 1;

  const outputBytes = [];
  let bitBuffer = 0;
  let bitCount = 0;

  const pushCode = (code) => {
    bitBuffer |= code << bitCount;
    bitCount += codeSize;
    while (bitCount >= 8) {
      outputBytes.push(bitBuffer & 0xff);
      bitBuffer >>= 8;
      bitCount -= 8;
    }
  };

  const reset = () => {
    codeSize = minCodeSize + 1;
    nextCode = endCode + 1;
  };

  if (!indices.length) {
    pushCode(clearCode);
    pushCode(endCode);
    if (bitCount > 0) {
      outputBytes.push(bitBuffer & 0xff);
    }
    return new Uint8Array(outputBytes);
  }

  pushCode(clearCode);
  pushCode(indices[0]);
  for (let i = 1; i < indices.length; i += 1) {
    const code = indices[i];
    if (nextCode >= 4096) {
      // Reset dictionary before writing the next literal to keep the decoder aligned.
      pushCode(clearCode);
      reset();
      pushCode(code);
      continue;
    }
    pushCode(code);
    nextCode += 1;
    if (nextCode === 1 << codeSize && codeSize < 12) {
      codeSize += 1;
    }
  }
  pushCode(endCode);
  if (bitCount > 0) {
    outputBytes.push(bitBuffer & 0xff);
  }
  return new Uint8Array(outputBytes);
}

function bytesFromString(value) {
  return new TextEncoder().encode(value);
}

function wordLE(value) {
  return new Uint8Array([value & 0xff, (value >> 8) & 0xff]);
}

function toAsciiBytes(value, terminate = true) {
  const safe = String(value || "");
  const raw = new TextEncoder().encode(safe);
  const bytes = [];
  for (let i = 0; i < raw.length; i += 1) {
    bytes.push(raw[i] <= 0x7f ? raw[i] : 0x3f);
  }
  if (terminate) bytes.push(0x00);
  return bytes;
}

function formatExifTimestamp(date) {
  const pad2 = (value) => String(value).padStart(2, "0");
  return `${date.getFullYear()}:${pad2(date.getMonth() + 1)}:${pad2(date.getDate())} ${pad2(date.getHours())}:${pad2(date.getMinutes())}:${pad2(date.getSeconds())}`;
}

function stripEmojiForExif(value) {
  return String(value || "")
    .replace(/[\u200d\uFE0E\uFE0F\u20E3]/g, "")
    .replace(/[\u{1F1E6}-\u{1F1FF}]/gu, "")
    .replace(/\p{Extended_Pictographic}/gu, "");
}

function normalizeExifText(value, maxLen = 512) {
  return stripEmojiForExif(value).replace(/\s+/g, " ").trim().slice(0, maxLen);
}

function buildExifApp1Segment(meta) {
  const imageDescription = normalizeExifText(meta.imageDescription, 512);
  const artist = normalizeExifText(meta.artist, 512);
  const copyright = normalizeExifText(meta.copyright, 512);
  const software = normalizeExifText(meta.software, 512);
  const userCommentText = normalizeExifText(meta.userComment, 1024);
  const dateTime = normalizeExifText(meta.dateTime, 64);

  const ifd0Entries = [];
  if (imageDescription) ifd0Entries.push({ tag: 0x010e, type: 2, data: toAsciiBytes(imageDescription, true) });
  if (artist) ifd0Entries.push({ tag: 0x013b, type: 2, data: toAsciiBytes(artist, true) });
  if (software) ifd0Entries.push({ tag: 0x0131, type: 2, data: toAsciiBytes(software, true) });
  if (copyright) ifd0Entries.push({ tag: 0x8298, type: 2, data: toAsciiBytes(copyright, true) });
  if (dateTime) ifd0Entries.push({ tag: 0x0132, type: 2, data: toAsciiBytes(dateTime, true) });
  ifd0Entries.push({ tag: 0x8769, type: 4, value: 0, count: 1, isPointer: true });

  const exifEntries = [];
  if (dateTime) {
    exifEntries.push({ tag: 0x9003, type: 2, data: toAsciiBytes(dateTime, true) });
    exifEntries.push({ tag: 0x9004, type: 2, data: toAsciiBytes(dateTime, true) });
  }
  if (userCommentText) {
    const userCommentBytes = [
      ...toAsciiBytes("ASCII", false),
      0x00, 0x00, 0x00,
      ...toAsciiBytes(userCommentText, true),
    ];
    exifEntries.push({ tag: 0x9286, type: 7, data: userCommentBytes });
  }

  const ifd0Count = ifd0Entries.length;
  const exifCount = exifEntries.length;
  const ifd0Size = 2 + ifd0Count * 12 + 4;
  const exifIfdOffset = 8 + ifd0Size;
  const exifSize = 2 + exifCount * 12 + 4;
  let dataOffset = 8 + ifd0Size + exifSize;

  const assignOffsets = (entries) => {
    for (let i = 0; i < entries.length; i += 1) {
      const entry = entries[i];
      if (entry.isPointer) {
        entry.value = exifIfdOffset;
        entry.count = 1;
        continue;
      }
      const data = entry.data || [];
      entry.count = data.length;
      if (data.length > 4) {
        entry.value = dataOffset;
        dataOffset += data.length;
      }
    }
  };
  assignOffsets(ifd0Entries);
  assignOffsets(exifEntries);

  const tiffBytes = new Uint8Array(dataOffset);
  const view = new DataView(tiffBytes.buffer);
  tiffBytes[0] = 0x49;
  tiffBytes[1] = 0x49;
  view.setUint16(2, 0x2a, true);
  view.setUint32(4, 8, true);

  const writeIfd = (offset, entries, nextOffset = 0) => {
    view.setUint16(offset, entries.length, true);
    let cursor = offset + 2;
    for (let i = 0; i < entries.length; i += 1) {
      const entry = entries[i];
      view.setUint16(cursor, entry.tag, true);
      view.setUint16(cursor + 2, entry.type, true);
      view.setUint32(cursor + 4, entry.count || 0, true);
      if (entry.data && entry.data.length <= 4) {
        for (let j = 0; j < 4; j += 1) {
          tiffBytes[cursor + 8 + j] = entry.data[j] || 0;
        }
      } else {
        view.setUint32(cursor + 8, entry.value || 0, true);
      }
      if (entry.data && entry.data.length > 4 && entry.value) {
        tiffBytes.set(entry.data, entry.value);
      }
      cursor += 12;
    }
    view.setUint32(cursor, nextOffset, true);
  };

  writeIfd(8, ifd0Entries, 0);
  writeIfd(exifIfdOffset, exifEntries, 0);

  const exifHeader = new Uint8Array([0x45, 0x78, 0x69, 0x66, 0x00, 0x00]);
  const body = new Uint8Array(exifHeader.length + tiffBytes.length);
  body.set(exifHeader, 0);
  body.set(tiffBytes, exifHeader.length);
  const segmentLength = body.length + 2;
  const app1 = new Uint8Array(body.length + 4);
  app1[0] = 0xff;
  app1[1] = 0xe1;
  app1[2] = (segmentLength >> 8) & 0xff;
  app1[3] = segmentLength & 0xff;
  app1.set(body, 4);
  return app1;
}

function injectExifIntoJpeg(jpegBytes, app1Segment) {
  if (!jpegBytes || jpegBytes.length < 4 || jpegBytes[0] !== 0xff || jpegBytes[1] !== 0xd8) {
    return jpegBytes;
  }
  const chunks = [jpegBytes.slice(0, 2)];
  let pos = 2;
  let inserted = false;

  const isExifSegment = (start) => {
    if (start + 10 > jpegBytes.length) return false;
    return jpegBytes[start] === 0xff
      && jpegBytes[start + 1] === 0xe1
      && jpegBytes[start + 4] === 0x45
      && jpegBytes[start + 5] === 0x78
      && jpegBytes[start + 6] === 0x69
      && jpegBytes[start + 7] === 0x66
      && jpegBytes[start + 8] === 0x00
      && jpegBytes[start + 9] === 0x00;
  };

  while (pos < jpegBytes.length) {
    if (jpegBytes[pos] !== 0xff || pos + 1 >= jpegBytes.length) {
      chunks.push(jpegBytes.slice(pos));
      break;
    }
    const marker = jpegBytes[pos + 1];
    if (marker === 0xda) {
      if (!inserted) {
        chunks.push(app1Segment);
        inserted = true;
      }
      chunks.push(jpegBytes.slice(pos));
      break;
    }
    if (marker === 0xd9 || marker === 0x01 || (marker >= 0xd0 && marker <= 0xd7)) {
      chunks.push(jpegBytes.slice(pos, pos + 2));
      pos += 2;
      continue;
    }
    if (pos + 3 >= jpegBytes.length) {
      chunks.push(jpegBytes.slice(pos));
      break;
    }
    const segmentLen = (jpegBytes[pos + 2] << 8) | jpegBytes[pos + 3];
    const segmentEnd = pos + 2 + segmentLen;
    if (segmentLen < 2 || segmentEnd > jpegBytes.length) {
      chunks.push(jpegBytes.slice(pos));
      break;
    }
    if (isExifSegment(pos)) {
      pos = segmentEnd;
      continue;
    }
    chunks.push(jpegBytes.slice(pos, segmentEnd));
    if (!inserted && marker === 0xe0) {
      chunks.push(app1Segment);
      inserted = true;
    }
    pos = segmentEnd;
  }

  if (!inserted) {
    const merged = new Uint8Array(2 + app1Segment.length + (jpegBytes.length - 2));
    merged.set(jpegBytes.slice(0, 2), 0);
    merged.set(app1Segment, 2);
    merged.set(jpegBytes.slice(2), 2 + app1Segment.length);
    return merged;
  }
  const totalLength = chunks.reduce((sum, chunk) => sum + chunk.length, 0);
  const merged = new Uint8Array(totalLength);
  let offset = 0;
  for (let i = 0; i < chunks.length; i += 1) {
    merged.set(chunks[i], offset);
    offset += chunks[i].length;
  }
  return merged;
}

async function applyExifToJpegBlob(jpegBlob, exportedAt = new Date()) {
  const settings = state.exif;
  if (!settings?.enabled) {
    return jpegBlob;
  }
  const exifMeta = {
    artist: settings.artist,
    copyright: settings.copyright,
    imageDescription: settings.description,
    software: settings.software || `Foto-Collage PWA ${state.versionInfo.appVersion}`,
    userComment: state.watermark.text || "",
    dateTime: formatExifTimestamp(exportedAt),
  };
  const jpegBytes = new Uint8Array(await jpegBlob.arrayBuffer());
  const app1 = buildExifApp1Segment(exifMeta);
  const merged = injectExifIntoJpeg(jpegBytes, app1);
  return new Blob([merged], { type: "image/jpeg" });
}

function encodeAnimatedGif(frameIndexArrays, width, height, delaySeconds) {
  const palette = createGifPalette();
  const delayCs = clamp(Math.round(delaySeconds * 100), 1, 1000);
  const chunks = [];
  const push = (chunk) => chunks.push(chunk);

  push(bytesFromString("GIF89a"));
  push(wordLE(width));
  push(wordLE(height));
  push(new Uint8Array([0xf7, 0x00, 0x00]));
  push(palette);
  push(new Uint8Array([0x21, 0xff, 0x0b]));
  push(bytesFromString("NETSCAPE2.0"));
  push(new Uint8Array([0x03, 0x01, 0x00, 0x00, 0x00]));

  for (const indices of frameIndexArrays) {
    push(new Uint8Array([0x21, 0xf9, 0x04, 0x04, delayCs & 0xff, (delayCs >> 8) & 0xff, 0x00, 0x00]));
    push(new Uint8Array([0x2c, 0x00, 0x00, 0x00, 0x00]));
    push(wordLE(width));
    push(wordLE(height));
    push(new Uint8Array([0x00]));
    push(new Uint8Array([0x08]));
    const lzwData = lzwEncodeLiteral(indices, 8);
    for (let i = 0; i < lzwData.length; i += 255) {
      const size = Math.min(255, lzwData.length - i);
      push(new Uint8Array([size]));
      push(lzwData.slice(i, i + size));
    }
    push(new Uint8Array([0x00]));
  }

  push(new Uint8Array([0x3b]));
  return new Blob(chunks, { type: "image/gif" });
}

function createPdfFromJpegBytes(jpegBytes, width, height) {
  const encoder = new TextEncoder();
  const chunks = [];
  const offsets = [0];
  let length = 0;

  const push = (value) => {
    chunks.push(value);
    length += value.length;
  };
  const pushText = (text) => push(encoder.encode(text));
  const markOffset = () => offsets.push(length);

  pushText("%PDF-1.3\n");
  markOffset();
  pushText("1 0 obj\n<< /Type /Catalog /Pages 2 0 R >>\nendobj\n");
  markOffset();
  pushText("2 0 obj\n<< /Type /Pages /Kids [3 0 R] /Count 1 >>\nendobj\n");
  markOffset();
  pushText(`3 0 obj\n<< /Type /Page /Parent 2 0 R /MediaBox [0 0 ${width} ${height}] /Resources << /XObject << /Im0 4 0 R >> >> /Contents 5 0 R >>\nendobj\n`);
  markOffset();
  pushText(`4 0 obj\n<< /Type /XObject /Subtype /Image /Width ${width} /Height ${height} /ColorSpace /DeviceRGB /BitsPerComponent 8 /Filter /DCTDecode /Length ${jpegBytes.length} >>\nstream\n`);
  push(jpegBytes);
  pushText("\nendstream\nendobj\n");
  const content = `q\n${width} 0 0 ${height} 0 0 cm\n/Im0 Do\nQ\n`;
  markOffset();
  pushText(`5 0 obj\n<< /Length ${content.length} >>\nstream\n${content}endstream\nendobj\n`);

  const xrefOffset = length;
  pushText(`xref\n0 ${offsets.length}\n`);
  pushText("0000000000 65535 f \n");
  for (let i = 1; i < offsets.length; i += 1) {
    pushText(`${String(offsets[i]).padStart(10, "0")} 00000 n \n`);
  }
  pushText(`trailer\n<< /Size ${offsets.length} /Root 1 0 R >>\nstartxref\n${xrefOffset}\n%%EOF`);
  return new Blob(chunks, { type: "application/pdf" });
}

function drawBitmapCentered(ctx, bitmap, width, height) {
  const sourceWidth = bitmap.width || 1;
  const sourceHeight = bitmap.height || 1;
  const scale = Math.min(width / sourceWidth, height / sourceHeight);
  const drawWidth = Math.max(1, Math.round(sourceWidth * scale));
  const drawHeight = Math.max(1, Math.round(sourceHeight * scale));
  const drawX = Math.round((width - drawWidth) / 2);
  const drawY = Math.round((height - drawHeight) / 2);
  ctx.drawImage(bitmap, drawX, drawY, drawWidth, drawHeight);
}

async function waitForNextPaint() {
  await new Promise((resolve) => requestAnimationFrame(() => resolve()));
}

async function buildExportPayload() {
  const exportFormat = state.exportFormat;
  const canvas = createExportCanvas();
  if (exportFormat === "jpeg") {
    const rawBlob = await canvasToBlob(canvas, "image/jpeg", 0.92);
    const blob = await applyExifToJpegBlob(rawBlob, new Date());
    return { blob, filename: buildTimestampFilename("jpg"), mimeType: "image/jpeg" };
  }
  if (exportFormat === "pdf") {
    const jpegBlob = await canvasToBlob(canvas, "image/jpeg", 0.92);
    const jpegBytes = new Uint8Array(await jpegBlob.arrayBuffer());
    const pdfBlob = createPdfFromJpegBytes(jpegBytes, canvas.width, canvas.height);
    return { blob: pdfBlob, filename: buildTimestampFilename("pdf"), mimeType: "application/pdf" };
  }
  if (exportFormat === "gif") {
    setExportStatus(t("gifRendering"), true);
    await waitForNextPaint();
    const gifCanvas = document.createElement("canvas");
    gifCanvas.width = canvas.width;
    gifCanvas.height = canvas.height;
    const gifCtx = gifCanvas.getContext("2d");
    const palette = createGifPalette();
    const frames = [];
    const imageCells = state.cells.filter((cell) => cell.bitmap);
    const frameCount = Math.max(1, imageCells.length);
    if (imageCells.length === 0) {
      gifCtx.clearRect(0, 0, gifCanvas.width, gifCanvas.height);
      gifCtx.fillStyle = state.background;
      gifCtx.fillRect(0, 0, gifCanvas.width, gifCanvas.height);
      drawWatermark(gifCtx, gifCanvas.width, gifCanvas.height);
      const imageData = gifCtx.getImageData(0, 0, gifCanvas.width, gifCanvas.height);
      frames.push(imageDataToIndexed(imageData, palette));
    } else {
      for (let i = 0; i < imageCells.length; i += 1) {
        const frameNumber = i + 1;
        setExportStatus(format(t("gifRenderingFrame"), { current: frameNumber, total: frameCount }), true);
        await waitForNextPaint();
        gifCtx.clearRect(0, 0, gifCanvas.width, gifCanvas.height);
        gifCtx.fillStyle = state.background;
        gifCtx.fillRect(0, 0, gifCanvas.width, gifCanvas.height);
        drawBitmapCentered(gifCtx, imageCells[i].bitmap, gifCanvas.width, gifCanvas.height);
        drawWatermark(gifCtx, gifCanvas.width, gifCanvas.height);
        const imageData = gifCtx.getImageData(0, 0, gifCanvas.width, gifCanvas.height);
        frames.push(imageDataToIndexed(imageData, palette));
      }
    }
    const gifBlob = encodeAnimatedGif(frames, gifCanvas.width, gifCanvas.height, state.gifDelaySeconds);
    setExportStatus("", false);
    return { blob: gifBlob, filename: buildTimestampFilename("gif"), mimeType: "image/gif" };
  }

  const blob = await canvasToBlob(canvas, "image/png");
  return { blob, filename: buildTimestampFilename("png"), mimeType: "image/png" };
}

async function exportByDownload() {
  try {
    const payload = await buildExportPayload();
    downloadBlob(payload.blob, payload.filename);
    setExportStatus("", false);
  } catch {
    setExportStatus(t("exportFailed"), false);
  }
}

async function exportByShare() {
  try {
    const payload = await buildExportPayload();
    const file = new File([payload.blob], payload.filename, { type: payload.mimeType });
    if (canShareFiles(file)) {
      try {
        await navigator.share({
          files: [file],
          title: t("appTitle"),
          text: t("appTitle"),
        });
        return;
      } catch (error) {
        if (error?.name === "AbortError") {
          return;
        }
      }
    }
    downloadBlob(payload.blob, payload.filename);
  } catch {
    await exportByDownload();
  } finally {
    if (state.exportFormat !== "gif") {
      setExportStatus("", false);
    }
  }
}

function setUpdateStatus(message, showReload = false) {
  els.updateCheckStatus.textContent = message;
  els.updateCheckStatus.hidden = !message;
  els.reloadAppButton.hidden = !showReload;
}

async function performAppReload() {
  await state.serviceWorkerRegistration?.update().catch(() => {});
  window.location.reload();
}

async function fetchVersionInfo() {
  const response = await fetch("./version.json", { cache: "no-cache" });
  if (!response.ok) {
    throw new Error("Version file unavailable");
  }
  return normalizeVersionInfo(await response.json());
}

async function loadVersionInfo() {
  state.versionInfo = { ...DEFAULT_VERSION_INFO };
  renderVersionLabel();
}

async function checkForUpdates(options = {}) {
  const {
    showChecking = true,
    silentNoChange = false,
    silentError = false,
    promptOnAvailable = true,
  } = options;
  if (state.updateInProgress) return;
  state.updateInProgress = true;
  els.checkForUpdatesButton.disabled = true;
  if (showChecking) {
    setUpdateStatus(t("updateChecking"), false);
  }
  try {
    await state.serviceWorkerRegistration?.update();
    const remoteVersion = await fetchVersionInfo();
    if (!remoteVersion.appVersion || !remoteVersion.cacheVersion) {
      if (!silentError) {
        setUpdateStatus(t("updateVersionIncomplete"), false);
      }
      return;
    }
    if (versionSignature(remoteVersion) === versionSignature(DEFAULT_VERSION_INFO)) {
      if (!silentNoChange) {
        setUpdateStatus(t("updateNoChange"), false);
      }
      return;
    }
    const remoteLabel = remoteVersion.label ? ` \u00b7 ${remoteVersion.label}` : "";
    const updateMessage = `${t("updateAvailablePrefix")}: ${remoteVersion.appVersion} \u00b7 ${remoteVersion.cacheVersion}${remoteLabel}.`;
    if (!promptOnAvailable) {
      setUpdateStatus(`${updateMessage} ${t("updateAvailableAction")}`, true);
      return;
    }
    const shouldUpdateNow = await showConfirmDialog({
      title: t("updateConfirmTitle"),
      message: `${updateMessage} ${t("updatePromptQuestion")}`,
      confirmLabel: t("updateNow"),
    });
    if (shouldUpdateNow) {
      setUpdateStatus(t("updateApplying"), false);
      await performAppReload();
      return;
    }
    setUpdateStatus(t("updateDeferred"), false);
  } catch {
    if (!silentError) {
      setUpdateStatus(t("updateFailed"), false);
    }
  } finally {
    state.updateInProgress = false;
    els.checkForUpdatesButton.disabled = false;
  }
}

function registerServiceWorker() {
  if (!("serviceWorker" in navigator)) return;
  navigator.serviceWorker
    .register("./service-worker.js")
    .then((registration) => {
      state.serviceWorkerRegistration = registration;
    })
    .catch(() => {});
}

function renderSlotsStatusControls() {
  els.dropZone.addEventListener("dragenter", (event) => {
    event.preventDefault();
    els.dropZone.classList.remove("dragging");
  });
  els.dropZone.addEventListener("dragover", (event) => {
    event.preventDefault();
    els.dropZone.classList.remove("dragging");
  });
  els.dropZone.addEventListener("dragleave", (event) => {
    event.preventDefault();
    els.dropZone.classList.remove("dragging");
  });
  els.dropZone.addEventListener("drop", (event) => {
    event.preventDefault();
    els.dropZone.classList.remove("dragging");
  });
  els.fileInput.addEventListener("change", () => {
    void loadFiles(els.fileInput.files);
    els.fileInput.value = "";
  });
  els.dropZone.addEventListener("click", (event) => {
    if (!isTouchLikeDevice()) return;
    if (els.fileInput.disabled) return;
    if (event.target === els.fileInput) return;
    els.fileInput.click();
  });
  els.dropZone.addEventListener("keydown", (event) => {
    if (!isTouchLikeDevice()) return;
    if (els.fileInput.disabled) return;
    if (event.key !== "Enter" && event.key !== " ") return;
    event.preventDefault();
    els.fileInput.click();
  });
}

function wireControls() {
  els.layoutModeSuggestionApply?.addEventListener("click", () => {
    if (!els.layoutModeSelect) return;
    els.layoutModeSelect.value = "hex-pack";
    applyGrid();
  });
  els.layoutModeSelect?.addEventListener("change", () => {
    applyGrid();
  });
  els.gapInput.addEventListener("input", () => {
    applyGrid();
  });
  els.hexStepXInput?.addEventListener("input", () => {
    applyGrid();
  });
  els.hexStepYInput?.addEventListener("input", () => {
    applyGrid();
  });
  els.hexScaleXInput?.addEventListener("input", () => {
    applyGrid();
  });
  els.hexScaleYInput?.addEventListener("input", () => {
    applyGrid();
  });
  els.resetHexLayoutButton?.addEventListener("click", () => {
    const defaults = getDefaultLayoutSettings();
    state.hexStepXRatio = defaults.hexStepXRatio;
    state.hexStepYRatio = defaults.hexStepYRatio;
    state.hexUnitScaleX = defaults.hexUnitScaleX;
    state.hexUnitScaleY = defaults.hexUnitScaleY;
    updateHexTuningUi();
    applyGrid();
  });
  els.outerGapInput.addEventListener("input", () => {
    applyGrid();
  });
  els.backgroundInput.addEventListener("input", () => {
    applyGrid();
  });
  els.restartButton?.addEventListener("click", () => {
    restartWorkflow();
  });
  els.toStep2.addEventListener("click", () => setStep(2));
  els.toStep3.addEventListener("click", () => setStep(3));
  els.toStep4.addEventListener("click", () => setStep(4));
  document.querySelectorAll("[data-prev-step]").forEach((button) => {
    button.addEventListener("click", () => setStep(Number(button.dataset.prevStep)));
  });
  document.querySelectorAll("[data-step-target]").forEach((button) => {
    button.addEventListener("click", () => setStep(Number(button.dataset.stepTarget)));
  });
  els.prevCell.addEventListener("click", () => {
    if (isActiveFieldLockedByReorder()) return;
    state.selectedCell = (state.selectedCell - 1 + state.cells.length) % state.cells.length;
    renderAll();
  });
  els.nextCell.addEventListener("click", () => {
    if (isActiveFieldLockedByReorder()) return;
    state.selectedCell = (state.selectedCell + 1) % state.cells.length;
    renderAll();
  });
  els.flipHorizontalButton?.addEventListener("click", () => {
    if (isActiveFieldLockedByReorder()) return;
    toggleCellFlipX(state.selectedCell);
  });
  els.flipVerticalButton?.addEventListener("click", () => {
    if (isActiveFieldLockedByReorder()) return;
    toggleCellFlipY(state.selectedCell);
  });
  els.rotateLeftButton?.addEventListener("click", () => {
    if (isActiveFieldLockedByReorder()) return;
    rotateCellLeft(state.selectedCell);
  });
  els.toggleReorderMode?.addEventListener("click", () => {
    state.reorderMode = !state.reorderMode;
    state.reorderSourceIndex = null;
    updateReorderModeUi();
    syncEditor();
    renderPreview();
  });
  els.resetFocus.addEventListener("click", () => {
    if (isActiveFieldLockedByReorder()) return;
    const cell = state.cells[state.selectedCell];
    if (!cell) return;
    cell.focusX = 0;
    cell.focusY = 0;
    renderAll();
  });
  window.addEventListener("pointermove", handlePreviewPointerMove, { passive: false });
  window.addEventListener("pointerup", handlePreviewPointerUp);
  window.addEventListener("pointercancel", handlePreviewPointerUp);
  els.zoomInput.addEventListener("input", () => {
    if (isActiveFieldLockedByReorder()) return;
    setCellZoom(state.selectedCell, Number(els.zoomInput.value) || 1);
  });
  els.resetZoom.addEventListener("click", () => {
    if (isActiveFieldLockedByReorder()) return;
    setCellZoom(state.selectedCell, 1);
  });
  els.slotShapeSelect?.addEventListener("change", () => {
    if (isActiveFieldLockedByReorder()) return;
    if (state.isSyncingSlotShapeSelect) return;
    setSelectedSlotShape(String(els.slotShapeSelect.value || "rect"));
    updateLayoutModeSuggestion();
    syncEditor();
    renderPreview();
    renderExportPreview();
  });
  els.slotShapeSelect?.addEventListener("focus", () => {
    syncEditor();
  });
  els.textInput.addEventListener("input", () => {
    if (isActiveFieldLockedByReorder()) return;
    const cell = state.cells[state.selectedCell];
    if (!cell) return;
    cell.text = els.textInput.value;
    syncEditor();
    renderPreview();
    renderExportPreview();
  });
  els.textSizeInput.addEventListener("input", () => {
    if (isActiveFieldLockedByReorder()) return;
    const cell = state.cells[state.selectedCell];
    if (!cell) return;
    const value = clamp(Number(els.textSizeInput.value) || 48, 12, 160);
    cell.fontSize = value;
    els.textSizeInput.value = String(value);
    els.textSizeValue.textContent = String(value);
    syncEditor();
    renderPreview();
    renderExportPreview();
  });
  els.textFontSelect.addEventListener("change", () => {
    if (isActiveFieldLockedByReorder()) return;
    const cell = state.cells[state.selectedCell];
    if (!cell) return;
    cell.fontFamily = els.textFontSelect.value;
    syncEditor();
    renderPreview();
    renderExportPreview();
  });
  els.textBoldInput.addEventListener("change", () => {
    if (isActiveFieldLockedByReorder()) return;
    const cell = state.cells[state.selectedCell];
    if (!cell) return;
    cell.bold = els.textBoldInput.checked;
    syncEditor();
    renderPreview();
    renderExportPreview();
  });
  els.textItalicInput.addEventListener("change", () => {
    if (isActiveFieldLockedByReorder()) return;
    const cell = state.cells[state.selectedCell];
    if (!cell) return;
    cell.italic = els.textItalicInput.checked;
    syncEditor();
    renderPreview();
    renderExportPreview();
  });
  els.textColorInput.addEventListener("input", () => {
    if (isActiveFieldLockedByReorder()) return;
    const cell = state.cells[state.selectedCell];
    if (!cell) return;
    cell.color = els.textColorInput.value;
    syncEditor();
    renderPreview();
    renderExportPreview();
  });
  els.resetTextPosition.addEventListener("click", () => {
    if (isActiveFieldLockedByReorder()) return;
    const cell = state.cells[state.selectedCell];
    if (!cell) return;
    cell.textX = 0.5;
    cell.textY = DEFAULT_TEXT_Y;
    syncEditor();
    renderPreview();
    renderExportPreview();
  });
  els.replaceCell.addEventListener("click", () => {
    if (isActiveFieldLockedByReorder()) return;
    els.replaceInput.click();
  });
  els.deleteCell?.addEventListener("click", () => {
    if (isActiveFieldLockedByReorder()) return;
    clearCellImage(state.selectedCell);
    renderAll();
  });
  els.replaceInput.addEventListener("change", () => {
    if (isActiveFieldLockedByReorder()) {
      els.replaceInput.value = "";
      return;
    }
    const file = els.replaceInput.files?.[0];
    if (!file) return;
    void setCellImage(state.selectedCell, file).then(() => {
      renderAll();
    });
    els.replaceInput.value = "";
  });
  els.exportWidthInput.addEventListener("input", () => {
    const nextRaw = Number(els.exportWidthInput.value) || state.exportWidth;
    if (state.exportFormat === "gif") {
      state.exportWidth = clamp(nextRaw, GIF_EXPORT_MIN_WIDTH, GIF_EXPORT_MAX_WIDTH);
    } else {
      state.customExportWidth = clamp(nextRaw, EXPORT_WIDTH_MIN, EXPORT_WIDTH_MAX);
    }
    renderExportPreview();
  });
  els.exportFormatSelect.addEventListener("change", () => {
    updateExportFormatUi();
    renderExportPresets();
    setExportStatus("", false);
    renderExportPreview();
  });
  els.exportPresetSelect.addEventListener("change", () => {
    const nextId = String(els.exportPresetSelect.value || "free");
    if (!EXPORT_PRESETS.some((preset) => preset.id === nextId)) return;
    state.exportPresetId = nextId;
    updateExportFormatUi();
    renderExportPresets();
    renderExportPreview();
  });
  const watermarkHandler = (updates) => {
    state.watermark = { ...state.watermark, ...updates };
    saveWatermarkSettings();
    renderExportPreview();
  };
  els.watermarkTextInput.addEventListener("input", () => watermarkHandler({ text: els.watermarkTextInput.value }));
  els.watermarkPositionSelect.addEventListener("change", () => watermarkHandler({ position: els.watermarkPositionSelect.value }));
  els.watermarkFontSelect.addEventListener("change", () => watermarkHandler({ fontFamily: els.watermarkFontSelect.value }));
  els.watermarkColorInput.addEventListener("input", () => watermarkHandler({ color: els.watermarkColorInput.value }));
  els.watermarkSizeInput.addEventListener("input", () => {
    const value = clamp(Number(els.watermarkSizeInput.value) || 32, 12, 160);
    els.watermarkSizeValue.textContent = String(value);
    watermarkHandler({ size: value });
  });
  els.watermarkEnabledInput.addEventListener("change", () => watermarkHandler({ enabled: els.watermarkEnabledInput.checked }));
  const exifHandler = (updates) => {
    state.exif = { ...state.exif, ...updates };
    saveExifSettings();
    updateExifUiEnabledState();
  };
  els.exifEnabledInput?.addEventListener("change", () => exifHandler({ enabled: els.exifEnabledInput.checked }));
  els.exifArtistInput?.addEventListener("input", () => exifHandler({ artist: els.exifArtistInput.value }));
  els.exifCopyrightInput?.addEventListener("input", () => exifHandler({ copyright: els.exifCopyrightInput.value }));
  els.exifDescriptionInput?.addEventListener("input", () => exifHandler({ description: els.exifDescriptionInput.value }));
  els.exifSoftwareInput?.addEventListener("input", () => exifHandler({ software: els.exifSoftwareInput.value }));
  els.gifDelayInput.addEventListener("input", () => {
    const value = clamp(Number(els.gifDelayInput.value) || 1, 0.1, 10);
    state.gifDelaySeconds = value;
    els.gifDelayInput.value = value.toFixed(1);
    els.gifDelayValue.textContent = value.toFixed(1);
  });
  els.shareButton.addEventListener("click", () => {
    void exportByShare();
  });
  els.downloadButton.addEventListener("click", () => {
    void exportByDownload();
  });
  els.settingsButton.addEventListener("click", () => {
    setUpdateStatus("", false);
    setTipsStatus("");
    updateTipsControls();
    els.settingsDialog.showModal();
  });
  els.helpButton.addEventListener("click", () => {
    els.helpDialog.showModal();
    void loadReadmeContent();
  });
  els.safeAreaHelpButton?.addEventListener("click", () => {
    els.safeAreaDialog?.showModal();
  });
  els.autoFitSafeAreaButton?.addEventListener("click", () => {
    state.autoFitToSafeArea = !state.autoFitToSafeArea;
    updateAutoFitSafeAreaButtonLabel();
    renderExportPreview();
  });
  els.homeButton?.addEventListener("click", () => {
    if (state.uiMode === "form") {
      closeWordMaskStage();
      return;
    }
    setUiMode("launcher");
  });
  els.photoCollageStartButton?.addEventListener("click", () => {
    setUiMode("photo");
  });
  els.assistantStartButton?.addEventListener("click", () => {
    setAssistantStatus(
      state.assistantFiles.length
        ? format(t("assistantLoaded"), { count: state.assistantFiles.length })
        : t("assistantIdle"),
      false
    );
    renderAssistantSuggestions();
    els.assistantDialog?.showModal();
  });
  els.wordMaskStartButton?.addEventListener("click", () => {
    openWordMaskStage();
  });
  const onWordMaskInputChange = () => {
    syncWordMaskStateFromInputs();
    updateWordMaskFreeSizeUi();
    updateWordMaskStencilUi();
    renderWordMaskPreview();
  };
  els.wordMaskModeWordButton?.addEventListener("click", () => {
    setWordMaskMode("word");
    syncWordMaskInputsFromState();
    renderWordMaskPreview();
  });
  els.wordMaskModeMotifButton?.addEventListener("click", () => {
    setWordMaskMode("motif");
    syncWordMaskInputsFromState();
    renderWordMaskPreview();
  });
  els.wordMaskTabPhotos?.addEventListener("click", () => {
    setWordMaskTab("photos");
  });
  els.wordMaskTabSubtitle?.addEventListener("click", () => {
    setWordMaskTab("subtitle");
  });
  els.wordMaskTabExport?.addEventListener("click", () => {
    setWordMaskTab("export");
  });
  els.wordMaskToggleReorderButton?.addEventListener("click", () => {
    state.wordMask.reorderMode = !state.wordMask.reorderMode;
    state.wordMask.reorderSourceIndex = null;
    updateWordMaskReorderUi();
    renderWordMaskPhotoOrder();
  });
  els.wordMaskPresetSelect?.addEventListener("change", onWordMaskInputChange);
  els.wordMaskWidthInput?.addEventListener("input", onWordMaskInputChange);
  els.wordMaskHeightInput?.addEventListener("input", onWordMaskInputChange);
  els.wordMaskWordInput?.addEventListener("input", onWordMaskInputChange);
  els.wordMaskFontSelect?.addEventListener("change", onWordMaskInputChange);
  els.wordMaskSizeInput?.addEventListener("input", onWordMaskInputChange);
  els.wordMaskShapeSizeInput?.addEventListener("input", onWordMaskInputChange);
  els.wordMaskSpacingInput?.addEventListener("input", onWordMaskInputChange);
  els.wordMaskWordBoldInput?.addEventListener("change", onWordMaskInputChange);
  els.wordMaskWordItalicInput?.addEventListener("change", onWordMaskInputChange);
  els.wordMaskBackgroundInput?.addEventListener("input", onWordMaskInputChange);
  els.wordMaskSubtitleInput?.addEventListener("input", onWordMaskInputChange);
  els.wordMaskSubtitleFontSelect?.addEventListener("change", onWordMaskInputChange);
  els.wordMaskSubtitleSizeInput?.addEventListener("input", onWordMaskInputChange);
  els.wordMaskSubtitleBoldInput?.addEventListener("change", onWordMaskInputChange);
  els.wordMaskSubtitleItalicInput?.addEventListener("change", onWordMaskInputChange);
  els.wordMaskSubtitleColorInput?.addEventListener("input", onWordMaskInputChange);
  els.wordMaskOutputFormatSelect?.addEventListener("change", onWordMaskInputChange);
  els.wordMaskCanvas?.addEventListener("pointerdown", (event) => {
    startWordMaskSubtitleDrag(event);
  });
  els.wordMaskCanvas?.addEventListener("pointermove", (event) => {
    moveWordMaskSubtitleDrag(event);
  });
  els.wordMaskCanvas?.addEventListener("pointerup", (event) => {
    endWordMaskSubtitleDrag(event);
  });
  els.wordMaskCanvas?.addEventListener("pointercancel", (event) => {
    endWordMaskSubtitleDrag(event);
  });
  els.wordMaskPhotosInput?.addEventListener("change", () => {
    void loadWordMaskFiles(els.wordMaskPhotosInput.files);
    els.wordMaskPhotosInput.value = "";
  });
  els.wordMaskShufflePhotosButton?.addEventListener("click", () => {
    shuffleWordMaskPhotos();
  });
  els.wordMaskSaveButton?.addEventListener("click", () => {
    void saveWordMaskResult();
  });
  els.wordMaskShareButton?.addEventListener("click", () => {
    void shareWordMaskResult();
  });
  els.assistantFileInput?.addEventListener("change", () => {
    void analyzeAssistantFiles(els.assistantFileInput.files);
  });
  els.languageSelect.addEventListener("change", () => {
    applyLanguagePreference(els.languageSelect.value);
  });
  els.checkForUpdatesButton.addEventListener("click", () => {
    void checkForUpdates({
      showChecking: true,
      silentNoChange: false,
      silentError: false,
      promptOnAvailable: true,
    });
  });
  els.reloadAppButton.addEventListener("click", () => {
    void performAppReload();
  });
  els.settingsForm.addEventListener("submit", (event) => {
    event.preventDefault();
    els.settingsDialog.close();
  });
  els.helpForm.addEventListener("submit", (event) => {
    event.preventDefault();
    els.helpDialog.close();
  });
  els.safeAreaForm?.addEventListener("submit", (event) => {
    event.preventDefault();
    els.safeAreaDialog?.close();
  });
  els.tipForm?.addEventListener("submit", (event) => {
    event.preventDefault();
    if (els.tipDisableInput?.checked) {
      saveTipPreference(false);
      setTipsStatus(t("tipsDisabledInfo"));
    }
    els.tipDialog.close();
  });
  els.assistantForm?.addEventListener("submit", (event) => {
    event.preventDefault();
    els.assistantDialog?.close();
  });
  els.nextTipButton?.addEventListener("click", () => {
    const tips = getTipsForLanguage();
    if (!tips.length) return;
    const current = Number(els.tipDialog?.dataset.tipIndex || "0");
    renderTipOfDay(current + 1);
  });
  els.tipsResetButton?.addEventListener("click", () => {
    saveTipPreference(true);
    setTipsStatus(t("tipsReenabled"));
    showTipOfDayDialog({ force: true });
  });
  window.addEventListener("resize", () => {
    updateUploadUiForDevice();
    if (state.activeStep >= 3) {
      renderPreview();
      renderExportPreview();
    }
    if (els.wordMaskStage && !els.wordMaskStage.hidden) {
      renderWordMaskPreview();
    }
  });
}

function renderAllWithoutExport() {
  updateLayoutModeSuggestion();
  updatePresetActive();
  updateHexTuningUi();
  renderSlots();
  renderStatus();
  syncEditor();
}

function loadInitialPreferences() {
  const storedPreference = safeStorageGet(STORAGE_KEYS.language) || "auto";
  const preference = storedPreference === "auto" || storedPreference === "de" || storedPreference === "en" || storedPreference === "fr"
    ? storedPreference
    : "auto";
  state.languagePreference = preference;
  state.language = getEffectiveLanguage(preference);
  if (els.languageSelect) {
    els.languageSelect.value = preference;
  }
  document.documentElement.lang = state.language;
}

function loadInitialLayoutSettings() {
  const defaults = getDefaultLayoutSettings();
  let layout = defaults;
  const storedLayout = safeStorageGet(STORAGE_KEYS.layout);
  if (storedLayout) {
    try {
      layout = normalizeLayoutSettings(JSON.parse(storedLayout));
    } catch {
      layout = defaults;
    }
  }
  const presetMatch = PRESETS.find((preset) => preset.id === layout.presetId);
  state.activePresetId = presetMatch ? presetMatch.id : defaults.presetId;
  state.layoutMode = normalizeLayoutMode(layout.layoutMode);
  state.hexStepXRatio = layout.hexStepXRatio;
  state.hexStepYRatio = layout.hexStepYRatio;
  state.hexUnitScaleX = layout.hexUnitScaleX;
  state.hexUnitScaleY = layout.hexUnitScaleY;
  if (els.layoutModeSelect) {
    els.layoutModeSelect.value = state.layoutMode;
  }
  resetSlotShapeOverrides(getActiveLayoutDefinition());
  if (els.gapInput) {
    els.gapInput.value = String(layout.gap);
  }
  if (els.outerGapInput) {
    els.outerGapInput.value = String(layout.outerGap);
  }
  if (els.backgroundInput) {
    els.backgroundInput.value = layout.background;
  }
  updateHexTuningUi();
}

function init() {
  loadInitialPreferences();
  loadTipPreference();
  loadInitialLayoutSettings();
  loadWatermarkSettings();
  loadExifSettings();
  updateUploadUiForDevice();
  translateStaticUi();
  renderPresets();
  resetSlotShapeOverrides(getActiveLayoutDefinition());
  resizeCells(getActiveLayoutDefinition().slots.length);
  renderSlotsStatusControls();
  wireControls();
  setWordMaskTab(state.wordMask.activeTab || "photos");
  void ensureSvgStencilsLoaded().then(() => {
    if (els.wordMaskStage && !els.wordMaskStage.hidden) {
      renderWordMaskPreview();
    }
  });
  void loadVersionInfo().then(() => {
    renderVersionLabel();
    void checkForUpdates({ showChecking: false, silentNoChange: true, silentError: true, promptOnAvailable: true });
  });
  registerServiceWorker();
  updateExportActionButtons();
  applyGrid();
  renderAllWithoutExport();
  setUiMode("launcher", { scrollToTop: false });
  if (els.exportWidthInput) {
    els.exportWidthInput.value = String(state.exportWidth);
  }
  if (els.exportWidthValue) {
    els.exportWidthValue.textContent = String(state.exportWidth);
  }
  if (els.exportFormatSelect) {
    els.exportFormatSelect.value = state.exportFormat;
  }
  if (els.gifDelayInput) {
    els.gifDelayInput.value = state.gifDelaySeconds.toFixed(1);
  }
  if (els.gifDelayValue) {
    els.gifDelayValue.textContent = state.gifDelaySeconds.toFixed(1);
  }
  updateExportFormatUi();
  if (els.outerGapInput) {
    els.outerGapInput.value = String(state.outerGap);
  }
  if (els.outerGapValue) {
    els.outerGapValue.textContent = String(state.outerGap);
  }
  renderVersionLabel();
  setTimeout(() => {
    showTipOfDayDialog();
  }, 120);
}

init();

