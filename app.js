const I18N = window.THREADLINE_STUDIO_I18N || {};
const STORAGE_KEY = "threadline-studio-project";
const SETTINGS_KEY = "threadline-studio-settings";
const DEFAULT_VERSION = Object.freeze({
  appVersion: "0.1.50",
  cacheVersion: "v51",
  label: "Farbfokus mit zwei Zielfarben und zwei Pipetten",
});

const CONTROL_GROUPS = {
  corrections: [
    { key: "brightness", min: -100, max: 100, step: 1, value: 0, label: "Helligkeit" },
    { key: "contrast", min: -100, max: 100, step: 1, value: 0, label: "Kontrast" },
    { key: "saturation", min: -100, max: 100, step: 1, value: 0, label: "Saettigung" },
    { key: "blur", min: 0, max: 18, step: 0.2, value: 0, label: "Unschaerfe" },
    { key: "sharpen", min: 0, max: 4, step: 0.1, value: 0, label: "Schaerfen" },
  ],
  styles: [
    { key: "grayscale", min: 0, max: 100, step: 1, value: 0, label: "Graustufen" },
    { key: "blackwhite", min: 0, max: 255, step: 1, value: 0, label: "Schwarzweiss" },
    { key: "sepia", min: 0, max: 100, step: 1, value: 0, label: "Sepia" },
    { key: "duotone", min: 0, max: 100, step: 1, value: 0, label: "Duotone" },
    { key: "colorFocus", min: 0, max: 100, step: 1, value: 0, label: "Farbfokus", i18nKey: "styleColorFocus" },
    { key: "colorFocusTolerance", min: 0, max: 100, step: 1, value: 28, label: "Toleranz", i18nKey: "styleColorFocusTolerance" },
    { key: "vintage", min: 0, max: 100, step: 1, value: 0, label: "Vintage" },
    { key: "oilPaint", min: 0, max: 100, step: 1, value: 0, label: "Oelfarbe" },
    { key: "popArt", min: 0, max: 100, step: 1, value: 0, label: "Pop Art" },
    { key: "posterize", min: 0, max: 12, step: 1, value: 0, label: "Posterize" },
    { key: "halftone", min: 0, max: 18, step: 1, value: 0, label: "Halftone" },
  ],
  fx: [
    { key: "pixelate", min: 0, max: 60, step: 1, value: 0, label: "Pixelate" },
    { key: "glitch", min: 0, max: 100, step: 1, value: 0, label: "Glitch" },
    { key: "edges", min: 0, max: 100, step: 1, value: 0, label: "Konturen" },
    { key: "emboss", min: 0, max: 100, step: 1, value: 0, label: "Relief" },
    { key: "pencil", min: 0, max: 100, step: 1, value: 0, label: "Konturzeichnung" },
    { key: "lineBlend", min: 0, max: 1000, step: 1, value: 0, label: "Bleistiftpause", i18nKey: "fxLineBlend" },
    { key: "charcoal", min: 0, max: 100, step: 1, value: 0, label: "Kohle" },
    { key: "hueShift", min: -180, max: 180, step: 1, value: 0, label: "Farbton" },
    { key: "invert", min: 0, max: 100, step: 1, value: 0, label: "Invertieren" },
    { key: "vignette", min: 0, max: 100, step: 1, value: 0, label: "Vignette" },
    { key: "grain", min: 0, max: 100, step: 1, value: 0, label: "Filmkorn" },
    { key: "comic", min: 0, max: 100, step: 1, value: 0, label: "Comic" },
    { key: "silhouette", min: 0, max: 100, step: 1, value: 0, label: "Silhouette" },
    { key: "scanlines", min: 0, max: 100, step: 1, value: 0, label: "Scanlines" },
    { key: "focusCenter", min: 0, max: 100, step: 1, value: 0, label: "Fokus Mitte" },
    { key: "backgroundBlur", min: 0, max: 32, step: 1, value: 0, label: "Hintergrund weich" },
    { key: "overlayOpacity", min: 0, max: 100, step: 1, value: 0, label: "Overlay" },
    { key: "frame", min: 0, max: 100, step: 1, value: 0, label: "Rahmen" },
  ],
  morphology: [
    { key: "canny", min: 0, max: 100, step: 1, value: 0, label: "Canny" },
    { key: "dilation", min: 0, max: 100, step: 1, value: 0, label: "Dilatation" },
    { key: "erosion", min: 0, max: 100, step: 1, value: 0, label: "Erosion" },
    { key: "opening", min: 0, max: 100, step: 1, value: 0, label: "Opening" },
    { key: "closing", min: 0, max: 100, step: 1, value: 0, label: "Closing" },
    { key: "topHat", min: 0, max: 100, step: 1, value: 0, label: "Top Hat" },
    { key: "blackHat", min: 0, max: 100, step: 1, value: 0, label: "Black Hat" },
  ],
  patterns: [
    { key: "testPattern", min: 0, max: 100, step: 1, value: 0, label: "Testbild" },
    { key: "stripes", min: 0, max: 100, step: 1, value: 0, label: "Streifen" },
    { key: "checker", min: 0, max: 100, step: 1, value: 0, label: "Kariert" },
    { key: "dots", min: 0, max: 100, step: 1, value: 0, label: "Punkte" },
    { key: "diagonalLines", min: 0, max: 100, step: 1, value: 0, label: "Diagonal" },
    { key: "crosshatch", min: 0, max: 100, step: 1, value: 0, label: "Schraffur" },
    { key: "waves", min: 0, max: 100, step: 1, value: 0, label: "Wellen" },
    { key: "meshFence", min: 0, max: 100, step: 1, value: 0, label: "Maschendraht" },
    { key: "tireTracks", min: 0, max: 1000, step: 1, value: 0, label: "Reifenspuren" },
    { key: "fingerprint", min: 0, max: 1000, step: 1, value: 0, label: "Fingerabdruck" },
    { key: "topoLines", min: 0, max: 100, step: 1, value: 0, label: "Topografie" },
    { key: "staffLines", min: 0, max: 100, step: 1, value: 0, label: "Notenlinien" },
    { key: "blueprintGrid", min: 0, max: 100, step: 1, value: 0, label: "Blueprint" },
    { key: "zebra", min: 0, max: 100, step: 1, value: 0, label: "Zebra" },
    { key: "perforatedMetal", min: 0, max: 100, step: 1, value: 0, label: "Lochblech" },
    { key: "paperTexture", min: 0, max: 100, step: 1, value: 0, label: "Papier" },
    { key: "gradientWash", min: 0, max: 100, step: 1, value: 0, label: "Verlauf" },
  ],
  materials: [
    { key: "bottleGlass", min: 0, max: 1000, step: 1, value: 0, label: "Glasflasche" },
    { key: "frostedGlass", min: 0, max: 1000, step: 1, value: 0, label: "Milchglas" },
    { key: "raindrops", min: 0, max: 1000, step: 1, value: 0, label: "Regentropfen" },
    { key: "scratches", min: 0, max: 1000, step: 1, value: 0, label: "Kratzer" },
    { key: "plasticWrap", min: 0, max: 1000, step: 1, value: 0, label: "Folie" },
    { key: "paperFiber", min: 0, max: 1000, step: 1, value: 0, label: "Papierfaser" },
    { key: "cardboard", min: 0, max: 1000, step: 1, value: 0, label: "Karton" },
    { key: "newsprint", min: 0, max: 1000, step: 1, value: 0, label: "Zeitung" },
    { key: "thermalFax", min: 0, max: 1000, step: 1, value: 0, label: "Thermopapier" },
    { key: "brushedMetal", min: 0, max: 1000, step: 1, value: 0, label: "Metall" },
    { key: "concrete", min: 0, max: 1000, step: 1, value: 0, label: "Beton" },
    { key: "asphalt", min: 0, max: 1000, step: 1, value: 0, label: "Asphalt" },
    { key: "linen", min: 0, max: 1000, step: 1, value: 0, label: "Leinen" },
    { key: "meshFabric", min: 0, max: 1000, step: 1, value: 0, label: "Netzstoff" },
  ],
  atmosphere: [
    { key: "tvNoise", min: 0, max: 1000, step: 1, value: 0, label: "Fernsehrauschen" },
    { key: "crtDrift", min: 0, max: 1000, step: 1, value: 0, label: "CRT Drift" },
    { key: "jpegArtifacts", min: 0, max: 1000, step: 1, value: 0, label: "JPEG Artefakte" },
    { key: "printMisregister", min: 0, max: 1000, step: 1, value: 0, label: "Druckversatz" },
    { key: "overexposure", min: 0, max: 1000, step: 1, value: 0, label: "Ueberbelichtung" },
    { key: "lightLeak", min: 0, max: 1000, step: 1, value: 0, label: "Lichtleck" },
    { key: "dustScratches", min: 0, max: 1000, step: 1, value: 0, label: "Staub & Kratzer" },
    { key: "haze", min: 0, max: 1000, step: 1, value: 0, label: "Nebel" },
    { key: "shadowCast", min: 0, max: 1000, step: 1, value: 0, label: "Schattenwurf" },
    { key: "reflections", min: 0, max: 1000, step: 1, value: 0, label: "Spiegelung" },
    { key: "moire", min: 0, max: 1000, step: 1, value: 0, label: "Moire" },
    { key: "doubleExposure", min: 0, max: 1000, step: 1, value: 0, label: "Doppelbelichtung" },
  ],
  art: [
    { key: "gridDecay", min: 0, max: 1000, step: 1, value: 0, label: "Rasterzerfall", i18nKey: "artGridDecay" },
    { key: "dadaCollage", min: 0, max: 1000, step: 1, value: 0, label: "Dada Collage", i18nKey: "artDadaCollage" },
    { key: "cubistFacets", min: 0, max: 1000, step: 1, value: 0, label: "Kubistische Facetten", i18nKey: "artCubistFacets" },
    { key: "dreamLook", min: 0, max: 1000, step: 1, value: 0, label: "Traumlook", i18nKey: "artDreamLook" },
    { key: "asciiText", min: 0, max: 1000, step: 1, value: 0, label: "ASCII Text", i18nKey: "artAsciiText" },
    { key: "carpet", min: 0, max: 1000, step: 1, value: 0, label: "Teppich", i18nKey: "artCarpet" },
    { key: "mosaic", min: 0, max: 1000, step: 1, value: 0, label: "Mosaik", i18nKey: "artMosaic" },
    { key: "matrixRain", min: 0, max: 1000, step: 1, value: 0, label: "Matrix", i18nKey: "artMatrixRain" },
    { key: "candy", min: 0, max: 1000, step: 1, value: 0, label: "Candy", i18nKey: "artCandy" },
    { key: "neonLines", min: 0, max: 1000, step: 1, value: 0, label: "Neon Linien", i18nKey: "artNeonLines" },
    { key: "icehouse", min: 0, max: 1000, step: 1, value: 0, label: "Icehouse", i18nKey: "artIcehouse" },
    { key: "sandstorm", min: 0, max: 1000, step: 1, value: 0, label: "Sandsturm", i18nKey: "artSandstorm" },
    { key: "abstracted", min: 0, max: 1000, step: 1, value: 0, label: "Abstrakt", i18nKey: "artAbstracted" },
    { key: "feltMarker", min: 0, max: 1000, step: 1, value: 0, label: "Filzstift", i18nKey: "artFeltMarker" },
    { key: "linoCut", min: 0, max: 1000, step: 1, value: 0, label: "Linol-Schnitt", i18nKey: "artLinoCut" },
    { key: "pointillism", min: 0, max: 1000, step: 1, value: 0, label: "Pointillistisch", i18nKey: "artPointillism" },
    { key: "ballpointPen", min: 0, max: 1000, step: 1, value: 0, label: "Kugelschreiber", i18nKey: "artBallpointPen" },
    { key: "squashStretch", min: 0, max: 1000, step: 1, value: 0, label: "Stauchen & Dehnen", i18nKey: "artSquashStretch" },
    { key: "randomWords", min: 0, max: 1000, step: 1, value: 0, label: "Zufallswoerter", i18nKey: "artRandomWords" },
    { key: "minecraft", min: 0, max: 1000, step: 1, value: 0, label: "Minecraft", i18nKey: "artMinecraft" },
  ],
};

const state = {
  versionInfo: { ...DEFAULT_VERSION },
  settings: {
    languagePreference: "auto",
    themeMode: "dark",
    collapsiblePanels: {},
  },
  project: createDefaultProject(),
  deferredPrompt: null,
  sourceImage: null,
  focusColorPickingTarget: "",
  renderQueued: false,
  readmeText: "",
  updateInProgress: false,
};

const els = {
  previewCanvas: document.getElementById("previewCanvas"),
  emptyState: document.getElementById("emptyState"),
  emptyBodyText: document.getElementById("emptyBodyText"),
  imageInput: document.getElementById("imageInput"),
  resetImageButton: document.getElementById("resetImageButton"),
  fitButton: document.getElementById("fitButton"),
  centerButton: document.getElementById("centerButton"),
  zoomInput: document.getElementById("zoomInput"),
  panXInput: document.getElementById("panXInput"),
  panYInput: document.getElementById("panYInput"),
  rotationInput: document.getElementById("rotationInput"),
  zoomValue: document.getElementById("zoomValue"),
  panXValue: document.getElementById("panXValue"),
  panYValue: document.getElementById("panYValue"),
  rotationValue: document.getElementById("rotationValue"),
  rotateLeftButton: document.getElementById("rotateLeftButton"),
  rotateRightButton: document.getElementById("rotateRightButton"),
  flipXButton: document.getElementById("flipXButton"),
  flipYButton: document.getElementById("flipYButton"),
  correctionFields: document.getElementById("correctionFields"),
  styleFields: document.getElementById("styleFields"),
  colorFocusFields: document.getElementById("colorFocusFields"),
  fxFields: document.getElementById("fxFields"),
  morphologyFields: document.getElementById("morphologyFields"),
  patternFields: document.getElementById("patternFields"),
  materialFields: document.getElementById("materialFields"),
  atmosphereFields: document.getElementById("atmosphereFields"),
  artFields: document.getElementById("artFields"),
  duotoneDarkInput: document.getElementById("duotoneDarkInput"),
  duotoneLightInput: document.getElementById("duotoneLightInput"),
  overlayColorInput: document.getElementById("overlayColorInput"),
  focusColorInput: document.getElementById("focusColorInput"),
  focusColor2Input: document.getElementById("focusColor2Input"),
  focusColorPickerButton: document.getElementById("focusColorPickerButton"),
  focusColor2PickerButton: document.getElementById("focusColor2PickerButton"),
  exportFormatSelect: document.getElementById("exportFormatSelect"),
  exportWidthSelect: document.getElementById("exportWidthSelect"),
  qualityInput: document.getElementById("qualityInput"),
  qualityValue: document.getElementById("qualityValue"),
  exportButton: document.getElementById("exportButton"),
  shareImageButton: document.getElementById("shareImageButton"),
  settingsButton: document.getElementById("settingsButton"),
  settingsDialog: document.getElementById("settingsDialog"),
  languageSelect: document.getElementById("languageSelect"),
  downloadBackupButton: document.getElementById("downloadBackupButton"),
  backupInput: document.getElementById("backupInput"),
  clearProjectButton: document.getElementById("clearProjectButton"),
  checkUpdateButton: document.getElementById("checkUpdateButton"),
  reloadAppButton: document.getElementById("reloadAppButton"),
  updateCheckStatus: document.getElementById("updateCheckStatus"),
  projectMetaText: document.getElementById("projectMetaText"),
  versionText: document.getElementById("versionText"),
  autosaveBadge: document.getElementById("autosaveBadge"),
  installButton: document.getElementById("installButton"),
  canvasFrame: document.getElementById("canvasFrame"),
  themeToggleButton: document.getElementById("themeToggleButton"),
  themeStatusNote: document.getElementById("themeStatusNote"),
  helpDialog: document.getElementById("helpDialog"),
  readmeStatus: document.getElementById("readmeStatus"),
  readmeContent: document.getElementById("readmeContent"),
  openReadmeButton: document.getElementById("openReadmeButton"),
  confirmDialog: document.getElementById("confirmDialog"),
  confirmDialogTitle: document.getElementById("confirmDialogTitle"),
  confirmDialogMessage: document.getElementById("confirmDialogMessage"),
  confirmCancelButton: document.getElementById("confirmCancelButton"),
  confirmAcceptButton: document.getElementById("confirmAcceptButton"),
};

init();

function init() {
  loadLocalState();
  buildControlFields();
  initializeCollapsiblePanels();
  bindEvents();
  loadVersionInfo();
  applyTranslations();
  syncUiFromState();
  restoreSourceImage();
  registerServiceWorker();
  render();
  window.setTimeout(() => checkForUpdates(false), 1200);
}

function initializeCollapsiblePanels() {
  applyResponsiveLayout();
  document.querySelectorAll(".collapsible").forEach((panel) => {
    const panelKey = getPanelStorageKey(panel);
    const savedState = state.settings.collapsiblePanels?.[panelKey];
    panel.open = typeof savedState === "boolean" ? savedState : !isMobileLayout();
    panel.addEventListener("toggle", () => {
      state.settings.collapsiblePanels[panelKey] = panel.open;
      saveLocalState();
    });
  });
}

function getPanelStorageKey(panel) {
  return panel.id || panel.dataset.panelKey || panel.querySelector("h2")?.dataset?.i18n || "panel";
}

function applyResponsiveLayout() {
  document.body.classList.toggle("mobile-layout", isMobileLayout());
  document.body.classList.toggle("mobile-landscape", isMobileLandscape());
}

function isMobileLayout() {
  return window.innerWidth <= 1180 && window.innerHeight >= window.innerWidth;
}

function isMobileLandscape() {
  return window.innerWidth <= 1180 && window.innerWidth > window.innerHeight;
}

function createDefaultProject() {
  return {
    meta: {
      name: "Untitled",
      revision: 0,
      updatedAt: new Date().toISOString(),
    },
    source: {
      dataUrl: "",
      fileName: "",
      mimeType: "",
    },
    transform: {
      zoom: 1,
      panX: 0,
      panY: 0,
      rotation: 0,
      flipX: false,
      flipY: false,
    },
    corrections: Object.fromEntries(CONTROL_GROUPS.corrections.map((control) => [control.key, control.value])),
    styles: Object.fromEntries(CONTROL_GROUPS.styles.map((control) => [control.key, control.value])),
    fx: Object.fromEntries(CONTROL_GROUPS.fx.map((control) => [control.key, control.value])),
    morphology: Object.fromEntries(CONTROL_GROUPS.morphology.map((control) => [control.key, control.value])),
    patterns: Object.fromEntries(CONTROL_GROUPS.patterns.map((control) => [control.key, control.value])),
    materials: Object.fromEntries(CONTROL_GROUPS.materials.map((control) => [control.key, control.value])),
    atmosphere: Object.fromEntries(CONTROL_GROUPS.atmosphere.map((control) => [control.key, control.value])),
    art: Object.fromEntries(CONTROL_GROUPS.art.map((control) => [control.key, control.value])),
    colors: {
      duotoneDark: "#111111",
      duotoneLight: "#f8d48f",
      overlayColor: "#ff6a3d",
      focusColor: "#ff3b30",
      focusColor2: "#ffd400",
    },
    export: {
      format: "png",
      width: 2400,
      quality: 0.92,
    },
  };
}

function buildControlFields() {
  renderControls(els.correctionFields, CONTROL_GROUPS.corrections, "corrections");
  renderControls(els.styleFields, CONTROL_GROUPS.styles.filter((control) => !["colorFocus", "colorFocusTolerance"].includes(control.key)), "styles");
  renderControls(els.colorFocusFields, CONTROL_GROUPS.styles.filter((control) => ["colorFocus", "colorFocusTolerance"].includes(control.key)), "styles");
  renderControls(els.fxFields, CONTROL_GROUPS.fx, "fx");
  renderControls(els.morphologyFields, CONTROL_GROUPS.morphology, "morphology");
  renderControls(els.patternFields, CONTROL_GROUPS.patterns, "patterns");
  renderControls(els.materialFields, CONTROL_GROUPS.materials, "materials");
  renderControls(els.atmosphereFields, CONTROL_GROUPS.atmosphere, "atmosphere");
  renderControls(els.artFields, CONTROL_GROUPS.art, "art");
}

function renderControls(container, controls, groupKey) {
  container.innerHTML = "";
  for (const control of controls) {
    const label = document.createElement("label");
    label.className = "field";
    const title = document.createElement("span");
    title.dataset.controlI18n = control.i18nKey || "";
    title.dataset.controlFallback = control.label;
    title.textContent = control.i18nKey ? t(control.i18nKey) : control.label;
    const input = document.createElement("input");
    input.type = "range";
    input.min = String(control.min);
    input.max = String(control.max);
    input.step = String(control.step);
    input.value = String(control.value);
    input.dataset.group = groupKey;
    input.dataset.key = control.key;
    const output = document.createElement("strong");
    output.id = `${groupKey}-${control.key}-value`;
    output.textContent = formatControlValue(control, control.value);
    label.append(title, input, output);
    container.append(label);
  }
}

function bindEvents() {
  els.imageInput.addEventListener("change", async (event) => {
    const [file] = event.target.files || [];
    if (file) await loadImageFile(file);
    event.target.value = "";
  });

  els.canvasFrame.addEventListener("click", () => {
    if (!state.sourceImage && isMobileLayout()) {
      els.imageInput.click();
    }
  });

  document.querySelectorAll('input[type="range"][data-group]').forEach((input) => {
    input.addEventListener("input", handleControlInput);
  });

  [els.duotoneDarkInput, els.duotoneLightInput, els.overlayColorInput, els.focusColorInput, els.focusColor2Input].forEach((input) => {
    input.addEventListener("input", () => {
      state.project.colors.duotoneDark = els.duotoneDarkInput.value;
      state.project.colors.duotoneLight = els.duotoneLightInput.value;
      state.project.colors.overlayColor = els.overlayColorInput.value;
      state.project.colors.focusColor = els.focusColorInput.value;
      state.project.colors.focusColor2 = els.focusColor2Input.value;
      touchProject();
    });
  });

  els.focusColorPickerButton.addEventListener("click", () => {
    toggleFocusColorPicker("focusColor");
  });

  els.focusColor2PickerButton.addEventListener("click", () => {
    toggleFocusColorPicker("focusColor2");
  });

  [els.zoomInput, els.panXInput, els.panYInput, els.rotationInput].forEach((input) => {
    input.addEventListener("input", updateTransformFromInputs);
  });

  els.qualityInput.addEventListener("input", () => {
    state.project.export.quality = Number(els.qualityInput.value);
    syncUiFromState();
    saveLocalState();
  });
  els.exportFormatSelect.addEventListener("change", () => {
    state.project.export.format = els.exportFormatSelect.value;
    saveLocalState();
  });
  els.exportWidthSelect.addEventListener("change", () => {
    state.project.export.width = Number(els.exportWidthSelect.value);
    saveLocalState();
  });

  els.rotateLeftButton.addEventListener("click", () => nudgeRotation(-90));
  els.rotateRightButton.addEventListener("click", () => nudgeRotation(90));
  els.flipXButton.addEventListener("click", () => {
    state.project.transform.flipX = !state.project.transform.flipX;
    touchProject();
  });
  els.flipYButton.addEventListener("click", () => {
    state.project.transform.flipY = !state.project.transform.flipY;
    touchProject();
  });
  els.fitButton.addEventListener("click", fitToFrame);
  els.centerButton.addEventListener("click", () => {
    state.project.transform.panX = 0;
    state.project.transform.panY = 0;
    touchProject();
  });
  els.resetImageButton.addEventListener("click", resetEffects);
  els.exportButton.addEventListener("click", exportCurrentImage);
  els.shareImageButton.addEventListener("click", shareCurrentImage);
  els.settingsButton.addEventListener("click", () => {
    syncUiFromState();
    els.settingsDialog.showModal();
  });
  els.languageSelect.addEventListener("change", () => {
    state.settings.languagePreference = els.languageSelect.value;
    saveLocalState();
    applyTranslations();
  });
  els.themeToggleButton.addEventListener("click", () => {
    state.settings.themeMode = state.settings.themeMode === "dark" ? "light" : "dark";
    applyTheme();
    saveLocalState();
  });
  els.downloadBackupButton.addEventListener("click", downloadBackup);
  els.backupInput.addEventListener("change", async (event) => {
    const [file] = event.target.files || [];
    if (!file) return;
    importBackup(await file.text());
    event.target.value = "";
  });
  els.clearProjectButton.addEventListener("click", clearProject);
  els.checkUpdateButton.addEventListener("click", () => checkForUpdates(true));
  els.reloadAppButton.addEventListener("click", () => {
    void performAppReload();
  });
  els.openReadmeButton.addEventListener("click", () => {
    els.helpDialog.showModal();
    void loadReadmeContent();
  });
  els.installButton.addEventListener("click", async () => {
    if (!state.deferredPrompt) return;
    state.deferredPrompt.prompt();
    await state.deferredPrompt.userChoice;
    state.deferredPrompt = null;
    els.installButton.hidden = true;
  });

  window.addEventListener("beforeinstallprompt", (event) => {
    event.preventDefault();
    state.deferredPrompt = event;
    els.installButton.hidden = false;
  });

  window.addEventListener("resize", () => {
    applyResponsiveLayout();
    syncUiFromState();
    queueRender(true);
  });

  bindCanvasGestures();
}

function bindCanvasGestures() {
  let dragStart = null;
  const activePointers = new Map();
  let pinchStart = null;

  const onPointerDown = (event) => {
      if (state.focusColorPickingTarget && state.sourceImage) {
        event.preventDefault();
        pickFocusColorFromPoint(event.clientX, event.clientY);
        return;
    }
    els.canvasFrame.setPointerCapture(event.pointerId);
    activePointers.set(event.pointerId, { x: event.clientX, y: event.clientY });
    if (activePointers.size === 1) {
      dragStart = {
        x: event.clientX,
        y: event.clientY,
        panX: state.project.transform.panX,
        panY: state.project.transform.panY,
      };
    } else if (activePointers.size === 2) {
      const points = [...activePointers.values()];
      pinchStart = {
        distance: getDistance(points[0], points[1]),
        zoom: state.project.transform.zoom,
      };
    }
  };

  const onPointerMove = (event) => {
    if (!activePointers.has(event.pointerId)) return;
    activePointers.set(event.pointerId, { x: event.clientX, y: event.clientY });
    if (activePointers.size === 1 && dragStart) {
      const rect = els.canvasFrame.getBoundingClientRect();
      state.project.transform.panX = clamp(dragStart.panX + (event.clientX - dragStart.x) / rect.width, -1.25, 1.25);
      state.project.transform.panY = clamp(dragStart.panY + (event.clientY - dragStart.y) / rect.height, -1.25, 1.25);
      syncUiFromState();
      queueRender(true);
    } else if (activePointers.size === 2 && pinchStart) {
      const points = [...activePointers.values()];
      const nextDistance = getDistance(points[0], points[1]);
      state.project.transform.zoom = clamp(pinchStart.zoom * (nextDistance / Math.max(10, pinchStart.distance)), 0.5, 3);
      syncUiFromState();
      queueRender(true);
    }
  };

  const onPointerUp = (event) => {
    activePointers.delete(event.pointerId);
    if (activePointers.size === 0) {
      dragStart = null;
      pinchStart = null;
      saveLocalState();
      render();
    } else if (activePointers.size === 1) {
      const [point] = [...activePointers.values()];
      dragStart = {
        x: point.x,
        y: point.y,
        panX: state.project.transform.panX,
        panY: state.project.transform.panY,
      };
      pinchStart = null;
    }
  };

  els.canvasFrame.addEventListener("pointerdown", onPointerDown);
  els.canvasFrame.addEventListener("pointermove", onPointerMove);
  els.canvasFrame.addEventListener("pointerup", onPointerUp);
  els.canvasFrame.addEventListener("pointercancel", onPointerUp);
  els.canvasFrame.addEventListener("wheel", (event) => {
    event.preventDefault();
    state.project.transform.zoom = clamp(state.project.transform.zoom - event.deltaY * 0.0015, 0.5, 3);
    syncUiFromState();
    touchProject();
  }, { passive: false });
}

async function loadImageFile(file) {
  const dataUrl = await readFileAsDataUrl(file);
  state.project.source = {
    dataUrl,
    fileName: file.name,
    mimeType: file.type || "image/png",
  };
  await restoreSourceImage();
  fitToFrame();
}

async function restoreSourceImage() {
  if (!state.project.source.dataUrl) {
    state.sourceImage = null;
    syncUiFromState();
    render();
    return;
  }
  const image = await loadImage(state.project.source.dataUrl);
  state.sourceImage = image;
  syncUiFromState();
  render();
}

function handleControlInput(event) {
  const input = event.currentTarget;
  const group = input.dataset.group;
  const key = input.dataset.key;
  state.project[group][key] = Number(input.value);
  const config = CONTROL_GROUPS[group].find((item) => item.key === key);
  document.getElementById(`${group}-${key}-value`).textContent = formatControlValue(config, Number(input.value));
  touchProject();
}

function pickFocusColorFromPoint(clientX, clientY) {
  const targetKey = state.focusColorPickingTarget || "focusColor";
  const rect = els.previewCanvas.getBoundingClientRect();
  const x = clamp(Math.round(((clientX - rect.left) / Math.max(1, rect.width)) * els.previewCanvas.width), 0, els.previewCanvas.width - 1);
  const y = clamp(Math.round(((clientY - rect.top) / Math.max(1, rect.height)) * els.previewCanvas.height), 0, els.previewCanvas.height - 1);
  const ctx = els.previewCanvas.getContext("2d", { willReadFrequently: true });
  const pixel = ctx.getImageData(x, y, 1, 1).data;
  state.project.colors[targetKey] = rgbToHex(pixel[0], pixel[1], pixel[2]);
  state.focusColorPickingTarget = "";
  syncUiFromState();
  touchProject();
}

function toggleFocusColorPicker(targetKey) {
  state.focusColorPickingTarget = state.focusColorPickingTarget === targetKey ? "" : targetKey;
  syncUiFromState();
}

function updateTransformFromInputs() {
  state.project.transform.zoom = Number(els.zoomInput.value);
  state.project.transform.panX = Number(els.panXInput.value);
  state.project.transform.panY = Number(els.panYInput.value);
  state.project.transform.rotation = Number(els.rotationInput.value);
  touchProject();
}

function fitToFrame() {
  state.project.transform.zoom = 1;
  state.project.transform.panX = 0;
  state.project.transform.panY = 0;
  state.project.transform.rotation = 0;
  state.project.transform.flipX = false;
  state.project.transform.flipY = false;
  touchProject();
}

function resetEffects() {
  const next = createDefaultProject();
  next.source = { ...state.project.source };
  next.meta.revision = state.project.meta.revision + 1;
  next.meta.updatedAt = new Date().toISOString();
  state.project = next;
  syncUiFromState();
  restoreSourceImage();
  saveLocalState();
}

function nudgeRotation(delta) {
  state.project.transform.rotation = normalizeDegrees(state.project.transform.rotation + delta);
  touchProject();
}

function touchProject(skipRevision = false) {
  if (!skipRevision) {
    state.project.meta.revision += 1;
  }
  state.project.meta.updatedAt = new Date().toISOString();
  syncUiFromState();
  saveLocalState();
  queueRender();
}

function queueRender(skipSave = false) {
  if (state.renderQueued) return;
  state.renderQueued = true;
  requestAnimationFrame(() => {
    state.renderQueued = false;
    render();
    if (!skipSave) saveLocalState();
  });
}

function render() {
  const canvas = els.previewCanvas;
  updateCanvasFrameAspectRatio();
  ensurePreviewCanvasSize();
  const ctx = canvas.getContext("2d", { willReadFrequently: true });
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  if (!state.sourceImage) {
    els.emptyState.hidden = false;
    ctx.fillStyle = "#090a0c";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    return;
  }

  els.emptyState.hidden = true;
  const workingCanvas = document.createElement("canvas");
  workingCanvas.width = canvas.width;
  workingCanvas.height = canvas.height;
  const workingCtx = workingCanvas.getContext("2d", { willReadFrequently: true });
  drawBaseImage(workingCtx, workingCanvas.width, workingCanvas.height);
  applyEffects(workingCanvas, workingCtx);
  ctx.drawImage(workingCanvas, 0, 0);
}

function ensurePreviewCanvasSize() {
  const canvas = els.previewCanvas;
  const rect = canvas.getBoundingClientRect();
  const aspect = getFrameAspectRatio();
  const displayWidth = Math.max(320, Math.round(rect.width || canvas.clientWidth || 800));
  const heavyFxActive = hasHeavyPreviewEffects();
  const isMobile = window.innerWidth <= 820;
  const deviceScale = Math.min(window.devicePixelRatio || 1, isMobile ? 1.5 : 2);
  const maxDimension = isMobile
    ? (heavyFxActive ? 640 : 840)
    : (heavyFxActive ? 900 : 1280);

  let targetWidth = Math.round(displayWidth * deviceScale);
  targetWidth = Math.min(targetWidth, maxDimension);
  const targetHeight = Math.round(targetWidth / aspect);

  if (canvas.width !== targetWidth || canvas.height !== targetHeight) {
    canvas.width = targetWidth;
    canvas.height = targetHeight;
  }
}

function updateCanvasFrameAspectRatio() {
  els.canvasFrame.style.aspectRatio = state.sourceImage
    ? `${state.sourceImage.width} / ${state.sourceImage.height}`
    : "4 / 3";
}

function getFrameAspectRatio() {
  if (!state.sourceImage) return 4 / 3;
  return Math.max(0.3, state.sourceImage.width / Math.max(1, state.sourceImage.height));
}

function hasHeavyPreviewEffects() {
  const { styles, fx, corrections } = state.project;
  return (
    fx.pencil > 0
    || fx.charcoal > 0
    || fx.comic > 0
    || fx.edges > 0
    || fx.emboss > 0
    || styles.halftone > 0
    || fx.backgroundBlur > 0
    || corrections.blur > 0
    || corrections.sharpen > 0
  );
}

function drawBaseImage(ctx, width, height) {
  ctx.save();
  ctx.fillStyle = "#050607";
  ctx.fillRect(0, 0, width, height);
  ctx.translate(width / 2, height / 2);

  const { zoom, panX, panY, rotation, flipX, flipY } = state.project.transform;
  ctx.translate(panX * width * 0.45, panY * height * 0.45);
  ctx.rotate((rotation * Math.PI) / 180);
  ctx.scale(flipX ? -1 : 1, flipY ? -1 : 1);

  const image = state.sourceImage;
  const imageRatio = image.width / image.height;
  const canvasRatio = width / height;
  let drawWidth;
  let drawHeight;

  if (imageRatio > canvasRatio) {
    drawHeight = height * zoom;
    drawWidth = drawHeight * imageRatio;
  } else {
    drawWidth = width * zoom;
    drawHeight = drawWidth / imageRatio;
  }

  ctx.drawImage(image, -drawWidth / 2, -drawHeight / 2, drawWidth, drawHeight);
  ctx.restore();
}

function applyEffects(canvas, ctx) {
  const { corrections, styles, fx, morphology, patterns, materials, atmosphere, art, colors } = state.project;
  const edgeAmount = curveAmount(fx.edges / 100, isMobileLayout() ? 1.9 : 1.55, 0.34);
  const embossAmount = curveAmount(fx.emboss / 100, isMobileLayout() ? 1.95 : 1.6, 0.3);
  const pencilAmount = curveAmount(fx.pencil / 100, isMobileLayout() ? 1.55 : 1.35, 1);
  const lineBlendAmount = curveThousand(fx.lineBlend / 100, isMobileLayout() ? 1.45 : 1.25, 1);
  const charcoalAmount = curveAmount(fx.charcoal / 100, isMobileLayout() ? 2.25 : 1.8, 0.72);
  const comicAmount = curveAmount(fx.comic / 100, isMobileLayout() ? 2.25 : 1.85, 0.32);
  const focusBlurAmount = curveAmount(fx.backgroundBlur / 32, isMobileLayout() ? 1.7 : 1.35, 1) * 18;
  let imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  let data = imageData.data;

  applyBasicAdjustments(data, corrections, fx.hueShift);
  if (styles.colorFocus > 0) {
    applyColorFocus(data, styles.colorFocus / 100, [colors.focusColor, colors.focusColor2], styles.colorFocusTolerance / 100);
  }
  if (styles.grayscale > 0) applyGrayscale(data, styles.grayscale / 100);
  if (styles.blackwhite > 0) applyBlackWhite(data, styles.blackwhite);
  if (styles.sepia > 0) applySepia(data, styles.sepia / 100);
  if (styles.posterize > 0) applyPosterize(data, styles.posterize);
  if (styles.vintage > 0) applyVintage(data, styles.vintage / 100);
  if (styles.duotone > 0) applyDuotone(data, styles.duotone / 100, colors.duotoneDark, colors.duotoneLight);
  if (fx.invert > 0) applyInvert(data, fx.invert / 100);
  if (fx.silhouette > 0) applySilhouette(data, fx.silhouette / 100);

  ctx.putImageData(imageData, 0, 0);

  if (corrections.blur > 0) applyCanvasBlur(canvas, corrections.blur);
  if (focusBlurAmount > 0.1) applyFocusBlur(canvas, fx.focusCenter / 100 || 0.65, focusBlurAmount);
  if (corrections.sharpen > 0) {
    convolveCanvas(canvas, [0, -1, 0, -1, 5 + corrections.sharpen, -1, 0, -1, 0], 0.28 * corrections.sharpen);
  }
  if (edgeAmount > 0.001) convolveCanvas(canvas, [-1, -1, -1, -1, 8, -1, -1, -1, -1], edgeAmount);
  if (embossAmount > 0.001) convolveCanvas(canvas, [-2, -1, 0, -1, 1, 1, 0, 1, 2], embossAmount);
  if (pencilAmount > 0.001) applyContourTracing(canvas, pencilAmount);
  if (lineBlendAmount > 0.001) applyLineBlend(canvas, lineBlendAmount);
  if (charcoalAmount > 0.001) applyCharcoal(canvas, charcoalAmount);
  if (comicAmount > 0.001) applyComic(canvas, comicAmount);
  if (styles.oilPaint > 0) applyOilPaint(canvas, styles.oilPaint / 100);
  if (styles.popArt > 0) applyPopArt(canvas, styles.popArt / 100, colors.overlayColor);
  if (styles.halftone > 0) applyHalftone(canvas, styles.halftone);
  if (fx.pixelate > 0) applyPixelate(canvas, fx.pixelate);
  if (fx.glitch > 0) applyGlitch(canvas, fx.glitch / 100);
  applyMorphologyEffects(canvas, morphology);
  applyPatternEffects(canvas, patterns, colors);
  applyMaterialEffects(canvas, materials, colors);
  applyAtmosphereEffects(canvas, atmosphere, colors);
  applyArtEffects(canvas, art, colors);

  imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  data = imageData.data;

  if (fx.grain > 0) applyGrain(data, fx.grain / 100);
  if (fx.vignette > 0) applyVignette(data, canvas.width, canvas.height, fx.vignette / 100);
  if (fx.scanlines > 0) applyScanlines(data, canvas.width, canvas.height, fx.scanlines / 100);
  if (fx.overlayOpacity > 0) applyOverlay(data, colors.overlayColor, fx.overlayOpacity / 100);
  if (fx.frame > 0) applyFrame(data, canvas.width, canvas.height, fx.frame / 100);

  ctx.putImageData(imageData, 0, 0);
}

function applyBasicAdjustments(data, corrections, hueShift) {
  const brightness = corrections.brightness * 2.55;
  const contrastFactor = (259 * (corrections.contrast + 255)) / (255 * (259 - corrections.contrast));
  const saturation = 1 + corrections.saturation / 100;
  for (let i = 0; i < data.length; i += 4) {
    let r = data[i] + brightness;
    let g = data[i + 1] + brightness;
    let b = data[i + 2] + brightness;

    r = contrastFactor * (r - 128) + 128;
    g = contrastFactor * (g - 128) + 128;
    b = contrastFactor * (b - 128) + 128;

    const gray = 0.299 * r + 0.587 * g + 0.114 * b;
    r = gray + (r - gray) * saturation;
    g = gray + (g - gray) * saturation;
    b = gray + (b - gray) * saturation;

    if (hueShift !== 0) [r, g, b] = shiftHue(r, g, b, hueShift);

    data[i] = clamp(r, 0, 255);
    data[i + 1] = clamp(g, 0, 255);
    data[i + 2] = clamp(b, 0, 255);
  }
}

function applyGrayscale(data, amount) {
  for (let i = 0; i < data.length; i += 4) {
    const gray = 0.299 * data[i] + 0.587 * data[i + 1] + 0.114 * data[i + 2];
    data[i] = mix(data[i], gray, amount);
    data[i + 1] = mix(data[i + 1], gray, amount);
    data[i + 2] = mix(data[i + 2], gray, amount);
  }
}

function applyBlackWhite(data, threshold) {
  for (let i = 0; i < data.length; i += 4) {
    const gray = 0.299 * data[i] + 0.587 * data[i + 1] + 0.114 * data[i + 2];
    const value = gray > threshold ? 255 : 0;
    data[i] = value;
    data[i + 1] = value;
    data[i + 2] = value;
  }
}

function applySepia(data, amount) {
  for (let i = 0; i < data.length; i += 4) {
    const r = data[i];
    const g = data[i + 1];
    const b = data[i + 2];
    const nr = clamp(r * 0.393 + g * 0.769 + b * 0.189, 0, 255);
    const ng = clamp(r * 0.349 + g * 0.686 + b * 0.168, 0, 255);
    const nb = clamp(r * 0.272 + g * 0.534 + b * 0.131, 0, 255);
    data[i] = mix(r, nr, amount);
    data[i + 1] = mix(g, ng, amount);
    data[i + 2] = mix(b, nb, amount);
  }
}

function applyPosterize(data, amount) {
  const levels = Math.max(2, 16 - amount);
  const step = 255 / levels;
  for (let i = 0; i < data.length; i += 4) {
    data[i] = Math.round(data[i] / step) * step;
    data[i + 1] = Math.round(data[i + 1] / step) * step;
    data[i + 2] = Math.round(data[i + 2] / step) * step;
  }
}

function applyVintage(data, amount) {
  for (let i = 0; i < data.length; i += 4) {
    data[i] = clamp(data[i] + 18 * amount, 0, 255);
    data[i + 1] = clamp(data[i + 1] + 8 * amount, 0, 255);
    data[i + 2] = clamp(data[i + 2] - 20 * amount, 0, 255);
  }
}

function applyDuotone(data, amount, darkColor, lightColor) {
  const dark = hexToRgb(darkColor);
  const light = hexToRgb(lightColor);
  for (let i = 0; i < data.length; i += 4) {
    const gray = (0.299 * data[i] + 0.587 * data[i + 1] + 0.114 * data[i + 2]) / 255;
    const nr = dark.r + (light.r - dark.r) * gray;
    const ng = dark.g + (light.g - dark.g) * gray;
    const nb = dark.b + (light.b - dark.b) * gray;
    data[i] = mix(data[i], nr, amount);
    data[i + 1] = mix(data[i + 1], ng, amount);
    data[i + 2] = mix(data[i + 2], nb, amount);
  }
}

function applyColorFocus(data, amount, targetHexes, tolerance) {
  const focusTargets = (Array.isArray(targetHexes) ? targetHexes : [targetHexes])
    .filter(Boolean)
    .map((hex) => {
      const rgb = hexToRgb(hex);
      const [h, s, l] = rgbToHsl(rgb.r, rgb.g, rgb.b);
      return { h, s, l };
    });
  if (!focusTargets.length) return;
  const hueTolerance = 8 + tolerance * 96;
  const satThreshold = 0.08 + tolerance * 0.18;
  const softRange = 12 + tolerance * 48;

  for (let i = 0; i < data.length; i += 4) {
    const r = data[i];
    const g = data[i + 1];
    const b = data[i + 2];
    const gray = 0.299 * r + 0.587 * g + 0.114 * b;
    const [h, s, l] = rgbToHsl(r, g, b);
    let focusDistance = Number.POSITIVE_INFINITY;
    for (const target of focusTargets) {
      const hueDistance = getHueDistance(h, target.h);
      const satFactor = s <= satThreshold ? 1 : 1 - s * 0.55;
      const candidateDistance = hueDistance + satFactor * 44 + Math.abs(l - target.l) * 18 + Math.abs(s - target.s) * 12;
      if (candidateDistance < focusDistance) focusDistance = candidateDistance;
    }
    const preserve = 1 - smoothstep(hueTolerance, hueTolerance + softRange, focusDistance);
    const keepAmount = clamp(preserve * amount, 0, 1);
    data[i] = mix(gray, r, keepAmount);
    data[i + 1] = mix(gray, g, keepAmount);
    data[i + 2] = mix(gray, b, keepAmount);
  }
}

function applyInvert(data, amount) {
  for (let i = 0; i < data.length; i += 4) {
    data[i] = mix(data[i], 255 - data[i], amount);
    data[i + 1] = mix(data[i + 1], 255 - data[i + 1], amount);
    data[i + 2] = mix(data[i + 2], 255 - data[i + 2], amount);
  }
}

function applySilhouette(data, amount) {
  for (let i = 0; i < data.length; i += 4) {
    const gray = (0.299 * data[i] + 0.587 * data[i + 1] + 0.114 * data[i + 2]) / 255;
    const target = gray > 0.55 ? 255 : 20;
    data[i] = mix(data[i], target, amount);
    data[i + 1] = mix(data[i + 1], target, amount);
    data[i + 2] = mix(data[i + 2], target, amount);
  }
}

function applyGrain(data, amount) {
  for (let i = 0; i < data.length; i += 4) {
    const noise = (Math.random() - 0.5) * 90 * amount;
    data[i] = clamp(data[i] + noise, 0, 255);
    data[i + 1] = clamp(data[i + 1] + noise, 0, 255);
    data[i + 2] = clamp(data[i + 2] + noise, 0, 255);
  }
}

function applyVignette(data, width, height, amount) {
  const cx = width / 2;
  const cy = height / 2;
  const maxDistance = Math.hypot(cx, cy);
  for (let y = 0; y < height; y += 1) {
    for (let x = 0; x < width; x += 1) {
      const idx = (y * width + x) * 4;
      const distance = Math.hypot(x - cx, y - cy) / maxDistance;
      const factor = 1 - Math.max(0, distance - 0.25) * amount * 1.2;
      data[idx] *= factor;
      data[idx + 1] *= factor;
      data[idx + 2] *= factor;
    }
  }
}

function applyScanlines(data, width, height, amount) {
  for (let y = 0; y < height; y += 2) {
    const factor = 1 - amount * 0.22;
    for (let x = 0; x < width; x += 1) {
      const idx = (y * width + x) * 4;
      data[idx] *= factor;
      data[idx + 1] *= factor;
      data[idx + 2] *= factor;
    }
  }
}

function applyOverlay(data, colorHex, amount) {
  const color = hexToRgb(colorHex);
  for (let i = 0; i < data.length; i += 4) {
    data[i] = mix(data[i], color.r, amount * 0.45);
    data[i + 1] = mix(data[i + 1], color.g, amount * 0.45);
    data[i + 2] = mix(data[i + 2], color.b, amount * 0.45);
  }
}

function applyFrame(data, width, height, amount) {
  const frameSize = Math.round(Math.min(width, height) * 0.18 * amount);
  for (let y = 0; y < height; y += 1) {
    for (let x = 0; x < width; x += 1) {
      if (x < frameSize || x > width - frameSize || y < frameSize || y > height - frameSize) {
        const idx = (y * width + x) * 4;
        data[idx] = mix(data[idx], 245, 0.9);
        data[idx + 1] = mix(data[idx + 1], 240, 0.9);
        data[idx + 2] = mix(data[idx + 2], 232, 0.9);
      }
    }
  }
}

function applyCanvasBlur(canvas, strength) {
  const copy = document.createElement("canvas");
  copy.width = canvas.width;
  copy.height = canvas.height;
  const copyCtx = copy.getContext("2d");
  copyCtx.filter = `blur(${strength}px)`;
  copyCtx.drawImage(canvas, 0, 0);
  const ctx = canvas.getContext("2d");
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.drawImage(copy, 0, 0);
}

function convolveCanvas(canvas, kernel, amount) {
  if (amount <= 0) return;
  const ctx = canvas.getContext("2d", { willReadFrequently: true });
  const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  const result = ctx.createImageData(canvas.width, canvas.height);
  const src = imageData.data;
  const dst = result.data;
  const side = Math.round(Math.sqrt(kernel.length));
  const half = Math.floor(side / 2);
  for (let y = 0; y < canvas.height; y += 1) {
    for (let x = 0; x < canvas.width; x += 1) {
      const dstIndex = (y * canvas.width + x) * 4;
      for (let c = 0; c < 3; c += 1) {
        let sum = 0;
        for (let ky = 0; ky < side; ky += 1) {
          for (let kx = 0; kx < side; kx += 1) {
            const px = clamp(x + kx - half, 0, canvas.width - 1);
            const py = clamp(y + ky - half, 0, canvas.height - 1);
            const srcIndex = (py * canvas.width + px) * 4 + c;
            sum += src[srcIndex] * kernel[ky * side + kx];
          }
        }
        dst[dstIndex + c] = clamp(mix(src[dstIndex + c], sum, amount), 0, 255);
      }
      dst[dstIndex + 3] = src[dstIndex + 3];
    }
  }
  ctx.putImageData(result, 0, 0);
}

function applyPixelate(canvas, amount) {
  const scale = clamp(Math.round(amount), 1, 60);
  if (scale <= 1) return;
  const small = document.createElement("canvas");
  small.width = Math.max(1, Math.round(canvas.width / scale));
  small.height = Math.max(1, Math.round(canvas.height / scale));
  const smallCtx = small.getContext("2d");
  smallCtx.imageSmoothingEnabled = true;
  smallCtx.drawImage(canvas, 0, 0, small.width, small.height);
  const ctx = canvas.getContext("2d");
  ctx.imageSmoothingEnabled = false;
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.drawImage(small, 0, 0, canvas.width, canvas.height);
  ctx.imageSmoothingEnabled = true;
}

function applyGlitch(canvas, amount) {
  const ctx = canvas.getContext("2d");
  const slices = Math.max(2, Math.round(12 * amount));
  for (let i = 0; i < slices; i += 1) {
    const y = Math.random() * canvas.height;
    const h = Math.max(4, Math.random() * canvas.height * 0.08);
    const offset = (Math.random() - 0.5) * canvas.width * 0.1 * amount;
    ctx.drawImage(canvas, 0, y, canvas.width, h, offset, y, canvas.width, h);
  }
}

function applyHalftone(canvas, step) {
  const ctx = canvas.getContext("2d", { willReadFrequently: true });
  const source = ctx.getImageData(0, 0, canvas.width, canvas.height);
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "#f4efe6";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  const size = Math.max(4, 22 - step);
  for (let y = 0; y < canvas.height; y += size) {
    for (let x = 0; x < canvas.width; x += size) {
      const idx = (y * canvas.width + x) * 4;
      const gray = (source.data[idx] + source.data[idx + 1] + source.data[idx + 2]) / 3;
      const radius = (1 - gray / 255) * (size * 0.45);
      ctx.beginPath();
      ctx.fillStyle = "#101010";
      ctx.arc(x + size / 2, y + size / 2, radius, 0, Math.PI * 2);
      ctx.fill();
    }
  }
}

function applyContourTracing(canvas, amount) {
  const ctx = canvas.getContext("2d", { willReadFrequently: true });
  const source = ctx.getImageData(0, 0, canvas.width, canvas.height);
  const output = ctx.createImageData(canvas.width, canvas.height);
  const gray = new Float32Array(canvas.width * canvas.height);
  for (let i = 0, p = 0; i < source.data.length; i += 4, p += 1) {
    gray[p] = 0.299 * source.data[i] + 0.587 * source.data[i + 1] + 0.114 * source.data[i + 2];
  }

  const paper = 250 - amount * 8;
  const lineStrength = 0.18 + amount * 0.58;
  const shadeStrength = 0.02 + amount * 0.14;
  const softThreshold = 18 - amount * 10;
  const edgeCeiling = 96 + amount * 84;

  for (let y = 0; y < canvas.height; y += 1) {
    for (let x = 0; x < canvas.width; x += 1) {
      const index = y * canvas.width + x;
      const left = gray[y * canvas.width + Math.max(0, x - 1)];
      const right = gray[y * canvas.width + Math.min(canvas.width - 1, x + 1)];
      const top = gray[Math.max(0, y - 1) * canvas.width + x];
      const bottom = gray[Math.min(canvas.height - 1, y + 1) * canvas.width + x];
      const gx = right - left;
      const gy = bottom - top;
      const gradient = Math.sqrt(gx * gx + gy * gy);
      const edge = smoothstep(softThreshold, edgeCeiling, gradient);
      const luminanceShade = (255 - gray[index]) / 255;
      const tracedBase = clamp(
        paper - edge * 205 * lineStrength - luminanceShade * 52 * shadeStrength,
        18,
        252
      );
      const sourceGray = gray[index];
      const traced = clamp(mix(sourceGray, tracedBase, 0.22 + amount * 0.78), 18, 252);
      const outIndex = index * 4;
      output.data[outIndex] = traced;
      output.data[outIndex + 1] = traced;
      output.data[outIndex + 2] = traced;
      output.data[outIndex + 3] = source.data[outIndex + 3];
    }
  }

  ctx.putImageData(output, 0, 0);
  if (amount > 0.45) {
    convolveCanvas(canvas, [-1, -1, -1, -1, 8, -1, -1, -1, -1], Math.min(0.06, amount * 0.03));
  }
}

function applyLineBlend(canvas, amount) {
  const edgeCanvas = cloneCanvas(canvas);
  const embossCanvas = cloneCanvas(canvas);
  const traceCanvas = cloneCanvas(canvas);
  const cannyCanvas = cloneCanvas(canvas);
  const progress = clamp(amount, 0, 1);
  const turbo = Math.max(0, amount - 1);

  convolveCanvas(edgeCanvas, [-1, -1, -1, -1, 8, -1, -1, -1, -1], 0.12 + progress * 0.16 + turbo * 0.08);
  convolveCanvas(embossCanvas, [-2, -1, 0, -1, 1, 1, 0, 1, 2], 0.16 + progress * 0.24 + turbo * 0.1);
  applyContourTracing(traceCanvas, 0.28 + progress * 0.84 + turbo * 0.18);
  applyCannyLikeEdges(cannyCanvas, 0.24 + progress * 0.7 + turbo * 0.16);

  const baseCtx = canvas.getContext("2d", { willReadFrequently: true });
  const base = baseCtx.getImageData(0, 0, canvas.width, canvas.height);
  const edge = edgeCanvas.getContext("2d", { willReadFrequently: true }).getImageData(0, 0, canvas.width, canvas.height).data;
  const emboss = embossCanvas.getContext("2d", { willReadFrequently: true }).getImageData(0, 0, canvas.width, canvas.height).data;
  const trace = traceCanvas.getContext("2d", { willReadFrequently: true }).getImageData(0, 0, canvas.width, canvas.height).data;
  const canny = cannyCanvas.getContext("2d", { willReadFrequently: true }).getImageData(0, 0, canvas.width, canvas.height).data;

  for (let i = 0; i < base.data.length; i += 4) {
    const baseGray = (base.data[i] + base.data[i + 1] + base.data[i + 2]) / 3;
    const edgeGray = (edge[i] + edge[i + 1] + edge[i + 2]) / 3;
    const embossGray = (emboss[i] + emboss[i + 1] + emboss[i + 2]) / 3;
    const traceGray = (trace[i] + trace[i + 1] + trace[i + 2]) / 3;
    const cannyGray = (canny[i] + canny[i + 1] + canny[i + 2]) / 3;
    const composite = clamp(
      traceGray * (0.64 + turbo * 0.08)
      + edgeGray * (0.11 + turbo * 0.02)
      + embossGray * (0.15 + turbo * 0.06)
      + cannyGray * (0.1 + turbo * 0.05),
      0,
      255
    );
    const mixed = clamp(mix(baseGray, composite, 0.22 + progress * 0.72 + turbo * 0.08), 0, 255);
    base.data[i] = mixed;
    base.data[i + 1] = mixed;
    base.data[i + 2] = mixed;
  }
  baseCtx.putImageData(base, 0, 0);
}

function applyMorphologyEffects(canvas, morphology) {
  const cannyAmount = curveAmount(morphology.canny / 100, isMobileLayout() ? 1.35 : 1.15, 1);
  const dilationAmount = curveAmount(morphology.dilation / 100, 1.1, 1);
  const erosionAmount = curveAmount(morphology.erosion / 100, 1.1, 1);
  const openingAmount = curveAmount(morphology.opening / 100, 1.15, 1);
  const closingAmount = curveAmount(morphology.closing / 100, 1.15, 1);
  const topHatAmount = curveAmount(morphology.topHat / 100, 1.05, 1);
  const blackHatAmount = curveAmount(morphology.blackHat / 100, 1.05, 1);

  if (cannyAmount > 0.001) applyCannyLikeEdges(canvas, cannyAmount);
  if (dilationAmount > 0.001) applyMorphologyMix(canvas, "dilate", dilationAmount);
  if (erosionAmount > 0.001) applyMorphologyMix(canvas, "erode", erosionAmount);
  if (openingAmount > 0.001) applyMorphologyMix(canvas, "open", openingAmount);
  if (closingAmount > 0.001) applyMorphologyMix(canvas, "close", closingAmount);
  if (topHatAmount > 0.001) applyMorphologyMix(canvas, "tophat", topHatAmount);
  if (blackHatAmount > 0.001) applyMorphologyMix(canvas, "blackhat", blackHatAmount);
}

function applyCharcoal(canvas, amount) {
  const ctx = canvas.getContext("2d", { willReadFrequently: true });
  const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  const data = imageData.data;
  applyGrayscale(data, 1);
  for (let i = 0; i < data.length; i += 4) {
    const gray = data[i];
    const noisy = clamp(gray + (Math.random() - 0.5) * (24 + amount * 48), 0, 255);
    const value = noisy > 164 ? 245 : noisy > 112 ? 132 : noisy > 64 ? 62 : 18;
    data[i] = value;
    data[i + 1] = value;
    data[i + 2] = value;
  }
  ctx.putImageData(imageData, 0, 0);
}

function applyComic(canvas, amount) {
  const ctx = canvas.getContext("2d", { willReadFrequently: true });
  const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  applyPosterize(imageData.data, Math.round(4 + amount * 6));
  ctx.putImageData(imageData, 0, 0);
  convolveCanvas(canvas, [-1, -1, -1, -1, 8, -1, -1, -1, -1], amount);
}

function applyOilPaint(canvas, amount) {
  const source = cloneCanvas(canvas);
  const sourceCtx = source.getContext("2d", { willReadFrequently: true });
  const src = sourceCtx.getImageData(0, 0, canvas.width, canvas.height);
  const dst = new ImageData(canvas.width, canvas.height);
  const radius = Math.max(1, Math.round(1 + amount * 3));
  const levels = Math.max(4, Math.round(10 - amount * 4));

  for (let y = 0; y < canvas.height; y += 1) {
    for (let x = 0; x < canvas.width; x += 1) {
      const buckets = new Array(levels).fill(null).map(() => ({ count: 0, r: 0, g: 0, b: 0 }));
      for (let ky = -radius; ky <= radius; ky += 1) {
        for (let kx = -radius; kx <= radius; kx += 1) {
          const px = clamp(x + kx, 0, canvas.width - 1);
          const py = clamp(y + ky, 0, canvas.height - 1);
          const index = (py * canvas.width + px) * 4;
          const gray = (src.data[index] + src.data[index + 1] + src.data[index + 2]) / 3;
          const bucketIndex = clamp(Math.floor((gray / 255) * (levels - 1)), 0, levels - 1);
          const bucket = buckets[bucketIndex];
          bucket.count += 1;
          bucket.r += src.data[index];
          bucket.g += src.data[index + 1];
          bucket.b += src.data[index + 2];
        }
      }
      const dominant = buckets.reduce((best, bucket) => (bucket.count > best.count ? bucket : best), buckets[0]);
      const out = (y * canvas.width + x) * 4;
      dst.data[out] = dominant.count ? dominant.r / dominant.count : src.data[out];
      dst.data[out + 1] = dominant.count ? dominant.g / dominant.count : src.data[out + 1];
      dst.data[out + 2] = dominant.count ? dominant.b / dominant.count : src.data[out + 2];
      dst.data[out + 3] = src.data[out + 3];
    }
  }

  const ctx = canvas.getContext("2d", { willReadFrequently: true });
  const mixed = mixImageData(src, dst, 0.22 + amount * 0.62);
  ctx.putImageData(mixed, 0, 0);
}

function applyPopArt(canvas, amount, overlayHex) {
  const ctx = canvas.getContext("2d", { willReadFrequently: true });
  const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  const data = imageData.data;
  const accent = hexToRgb(overlayHex);
  const palette = [
    { r: 18, g: 26, b: 31 },
    { r: 255, g: 241, b: 86 },
    { r: accent.r, g: accent.g, b: accent.b },
    { r: 60, g: 170, b: 255 },
    { r: 255, g: 113, b: 163 },
  ];

  for (let i = 0; i < data.length; i += 4) {
    const gray = (data[i] + data[i + 1] + data[i + 2]) / 3;
    const band = clamp(Math.floor((gray / 255) * palette.length), 0, palette.length - 1);
    const tone = palette[band];
    const mixAmount = 0.35 + amount * 0.55;
    data[i] = mix(data[i], tone.r, mixAmount);
    data[i + 1] = mix(data[i + 1], tone.g, mixAmount);
    data[i + 2] = mix(data[i + 2], tone.b, mixAmount);
  }

  ctx.putImageData(imageData, 0, 0);
  if (amount > 0.18) {
    convolveCanvas(canvas, [-1, -1, -1, -1, 8, -1, -1, -1, -1], 0.12 + amount * 0.18);
  }
}

function applyCannyLikeEdges(canvas, amount) {
  const source = canvas.getContext("2d", { willReadFrequently: true }).getImageData(0, 0, canvas.width, canvas.height);
  const gray = toGrayscaleArray(source.data);
  const blurred = boxBlurGray(gray, canvas.width, canvas.height, amount < 0.45 ? 1 : 2);
  const gradient = computeSobelGradient(blurred, canvas.width, canvas.height);
  const out = source.data.slice();
  const low = 16 + amount * 22;
  const high = 48 + amount * 84;
  const mixAmount = 0.1 + amount * 0.5;

  for (let i = 0, p = 0; i < out.length; i += 4, p += 1) {
    const edge = smoothstep(low, high, gradient[p]);
    const value = clamp(255 - edge * 255, 0, 255);
    const mixed = mix((out[i] + out[i + 1] + out[i + 2]) / 3, value, mixAmount);
    out[i] = mixed;
    out[i + 1] = mixed;
    out[i + 2] = mixed;
  }

  const ctx = canvas.getContext("2d", { willReadFrequently: true });
  const imageData = ctx.createImageData(canvas.width, canvas.height);
  imageData.data.set(out);
  ctx.putImageData(imageData, 0, 0);
}

function applyMorphologyMix(canvas, mode, amount) {
  const sourceCanvas = cloneCanvas(canvas);
  const sourceCtx = sourceCanvas.getContext("2d", { willReadFrequently: true });
  const sourceData = sourceCtx.getImageData(0, 0, canvas.width, canvas.height);
  const resultData = applyMorphologyToImageData(sourceData, canvas.width, canvas.height, mode, amount);
  const ctx = canvas.getContext("2d", { willReadFrequently: true });
  ctx.putImageData(resultData, 0, 0);
}

function applyFocusBlur(canvas, focusAmount, blurAmount) {
  const ctx = canvas.getContext("2d");
  const sharpCopy = document.createElement("canvas");
  sharpCopy.width = canvas.width;
  sharpCopy.height = canvas.height;
  sharpCopy.getContext("2d").drawImage(canvas, 0, 0);

  const blurred = document.createElement("canvas");
  blurred.width = canvas.width;
  blurred.height = canvas.height;
  const blurredCtx = blurred.getContext("2d");
  blurredCtx.filter = `blur(${blurAmount}px)`;
  blurredCtx.drawImage(canvas, 0, 0);

  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.drawImage(blurred, 0, 0);

  const radius = Math.min(canvas.width, canvas.height) * clamp(0.18 + focusAmount * 0.34, 0.2, 0.55);
  ctx.save();
  ctx.beginPath();
  ctx.arc(canvas.width / 2, canvas.height / 2, radius, 0, Math.PI * 2);
  ctx.clip();
  ctx.drawImage(sharpCopy, 0, 0);
  ctx.restore();
}

function applyPatternEffects(canvas, patterns, colors) {
  const ctx = canvas.getContext("2d");
  const accent = hexToRgb(colors.overlayColor);
  const soft = hexToRgb(colors.duotoneLight);
  const dark = hexToRgb(colors.duotoneDark);

  if (patterns.testPattern > 0) {
    drawTestPattern(ctx, canvas, patterns.testPattern / 100);
  }

  if (patterns.gradientWash > 0) {
    const amount = patterns.gradientWash / 100;
    const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
    gradient.addColorStop(0, rgbaString(soft, 0.08 + amount * 0.18));
    gradient.addColorStop(0.52, rgbaString(accent, 0.03 + amount * 0.12));
    gradient.addColorStop(1, rgbaString(dark, 0.02 + amount * 0.16));
    ctx.save();
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.restore();
  }

  if (patterns.paperTexture > 0) {
    const amount = patterns.paperTexture / 100;
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const data = imageData.data;
    const tint = 6 + amount * 12;
    for (let i = 0; i < data.length; i += 4) {
      const noise = (Math.random() - 0.5) * (10 + amount * 18);
      data[i] = clamp(data[i] + noise + tint, 0, 255);
      data[i + 1] = clamp(data[i + 1] + noise + tint * 0.95, 0, 255);
      data[i + 2] = clamp(data[i + 2] + noise + tint * 0.82, 0, 255);
    }
    ctx.putImageData(imageData, 0, 0);
  }

  if (patterns.stripes > 0) {
    const amount = patterns.stripes / 100;
    drawLinePattern(ctx, canvas, {
      spacing: Math.max(8, Math.round(28 - amount * 18)),
      lineWidth: Math.max(1, 1 + amount * 3),
      angle: 0,
      color: rgbaString(accent, 0.08 + amount * 0.18),
    });
  }

  if (patterns.diagonalLines > 0) {
    const amount = patterns.diagonalLines / 100;
    drawLinePattern(ctx, canvas, {
      spacing: Math.max(10, Math.round(34 - amount * 20)),
      lineWidth: Math.max(1, 1 + amount * 2.5),
      angle: -35,
      color: rgbaString(soft, 0.08 + amount * 0.18),
    });
  }

  if (patterns.crosshatch > 0) {
    const amount = patterns.crosshatch / 100;
    drawLinePattern(ctx, canvas, {
      spacing: Math.max(10, Math.round(36 - amount * 20)),
      lineWidth: Math.max(1, 0.8 + amount * 2),
      angle: 35,
      color: rgbaString(accent, 0.06 + amount * 0.14),
    });
    drawLinePattern(ctx, canvas, {
      spacing: Math.max(10, Math.round(36 - amount * 20)),
      lineWidth: Math.max(1, 0.8 + amount * 2),
      angle: -35,
      color: rgbaString(dark, 0.04 + amount * 0.12),
    });
  }

  if (patterns.checker > 0) {
    const amount = patterns.checker / 100;
    drawCheckerPattern(ctx, canvas, {
      size: Math.max(10, Math.round(42 - amount * 24)),
      colorA: rgbaString(accent, 0.04 + amount * 0.12),
      colorB: rgbaString(soft, 0.03 + amount * 0.08),
    });
  }

  if (patterns.dots > 0) {
    const amount = patterns.dots / 100;
    drawDotPattern(ctx, canvas, {
      spacing: Math.max(12, Math.round(34 - amount * 18)),
      radius: Math.max(1.5, 1.2 + amount * 4),
      color: rgbaString(accent, 0.08 + amount * 0.16),
    });
  }

  if (patterns.waves > 0) {
    const amount = patterns.waves / 100;
    drawWavePattern(ctx, canvas, {
      spacing: Math.max(18, Math.round(46 - amount * 22)),
      amplitude: 4 + amount * 12,
      color: rgbaString(soft, 0.06 + amount * 0.14),
      lineWidth: Math.max(1, 1 + amount * 2),
    });
  }

  if (patterns.meshFence > 0) {
    const amount = patterns.meshFence / 100;
    drawDiamondMesh(ctx, canvas, {
      size: Math.max(18, Math.round(46 - amount * 24)),
      lineWidth: Math.max(1.2, 1 + amount * 2.4),
      color: rgbaString(dark, 0.08 + amount * 0.2),
    });
  }

  if (patterns.tireTracks > 0) {
    const amount = patterns.tireTracks / 100;
    drawTireTracks(ctx, canvas, amount, accent);
  }

  if (patterns.fingerprint > 0) {
    const amount = patterns.fingerprint / 100;
    drawFingerprint(ctx, canvas, amount, dark);
  }

  if (patterns.topoLines > 0) {
    const amount = patterns.topoLines / 100;
    drawTopoLines(ctx, canvas, amount, soft);
  }

  if (patterns.staffLines > 0) {
    const amount = patterns.staffLines / 100;
    drawStaffLines(ctx, canvas, amount, dark);
  }

  if (patterns.blueprintGrid > 0) {
    const amount = patterns.blueprintGrid / 100;
    drawBlueprintGrid(ctx, canvas, amount, soft, dark);
  }

  if (patterns.zebra > 0) {
    const amount = patterns.zebra / 100;
    drawZebraPattern(ctx, canvas, amount);
  }

  if (patterns.perforatedMetal > 0) {
    const amount = patterns.perforatedMetal / 100;
    drawPerforatedPattern(ctx, canvas, amount, dark);
  }
}

function applyMaterialEffects(canvas, materials, colors) {
  const ctx = canvas.getContext("2d");
  const accent = hexToRgb(colors.overlayColor);
  const soft = hexToRgb(colors.duotoneLight);
  const dark = hexToRgb(colors.duotoneDark);

  if (materials.bottleGlass > 0) applyBottleGlass(canvas, curveThousand(materials.bottleGlass / 100, 1.3, 1));
  if (materials.frostedGlass > 0) applyFrostedGlass(canvas, curveThousand(materials.frostedGlass / 100, 1.35, 1));
  if (materials.raindrops > 0) drawRaindrops(ctx, canvas, curveThousand(materials.raindrops / 100, 1.35, 2.4));
  if (materials.scratches > 0) drawScratches(ctx, canvas, curveThousand(materials.scratches / 100, 1.5, 1));
  if (materials.plasticWrap > 0) drawPlasticWrap(ctx, canvas, curveThousand(materials.plasticWrap / 100, 1.4, 1));
  if (materials.paperFiber > 0) tintAndNoiseCanvas(canvas, curveThousand(materials.paperFiber / 100, 1.3, 1), [18, 14, 6], 18);
  if (materials.cardboard > 0) applyCardboard(canvas, curveThousand(materials.cardboard / 100, 1.28, 1));
  if (materials.newsprint > 0) applyNewsprint(canvas, curveThousand(materials.newsprint / 100, 1.18, 1));
  if (materials.thermalFax > 0) applyThermalFax(canvas, curveThousand(materials.thermalFax / 100, 1.32, 1));
  if (materials.brushedMetal > 0) drawBrushedMetal(ctx, canvas, curveThousand(materials.brushedMetal / 100, 1.35, 1));
  if (materials.concrete > 0) tintAndNoiseCanvas(canvas, curveThousand(materials.concrete / 100, 1.28, 1), [-10, -10, -10], 28);
  if (materials.asphalt > 0) tintAndNoiseCanvas(canvas, curveThousand(materials.asphalt / 100, 1.28, 1), [-28, -24, -18], 34);
  if (materials.linen > 0) drawLinen(ctx, canvas, curveThousand(materials.linen / 100, 1.3, 1), soft);
  if (materials.meshFabric > 0) drawFabricMesh(ctx, canvas, curveThousand(materials.meshFabric / 100, 1.35, 1), accent, dark);
}

function applyAtmosphereEffects(canvas, atmosphere, colors) {
  const ctx = canvas.getContext("2d");
  const accent = hexToRgb(colors.overlayColor);
  const soft = hexToRgb(colors.duotoneLight);
  const dark = hexToRgb(colors.duotoneDark);

  if (atmosphere.tvNoise > 0) applyTvNoise(canvas, curveThousand(atmosphere.tvNoise / 100, 1.35, 1));
  if (atmosphere.crtDrift > 0) applyCrtDrift(canvas, curveThousand(atmosphere.crtDrift / 100, 1.4, 1));
  if (atmosphere.jpegArtifacts > 0) applyJpegArtifacts(canvas, curveThousand(atmosphere.jpegArtifacts / 100, 1.32, 1));
  if (atmosphere.printMisregister > 0) applyPrintMisregister(canvas, curveThousand(atmosphere.printMisregister / 100, 1.45, 1));
  if (atmosphere.overexposure > 0) applyOverexposure(canvas, curveThousand(atmosphere.overexposure / 100, 1.4, 1));
  if (atmosphere.lightLeak > 0) drawLightLeak(ctx, canvas, curveThousand(atmosphere.lightLeak / 100, 1.35, 1), accent, soft);
  if (atmosphere.dustScratches > 0) drawDustAndScratches(ctx, canvas, curveThousand(atmosphere.dustScratches / 100, 1.45, 1));
  if (atmosphere.haze > 0) drawHaze(ctx, canvas, curveThousand(atmosphere.haze / 100, 1.35, 1), soft);
  if (atmosphere.shadowCast > 0) drawShadowCast(ctx, canvas, curveThousand(atmosphere.shadowCast / 100, 1.4, 1));
  if (atmosphere.reflections > 0) drawReflections(ctx, canvas, curveThousand(atmosphere.reflections / 100, 1.35, 1), soft);
  if (atmosphere.moire > 0) drawMoire(ctx, canvas, curveThousand(atmosphere.moire / 100, 1.45, 1), dark);
  if (atmosphere.doubleExposure > 0) applyDoubleExposure(canvas, curveThousand(atmosphere.doubleExposure / 100, 1.35, 1));
}

function applyArtEffects(canvas, art, colors) {
  const accent = hexToRgb(colors.overlayColor);
  const soft = hexToRgb(colors.duotoneLight);
  const dark = hexToRgb(colors.duotoneDark);

  if (art.gridDecay > 0) applyGridDecay(canvas, art.gridDecay / 100, dark);
  if (art.dadaCollage > 0) applyDadaCollage(canvas, art.dadaCollage / 100, accent, soft, dark);
  if (art.cubistFacets > 0) applyCubistFacets(canvas, art.cubistFacets / 100, accent, soft, dark);
  if (art.dreamLook > 0) applyDreamLook(canvas, art.dreamLook / 100, soft);
  if (art.squashStretch > 0) applySquashStretch(canvas, art.squashStretch / 100);
  if (art.asciiText > 0) applyAsciiText(canvas, art.asciiText / 100, dark, soft);
  if (art.carpet > 0) applyCarpet(canvas, art.carpet / 100, accent, soft, dark);
  if (art.mosaic > 0) applyMosaic(canvas, art.mosaic / 100);
  if (art.matrixRain > 0) applyMatrixRain(canvas, art.matrixRain / 100);
  if (art.candy > 0) applyCandy(canvas, art.candy / 100, accent, soft, dark);
  if (art.neonLines > 0) applyNeonLines(canvas, art.neonLines / 100);
  if (art.icehouse > 0) applyIcehouse(canvas, art.icehouse / 100);
  if (art.sandstorm > 0) applySandstorm(canvas, art.sandstorm / 100);
  if (art.abstracted > 0) applyAbstracted(canvas, art.abstracted / 100, accent, soft, dark);
  if (art.feltMarker > 0) applyFeltMarker(canvas, art.feltMarker / 100);
  if (art.linoCut > 0) applyLinoCut(canvas, art.linoCut / 100, dark, soft);
  if (art.pointillism > 0) applyPointillism(canvas, art.pointillism / 100);
  if (art.ballpointPen > 0) applyBallpointPen(canvas, art.ballpointPen / 100);
  if (art.randomWords > 0) applyRandomWords(canvas, art.randomWords / 100, accent, soft, dark);
  if (art.minecraft > 0) applyMinecraft(canvas, art.minecraft / 100);
}

function applyGridDecay(canvas, amount, dark) {
  const ctx = canvas.getContext("2d", { willReadFrequently: true });
  const source = cloneCanvas(canvas);
  const density = Math.max(0, amount);
  const strength = clamp(amount, 0, 1);
  const cols = Math.max(8, Math.round(12 + density * 4));
  const tile = Math.max(8, canvas.width / cols);
  const rows = Math.ceil(canvas.height / tile);
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  for (let row = 0; row < rows; row += 1) {
    for (let col = 0; col < cols; col += 1) {
      const x = col * tile;
      const y = row * tile;
      const progress = smoothstep(0.08, 1, y / Math.max(1, canvas.height - tile));
      const disorder = density * progress;
      const offsetX = (seededNoise(col, row, 0.31) - 0.5) * tile * 1.75 * disorder;
      const offsetY = (seededNoise(col, row, 1.17) - 0.5) * tile * 2.1 * disorder;
      const rotation = (seededNoise(col, row, 2.83) - 0.5) * (0.28 + disorder * 0.12);
      const size = tile * (0.98 + disorder * 0.14);

      ctx.save();
      ctx.translate(x + tile / 2 + offsetX, y + tile / 2 + offsetY);
      ctx.rotate(rotation);
      ctx.drawImage(source, x, y, tile, tile, -size / 2, -size / 2, size, size);
      if (strength > 0.08) {
        ctx.lineWidth = 0.4 + Math.min(1.6, disorder * 0.12);
        ctx.strokeStyle = rgbaString(dark, 0.03 + Math.min(0.24, disorder * 0.02));
        ctx.strokeRect(-size / 2, -size / 2, size, size);
      }
      ctx.restore();
    }
  }
}

function applyDadaCollage(canvas, amount, accent, soft, dark) {
  const ctx = canvas.getContext("2d");
  const source = cloneCanvas(canvas);
  const sample = source.getContext("2d", { willReadFrequently: true }).getImageData(0, 0, canvas.width, canvas.height).data;
  const progress = clamp(amount / 10, 0, 1);
  const turbo = Math.max(0, amount - 1);
  const fragmentCount = Math.round(10 + progress * 120 + turbo * 80);

  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = `rgba(246,242,234,${0.96})`;
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.save();
  ctx.globalAlpha = 0.18 + progress * 0.18;
  ctx.drawImage(source, 0, 0);
  ctx.restore();
  ctx.save();
  ctx.globalCompositeOperation = "multiply";
  for (let i = 0; i < fragmentCount; i += 1) {
    const x = seededNoise(i, 1, 0.14) * canvas.width * 0.82;
    const y = seededNoise(i, 2, 0.49) * canvas.height * 0.82;
    const w = canvas.width * (0.05 + seededNoise(i, 3, 0.92) * (0.1 + progress * 0.12 + turbo * 0.03));
    const h = canvas.height * (0.035 + seededNoise(i, 4, 1.31) * (0.08 + progress * 0.09 + turbo * 0.025));
    const dx = x + (seededNoise(i, 6, 2.53) - 0.5) * canvas.width * (0.026 + progress * 0.13 + turbo * 0.03);
    const dy = y + (seededNoise(i, 7, 3.11) - 0.5) * canvas.height * (0.026 + progress * 0.13 + turbo * 0.03);
    const rotation = (seededNoise(i, 5, 1.89) - 0.5) * (0.16 + progress * 0.72 + turbo * 0.18);
    const sx = clamp(Math.round(x + w / 2), 0, canvas.width - 1);
    const sy = clamp(Math.round(y + h / 2), 0, canvas.height - 1);
    const colorIndex = (sy * canvas.width + sx) * 4;
    const paperColor = {
      r: mix(sample[colorIndex], soft.r, 0.42),
      g: mix(sample[colorIndex + 1], accent.g, 0.18),
      b: mix(sample[colorIndex + 2], dark.b, 0.12),
    };

    ctx.save();
    ctx.translate(dx + w / 2, dy + h / 2);
    ctx.rotate(rotation);
    ctx.globalAlpha = clamp(0.16 + progress * 0.24 + turbo * 0.06, 0, 0.58);
    ctx.drawImage(source, x, y, w, h, -w / 2, -h / 2, w, h);
    ctx.fillStyle = i % 3 === 0
      ? rgbaString(paperColor, 0.04 + progress * 0.1 + turbo * 0.025)
      : i % 3 === 1
        ? rgbaString(soft, 0.05 + progress * 0.085 + turbo * 0.02)
        : rgbaString(accent, 0.03 + progress * 0.07 + turbo * 0.018);
    ctx.fillRect(-w / 2, -h / 2, w, h);
    ctx.strokeStyle = rgbaString(dark, 0.07 + progress * 0.09 + turbo * 0.02);
    ctx.lineWidth = 0.55 + progress * 0.6 + turbo * 0.08;
    ctx.strokeRect(-w / 2, -h / 2, w, h);
    ctx.restore();
  }
  ctx.restore();

  if (progress > 0.45) {
    const wordCount = Math.round(2 + progress * 8 + turbo * 3);
    ctx.save();
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    for (let i = 0; i < wordCount; i += 1) {
      const word = ["void", "echo", "clip", "noise", "paste", "cut"][i % 6];
      const size = 10 + seededNoise(i, 8, 0.9) * (10 + progress * 30);
      ctx.font = `${Math.round(size)}px 'Aptos Display', 'Segoe UI', sans-serif`;
      ctx.fillStyle = rgbaString(i % 2 === 0 ? dark : accent, 0.03 + progress * 0.045);
      ctx.fillText(word, seededNoise(i, 9, 1.2) * canvas.width, seededNoise(i, 10, 1.8) * canvas.height);
    }
    ctx.restore();
  }
}

function applyCubistFacets(canvas, amount, accent, soft, dark) {
  const ctx = canvas.getContext("2d");
  const source = cloneCanvas(canvas);
  const density = Math.max(0, amount);
  const strength = clamp(amount, 0, 1);
  const cols = Math.max(5, Math.round(8 + density * 2.5));
  const rows = Math.max(6, Math.round(9 + density * 3));
  const cellW = canvas.width / cols;
  const cellH = canvas.height / rows;

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  for (let row = 0; row < rows; row += 1) {
    for (let col = 0; col < cols; col += 1) {
      const x = col * cellW;
      const y = row * cellH;
      const shiftX = (seededNoise(col, row, 3.9) - 0.5) * cellW * 0.42 * density;
      const shiftY = (seededNoise(col, row, 4.7) - 0.5) * cellH * 0.42 * density;
      const skewA = 0.14 + seededNoise(col, row, 5.1) * 0.3;
      const skewB = 0.12 + seededNoise(col, row, 5.6) * 0.32;

      ctx.save();
      ctx.beginPath();
      ctx.moveTo(x + cellW * skewA + shiftX, y + shiftY);
      ctx.lineTo(x + cellW + shiftX, y + cellH * skewB + shiftY);
      ctx.lineTo(x + cellW * (1 - skewA) + shiftX, y + cellH + shiftY);
      ctx.lineTo(x + shiftX, y + cellH * (1 - skewB) + shiftY);
      ctx.closePath();
      ctx.clip();
      ctx.globalAlpha = clamp(0.66 + strength * 0.12, 0, 0.9);
      ctx.drawImage(
        source,
        x,
        y,
        cellW,
        cellH,
        x + shiftX * (0.7 + density * 0.04),
        y + shiftY * (0.7 + density * 0.04),
        cellW * (0.98 + strength * 0.12 + density * 0.03),
        cellH * (0.98 + strength * 0.12 + density * 0.03)
      );
      ctx.restore();

      ctx.save();
      ctx.beginPath();
      ctx.moveTo(x + cellW * skewA + shiftX, y + shiftY);
      ctx.lineTo(x + cellW + shiftX, y + cellH * skewB + shiftY);
      ctx.lineTo(x + cellW * (1 - skewA) + shiftX, y + cellH + shiftY);
      ctx.lineTo(x + shiftX, y + cellH * (1 - skewB) + shiftY);
      ctx.closePath();
      ctx.strokeStyle = rgbaString(dark, 0.06 + strength * 0.1);
      ctx.lineWidth = 0.6 + strength * 0.5;
      ctx.stroke();
      ctx.restore();
    }
  }
}

function applyDreamLook(canvas, amount, soft) {
  const ctx = canvas.getContext("2d");
  const source = cloneCanvas(canvas);
  const sample = source.getContext("2d", { willReadFrequently: true }).getImageData(0, 0, canvas.width, canvas.height).data;
  const density = Math.max(0, amount);
  const strength = clamp(amount, 0, 1);
  const step = Math.max(10, Math.round(28 - Math.min(18, density * 1.6)));
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "rgb(248, 244, 240)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  for (let y = 0; y < canvas.height; y += step) {
    for (let x = 0; x < canvas.width; x += step) {
      const sx = clamp(Math.round(x + step / 2), 0, canvas.width - 1);
      const sy = clamp(Math.round(y + step / 2), 0, canvas.height - 1);
      const index = (sy * canvas.width + sx) * 4;
      const w = step * (1.12 + seededNoise(x, y, 0.8) * 0.42);
      const h = step * (1.04 + seededNoise(x, y, 1.6) * 0.42);
      const dx = x + (seededNoise(x, y, 2.3) - 0.5) * step * (0.22 + density * 0.018);
      const dy = y + (seededNoise(x, y, 3.1) - 0.5) * step * (0.22 + density * 0.018);
      ctx.save();
      ctx.translate(dx + w / 2, dy + h / 2);
      ctx.rotate((seededNoise(x, y, 4.2) - 0.5) * (0.14 + density * 0.03));
      ctx.fillStyle = `rgba(${sample[index]},${sample[index + 1]},${sample[index + 2]},${0.3 + strength * 0.18})`;
      drawRoundedRectPath(ctx, -w / 2, -h / 2, w, h, Math.min(w, h) * 0.28);
      ctx.fill();
      ctx.restore();
    }
  }

  const blurCanvas = cloneCanvas(canvas);
  const blurCtx = blurCanvas.getContext("2d");
  blurCtx.filter = `blur(${2 + strength * 10 + density * 1.8}px)`;
  blurCtx.drawImage(canvas, 0, 0);
  ctx.save();
  ctx.globalCompositeOperation = "screen";
  ctx.globalAlpha = clamp(0.14 + strength * 0.12, 0, 0.28);
  ctx.drawImage(blurCanvas, canvas.width * 0.014, -canvas.height * 0.012, canvas.width, canvas.height);
  ctx.drawImage(blurCanvas, -canvas.width * 0.012, canvas.height * 0.01, canvas.width, canvas.height);
  ctx.restore();

  const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
  gradient.addColorStop(0, rgbaString(soft, 0.05 + strength * 0.08));
  gradient.addColorStop(0.5, "rgba(255,255,255,0.04)");
  gradient.addColorStop(1, rgbaString(soft, 0.1 + strength * 0.14));
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, canvas.width, canvas.height);
}

function applyAsciiText(canvas, amount, dark, soft) {
  const source = cloneCanvas(canvas);
  const sampleCanvas = document.createElement("canvas");
  const progress = clamp(amount / 10, 0, 1);
  const step = Math.max(7, Math.round(30 - progress * 21));
  sampleCanvas.width = Math.max(1, Math.round(canvas.width / step));
  sampleCanvas.height = Math.max(1, Math.round(canvas.height / step));
  const sampleCtx = sampleCanvas.getContext("2d", { willReadFrequently: true });
  sampleCtx.drawImage(source, 0, 0, sampleCanvas.width, sampleCanvas.height);
  const sample = sampleCtx.getImageData(0, 0, sampleCanvas.width, sampleCanvas.height).data;
  const ctx = canvas.getContext("2d");
  const chars = " .'`^\",:;Il!i~+_-?][}{1)(|/tfjrxnuvczXYUJCLQ0OZmwqpdbkhao*#MW&8%B@$";

  ctx.save();
  ctx.fillStyle = rgbaString(soft, 0.985);
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.font = `${Math.max(8, Math.round(step * 1.02))}px 'Consolas', 'Courier New', monospace`;
  ctx.textBaseline = "top";
  for (let y = 0; y < sampleCanvas.height; y += 1) {
    for (let x = 0; x < sampleCanvas.width; x += 1) {
      const index = (y * sampleCanvas.width + x) * 4;
      const gray = (sample[index] + sample[index + 1] + sample[index + 2]) / 3;
      const darkness = 1 - gray / 255;
      const charIndex = clamp(Math.floor(darkness * (chars.length - 1)), 0, chars.length - 1);
      const color = {
        r: mix(sample[index], dark.r, 0.08 + darkness * 0.16),
        g: mix(sample[index + 1], dark.g, 0.08 + darkness * 0.16),
        b: mix(sample[index + 2], dark.b, 0.08 + darkness * 0.16),
      };
      ctx.fillStyle = rgbaString(color, 0.42 + darkness * 0.26 + progress * 0.08);
      ctx.fillText(chars[charIndex], x * step, y * step);
    }
  }
  ctx.restore();
}

function applyCarpet(canvas, amount, accent, soft, dark) {
  const source = cloneCanvas(canvas);
  const sample = source.getContext("2d", { willReadFrequently: true }).getImageData(0, 0, canvas.width, canvas.height).data;
  const ctx = canvas.getContext("2d");
  const density = Math.max(0, amount);
  const strength = clamp(amount, 0, 1);
  const step = Math.max(7, Math.round(22 - Math.min(14, density * 1.4)));

  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "rgb(241, 230, 214)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  for (let y = 0; y < canvas.height; y += step) {
    for (let x = 0; x < canvas.width; x += step) {
      const sx = clamp(Math.round(x + step / 2), 0, canvas.width - 1);
      const sy = clamp(Math.round(y + step / 2), 0, canvas.height - 1);
      const index = (sy * canvas.width + sx) * 4;
      const baseColor = {
        r: sample[index],
        g: sample[index + 1],
        b: sample[index + 2],
      };
      const warmColor = {
        r: clamp(baseColor.r * 0.86 + accent.r * 0.18 + 18, 0, 255),
        g: clamp(baseColor.g * 0.78 + soft.r * 0.1 + 10, 0, 255),
        b: clamp(baseColor.b * 0.66 + dark.b * 0.08, 0, 255),
      };
      const coolColor = {
        r: clamp(baseColor.r * 0.74 + soft.r * 0.16, 0, 255),
        g: clamp(baseColor.g * 0.82 + soft.g * 0.18, 0, 255),
        b: clamp(baseColor.b * 0.8 + accent.b * 0.12 + 8, 0, 255),
      };
      const yarnShift = (seededNoise(x, y, 0.37) - 0.5) * step * (0.18 + density * 0.01);
      const loopW = step * (0.86 + seededNoise(x, y, 1.11) * 0.34);
      const loopH = step * (0.38 + seededNoise(x, y, 1.77) * 0.18);
      const corner = Math.min(loopW, loopH) * 0.48;

      ctx.save();
      ctx.translate(x + step / 2, y + step / 2);
      ctx.rotate((seededNoise(x, y, 2.33) - 0.5) * (0.18 + density * 0.018));
      ctx.fillStyle = rgbaString(warmColor, 0.82 + strength * 0.12);
      drawRoundedRectPath(ctx, -loopW / 2, -loopH / 2 + yarnShift, loopW, loopH, corner);
      ctx.fill();
      ctx.fillStyle = rgbaString(coolColor, 0.7 + strength * 0.12);
      drawRoundedRectPath(ctx, -loopH / 2 + yarnShift, -loopW / 2, loopH, loopW, corner);
      ctx.fill();

      const shine = ctx.createLinearGradient(-loopW / 2, 0, loopW / 2, 0);
      shine.addColorStop(0, "rgba(255,255,255,0)");
      shine.addColorStop(0.45, `rgba(255,255,255,${0.08 + strength * 0.08})`);
      shine.addColorStop(0.55, `rgba(255,255,255,${0.18 + strength * 0.12})`);
      shine.addColorStop(1, "rgba(255,255,255,0)");
      ctx.fillStyle = shine;
      drawRoundedRectPath(ctx, -loopW / 2, -loopH / 2 + yarnShift, loopW, loopH, corner);
      ctx.fill();
      ctx.restore();
    }
  }
}

function applyMosaic(canvas, amount) {
  const source = cloneCanvas(canvas);
  const sourceCtx = source.getContext("2d", { willReadFrequently: true });
  const sample = sourceCtx.getImageData(0, 0, canvas.width, canvas.height).data;
  const ctx = canvas.getContext("2d");
  const density = Math.max(0, amount);
  const strength = clamp(amount, 0, 1);
  const step = Math.max(7, Math.round(26 - Math.min(18, density * 1.8)));
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "#f5f0e9";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  for (let y = 0; y < canvas.height; y += step) {
    for (let x = 0; x < canvas.width; x += step) {
      const sx = clamp(Math.round(x + step / 2), 0, canvas.width - 1);
      const sy = clamp(Math.round(y + step / 2), 0, canvas.height - 1);
      const index = (sy * canvas.width + sx) * 4;
      const dx = x + (seededNoise(x, y, 0.12) - 0.5) * step * (0.22 + density * 0.01);
      const dy = y + (seededNoise(x, y, 0.77) - 0.5) * step * (0.22 + density * 0.01);
      const w = step * (0.86 + seededNoise(x, y, 1.17) * (0.34 + strength * 0.12));
      const h = step * (0.72 + seededNoise(x, y, 1.73) * (0.42 + strength * 0.14));
      const r = Math.min(w, h) * (0.18 + strength * 0.18);
      ctx.fillStyle = `rgba(${sample[index]},${sample[index + 1]},${sample[index + 2]},${0.84 + strength * 0.12})`;
      drawRoundedRectPath(ctx, dx, dy, w, h, r);
      ctx.fill();
    }
  }
}

function applyMatrixRain(canvas, amount) {
  const source = cloneCanvas(canvas);
  const sampleCanvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");
  const density = Math.max(0, amount);
  const strength = clamp(amount, 0, 1);
  const cols = Math.max(10, Math.round(canvas.width / Math.max(9, 22 - Math.min(12, density * 1.2))));
  const size = canvas.width / cols;
  const rows = Math.ceil(canvas.height / size);
  const glyphs = "01アイウエオカキクケコサシスセソ";
  sampleCanvas.width = cols;
  sampleCanvas.height = rows;
  const sampleCtx = sampleCanvas.getContext("2d", { willReadFrequently: true });
  sampleCtx.drawImage(source, 0, 0, cols, rows);
  const sample = sampleCtx.getImageData(0, 0, cols, rows).data;
  ctx.save();
  ctx.fillStyle = `rgba(0,18,8,${0.12 + strength * 0.18})`;
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.font = `${Math.round(size)}px monospace`;
  ctx.textBaseline = "top";
  for (let col = 0; col < cols; col += 1) {
    const head = Math.floor(seededNoise(col, 5, amount) * rows);
    for (let row = 0; row < rows; row += 1) {
      const sampleIndex = (row * cols + col) * 4;
      const luminance = (sample[sampleIndex] + sample[sampleIndex + 1] + sample[sampleIndex + 2]) / 3;
      const char = glyphs[Math.floor(seededNoise(col, row, 1.2) * glyphs.length)];
      const distance = Math.abs(row - head);
      const alpha = Math.max(0, 0.92 - distance * 0.15) * (0.18 + strength * 0.82) * (0.35 + (255 - luminance) / 255 * 0.65);
      if (alpha <= 0.03) continue;
      const glow = clamp(80 + (255 - luminance), 80, 255);
      ctx.fillStyle = `rgba(${distance === 0 ? `210,255,${glow}` : `64,${glow},128`},${alpha})`;
      ctx.fillText(char, col * size, row * size);
    }
  }
  ctx.restore();
}

function applyCandy(canvas, amount, accent, soft, dark) {
  const source = cloneCanvas(canvas);
  const sample = source.getContext("2d", { willReadFrequently: true }).getImageData(0, 0, canvas.width, canvas.height).data;
  const ctx = canvas.getContext("2d");
  const density = Math.max(0, amount);
  const strength = clamp(amount, 0, 1);
  const step = Math.max(8, Math.round(26 - Math.min(18, density * 1.8)));
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "#fff7fb";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  for (let y = 0; y < canvas.height; y += step) {
    for (let x = 0; x < canvas.width; x += step) {
      const sx = clamp(Math.round(x + step / 2), 0, canvas.width - 1);
      const sy = clamp(Math.round(y + step / 2), 0, canvas.height - 1);
      const index = (sy * canvas.width + sx) * 4;
      const hue = (sample[index] * 0.5 + sample[index + 1] * 0.8 + sample[index + 2] * 1.2 + (x + y)) % 360;
      const dx = x + (seededNoise(x, y, 0.42) - 0.5) * step * (0.24 + density * 0.01);
      const dy = y + (seededNoise(x, y, 1.08) - 0.5) * step * (0.24 + density * 0.01);
      const w = step * (0.86 + seededNoise(x, y, 1.71) * 0.38);
      const h = step * (0.8 + seededNoise(x, y, 2.33) * 0.34);
      const r = Math.min(w, h) * (0.34 + strength * 0.16);
      ctx.save();
      ctx.translate(dx + w / 2, dy + h / 2);
      ctx.rotate((seededNoise(x, y, 3.11) - 0.5) * (0.6 + density * 0.04));
      const sat = 84 + seededNoise(x, y, 3.55) * 14;
      const light = 56 + seededNoise(x, y, 3.77) * 18;
      ctx.fillStyle = `hsla(${hue}, ${sat}%, ${light}%, ${0.38 + strength * 0.22})`;
      drawRoundedRectPath(ctx, -w / 2, -h / 2, w, h, r);
      ctx.fill();
      ctx.strokeStyle = `hsla(${(hue + 24) % 360}, 100%, 92%, ${0.24 + strength * 0.16})`;
      ctx.lineWidth = 0.6 + strength * 1.2;
      ctx.stroke();
      const gloss = ctx.createLinearGradient(-w / 2, -h / 2, w / 2, h / 2);
      gloss.addColorStop(0, `rgba(255,255,255,${0.22 + strength * 0.18})`);
      gloss.addColorStop(0.38, "rgba(255,255,255,0.04)");
      gloss.addColorStop(1, "rgba(255,255,255,0)");
      ctx.fillStyle = gloss;
      drawRoundedRectPath(ctx, -w / 2, -h / 2, w, h, r);
      ctx.fill();
      if (density > 2.2) {
        ctx.fillStyle = `rgba(255,255,255,${0.06 + strength * 0.08})`;
        ctx.beginPath();
        ctx.arc(-w * 0.14, -h * 0.14, Math.min(w, h) * 0.12, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.restore();
    }
  }
}

function applyNeonLines(canvas, amount) {
  const edgeCanvas = cloneCanvas(canvas);
  const density = Math.max(0, amount);
  const strength = clamp(amount, 0, 1);
  applyCannyLikeEdges(edgeCanvas, 0.22 + strength * 0.78);
  const data = edgeCanvas.getContext("2d", { willReadFrequently: true }).getImageData(0, 0, canvas.width, canvas.height).data;
  const ctx = canvas.getContext("2d");
  ctx.save();
  ctx.lineCap = "round";
  ctx.lineJoin = "round";
  const stepY = Math.max(2, Math.round(8 - Math.min(5, density * 0.6)));
  const stepX = Math.max(2, Math.round(6 - Math.min(3, density * 0.35)));
  const lineLayers = Math.max(1, Math.round(1 + density * 0.35));
  for (let layer = 0; layer < lineLayers; layer += 1) {
    const hueShift = layer * (36 + density * 1.5);
    for (let y = 0; y < canvas.height; y += stepY) {
      let segments = 0;
      ctx.beginPath();
      for (let x = 0; x < canvas.width; x += stepX) {
        const index = (y * canvas.width + x) * 4;
        const gray = (data[index] + data[index + 1] + data[index + 2]) / 3;
        if (gray < 166) {
          const wave = Math.sin((x + layer * 19) * 0.04 + y * 0.01) * (density > 2 ? 1 + density * 0.12 : 0);
          const offset = (gray / 255 - 0.5) * (8 + density * 0.4) + wave;
          if (segments === 0) ctx.moveTo(x, y + offset);
          else ctx.lineTo(x, y + offset);
          segments += 1;
        }
      }
      if (segments < 2) continue;
      const hue = ((y / Math.max(1, canvas.height)) * 280 + 160 + hueShift) % 360;
      ctx.strokeStyle = `hsla(${hue}, 100%, 66%, ${0.12 + strength * 0.18})`;
      ctx.shadowBlur = 10 + density * 2.8;
      ctx.shadowColor = `hsla(${hue}, 100%, 60%, 0.86)`;
      ctx.lineWidth = 0.9 + density * 0.12;
      ctx.stroke();
    }
  }
  ctx.restore();
}

function applyIcehouse(canvas, amount) {
  const source = cloneCanvas(canvas);
  const sample = source.getContext("2d", { willReadFrequently: true }).getImageData(0, 0, canvas.width, canvas.height).data;
  const ctx = canvas.getContext("2d");
  const progress = clamp(amount / 10, 0, 1);
  const spacing = Math.max(7, Math.round(28 - progress * 18));
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "rgb(238, 244, 252)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.save();
  ctx.globalAlpha = 0.18 + progress * 0.22;
  ctx.drawImage(source, 0, 0);
  ctx.restore();
  ctx.save();
  ctx.globalCompositeOperation = "multiply";
  for (let baseY = 0; baseY < canvas.height; baseY += spacing) {
    ctx.beginPath();
    let hasSegment = false;
    for (let x = 0; x <= canvas.width; x += 6) {
      const sx = clamp(Math.round(x), 0, canvas.width - 1);
      const sy = clamp(Math.round(baseY), 0, canvas.height - 1);
      const index = (sy * canvas.width + sx) * 4;
      const gray = (sample[index] + sample[index + 1] + sample[index + 2]) / 3;
      const saturation = Math.max(sample[index], sample[index + 1], sample[index + 2]) - Math.min(sample[index], sample[index + 1], sample[index + 2]);
      const amplitude = (1 - gray / 255) * (5 + progress * 18) + saturation * 0.02;
      const wave = Math.sin(x * (0.016 + progress * 0.01) + gray * 0.025 + baseY * 0.018) * amplitude;
      const detail = Math.cos(x * 0.048 + baseY * 0.021) * amplitude * 0.28;
      const y = baseY + wave + detail;
      if (!hasSegment) {
        ctx.moveTo(x, y);
        hasSegment = true;
      } else {
        ctx.lineTo(x, y);
      }
    }
    const hue = (baseY / Math.max(1, canvas.height)) * 360;
    ctx.strokeStyle = `hsla(${hue}, 82%, 54%, ${0.18 + progress * 0.22})`;
    ctx.lineWidth = 0.7 + progress * 1.8;
    ctx.stroke();
  }
  ctx.globalCompositeOperation = "screen";
  ctx.globalAlpha = 0.06 + progress * 0.1;
  ctx.drawImage(source, 0, 0);
  ctx.restore();
}

function applySandstorm(canvas, amount) {
  const source = cloneCanvas(canvas);
  const sampleCanvas = document.createElement("canvas");
  const density = Math.max(0, amount);
  const progress = clamp(amount / 10, 0, 1);
  const cols = Math.max(20, Math.round(26 + progress * 60));
  const rows = Math.max(18, Math.round((canvas.height / canvas.width) * cols));
  sampleCanvas.width = cols;
  sampleCanvas.height = rows;
  const sampleCtx = sampleCanvas.getContext("2d", { willReadFrequently: true });
  sampleCtx.drawImage(source, 0, 0, cols, rows);
  const sample = sampleCtx.getImageData(0, 0, cols, rows).data;
  const ctx = canvas.getContext("2d");
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.drawImage(source, 0, 0);
  ctx.fillStyle = `rgba(230, 208, 168,${0.06 + progress * 0.2})`;
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  const count = Math.round(180 + progress * 2400);
  ctx.save();
  ctx.strokeStyle = `rgba(232,210,164,${0.04 + progress * 0.14})`;
  ctx.lineWidth = 0.35 + progress * 1.1;
  for (let i = 0; i < count; i += 1) {
    const x = seededNoise(i, 1, 0.4) * canvas.width;
    const y = seededNoise(i, 2, 1.3) * canvas.height;
    const col = clamp(Math.floor((x / canvas.width) * cols), 0, cols - 1);
    const row = clamp(Math.floor((y / canvas.height) * rows), 0, rows - 1);
    const index = (row * cols + col) * 4;
    const luminance = (sample[index] + sample[index + 1] + sample[index + 2]) / 3;
    const drift = (seededNoise(i, 5, 0.93) - 0.5) * (8 + progress * 60);
    const len = 3 + seededNoise(i, 3, 2.1) * (8 + progress * 32) * (0.45 + (255 - luminance) / 255);
    ctx.strokeStyle = `rgba(${210 + (255 - luminance) * 0.15},${186 + (255 - luminance) * 0.08},${140 + (255 - luminance) * 0.05},${0.045 + progress * 0.12})`;
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(x + len + drift, y + len * (0.12 + progress * 0.28));
    ctx.stroke();
  }
  ctx.restore();
}

function applyAbstracted(canvas, amount, accent, soft, dark) {
  const source = cloneCanvas(canvas);
  const sample = source.getContext("2d", { willReadFrequently: true }).getImageData(0, 0, canvas.width, canvas.height).data;
  const ctx = canvas.getContext("2d");
  const density = Math.max(0, amount);
  const strength = clamp(amount, 0, 1);
  const step = Math.max(9, Math.round(28 - Math.min(18, density * 1.8)));
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "#f3efe9";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  for (let y = 0; y < canvas.height; y += step) {
    for (let x = 0; x < canvas.width; x += step) {
      const sx = clamp(Math.round(x + step / 2), 0, canvas.width - 1);
      const sy = clamp(Math.round(y + step / 2), 0, canvas.height - 1);
      const index = (sy * canvas.width + sx) * 4;
      const dx = x + (seededNoise(x, y, 0.61) - 0.5) * step * (0.42 + density * 0.016);
      const dy = y + (seededNoise(x, y, 1.18) - 0.5) * step * (0.42 + density * 0.016);
      const w = step * (0.8 + seededNoise(x, y, 1.93) * 0.52);
      const h = step * (0.8 + seededNoise(x, y, 2.49) * 0.48);
      const color = {
        r: clamp(sample[index] + (seededNoise(x, y, 3.01) - 0.5) * (28 + density * 3), 0, 255),
        g: clamp(sample[index + 1] + (seededNoise(x, y, 3.61) - 0.5) * (28 + density * 3), 0, 255),
        b: clamp(sample[index + 2] + (seededNoise(x, y, 4.2) - 0.5) * (28 + density * 3), 0, 255),
      };
      ctx.save();
      ctx.translate(dx + w / 2, dy + h / 2);
      ctx.rotate((seededNoise(x, y, 4.73) - 0.5) * (0.9 + density * 0.08));
      ctx.scale(1 + (seededNoise(x, y, 5.21) - 0.5) * (strength + density * 0.05), 1 + (seededNoise(x, y, 5.83) - 0.5) * (strength + density * 0.05));
      if (density > 2) {
        ctx.transform(
          1,
          (seededNoise(x, y, 6.11) - 0.5) * 0.35,
          (seededNoise(x, y, 6.63) - 0.5) * 0.35,
          1,
          0,
          0
        );
      }
      ctx.fillStyle = rgbaString(color, 0.72 + strength * 0.16);
      drawRoundedRectPath(ctx, -w / 2, -h / 2, w, h, Math.min(w, h) * 0.26);
      ctx.fill();
      ctx.strokeStyle = rgbaString(seededNoise(x, y, 6.4) > 0.5 ? accent : soft, 0.08 + strength * 0.12);
      ctx.lineWidth = 0.4 + strength;
      ctx.stroke();
      if (density > 2.8) {
        ctx.strokeStyle = rgbaString(dark, 0.04 + strength * 0.08);
        ctx.lineWidth = 0.3 + strength * 0.6;
        ctx.beginPath();
        ctx.moveTo(-w / 2, 0);
        ctx.lineTo(w / 2, 0);
        ctx.moveTo(0, -h / 2);
        ctx.lineTo(0, h / 2);
        ctx.stroke();
      }
      ctx.restore();
    }
  }
}

function applyFeltMarker(canvas, amount) {
  const ctx = canvas.getContext("2d", { willReadFrequently: true });
  const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  applyPosterize(imageData.data, Math.round(3 + amount * 5));
  applyBasicAdjustments(imageData.data, {
    brightness: 4,
    contrast: 12 + amount * 18,
    saturation: 16 + amount * 30,
    blur: 0,
    sharpen: 0,
  }, 0);
  ctx.putImageData(imageData, 0, 0);
  convolveCanvas(canvas, [-1, -1, -1, -1, 8, -1, -1, -1, -1], 0.08 + amount * 0.18);
}

function applyLinoCut(canvas, amount, dark, soft) {
  const ctx = canvas.getContext("2d", { willReadFrequently: true });
  const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  const data = imageData.data;
  const progress = clamp(amount / 10, 0, 1);
  applyGrayscale(data, 1);
  const threshold = 214 - progress * 150;
  for (let i = 0; i < data.length; i += 4) {
    const gray = data[i];
    const jitter = (Math.random() - 0.5) * (6 + progress * 30);
    const edgeBias = smoothstep(threshold - 30, threshold + 20, gray + jitter);
    const value = edgeBias > 0.54 ? 246 : 18;
    data[i] = value;
    data[i + 1] = value;
    data[i + 2] = value;
  }
  ctx.putImageData(imageData, 0, 0);
  convolveCanvas(canvas, [-1, -1, -1, -1, 8, -1, -1, -1, -1], 0.04 + progress * 0.28);
  const tinted = ctx.getImageData(0, 0, canvas.width, canvas.height);
  for (let i = 0; i < tinted.data.length; i += 4) {
    const isLight = tinted.data[i] > 180;
    tinted.data[i] = isLight ? soft.r : dark.r;
    tinted.data[i + 1] = isLight ? soft.g : dark.g;
    tinted.data[i + 2] = isLight ? soft.b : dark.b;
  }
  ctx.putImageData(tinted, 0, 0);
}

function applyPointillism(canvas, amount) {
  const source = cloneCanvas(canvas);
  const data = source.getContext("2d", { willReadFrequently: true }).getImageData(0, 0, canvas.width, canvas.height).data;
  const ctx = canvas.getContext("2d");
  const density = Math.max(0, amount);
  const strength = clamp(amount, 0, 1);
  const step = Math.max(4, Math.round(8 + Math.min(14, density * 1.1)));
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "#f8f4ef";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  for (let y = 0; y < canvas.height; y += step) {
    for (let x = 0; x < canvas.width; x += step) {
      const sx = clamp(Math.round(x), 0, canvas.width - 1);
      const sy = clamp(Math.round(y), 0, canvas.height - 1);
      const index = (sy * canvas.width + sx) * 4;
      const radius = 0.8 + (1 - ((data[index] + data[index + 1] + data[index + 2]) / 765)) * step * (0.2 + strength * 0.24);
      ctx.fillStyle = `rgba(${data[index]},${data[index + 1]},${data[index + 2]},${0.72 + strength * 0.16})`;
      ctx.beginPath();
      ctx.arc(x, y, radius, 0, Math.PI * 2);
      ctx.fill();
    }
  }
}

function applyBallpointPen(canvas, amount) {
  const density = Math.max(0, amount);
  const progress = clamp(amount / 10, 0, 1);
  const source = cloneCanvas(canvas);
  const edgeCanvas = cloneCanvas(canvas);
  applyCannyLikeEdges(edgeCanvas, 0.2 + progress * 0.55);
  const sample = source.getContext("2d", { willReadFrequently: true }).getImageData(0, 0, canvas.width, canvas.height).data;
  const edges = edgeCanvas.getContext("2d", { willReadFrequently: true }).getImageData(0, 0, canvas.width, canvas.height).data;
  const ctx = canvas.getContext("2d");
  ctx.fillStyle = "#f8f7f1";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.save();
  ctx.strokeStyle = `rgba(37,64,148,${0.12 + progress * 0.2})`;
  ctx.lineWidth = 0.55 + progress * 0.65;
  const spacing = Math.max(5, Math.round(13 - progress * 7));
  for (let y = 0; y < canvas.height; y += spacing) {
    ctx.beginPath();
    for (let x = 0; x <= canvas.width; x += 6) {
      const sx = clamp(Math.round(x), 0, canvas.width - 1);
      const sy = clamp(Math.round(y), 0, canvas.height - 1);
      const index = (sy * canvas.width + sx) * 4;
      const gray = (sample[index] + sample[index + 1] + sample[index + 2]) / 3;
      const edgeGray = (edges[index] + edges[index + 1] + edges[index + 2]) / 3;
      const offset = (1 - gray / 255) * spacing * (0.46 + progress * 0.2) + (1 - edgeGray / 255) * spacing * 0.38;
      if (x === 0) ctx.moveTo(x, y + offset);
      else ctx.lineTo(x, y + offset);
    }
    ctx.stroke();
  }
  if (density > 0.8) {
    ctx.globalAlpha = 0.22 + progress * 0.18;
    for (let y = spacing / 2; y < canvas.height; y += spacing * 1.4) {
      ctx.beginPath();
      for (let x = 0; x <= canvas.width; x += 8) {
        const sx = clamp(Math.round(x), 0, canvas.width - 1);
        const sy = clamp(Math.round(y), 0, canvas.height - 1);
        const index = (sy * canvas.width + sx) * 4;
        const gray = (sample[index] + sample[index + 1] + sample[index + 2]) / 3;
        const edgeGray = (edges[index] + edges[index + 1] + edges[index + 2]) / 3;
        const offset = (1 - gray / 255) * spacing * 0.32 + (1 - edgeGray / 255) * spacing * 0.24;
        if (x === 0) ctx.moveTo(x, y + offset);
        else ctx.lineTo(x, y + offset);
      }
      ctx.stroke();
    }
  }
  ctx.globalAlpha = 0.3 + progress * 0.24;
  ctx.drawImage(edgeCanvas, 0, 0);
  ctx.restore();
}

function applySquashStretch(canvas, amount) {
  const source = cloneCanvas(canvas);
  const ctx = canvas.getContext("2d");
  const bands = Math.max(10, Math.round(18 + amount * 18));
  const bandHeight = canvas.height / bands;
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  for (let i = 0; i < bands; i += 1) {
    const y = i * bandHeight;
    const wave = Math.sin((i / bands) * Math.PI * 2);
    const scaleX = 1 + wave * amount * 0.26;
    const width = canvas.width * scaleX;
    const dx = (canvas.width - width) / 2;
    ctx.drawImage(source, 0, y, canvas.width, bandHeight, dx, y, width, bandHeight);
  }
}

function applyRandomWords(canvas, amount, accent, soft, dark) {
  const ctx = canvas.getContext("2d");
  const density = Math.max(0, amount);
  const strength = clamp(amount, 0, 1);
  const words = ["noise", "echo", "urban", "fragment", "signal", "color", "dream", "grid", "pixel", "tempo", "trace"];
  const palette = [accent, soft, dark, { r: 255, g: 255, b: 255 }];
  const count = Math.round(8 + density * 12);
  ctx.save();
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  for (let i = 0; i < count; i += 1) {
    const paletteColor = palette[i % palette.length];
    const size = 12 + seededNoise(i, 3, 0.9) * (12 + density * 16);
    ctx.font = `${Math.round(size)}px 'Aptos Display', 'Segoe UI', sans-serif`;
    const x = seededNoise(i, 1, 0.2) * canvas.width;
    const y = seededNoise(i, 2, 1.2) * canvas.height;
    const rotation = (seededNoise(i, 4, 1.8) - 0.5) * (0.3 + density * 0.06);
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(rotation);
    ctx.fillStyle = rgbaString(paletteColor, 0.08 + strength * 0.12);
    ctx.fillText(words[Math.floor(seededNoise(i, 5, 2.6) * words.length)], 0, 0);
    ctx.restore();
  }
  ctx.restore();
}

function applyMinecraft(canvas, amount) {
  const block = Math.max(6, Math.round(18 - amount * 6));
  const source = cloneCanvas(canvas);
  const sourceCtx = source.getContext("2d", { willReadFrequently: true });
  const sample = sourceCtx.getImageData(0, 0, canvas.width, canvas.height).data;
  const ctx = canvas.getContext("2d");
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  for (let y = 0; y < canvas.height; y += block) {
    for (let x = 0; x < canvas.width; x += block) {
      const sx = clamp(Math.round(x + block / 2), 0, canvas.width - 1);
      const sy = clamp(Math.round(y + block / 2), 0, canvas.height - 1);
      const index = (sy * canvas.width + sx) * 4;
      const r = Math.round(sample[index] / 32) * 32;
      const g = Math.round(sample[index + 1] / 32) * 32;
      const b = Math.round(sample[index + 2] / 32) * 32;
      ctx.fillStyle = `rgb(${clamp(r + 16, 0, 255)},${clamp(g + 16, 0, 255)},${clamp(b + 16, 0, 255)})`;
      ctx.fillRect(x, y, block, block);
      ctx.fillStyle = `rgba(255,255,255,${0.08 + amount * 0.08})`;
      ctx.fillRect(x, y, block, Math.max(1, block * 0.18));
      ctx.fillStyle = `rgba(0,0,0,${0.12 + amount * 0.12})`;
      ctx.fillRect(x, y + block * 0.82, block, Math.max(1, block * 0.18));
    }
  }
}

function drawRoundedRectPath(ctx, x, y, width, height, radius) {
  const r = Math.min(radius, width / 2, height / 2);
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + width, y, x + width, y + height, r);
  ctx.arcTo(x + width, y + height, x, y + height, r);
  ctx.arcTo(x, y + height, x, y, r);
  ctx.arcTo(x, y, x + width, y, r);
  ctx.closePath();
}

function invertImageData(data) {
  for (let i = 0; i < data.length; i += 4) {
    data[i] = 255 - data[i];
    data[i + 1] = 255 - data[i + 1];
    data[i + 2] = 255 - data[i + 2];
  }
}

function drawLinePattern(ctx, canvas, { spacing, lineWidth, angle, color }) {
  const radians = (angle * Math.PI) / 180;
  const diagonal = Math.hypot(canvas.width, canvas.height);
  ctx.save();
  ctx.translate(canvas.width / 2, canvas.height / 2);
  ctx.rotate(radians);
  ctx.strokeStyle = color;
  ctx.lineWidth = lineWidth;
  for (let offset = -diagonal; offset <= diagonal; offset += spacing) {
    ctx.beginPath();
    ctx.moveTo(offset, -diagonal);
    ctx.lineTo(offset, diagonal);
    ctx.stroke();
  }
  ctx.restore();
}

function drawCheckerPattern(ctx, canvas, { size, colorA, colorB }) {
  ctx.save();
  for (let y = 0; y < canvas.height; y += size) {
    for (let x = 0; x < canvas.width; x += size) {
      ctx.fillStyle = ((x / size + y / size) % 2 === 0) ? colorA : colorB;
      ctx.fillRect(x, y, size, size);
    }
  }
  ctx.restore();
}

function drawDotPattern(ctx, canvas, { spacing, radius, color }) {
  ctx.save();
  ctx.fillStyle = color;
  for (let y = spacing / 2; y < canvas.height; y += spacing) {
    for (let x = spacing / 2; x < canvas.width; x += spacing) {
      ctx.beginPath();
      ctx.arc(x, y, radius, 0, Math.PI * 2);
      ctx.fill();
    }
  }
  ctx.restore();
}

function drawWavePattern(ctx, canvas, { spacing, amplitude, color, lineWidth }) {
  ctx.save();
  ctx.strokeStyle = color;
  ctx.lineWidth = lineWidth;
  for (let baseY = spacing / 2; baseY < canvas.height + spacing; baseY += spacing) {
    ctx.beginPath();
    for (let x = 0; x <= canvas.width; x += 12) {
      const y = baseY + Math.sin((x / canvas.width) * Math.PI * 4) * amplitude;
      if (x === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    }
    ctx.stroke();
  }
  ctx.restore();
}

function drawTestPattern(ctx, canvas, amount) {
  ctx.save();
  const h = canvas.height;
  const bars = ["#f7f7f7", "#f5d84c", "#62e0e5", "#6edb7c", "#ff7aa7", "#ff5d4f", "#4a7dff"];
  const barWidth = canvas.width / bars.length;
  bars.forEach((color, index) => {
    ctx.fillStyle = rgbaFromHex(color, 0.2 + amount * 0.65);
    ctx.fillRect(index * barWidth, 0, barWidth + 1, h * 0.38);
  });
  const blocks = ["#1d1d1d", "#f1f1f1", "#2e53ff", "#101010", "#0f8f65", "#ff3535"];
  const blockWidth = canvas.width / blocks.length;
  blocks.forEach((color, index) => {
    ctx.fillStyle = rgbaFromHex(color, 0.18 + amount * 0.62);
    ctx.fillRect(index * blockWidth, h * 0.7, blockWidth + 1, h * 0.18);
  });
  ctx.restore();
}

function drawDiamondMesh(ctx, canvas, { size, lineWidth, color }) {
  ctx.save();
  ctx.translate(canvas.width / 2, canvas.height / 2);
  ctx.rotate(Math.PI / 4);
  ctx.strokeStyle = color;
  ctx.lineWidth = lineWidth;
  const span = Math.hypot(canvas.width, canvas.height);
  for (let x = -span; x <= span; x += size) {
    ctx.beginPath();
    ctx.moveTo(x, -span);
    ctx.lineTo(x, span);
    ctx.stroke();
  }
  for (let y = -span; y <= span; y += size) {
    ctx.beginPath();
    ctx.moveTo(-span, y);
    ctx.lineTo(span, y);
    ctx.stroke();
  }
  ctx.restore();
}

function drawTireTracks(ctx, canvas, amount, accent) {
  const progress = clamp(amount / 10, 0, 1);
  const trackCount = Math.max(4, Math.round(6 + progress * 28));
  ctx.save();
  const treadInk = `rgba(18,18,18,${0.18 + progress * 0.34})`;
  for (let band = 0; band < trackCount; band += 1) {
    const tireWidth = 12 + seededNoise(band, 12, 0.21) * 18 + progress * 28;
    const treadStep = 8 + seededNoise(band, 15, 0.31) * 8 + progress * 9;
    const trackGap = tireWidth * (0.56 + seededNoise(band, 18, 0.41) * 0.3);
    const margin = tireWidth * 1.2;
    const centerBase = margin + seededNoise(band, 91, 0.31) * Math.max(margin, canvas.width - margin * 2);
    const verticalShift = (seededNoise(band, 77, 0.18) - 0.5) * canvas.height * 0.32;
    const profileType = Math.floor(seededNoise(band, 66, 0.52) * 4);
    [-trackGap / 2, trackGap / 2].forEach((pairOffset, trackIndex) => {
      const xBase = centerBase + pairOffset;
      for (let y = -treadStep; y <= canvas.height + treadStep; y += treadStep) {
        const sweep = y + verticalShift;
        const sway = (
          Math.sin((sweep + trackIndex * 23 + band * 17) * (0.012 + seededNoise(band, 22, 0.44) * 0.012))
          + Math.cos((sweep + band * 11) * (0.007 + seededNoise(band, 24, 0.62) * 0.008)) * 0.9
        ) * (3 + progress * 15);
        const centerX = xBase + sway;
        const blockW = tireWidth * (0.18 + seededNoise(band, y, 0.17) * 0.08);
        const blockH = treadStep * 0.84;
        ctx.fillStyle = treadInk;
        if (profileType === 0) {
          // Chevron
          for (let lane = -1; lane <= 1; lane += 2) {
            const laneCenter = centerX + lane * tireWidth * 0.22;
            const lean = lane * (trackIndex === 0 ? 1 : -1);
            ctx.save();
            ctx.translate(laneCenter, y + treadStep * 0.48);
            ctx.rotate((lean * 30 * Math.PI) / 180);
            ctx.fillRect(-blockW / 2, -blockH / 2, blockW, blockH);
            ctx.restore();
          }
          ctx.fillRect(centerX - tireWidth * 0.04, y + treadStep * 0.08, tireWidth * 0.08, treadStep * 0.74);
        } else if (profileType === 1) {
          // Block
          for (let lane = -1; lane <= 1; lane += 1) {
            const laneCenter = centerX + lane * tireWidth * 0.16;
            ctx.save();
            ctx.translate(laneCenter, y + treadStep * 0.5);
            ctx.rotate(((lane === 0 ? 0 : lane * 18) * Math.PI) / 180);
            ctx.fillRect(-blockW * 0.42, -blockH / 2, blockW * 0.84, blockH);
            ctx.restore();
          }
        } else if (profileType === 2) {
          // Lamelle
          for (let lane = -2; lane <= 2; lane += 1) {
            const laneCenter = centerX + lane * tireWidth * 0.11;
            ctx.save();
            ctx.translate(laneCenter, y + treadStep * 0.5);
            ctx.rotate(((lane % 2 === 0 ? 12 : -12) * Math.PI) / 180);
            ctx.fillRect(-blockW * 0.18, -blockH / 2, blockW * 0.36, blockH);
            ctx.restore();
          }
        } else {
          // Rallye
          for (let lane = -1; lane <= 1; lane += 2) {
            const laneCenter = centerX + lane * tireWidth * 0.24;
            ctx.save();
            ctx.translate(laneCenter, y + treadStep * 0.5);
            ctx.rotate((lane * 42 * Math.PI) / 180);
            ctx.fillRect(-blockW * 0.62, -blockH * 0.4, blockW * 1.24, blockH * 0.8);
            ctx.restore();
          }
          ctx.fillRect(centerX - tireWidth * 0.06, y + treadStep * 0.14, tireWidth * 0.12, treadStep * 0.64);
        }
        if ((Math.floor(y / treadStep) + trackIndex + band) % 3 === 0) {
          ctx.fillStyle = "rgba(18,18,18,0.04)";
          ctx.fillRect(centerX - tireWidth * 0.46, y + treadStep * 0.28, tireWidth * 0.92, treadStep * 0.14);
          ctx.fillStyle = treadInk;
        }
        if (seededNoise(band, Math.floor(y / treadStep), trackIndex * 0.71) > 0.68) {
          ctx.fillStyle = "rgba(18,18,18,0.03)";
          ctx.fillRect(centerX - tireWidth * 0.5, y + treadStep * 0.04, tireWidth * 0.16, treadStep * 0.2);
          ctx.fillStyle = treadInk;
        }
      }
    });
  }
  ctx.restore();
}

function drawFingerprint(ctx, canvas, amount, dark) {
  const progress = clamp(amount / 10, 0, 1);
  ctx.save();
  const printCount = Math.max(2, Math.round(3 + progress * 18));
  for (let p = 0; p < printCount; p += 1) {
    const ax = 0.16 + seededNoise(p, 14, 0.21) * 0.68;
    const ay = 0.16 + seededNoise(p, 28, 0.49) * 0.68;
    ctx.save();
    ctx.translate(canvas.width * ax, canvas.height * ay);
    ctx.rotate((seededNoise(p, 35, 0.73) - 0.5) * Math.PI * 0.8);
    ctx.strokeStyle = rgbaString(dark, 0.08 + progress * 0.18);
    ctx.lineWidth = 0.7 + progress * 1.25;
    const sizeBias = 0.045 + seededNoise(p, 42, 0.93) * 0.1;
    const maxRadius = Math.min(canvas.width, canvas.height) * (sizeBias + progress * 0.08);
    for (let r = 10; r < maxRadius; r += 4.2) {
      ctx.beginPath();
      for (let a = 0; a <= Math.PI * 3.6; a += 0.055) {
        const spiral = a * (2.8 + progress * 1.8);
        const wobble = Math.sin(a * 3.2) * (2.8 + progress * 9) + Math.cos(a * 1.8) * (1.4 + progress * 5);
        const x = Math.cos(a) * (r + wobble) + Math.cos(spiral) * (2.8 + progress * 6);
        const y = Math.sin(a) * (r * 0.84 + wobble * 0.5) + Math.sin(spiral) * (2.2 + progress * 5.5);
        if (a === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();
    }
    ctx.restore();
  }
  ctx.restore();
}

function drawTopoLines(ctx, canvas, amount, soft) {
  ctx.save();
  ctx.strokeStyle = rgbaString(soft, 0.05 + amount * 0.14);
  ctx.lineWidth = 1 + amount * 1.5;
  const spacing = 26 - amount * 10;
  for (let yBase = spacing; yBase < canvas.height + spacing; yBase += spacing) {
    ctx.beginPath();
    for (let x = 0; x <= canvas.width; x += 18) {
      const y = yBase + Math.sin(x * 0.018 + yBase * 0.03) * (6 + amount * 14);
      if (x === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    }
    ctx.stroke();
  }
  ctx.restore();
}

function drawStaffLines(ctx, canvas, amount, dark) {
  ctx.save();
  ctx.strokeStyle = rgbaString(dark, 0.05 + amount * 0.14);
  ctx.lineWidth = 1 + amount * 1.4;
  const groupGap = 64 + amount * 28;
  for (let start = 30; start < canvas.height; start += groupGap) {
    for (let line = 0; line < 5; line += 1) {
      const y = start + line * (8 + amount * 4);
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(canvas.width, y);
      ctx.stroke();
    }
  }
  ctx.restore();
}

function drawBlueprintGrid(ctx, canvas, amount, soft, dark) {
  ctx.save();
  ctx.fillStyle = rgbaString(dark, 0.04 + amount * 0.1);
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  drawLinePattern(ctx, canvas, {
    spacing: Math.max(14, 42 - amount * 20),
    lineWidth: 1,
    angle: 0,
    color: rgbaString(soft, 0.05 + amount * 0.12),
  });
  drawLinePattern(ctx, canvas, {
    spacing: Math.max(14, 42 - amount * 20),
    lineWidth: 1,
    angle: 90,
    color: rgbaString(soft, 0.05 + amount * 0.12),
  });
  ctx.restore();
}

function drawZebraPattern(ctx, canvas, amount) {
  ctx.save();
  ctx.translate(canvas.width / 2, canvas.height / 2);
  ctx.rotate((-18 * Math.PI) / 180);
  const spacing = 26 + amount * 28;
  ctx.fillStyle = `rgba(255,255,255,${0.05 + amount * 0.14})`;
  for (let x = -canvas.width; x < canvas.width * 1.5; x += spacing) {
    ctx.fillRect(x, -canvas.height, spacing * 0.55, canvas.height * 2);
  }
  ctx.restore();
}

function drawPerforatedPattern(ctx, canvas, amount, dark) {
  ctx.save();
  ctx.fillStyle = rgbaString(dark, 0.05 + amount * 0.14);
  const spacing = Math.max(10, 28 - amount * 10);
  const radius = Math.max(2.2, 2 + amount * 4);
  for (let y = spacing / 2; y < canvas.height; y += spacing) {
    for (let x = spacing / 2; x < canvas.width; x += spacing) {
      ctx.beginPath();
      ctx.arc(x, y, radius, 0, Math.PI * 2);
      ctx.fill();
    }
  }
  ctx.restore();
}

function applyBottleGlass(canvas, amount) {
  tintAndNoiseCanvas(canvas, amount, [-22, 18, -12], 10);
}

function applyFrostedGlass(canvas, amount) {
  const blurCanvas = document.createElement("canvas");
  blurCanvas.width = canvas.width;
  blurCanvas.height = canvas.height;
  const blurCtx = blurCanvas.getContext("2d");
  blurCtx.filter = `blur(${1.5 + amount * 6}px)`;
  blurCtx.drawImage(canvas, 0, 0);
  const ctx = canvas.getContext("2d");
  ctx.save();
  ctx.globalAlpha = 0.28 + amount * 0.42;
  ctx.drawImage(blurCanvas, 0, 0);
  ctx.restore();
}

function drawRaindrops(ctx, canvas, amount) {
  ctx.save();
  const density = Math.max(0, amount);
  const progress = clamp(amount, 0, 1);
  const drops = Math.round(28 + density * 180 + Math.max(0, density - 1) * 320);
  for (let i = 0; i < drops; i += 1) {
    const x = Math.random() * canvas.width;
    const y = Math.random() * canvas.height;
    const r = 1.8 + Math.random() * (3.5 + density * 8);
    const gradient = ctx.createRadialGradient(x - r * 0.35, y - r * 0.35, 0, x, y, r);
    gradient.addColorStop(0, `rgba(255,255,255,${0.18 + progress * 0.28})`);
    gradient.addColorStop(1, "rgba(255,255,255,0)");
    ctx.fillStyle = gradient;
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2);
    ctx.fill();
  }
  ctx.restore();
}

function drawScratches(ctx, canvas, amount) {
  ctx.save();
  ctx.strokeStyle = `rgba(255,255,255,${0.04 + amount * 0.18})`;
  ctx.lineWidth = 0.6 + amount * 1.4;
  const count = Math.round(10 + amount * 80);
  for (let i = 0; i < count; i += 1) {
    const x = Math.random() * canvas.width;
    const y = Math.random() * canvas.height;
    const len = 14 + Math.random() * (canvas.height * 0.22);
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(x + (Math.random() - 0.5) * 12, y + len);
    ctx.stroke();
  }
  ctx.restore();
}

function drawPlasticWrap(ctx, canvas, amount) {
  ctx.save();
  const count = Math.round(8 + amount * 20);
  for (let i = 0; i < count; i += 1) {
    const x = Math.random() * canvas.width;
    const w = 18 + Math.random() * canvas.width * 0.18;
    const gradient = ctx.createLinearGradient(x, 0, x + w, canvas.height);
    gradient.addColorStop(0, "rgba(255,255,255,0)");
    gradient.addColorStop(0.45, `rgba(255,255,255,${0.06 + amount * 0.16})`);
    gradient.addColorStop(0.55, `rgba(255,255,255,${0.12 + amount * 0.22})`);
    gradient.addColorStop(1, "rgba(255,255,255,0)");
    ctx.fillStyle = gradient;
    ctx.fillRect(x, 0, w, canvas.height);
  }
  ctx.restore();
}

function applyCardboard(canvas, amount) {
  tintAndNoiseCanvas(canvas, amount, [28, 14, -8], 22);
}

function applyNewsprint(canvas, amount) {
  const source = cloneCanvas(canvas);
  const sample = source.getContext("2d", { willReadFrequently: true }).getImageData(0, 0, canvas.width, canvas.height).data;
  const ctx = canvas.getContext("2d");
  const progress = clamp(amount / 10, 0, 1);
  const step = Math.max(5, Math.round(5 + progress * 15));
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "#f2ece3";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  for (let y = 0; y < canvas.height; y += step) {
    for (let x = 0; x < canvas.width; x += step) {
      const sx = clamp(Math.round(x), 0, canvas.width - 1);
      const sy = clamp(Math.round(y), 0, canvas.height - 1);
      const index = (sy * canvas.width + sx) * 4;
      const gray = (sample[index] + sample[index + 1] + sample[index + 2]) / 3;
      const radius = (1 - gray / 255) * (0.35 + step * (0.28 + progress * 0.22));
      if (radius < 0.22) continue;
      ctx.fillStyle = `rgba(24,22,20,${0.14 + progress * 0.18})`;
      ctx.beginPath();
      ctx.arc(
        x + (y / step % 2 === 0 ? step * 0.15 : step * 0.48),
        y + step * 0.4,
        radius,
        0,
        Math.PI * 2
      );
      ctx.fill();
    }
  }
}

function applyThermalFax(canvas, amount) {
  const ctx = canvas.getContext("2d", { willReadFrequently: true });
  const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  const data = imageData.data;
  applyGrayscale(data, 1);

  const warmth = 8 + amount * 22;
  const threshold = 198 - amount * 54;
  for (let i = 0; i < data.length; i += 4) {
    const gray = data[i];
    const localContrast = smoothstep(threshold - 42, threshold + 26, gray);
    const ink = clamp(255 - localContrast * 255, 0, 255);
    const softened = mix(gray, ink, 0.18 + amount * 0.42);
    data[i] = clamp(softened + warmth, 0, 255);
    data[i + 1] = clamp(softened + warmth * 0.96, 0, 255);
    data[i + 2] = clamp(softened + warmth * 0.8, 0, 255);
  }

  applyScanlines(data, canvas.width, canvas.height, 0.06 + amount * 0.22);
  ctx.putImageData(imageData, 0, 0);
  tintAndNoiseCanvas(canvas, amount * 0.55, [10, 8, -2], 8);
}

function drawBrushedMetal(ctx, canvas, amount) {
  ctx.save();
  const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  const data = imageData.data;
  for (let y = 0; y < canvas.height; y += 1) {
    const streak = (Math.random() - 0.5) * (18 + amount * 48);
    for (let x = 0; x < canvas.width; x += 1) {
      const index = (y * canvas.width + x) * 4;
      data[index] = clamp(data[index] + streak + 12 * amount, 0, 255);
      data[index + 1] = clamp(data[index + 1] + streak + 12 * amount, 0, 255);
      data[index + 2] = clamp(data[index + 2] + streak + 16 * amount, 0, 255);
    }
  }
  ctx.putImageData(imageData, 0, 0);
  ctx.restore();
}

function drawLinen(ctx, canvas, amount, soft) {
  drawLinePattern(ctx, canvas, {
    spacing: Math.max(10, 22 - amount * 8),
    lineWidth: 1 + amount,
    angle: 0,
    color: rgbaString(soft, 0.04 + amount * 0.08),
  });
  drawLinePattern(ctx, canvas, {
    spacing: Math.max(10, 22 - amount * 8),
    lineWidth: 1 + amount,
    angle: 90,
    color: rgbaString(soft, 0.04 + amount * 0.08),
  });
}

function drawFabricMesh(ctx, canvas, amount, accent, dark) {
  drawLinePattern(ctx, canvas, {
    spacing: Math.max(8, 18 - amount * 7),
    lineWidth: 1 + amount * 1.5,
    angle: 0,
    color: rgbaString(dark, 0.04 + amount * 0.08),
  });
  drawLinePattern(ctx, canvas, {
    spacing: Math.max(8, 18 - amount * 7),
    lineWidth: 1 + amount * 1.5,
    angle: 90,
    color: rgbaString(accent, 0.04 + amount * 0.08),
  });
}

function applyTvNoise(canvas, amount) {
  const ctx = canvas.getContext("2d", { willReadFrequently: true });
  const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  const data = imageData.data;
  for (let i = 0; i < data.length; i += 4) {
    const noise = (Math.random() - 0.5) * (50 + amount * 120);
    data[i] = clamp(data[i] + noise, 0, 255);
    data[i + 1] = clamp(data[i + 1] + noise, 0, 255);
    data[i + 2] = clamp(data[i + 2] + noise, 0, 255);
  }
  ctx.putImageData(imageData, 0, 0);
}

function applyCrtDrift(canvas, amount) {
  const ctx = canvas.getContext("2d");
  const copy = document.createElement("canvas");
  copy.width = canvas.width;
  copy.height = canvas.height;
  copy.getContext("2d").drawImage(canvas, 0, 0);
  ctx.save();
  ctx.globalCompositeOperation = "screen";
  ctx.globalAlpha = 0.14 + amount * 0.18;
  ctx.drawImage(copy, -amount * 8, 0);
  ctx.drawImage(copy, amount * 6, 0);
  ctx.restore();
}

function applyJpegArtifacts(canvas, amount) {
  const density = Math.max(0, amount);
  const strength = clamp(amount, 0, 1);
  const block = Math.max(6, Math.round(8 + density * 10));
  applyPixelate(canvas, block);

  const ctx = canvas.getContext("2d", { willReadFrequently: true });
  const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  const data = imageData.data;
  const corruptionChance = 0.02 + strength * 0.08;
  const macro = Math.max(4, Math.round(10 + density * 8));

  for (let y = 0; y < canvas.height; y += macro) {
    for (let x = 0; x < canvas.width; x += macro) {
      if (seededNoise(x, y, 0.73) > corruptionChance) continue;
      const tintMode = seededNoise(x, y, 1.91);
      for (let by = y; by < Math.min(canvas.height, y + macro); by += 1) {
        for (let bx = x; bx < Math.min(canvas.width, x + macro); bx += 1) {
          const i = (by * canvas.width + bx) * 4;
          if (tintMode > 0.68) {
            data[i] = clamp(data[i] * 0.4, 0, 255);
            data[i + 1] = clamp(data[i + 1] + 70 + strength * 70, 0, 255);
            data[i + 2] = clamp(data[i + 2] * 0.45, 0, 255);
          } else if (tintMode > 0.4) {
            data[i] = clamp(data[i] + 40 + strength * 40, 0, 255);
            data[i + 1] = clamp(data[i + 1] * 0.55, 0, 255);
            data[i + 2] = clamp(data[i + 2] + 18, 0, 255);
          } else {
            const shift = ((bx + by) % 2 === 0 ? 1 : -1) * (12 + strength * 18);
            data[i] = clamp(data[i] + shift, 0, 255);
            data[i + 1] = clamp(data[i + 1] + shift * 0.4, 0, 255);
            data[i + 2] = clamp(data[i + 2] - shift * 0.5, 0, 255);
          }
        }
      }
    }
  }

  ctx.putImageData(imageData, 0, 0);
}

function applyPrintMisregister(canvas, amount) {
  const ctx = canvas.getContext("2d", { willReadFrequently: true });
  const source = ctx.getImageData(0, 0, canvas.width, canvas.height);
  const out = ctx.createImageData(canvas.width, canvas.height);
  const shift = Math.max(1, Math.round(amount * 8));
  for (let y = 0; y < canvas.height; y += 1) {
    for (let x = 0; x < canvas.width; x += 1) {
      const i = (y * canvas.width + x) * 4;
      const r = getPixelChannel(source.data, canvas.width, canvas.height, x - shift, y, 0);
      const g = getPixelChannel(source.data, canvas.width, canvas.height, x, y, 1);
      const b = getPixelChannel(source.data, canvas.width, canvas.height, x + shift, y, 2);
      out.data[i] = r;
      out.data[i + 1] = g;
      out.data[i + 2] = b;
      out.data[i + 3] = source.data[i + 3];
    }
  }
  ctx.putImageData(out, 0, 0);
}

function applyOverexposure(canvas, amount) {
  const ctx = canvas.getContext("2d", { willReadFrequently: true });
  const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  const data = imageData.data;
  for (let i = 0; i < data.length; i += 4) {
    data[i] = clamp(data[i] + 28 + amount * 70, 0, 255);
    data[i + 1] = clamp(data[i + 1] + 28 + amount * 70, 0, 255);
    data[i + 2] = clamp(data[i + 2] + 22 + amount * 56, 0, 255);
  }
  ctx.putImageData(imageData, 0, 0);
}

function drawLightLeak(ctx, canvas, amount, accent, soft) {
  ctx.save();
  const gradient = ctx.createRadialGradient(
    canvas.width * (0.08 + amount * 0.25),
    canvas.height * 0.18,
    0,
    canvas.width * 0.18,
    canvas.height * 0.2,
    canvas.width * (0.2 + amount * 0.34)
  );
  gradient.addColorStop(0, rgbaString(accent, 0.16 + amount * 0.28));
  gradient.addColorStop(0.6, rgbaString(soft, 0.1 + amount * 0.18));
  gradient.addColorStop(1, "rgba(255,255,255,0)");
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.restore();
}

function drawDustAndScratches(ctx, canvas, amount) {
  drawScratches(ctx, canvas, amount * 0.8);
  ctx.save();
  const count = Math.round(80 + amount * 220);
  ctx.fillStyle = `rgba(255,255,255,${0.04 + amount * 0.14})`;
  for (let i = 0; i < count; i += 1) {
    const x = Math.random() * canvas.width;
    const y = Math.random() * canvas.height;
    const size = Math.random() * (1.5 + amount * 3.2);
    ctx.fillRect(x, y, size, size);
  }
  ctx.restore();
}

function drawHaze(ctx, canvas, amount, soft) {
  ctx.save();
  const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
  gradient.addColorStop(0, rgbaString(soft, 0.04 + amount * 0.14));
  gradient.addColorStop(1, rgbaString(soft, 0.14 + amount * 0.22));
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.restore();
}

function drawShadowCast(ctx, canvas, amount) {
  ctx.save();
  const gradient = ctx.createLinearGradient(canvas.width * 0.2, 0, canvas.width, canvas.height);
  gradient.addColorStop(0, "rgba(0,0,0,0)");
  gradient.addColorStop(1, `rgba(0,0,0,${0.12 + amount * 0.28})`);
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.restore();
}

function drawReflections(ctx, canvas, amount, soft) {
  ctx.save();
  const count = Math.round(2 + amount * 4);
  for (let i = 0; i < count; i += 1) {
    const x = canvas.width * (0.1 + i * 0.18);
    const gradient = ctx.createLinearGradient(x, 0, x + canvas.width * 0.18, canvas.height);
    gradient.addColorStop(0, "rgba(255,255,255,0)");
    gradient.addColorStop(0.45, rgbaString(soft, 0.06 + amount * 0.14));
    gradient.addColorStop(0.55, rgbaString(soft, 0.12 + amount * 0.2));
    gradient.addColorStop(1, "rgba(255,255,255,0)");
    ctx.fillStyle = gradient;
    ctx.fillRect(x, 0, canvas.width * 0.2, canvas.height);
  }
  ctx.restore();
}

function drawMoire(ctx, canvas, amount, dark) {
  drawLinePattern(ctx, canvas, {
    spacing: Math.max(6, 16 - amount * 6),
    lineWidth: 1,
    angle: 12,
    color: rgbaString(dark, 0.03 + amount * 0.08),
  });
  drawLinePattern(ctx, canvas, {
    spacing: Math.max(6, 15 - amount * 5),
    lineWidth: 1,
    angle: 15,
    color: rgbaString(dark, 0.02 + amount * 0.06),
  });
}

function applyDoubleExposure(canvas, amount) {
  const ctx = canvas.getContext("2d");
  const copy = document.createElement("canvas");
  copy.width = canvas.width;
  copy.height = canvas.height;
  copy.getContext("2d").drawImage(canvas, 0, 0);
  ctx.save();
  ctx.globalAlpha = 0.12 + amount * 0.28;
  ctx.globalCompositeOperation = "screen";
  ctx.drawImage(copy, canvas.width * (0.03 + amount * 0.05), -canvas.height * (0.02 + amount * 0.04));
  ctx.restore();
}

function tintAndNoiseCanvas(canvas, amount, rgbShift, noiseScale) {
  const ctx = canvas.getContext("2d", { willReadFrequently: true });
  const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  const data = imageData.data;
  for (let i = 0; i < data.length; i += 4) {
    const noise = (Math.random() - 0.5) * noiseScale * amount;
    data[i] = clamp(data[i] + rgbShift[0] * amount + noise, 0, 255);
    data[i + 1] = clamp(data[i + 1] + rgbShift[1] * amount + noise, 0, 255);
    data[i + 2] = clamp(data[i + 2] + rgbShift[2] * amount + noise, 0, 255);
  }
  ctx.putImageData(imageData, 0, 0);
}

function applyMorphologyToImageData(sourceData, width, height, mode, amount) {
  const baseRadius = mode === "tophat" || mode === "blackhat" ? 1 + amount * 2.2 : 0.6 + amount * 2.2;
  const radius = Math.max(1, Math.round(baseRadius));
  const iterations = amount > 0.72 ? 2 : 1;
  let working = cloneImageData(sourceData);

  const run = (op, input) => {
    if (op === "dilate") return morphologyPass(input, width, height, radius, "max");
    if (op === "erode") return morphologyPass(input, width, height, radius, "min");
    return input;
  };

  if (mode === "dilate" || mode === "erode") {
    for (let i = 0; i < iterations; i += 1) {
      working = run(mode, working);
    }
    return mixImageData(sourceData, working, 0.08 + amount * 0.42);
  }

  if (mode === "open") {
    let temp = working;
    for (let i = 0; i < iterations; i += 1) temp = run("erode", temp);
    for (let i = 0; i < iterations; i += 1) temp = run("dilate", temp);
    return mixImageData(sourceData, temp, 0.1 + amount * 0.38);
  }

  if (mode === "close") {
    let temp = working;
    for (let i = 0; i < iterations; i += 1) temp = run("dilate", temp);
    for (let i = 0; i < iterations; i += 1) temp = run("erode", temp);
    return mixImageData(sourceData, temp, 0.1 + amount * 0.38);
  }

  if (mode === "tophat") {
    let opened = working;
    for (let i = 0; i < iterations; i += 1) opened = run("erode", opened);
    for (let i = 0; i < iterations; i += 1) opened = run("dilate", opened);
    return differenceImageData(sourceData, opened, 0.08 + amount * 0.4);
  }

  if (mode === "blackhat") {
    let closed = working;
    for (let i = 0; i < iterations; i += 1) closed = run("dilate", closed);
    for (let i = 0; i < iterations; i += 1) closed = run("erode", closed);
    return differenceImageData(closed, sourceData, 0.08 + amount * 0.4);
  }

  return working;
}

function morphologyPass(imageData, width, height, radius, mode) {
  const output = new ImageData(width, height);
  const src = imageData.data;
  const dst = output.data;

  for (let y = 0; y < height; y += 1) {
    for (let x = 0; x < width; x += 1) {
      const index = (y * width + x) * 4;
      let r = mode === "max" ? 0 : 255;
      let g = mode === "max" ? 0 : 255;
      let b = mode === "max" ? 0 : 255;

      for (let ky = -radius; ky <= radius; ky += 1) {
        for (let kx = -radius; kx <= radius; kx += 1) {
          const px = clamp(x + kx, 0, width - 1);
          const py = clamp(y + ky, 0, height - 1);
          const sample = (py * width + px) * 4;
          if (mode === "max") {
            r = Math.max(r, src[sample]);
            g = Math.max(g, src[sample + 1]);
            b = Math.max(b, src[sample + 2]);
          } else {
            r = Math.min(r, src[sample]);
            g = Math.min(g, src[sample + 1]);
            b = Math.min(b, src[sample + 2]);
          }
        }
      }

      dst[index] = r;
      dst[index + 1] = g;
      dst[index + 2] = b;
      dst[index + 3] = src[index + 3];
    }
  }

  return output;
}

function mixImageData(base, effect, amount) {
  const output = new ImageData(base.width, base.height);
  for (let i = 0; i < base.data.length; i += 4) {
    output.data[i] = clamp(mix(base.data[i], effect.data[i], amount), 0, 255);
    output.data[i + 1] = clamp(mix(base.data[i + 1], effect.data[i + 1], amount), 0, 255);
    output.data[i + 2] = clamp(mix(base.data[i + 2], effect.data[i + 2], amount), 0, 255);
    output.data[i + 3] = base.data[i + 3];
  }
  return output;
}

function differenceImageData(a, b, amount) {
  const output = new ImageData(a.width, a.height);
  for (let i = 0; i < a.data.length; i += 4) {
    output.data[i] = clamp(mix(a.data[i], clamp(a.data[i] - b.data[i] + 128, 0, 255), amount), 0, 255);
    output.data[i + 1] = clamp(mix(a.data[i + 1], clamp(a.data[i + 1] - b.data[i + 1] + 128, 0, 255), amount), 0, 255);
    output.data[i + 2] = clamp(mix(a.data[i + 2], clamp(a.data[i + 2] - b.data[i + 2] + 128, 0, 255), amount), 0, 255);
    output.data[i + 3] = a.data[i + 3];
  }
  return output;
}

function cloneImageData(imageData) {
  const clone = new ImageData(imageData.width, imageData.height);
  clone.data.set(imageData.data);
  return clone;
}

function cloneCanvas(canvas) {
  const copy = document.createElement("canvas");
  copy.width = canvas.width;
  copy.height = canvas.height;
  copy.getContext("2d", { willReadFrequently: true }).drawImage(canvas, 0, 0);
  return copy;
}

function toGrayscaleArray(data) {
  const gray = new Float32Array(data.length / 4);
  for (let i = 0, p = 0; i < data.length; i += 4, p += 1) {
    gray[p] = 0.299 * data[i] + 0.587 * data[i + 1] + 0.114 * data[i + 2];
  }
  return gray;
}

function boxBlurGray(gray, width, height, radius) {
  const output = new Float32Array(gray.length);
  for (let y = 0; y < height; y += 1) {
    for (let x = 0; x < width; x += 1) {
      let sum = 0;
      let count = 0;
      for (let ky = -radius; ky <= radius; ky += 1) {
        for (let kx = -radius; kx <= radius; kx += 1) {
          const px = clamp(x + kx, 0, width - 1);
          const py = clamp(y + ky, 0, height - 1);
          sum += gray[py * width + px];
          count += 1;
        }
      }
      output[y * width + x] = sum / count;
    }
  }
  return output;
}

function computeSobelGradient(gray, width, height) {
  const gradient = new Float32Array(gray.length);
  for (let y = 0; y < height; y += 1) {
    for (let x = 0; x < width; x += 1) {
      const tl = gray[clamp(y - 1, 0, height - 1) * width + clamp(x - 1, 0, width - 1)];
      const tc = gray[clamp(y - 1, 0, height - 1) * width + x];
      const tr = gray[clamp(y - 1, 0, height - 1) * width + clamp(x + 1, 0, width - 1)];
      const ml = gray[y * width + clamp(x - 1, 0, width - 1)];
      const mr = gray[y * width + clamp(x + 1, 0, width - 1)];
      const bl = gray[clamp(y + 1, 0, height - 1) * width + clamp(x - 1, 0, width - 1)];
      const bc = gray[clamp(y + 1, 0, height - 1) * width + x];
      const br = gray[clamp(y + 1, 0, height - 1) * width + clamp(x + 1, 0, width - 1)];
      const gx = -tl + tr - 2 * ml + 2 * mr - bl + br;
      const gy = -tl - 2 * tc - tr + bl + 2 * bc + br;
      gradient[y * width + x] = Math.sqrt(gx * gx + gy * gy);
    }
  }
  return gradient;
}

async function exportCurrentImage() {
  if (!state.sourceImage) return;
  try {
    const blob = await createExportBlob();
    downloadBlob(blob, makeExportFilename());
  } catch (error) {
    console.error(error);
    alert(t("exportFailed"));
  }
}

async function shareCurrentImage() {
  if (!state.sourceImage) return;
  if (!navigator.share) {
    alert(t("shareUnsupported"));
    return;
  }
  try {
    const blob = await createExportBlob();
    const format = state.project.export.format === "pdf" ? "pdf" : normalizeMimeExt(state.project.export.format);
    const file = new File([blob], makeExportFilename(format), { type: blob.type });
    if (navigator.canShare && !navigator.canShare({ files: [file] })) {
      downloadBlob(blob, file.name);
      return;
    }
    await navigator.share({
      title: "Threadline Studio",
      text: t("imageShareText"),
      files: [file],
    });
  } catch (error) {
    if (error?.name !== "AbortError") console.error(error);
  }
}

async function createExportBlob() {
  if (!state.sourceImage) {
    throw new Error("No image loaded");
  }
  const width = state.project.export.width;
  const aspect = getFrameAspectRatio();
  const height = Math.round(width / aspect);
  const exportCanvas = document.createElement("canvas");
  exportCanvas.width = width;
  exportCanvas.height = height;
  const exportCtx = exportCanvas.getContext("2d", { willReadFrequently: true });
  drawBaseImage(exportCtx, width, height);
  applyEffects(exportCanvas, exportCtx);

  const format = state.project.export.format;
  if (format === "pdf") {
    const jpegBlob = await canvasToBlob(exportCanvas, "image/jpeg", 0.92);
    return createSimplePdfBlob(jpegBlob, width, height);
  }

  const mime = format === "jpeg" ? "image/jpeg" : format === "webp" ? "image/webp" : "image/png";
  return canvasToBlob(exportCanvas, mime, state.project.export.quality);
}

function createSimplePdfBlob(imageBlob, width, height) {
  return imageBlob.arrayBuffer().then((buffer) => {
    const imageBytes = new Uint8Array(buffer);
    const encoder = new TextEncoder();
    const mediaWidth = Math.round((width / 96) * 72);
    const mediaHeight = Math.round((height / 96) * 72);
    const content = `q\n${mediaWidth} 0 0 ${mediaHeight} 0 0 cm\n/Im0 Do\nQ`;
    const objects = [
      [encoder.encode("<< /Type /Catalog /Pages 2 0 R >>")],
      [encoder.encode("<< /Type /Pages /Count 1 /Kids [3 0 R] >>")],
      [encoder.encode(`<< /Type /Page /Parent 2 0 R /MediaBox [0 0 ${mediaWidth} ${mediaHeight}] /Resources << /XObject << /Im0 4 0 R >> >> /Contents 5 0 R >>`)],
      [
        encoder.encode(`<< /Type /XObject /Subtype /Image /Width ${width} /Height ${height} /ColorSpace /DeviceRGB /BitsPerComponent 8 /Filter /DCTDecode /Length ${imageBytes.length} >>\nstream\n`),
        imageBytes,
        encoder.encode("\nendstream"),
      ],
      [encoder.encode(`<< /Length ${content.length} >>\nstream\n${content}\nendstream`)],
    ];

    const parts = [encoder.encode("%PDF-1.3\n")];
    const offsets = ["0000000000 65535 f "];
    let byteLength = parts[0].length;

    for (let i = 0; i < objects.length; i += 1) {
      offsets.push(`${String(byteLength).padStart(10, "0")} 00000 n `);
      const objectHeader = encoder.encode(`${i + 1} 0 obj\n`);
      const objectFooter = encoder.encode("\nendobj\n");
      parts.push(objectHeader, ...objects[i], objectFooter);
      byteLength += objectHeader.length + objectFooter.length + objects[i].reduce((sum, chunk) => sum + chunk.length, 0);
    }

    const xrefStart = byteLength;
    const xrefBlock = encoder.encode(
      `xref\n0 ${objects.length + 1}\n${offsets.join("\n")}\ntrailer << /Size ${objects.length + 1} /Root 1 0 R >>\nstartxref\n${xrefStart}\n%%EOF`
    );
    parts.push(xrefBlock);
    return new Blob(parts, { type: "application/pdf" });
  });
}

function createBackupBlob() {
  return new Blob([JSON.stringify({
    versionInfo: state.versionInfo,
    project: state.project,
    settings: state.settings,
  }, null, 2)], { type: "application/json" });
}

function downloadBackup() {
  downloadBlob(createBackupBlob(), "threadline-studio-project.json");
}

function importBackup(text) {
  try {
    const parsed = JSON.parse(text);
    if (!parsed?.project || !parsed?.project?.source) throw new Error("Invalid backup");
    state.project = mergeProject(createDefaultProject(), parsed.project);
    state.settings = {
      languagePreference: parsed?.settings?.languagePreference || "auto",
    };
    syncUiFromState();
    saveLocalState();
    restoreSourceImage();
    alert(t("backupLoaded"));
  } catch (error) {
    console.error(error);
    alert(t("backupInvalid"));
  }
}

function clearProject() {
  state.project = createDefaultProject();
  state.sourceImage = null;
  syncUiFromState();
  saveLocalState();
  render();
  alert(t("projectCleared"));
}

function syncUiFromState() {
  const transform = state.project.transform;
  els.zoomInput.value = String(transform.zoom);
  els.panXInput.value = String(transform.panX);
  els.panYInput.value = String(transform.panY);
  els.rotationInput.value = String(transform.rotation);
  els.zoomValue.textContent = `${transform.zoom.toFixed(2)}x`;
  els.panXValue.textContent = `${Math.round(transform.panX * 100)}%`;
  els.panYValue.textContent = `${Math.round(transform.panY * 100)}%`;
  els.rotationValue.textContent = `${Math.round(transform.rotation)}°`;
  els.qualityInput.value = String(state.project.export.quality);
  els.qualityValue.textContent = `${Math.round(state.project.export.quality * 100)}%`;
  els.exportFormatSelect.value = state.project.export.format;
  els.exportWidthSelect.value = String(state.project.export.width);
  els.duotoneDarkInput.value = state.project.colors.duotoneDark;
  els.duotoneLightInput.value = state.project.colors.duotoneLight;
  els.overlayColorInput.value = state.project.colors.overlayColor;
  els.focusColorInput.value = state.project.colors.focusColor || "#ff3b30";
  els.focusColor2Input.value = state.project.colors.focusColor2 || "#ffd400";
  els.languageSelect.value = state.settings.languagePreference;
  const pickingFocusOne = state.focusColorPickingTarget === "focusColor";
  const pickingFocusTwo = state.focusColorPickingTarget === "focusColor2";
  els.focusColorPickerButton.classList.toggle("primary", pickingFocusOne);
  els.focusColorPickerButton.classList.toggle("secondary", !pickingFocusOne);
  els.focusColorPickerButton.textContent = pickingFocusOne ? t("focusColorPickerOneActive") : t("focusColorPickerOne");
  els.focusColorPickerButton.setAttribute("aria-pressed", pickingFocusOne ? "true" : "false");
  els.focusColor2PickerButton.classList.toggle("primary", pickingFocusTwo);
  els.focusColor2PickerButton.classList.toggle("secondary", !pickingFocusTwo);
  els.focusColor2PickerButton.textContent = pickingFocusTwo ? t("focusColorPickerTwoActive") : t("focusColorPickerTwo");
  els.focusColor2PickerButton.setAttribute("aria-pressed", pickingFocusTwo ? "true" : "false");

  for (const [groupKey, controls] of Object.entries(CONTROL_GROUPS)) {
    for (const control of controls) {
      const input = document.querySelector(`input[data-group="${groupKey}"][data-key="${control.key}"]`);
      if (!input) continue;
      input.value = String(state.project[groupKey][control.key] ?? control.value);
      const valueEl = document.getElementById(`${groupKey}-${control.key}-value`);
      if (valueEl) valueEl.textContent = formatControlValue(control, Number(input.value));
    }
  }

  const updated = new Date(state.project.meta.updatedAt);
  els.projectMetaText.textContent = state.sourceImage
    ? `${t("statusLoaded")} · ${state.project.source.fileName || "image"} · ${updated.toLocaleString()}`
    : t("projectMetaFallback");
  els.versionText.textContent = `App ${state.versionInfo.appVersion} · Cache ${state.versionInfo.cacheVersion} · ${state.versionInfo.label} · Revision r${state.project.meta.revision}`;
  els.autosaveBadge.textContent = `${t("autosaveReady")} · ${updated.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}`;
  const hasImage = Boolean(state.sourceImage);
  const mobileLayout = isMobileLayout();
  els.exportButton.disabled = !hasImage;
  els.shareImageButton.disabled = !hasImage;
  els.downloadBackupButton.disabled = !hasImage;
  els.clearProjectButton.disabled = !hasImage;
  els.exportButton.hidden = mobileLayout;
  els.shareImageButton.classList.toggle("primary", mobileLayout);
  els.shareImageButton.classList.toggle("secondary", !mobileLayout);
  els.emptyBodyText.hidden = mobileLayout;
  els.canvasFrame.style.cursor = state.focusColorPickingTarget ? "crosshair" : (!hasImage && mobileLayout ? "pointer" : "");
}

function loadLocalState() {
  try {
    const savedProject = localStorage.getItem(STORAGE_KEY);
    if (savedProject) state.project = mergeProject(createDefaultProject(), JSON.parse(savedProject));
    const savedSettings = localStorage.getItem(SETTINGS_KEY);
    if (savedSettings) state.settings = { ...state.settings, ...JSON.parse(savedSettings) };
  } catch (error) {
    console.error(error);
  }
}

function saveLocalState() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state.project));
  localStorage.setItem(SETTINGS_KEY, JSON.stringify(state.settings));
}

function mergeProject(base, incoming) {
  return {
    ...base,
    ...incoming,
    meta: { ...base.meta, ...incoming?.meta },
    source: { ...base.source, ...incoming?.source },
    transform: { ...base.transform, ...incoming?.transform },
    corrections: { ...base.corrections, ...incoming?.corrections },
    styles: { ...base.styles, ...incoming?.styles },
    fx: { ...base.fx, ...incoming?.fx },
    morphology: { ...base.morphology, ...incoming?.morphology },
    patterns: { ...base.patterns, ...incoming?.patterns },
    materials: { ...base.materials, ...incoming?.materials },
    atmosphere: { ...base.atmosphere, ...incoming?.atmosphere },
    art: { ...base.art, ...incoming?.art },
    colors: { ...base.colors, ...incoming?.colors },
    export: { ...base.export, ...incoming?.export },
  };
}

function applyTranslations() {
  const language = getActiveLanguage();
  document.documentElement.lang = language === "auto" ? "de" : language;
  document.querySelectorAll("[data-i18n]").forEach((node) => {
    node.textContent = t(node.dataset.i18n);
  });
  document.querySelectorAll("[data-control-i18n]").forEach((node) => {
    node.textContent = node.dataset.controlI18n ? t(node.dataset.controlI18n) : node.dataset.controlFallback || "";
  });
  applyTheme();
  syncUiFromState();
}

function applyTheme() {
  document.body.classList.toggle("theme-light", state.settings.themeMode === "light");
  document.body.classList.toggle("theme-dark", state.settings.themeMode !== "light");
  if (els.themeToggleButton) {
    els.themeToggleButton.textContent = state.settings.themeMode === "dark" ? t("lightModeButton") : t("darkModeButton");
  }
  if (els.themeStatusNote) {
    els.themeStatusNote.textContent = state.settings.themeMode === "dark" ? t("themeDarkActive") : t("themeLightActive");
  }
}

function getActiveLanguage() {
  const preference = state.settings.languagePreference;
  if (preference !== "auto" && I18N[preference]) return preference;
  const candidate = navigator.language.slice(0, 2).toLowerCase();
  return I18N[candidate] ? candidate : "en";
}

function t(key, params = {}) {
  const language = getActiveLanguage();
  const dict = I18N[language] || I18N.en || {};
  const fallback = I18N.de || {};
  let value = dict[key] ?? fallback[key] ?? key;
  for (const [paramKey, paramValue] of Object.entries(params)) {
    value = value.replaceAll(`{${paramKey}}`, String(paramValue));
  }
  return value;
}

async function loadVersionInfo() {
  try {
    const response = await fetch("./version.json", { cache: "no-store" });
    if (!response.ok) return;
    const data = await response.json();
    state.versionInfo = { ...DEFAULT_VERSION, ...data };
    syncUiFromState();
  } catch (error) {
    console.error(error);
  }
}

function checkForUpdates(showAlert = false) {
  if (state.updateInProgress) return;
  state.updateInProgress = true;
  els.checkUpdateButton.disabled = true;
  setUpdateStatus(t("updateChecking"), true, false);
  fetch("./version.json", { cache: "no-store" })
    .then((response) => response.json())
    .then(async (data) => {
      const remote = { ...DEFAULT_VERSION, ...data };
      if (String(remote.appVersion) !== String(state.versionInfo.appVersion) || String(remote.cacheVersion) !== String(state.versionInfo.cacheVersion)) {
        state.versionInfo = remote;
        syncUiFromState();
        setUpdateStatus(t("updateAvailable", { version: remote.appVersion }), false, false);
        const shouldReload = await showConfirmDialog({
          title: t("updateConfirmTitle"),
          message: `${t("updateAvailable", { version: remote.appVersion })} ${t("updatePromptQuestion")}`,
          confirmLabel: t("reloadApp"),
          cancelLabel: t("close"),
        });
        if (shouldReload) {
          setUpdateStatus(t("updateApplying"), false, false);
          await performAppReload();
          return;
        }
        return;
      }
      setUpdateStatus(t("updateCurrent"), false, false);
      if (showAlert) {
        await showConfirmDialog({
          title: t("checkUpdates"),
          message: t("updateCurrent"),
          confirmLabel: t("close"),
          hideCancel: true,
        });
      }
    })
    .catch((error) => {
      console.error(error);
      setUpdateStatus(t("updateFailed"), false, false);
      if (showAlert) {
        void showConfirmDialog({
          title: t("checkUpdates"),
          message: t("updateFailed"),
          confirmLabel: t("close"),
          hideCancel: true,
        });
      }
    })
    .finally(() => {
      state.updateInProgress = false;
      els.checkUpdateButton.disabled = false;
    });
}

function setUpdateStatus(message, loading = false, showReload = false) {
  els.updateCheckStatus.textContent = message;
  els.updateCheckStatus.hidden = !message;
  els.updateCheckStatus.classList.toggle("loading", loading);
  els.reloadAppButton.hidden = !showReload;
}

async function performAppReload() {
  await navigator.serviceWorker?.getRegistration?.().then((registration) => registration?.update()).catch(() => {});
  window.location.reload();
}

function registerServiceWorker() {
  if (!("serviceWorker" in navigator)) return;
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("./service-worker.js").catch((error) => {
      console.error(error);
    });
  });
}

function formatControlValue(control, value) {
  if (control.max <= 12 || control.key === "blur" || control.key === "sharpen") {
    return `${Number(value).toFixed(control.step < 1 ? 1 : 0)}`;
  }
  if (control.key === "hueShift") return `${Math.round(value)}°`;
  if (control.key === "blackwhite") return `${Math.round(value)}`;
  return `${Math.round(value)}%`;
}

function makeExportFilename(extOverride) {
  const ext = extOverride || normalizeMimeExt(state.project.export.format);
  const safeBase = (state.project.source.fileName || "threadline-studio")
    .replace(/\.[^.]+$/, "")
    .replace(/[^a-z0-9-_]+/gi, "-")
    .toLowerCase();
  return `${safeBase || "threadline-studio"}-r${state.project.meta.revision}.${ext}`;
}

function normalizeMimeExt(format) {
  return format === "jpeg" ? "jpg" : format;
}

function readFileAsDataUrl(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result));
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

function loadImage(src) {
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.onload = () => resolve(image);
    image.onerror = reject;
    image.src = src;
  });
}

function rgbToHex(r, g, b) {
  return `#${[r, g, b].map((value) => clamp(Math.round(value), 0, 255).toString(16).padStart(2, "0")).join("")}`;
}

function canvasToBlob(canvas, type, quality) {
  return new Promise((resolve, reject) => {
    canvas.toBlob((blob) => {
      if (!blob) {
        reject(new Error("Could not create blob"));
        return;
      }
      resolve(blob);
    }, type, quality);
  });
}

function rgbaString(color, alpha) {
  return `rgba(${color.r}, ${color.g}, ${color.b}, ${clamp(alpha, 0, 1)})`;
}

function rgbaFromHex(hex, alpha) {
  return rgbaString(hexToRgb(hex), alpha);
}

function getPixelChannel(data, width, height, x, y, channel) {
  const px = clamp(Math.round(x), 0, width - 1);
  const py = clamp(Math.round(y), 0, height - 1);
  return data[(py * width + px) * 4 + channel];
}

function downloadBlob(blob, filename) {
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  link.click();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

function hexToRgb(hex) {
  const raw = hex.replace("#", "");
  const normalized = raw.length === 3 ? raw.split("").map((char) => char + char).join("") : raw;
  return {
    r: Number.parseInt(normalized.slice(0, 2), 16),
    g: Number.parseInt(normalized.slice(2, 4), 16),
    b: Number.parseInt(normalized.slice(4, 6), 16),
  };
}

function shiftHue(r, g, b, degrees) {
  const [h, s, l] = rgbToHsl(r, g, b);
  return hslToRgb((h + degrees + 360) % 360, s, l);
}

function rgbToHsl(r, g, b) {
  r /= 255;
  g /= 255;
  b /= 255;
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h;
  let s;
  const l = (max + min) / 2;
  if (max === min) {
    h = 0;
    s = 0;
  } else {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r: h = (g - b) / d + (g < b ? 6 : 0); break;
      case g: h = (b - r) / d + 2; break;
      default: h = (r - g) / d + 4;
    }
    h *= 60;
  }
  return [h, s, l];
}

function hslToRgb(h, s, l) {
  const c = (1 - Math.abs(2 * l - 1)) * s;
  const x = c * (1 - Math.abs(((h / 60) % 2) - 1));
  const m = l - c / 2;
  let r1 = 0;
  let g1 = 0;
  let b1 = 0;
  if (h < 60) {
    r1 = c; g1 = x;
  } else if (h < 120) {
    r1 = x; g1 = c;
  } else if (h < 180) {
    g1 = c; b1 = x;
  } else if (h < 240) {
    g1 = x; b1 = c;
  } else if (h < 300) {
    r1 = x; b1 = c;
  } else {
    r1 = c; b1 = x;
  }
  return [
    Math.round((r1 + m) * 255),
    Math.round((g1 + m) * 255),
    Math.round((b1 + m) * 255),
  ];
}

function getDistance(a, b) {
  return Math.hypot(a.x - b.x, a.y - b.y);
}

function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value));
}

function mix(a, b, amount) {
  return a + (b - a) * amount;
}

function curveAmount(value, exponent = 1.5, max = 1) {
  return Math.pow(clamp(value, 0, 1), exponent) * max;
}

function curveThousand(value, exponent = 1.4, max = 1) {
  return curveAmount(value / 10, exponent, max);
}

function getHueDistance(a, b) {
  const delta = Math.abs(a - b) % 360;
  return delta > 180 ? 360 - delta : delta;
}

function smoothstep(edge0, edge1, x) {
  const t = clamp((x - edge0) / Math.max(0.0001, edge1 - edge0), 0, 1);
  return t * t * (3 - 2 * t);
}

function seededNoise(a, b, salt = 0) {
  const value = Math.sin(a * 127.1 + b * 311.7 + salt * 91.3) * 43758.5453123;
  return value - Math.floor(value);
}

function normalizeDegrees(value) {
  let result = value % 360;
  if (result > 180) result -= 360;
  if (result < -180) result += 360;
  return result;
}

function showConfirmDialog(options = {}) {
  const {
    title = "Confirm",
    message = "",
    confirmLabel = "OK",
    cancelLabel = "Cancel",
    hideCancel = false,
  } = options;

  if (!els.confirmDialog || typeof els.confirmDialog.showModal !== "function") {
    return Promise.resolve(window.confirm(message));
  }

  if (els.confirmDialog.open) {
    els.confirmDialog.close("cancel");
  }

  els.confirmDialogTitle.textContent = title;
  els.confirmDialogMessage.textContent = message;
  els.confirmCancelButton.textContent = cancelLabel;
  els.confirmAcceptButton.textContent = confirmLabel;
  els.confirmCancelButton.hidden = hideCancel;
  els.confirmAcceptButton.classList.toggle("primary", !hideCancel);
  els.confirmAcceptButton.classList.toggle("secondary", hideCancel);

  return new Promise((resolve) => {
    const onClose = () => resolve(els.confirmDialog.returnValue === "confirm");
    els.confirmDialog.addEventListener("close", onClose, { once: true });
    els.confirmDialog.showModal();
  });
}

async function loadReadmeContent() {
  if (state.readmeText) {
    els.readmeStatus.textContent = "";
    els.readmeContent.innerHTML = renderMarkdownAsHtml(state.readmeText);
    return;
  }

  els.readmeStatus.textContent = t("helpLoading");
  els.readmeStatus.classList.add("loading");
  els.readmeContent.innerHTML = "";

  try {
    const response = await fetch("./README.md", { cache: "no-cache" });
    if (!response.ok) throw new Error("README unavailable");
    const text = await response.text();
    state.readmeText = text;
    els.readmeStatus.textContent = "";
    els.readmeStatus.classList.remove("loading");
    els.readmeContent.innerHTML = renderMarkdownAsHtml(text);
  } catch (error) {
    console.error(error);
    els.readmeStatus.textContent = t("helpFailed");
    els.readmeStatus.classList.remove("loading");
    els.readmeContent.innerHTML = "";
  }
}

function renderMarkdownAsHtml(markdown) {
  const lines = markdown.replace(/\r/g, "").split("\n");
  const html = [];
  let inList = false;
  let inCode = false;
  let paragraph = [];

  const flushParagraph = () => {
    if (!paragraph.length) return;
    html.push(`<p>${paragraph.join(" ")}</p>`);
    paragraph = [];
  };

  const flushList = () => {
    if (inList) {
      html.push("</ul>");
      inList = false;
    }
  };

  for (const rawLine of lines) {
    const line = escapeHtml(rawLine);
    if (line.startsWith("```")) {
      flushParagraph();
      flushList();
      html.push(inCode ? "</code></pre>" : "<pre><code>");
      inCode = !inCode;
      continue;
    }
    if (inCode) {
      html.push(`${line}\n`);
      continue;
    }
    if (!line.trim()) {
      flushParagraph();
      flushList();
      continue;
    }
    if (line.startsWith("# ")) {
      flushParagraph();
      flushList();
      html.push(`<h1>${line.slice(2)}</h1>`);
      continue;
    }
    if (line.startsWith("## ")) {
      flushParagraph();
      flushList();
      html.push(`<h2>${line.slice(3)}</h2>`);
      continue;
    }
    if (line.startsWith("### ")) {
      flushParagraph();
      flushList();
      html.push(`<h3>${line.slice(4)}</h3>`);
      continue;
    }
    if (line.startsWith("- ")) {
      flushParagraph();
      if (!inList) {
        html.push("<ul>");
        inList = true;
      }
      html.push(`<li>${line.slice(2)}</li>`);
      continue;
    }
    flushList();
    paragraph.push(line);
  }

  flushParagraph();
  flushList();
  return linkifyInline(html.join(""));
}

function escapeHtml(value) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");
}

function linkifyInline(html) {
  return html
    .replace(/`([^`]+)`/g, "<code>$1</code>")
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" rel="noreferrer">$1</a>');
}
