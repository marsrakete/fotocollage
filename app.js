const PRESETS = [
  { label: "2 Felder (oben/unten)", rows: 2, cols: 1 },
  { label: "2 Felder (links/rechts)", rows: 1, cols: 2 },
  { label: "2 x 2", rows: 2, cols: 2 },
  { label: "3 x 3", rows: 3, cols: 3 },
  { label: "2 x 3", rows: 2, cols: 3 },
  { label: "3 x 2", rows: 3, cols: 2 },
  { label: "4 x 3", rows: 4, cols: 3 },
  { label: "1 x 4", rows: 1, cols: 4 },
];

const DEFAULT_VERSION_INFO = Object.freeze({
  appVersion: "1.0.4",
  cacheVersion: "v5",
  label: "Aktueller Stand",
});

const STORAGE_KEYS = {
  language: "fotocollage-language",
};

const I18N = {
  de: {
    appTitle: "Foto-Collage",
    heroEyebrow: "Progressive Web App",
    heroLede:
      "In wenigen Schritten zur fertigen Collage: Vorlage w\u00e4hlen, Fotos hochladen, Ausschnitte feinjustieren und als PNG speichern.",
    settingsAria: "Einstellungen \u00f6ffnen",
    settingsButtonLabel: "Einstellungen",
    step1Title: "Schritt 1: Collage-Vorlage",
    step1Desc: "W\u00e4hle ein Raster oder passe Zeilen und Spalten flexibel an.",
    step2Title: "Schritt 2: Fotos hochladen",
    step2Desc: "Lade genau so viele Fotos hoch, wie das Raster ben\u00f6tigt. Fehlende Pl\u00e4tze bleiben markiert.",
    uploadTitle: "Fotos ziehen oder ausw\u00e4hlen",
    uploadDesc: "Alle Bilder werden der Reihe nach in die freien Felder gesetzt.",
    step3Title: "Schritt 3: Feinschliff",
    step3Desc: "Ziehe ein Bild in der Vorschau, um den Ausschnitt im Kasten zu verschieben.",
    activeCellTitle: "Aktives Feld",
    dragHint: "Zum Verschieben ziehen",
    step4Title: "Schritt 4: PNG speichern",
    step4Desc: "Die Collage wird in hoher Aufl\u00f6sung gerendert und direkt als PNG-Datei heruntergeladen.",
    exportWidthLabel: "Exportbreite",
    gapLabel: "Abstand",
    outerGapLabel: "Randabstand",
    exportHelp:
      "Der Export skaliert das gew\u00e4hlte Raster samt Zwischenr\u00e4umen und verwendet die aktuellen Ausschnitte.",
    settingsTitle: "Einstellungen",
    settingsIntro: "Sprache, Version und Aktualisierung der App.",
    languageLabel: "Sprache",
    autoLanguage: "Automatisch",
    checkForUpdates: "Auf Update pr\u00fcfen",
    reload: "Neu laden",
    close: "Schlie\u00dfen",
    toPhotos: "Weiter zu den Fotos",
    toFineTune: "Weiter zum Feinschliff",
    toExport: "Weiter zum Export",
    savePng: "Als PNG speichern",
    prevCell: "Vorheriges Feld",
    nextCell: "N\u00e4chstes Feld",
    replaceCell: "Bild ersetzen",
    resetFocus: "Ausschnitt zur\u00fccksetzen",
    zoomLabel: "Zoom",
    resetZoom: "Zoom zur\u00fccksetzen",
    step1Chip: "1. Vorlage",
    step2Chip: "2. Fotos",
    step3Chip: "3. Feinschliff",
    step4Chip: "4. Export",
    cells: "Felder",
    field: "Feld",
    fieldEmpty: "Feld ist leer",
    emptySlot: "Leer",
    slotStatusReady: "Bereit f\u00fcr den Feinschliff.",
    slotStatusMissing: "{filled} von {total} Feldern belegt. Es fehlen noch Bilder.",
    versionPrefix: "Version",
    offlineVersion: "Cache",
    updateChecking: "Pr\u00fcfe auf Updates \u2026",
    updateNoChange: "Keine neue Version gefunden. Diese App ist aktuell.",
    updateFailed: "Update-Pr\u00fcfung nicht m\u00f6glich. Bitte Internetverbindung oder Server pr\u00fcfen.",
    updateVersionIncomplete: "Die Versionsdatei vom Server ist unvollst\u00e4ndig.",
    updateAvailablePrefix: "Neue Version verf\u00fcgbar",
    updateAvailableAction: "Bitte jetzt neu laden.",
  },
  en: {
    appTitle: "Photo Collage",
    heroEyebrow: "Progressive Web App",
    heroLede:
      "Create a finished collage in a few steps: choose a template, upload photos, fine-tune the crop, and save as PNG.",
    settingsAria: "Open settings",
    settingsButtonLabel: "Settings",
    step1Title: "Step 1: Collage template",
    step1Desc: "Choose a grid or adjust rows and columns freely.",
    step2Title: "Step 2: Upload photos",
    step2Desc: "Upload exactly as many photos as the grid needs. Empty slots stay highlighted.",
    uploadTitle: "Drag photos or choose files",
    uploadDesc: "All images are placed into the free slots in order.",
    step3Title: "Step 3: Fine-tune",
    step3Desc: "Drag an image in the preview to shift the crop inside the frame.",
    activeCellTitle: "Active slot",
    dragHint: "Drag to move",
    step4Title: "Step 4: Save PNG",
    step4Desc: "The collage is rendered in high resolution and downloaded directly as a PNG file.",
    exportWidthLabel: "Export width",
    gapLabel: "Spacing",
    outerGapLabel: "Outer gap",
    exportHelp: "The export scales the chosen grid, including spacing, and uses the current crops.",
    settingsTitle: "Settings",
    settingsIntro: "Language, version and app updates.",
    languageLabel: "Language",
    autoLanguage: "Auto",
    checkForUpdates: "Check for updates",
    reload: "Reload",
    close: "Close",
    toPhotos: "Continue to photos",
    toFineTune: "Continue to fine-tuning",
    toExport: "Continue to export",
    savePng: "Save as PNG",
    prevCell: "Previous slot",
    nextCell: "Next slot",
    replaceCell: "Replace image",
    resetFocus: "Reset crop",
    zoomLabel: "Zoom",
    resetZoom: "Reset zoom",
    step1Chip: "1. Template",
    step2Chip: "2. Photos",
    step3Chip: "3. Fine-tune",
    step4Chip: "4. Export",
    cells: "slots",
    field: "slot",
    fieldEmpty: "slot is empty",
    emptySlot: "Empty",
    slotStatusReady: "Ready for fine-tuning.",
    slotStatusMissing: "{filled} of {total} slots filled. More photos are needed.",
    versionPrefix: "Version",
    offlineVersion: "Cache",
    updateChecking: "Checking for updates \u2026",
    updateNoChange: "No new version found. This app is up to date.",
    updateFailed: "Update check failed. Please check your internet connection or server.",
    updateVersionIncomplete: "The server version file is incomplete.",
    updateAvailablePrefix: "New version available",
    updateAvailableAction: "Please reload now.",
  },
  fr: {
    appTitle: "Collage photo",
    heroEyebrow: "Progressive Web App",
    heroLede:
      "Cr\u00e9ez un collage en quelques \u00e9tapes: choisissez un mod\u00e8le, envoyez vos photos, ajustez le cadrage et enregistrez en PNG.",
    settingsAria: "Ouvrir les param\u00e8tres",
    settingsButtonLabel: "Param\u00e8tres",
    step1Title: "\u00c9tape 1: Mod\u00e8le de collage",
    step1Desc: "Choisissez une grille ou adaptez librement les lignes et les colonnes.",
    step2Title: "\u00c9tape 2: Envoyer les photos",
    step2Desc: "Envoyez exactement autant de photos que la grille en demande. Les emplacements vides restent visibles.",
    uploadTitle: "Glissez des photos ou choisissez des fichiers",
    uploadDesc: "Toutes les images sont plac\u00e9es dans les emplacements libres, dans l'ordre.",
    step3Title: "\u00c9tape 3: Fignolage",
    step3Desc: "Faites glisser une image dans l'aper\u00e7u pour d\u00e9placer le cadrage dans le cadre.",
    activeCellTitle: "Emplacement actif",
    dragHint: "Glisser pour d\u00e9placer",
    step4Title: "\u00c9tape 4: Enregistrer en PNG",
    step4Desc: "Le collage est rendu en haute r\u00e9solution puis t\u00e9l\u00e9charg\u00e9 directement en PNG.",
    exportWidthLabel: "Largeur d'export",
    gapLabel: "Espacement",
    outerGapLabel: "Marge ext\u00e9rieure",
    exportHelp:
      "L'export met \u00e0 l'\u00e9chelle la grille choisie, espaces compris, avec le cadrage actuel.",
    settingsTitle: "Param\u00e8tres",
    settingsIntro: "Langue, version et mises \u00e0 jour de l'application.",
    languageLabel: "Langue",
    autoLanguage: "Auto",
    checkForUpdates: "V\u00e9rifier les mises \u00e0 jour",
    reload: "Recharger",
    close: "Fermer",
    toPhotos: "Continuer vers les photos",
    toFineTune: "Continuer vers le fignolage",
    toExport: "Continuer vers l'export",
    savePng: "Enregistrer en PNG",
    prevCell: "Emplacement pr\u00e9c\u00e9dent",
    nextCell: "Emplacement suivant",
    replaceCell: "Remplacer l'image",
    resetFocus: "R\u00e9initialiser le cadrage",
    zoomLabel: "Zoom",
    resetZoom: "R\u00e9initialiser le zoom",
    step1Chip: "1. Mod\u00e8le",
    step2Chip: "2. Photos",
    step3Chip: "3. Fignolage",
    step4Chip: "4. Export",
    cells: "cases",
    field: "case",
    fieldEmpty: "case vide",
    emptySlot: "Vide",
    slotStatusReady: "Pr\u00eat pour le fignolage.",
    slotStatusMissing: "{filled} sur {total} cases remplies. Il manque encore des photos.",
    versionPrefix: "Version",
    offlineVersion: "Cache",
    updateChecking: "Recherche des mises \u00e0 jour \u2026",
    updateNoChange: "Aucune nouvelle version trouv\u00e9e. L'application est \u00e0 jour.",
    updateFailed: "Impossible de v\u00e9rifier les mises \u00e0 jour. V\u00e9rifiez la connexion ou le serveur.",
    updateVersionIncomplete: "Le fichier de version du serveur est incomplet.",
    updateAvailablePrefix: "Nouvelle version disponible",
    updateAvailableAction: "Veuillez recharger maintenant.",
  },
};

const state = {
  rows: 2,
  cols: 2,
  gap: 12,
  outerGap: 12,
  background: "#101828",
  activeStep: 1,
  cells: [],
  selectedCell: 0,
  dragging: null,
  dragIndex: null,
  pinch: null,
  touchPoints: new Map(),
  exportWidth: 3000,
  languagePreference: "auto",
  language: "de",
  versionInfo: { ...DEFAULT_VERSION_INFO },
  serviceWorkerRegistration: null,
  updateInProgress: false,
};

const els = {
  heroEyebrow: document.getElementById("heroEyebrow"),
  appTitle: document.getElementById("appTitle"),
  heroLede: document.getElementById("heroLede"),
  settingsButton: document.getElementById("settingsButton"),
  settingsButtonLabel: document.getElementById("settingsButtonLabel"),
  versionLabel: document.getElementById("versionLabel"),
  gridSummary: document.getElementById("gridSummary"),
  filledSummary: document.getElementById("filledSummary"),
  stepSummary: document.getElementById("stepSummary"),
  presetGrid: document.getElementById("presetGrid"),
  rowsInput: document.getElementById("rowsInput"),
  colsInput: document.getElementById("colsInput"),
  gapLabel: document.getElementById("gapLabel"),
  gapInput: document.getElementById("gapInput"),
  gapValue: document.getElementById("gapValue"),
  outerGapLabel: document.getElementById("outerGapLabel"),
  outerGapInput: document.getElementById("outerGapInput"),
  outerGapValue: document.getElementById("outerGapValue"),
  backgroundInput: document.getElementById("backgroundInput"),
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
  prevCell: document.getElementById("prevCell"),
  nextCell: document.getElementById("nextCell"),
  replaceCell: document.getElementById("replaceCell"),
  replaceInput: document.getElementById("replaceInput"),
  resetFocus: document.getElementById("resetFocus"),
  zoomInput: document.getElementById("zoomInput"),
  zoomValue: document.getElementById("zoomValue"),
  zoomLabel: document.getElementById("zoomLabel"),
  resetZoom: document.getElementById("resetZoom"),
  exportWidthInput: document.getElementById("exportWidthInput"),
  exportWidthValue: document.getElementById("exportWidthValue"),
  exportButton: document.getElementById("exportButton"),
  exportCanvas: document.getElementById("exportCanvas"),
  settingsDialog: document.getElementById("settingsDialog"),
  settingsForm: document.getElementById("settingsForm"),
  settingsTitle: document.getElementById("settingsTitle"),
  settingsIntro: document.getElementById("settingsIntro"),
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
  stepChip1: document.getElementById("stepChip1"),
  stepChip2: document.getElementById("stepChip2"),
  stepChip3: document.getElementById("stepChip3"),
  stepChip4: document.getElementById("stepChip4"),
};

function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value));
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

function setText(el, key) {
  if (el) el.textContent = t(key);
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

function translateStaticUi() {
  document.title = t("appTitle");
  setText(els.heroEyebrow, "heroEyebrow");
  setText(els.appTitle, "appTitle");
  setText(els.heroLede, "heroLede");
  setText(els.settingsButtonLabel, "settingsButtonLabel");
  els.settingsButton.setAttribute("aria-label", t("settingsAria"));
  setText(els.step1Title, "step1Title");
  setText(els.step1Desc, "step1Desc");
  setText(els.step2Title, "step2Title");
  setText(els.step2Desc, "step2Desc");
  setText(els.uploadTitle, "uploadTitle");
  setText(els.uploadDesc, "uploadDesc");
  setText(els.step3Title, "step3Title");
  setText(els.step3Desc, "step3Desc");
  setText(els.activeCellTitle, "activeCellTitle");
  setText(els.dragHint, "dragHint");
  setText(els.step4Title, "step4Title");
  setText(els.step4Desc, "step4Desc");
  setText(els.gapLabel, "gapLabel");
  setText(els.outerGapLabel, "outerGapLabel");
  setText(els.exportWidthLabel, "exportWidthLabel");
  setText(els.exportHelp, "exportHelp");
  setText(els.settingsTitle, "settingsTitle");
  setText(els.settingsIntro, "settingsIntro");
  setText(els.languageLabel, "languageLabel");
  setText(els.checkForUpdatesButton, "checkForUpdates");
  setText(els.reloadAppButton, "reload");
  setText(els.toStep2, "toPhotos");
  setText(els.toStep3, "toFineTune");
  setText(els.toStep4, "toExport");
  setText(els.exportButton, "savePng");
  setText(els.prevCell, "prevCell");
  setText(els.nextCell, "nextCell");
  setText(els.replaceCell, "replaceCell");
  setText(els.resetFocus, "resetFocus");
  setText(els.zoomLabel, "zoomLabel");
  setText(els.resetZoom, "resetZoom");
  setText(els.stepChip1, "step1Chip");
  setText(els.stepChip2, "step2Chip");
  setText(els.stepChip3, "step3Chip");
  setText(els.stepChip4, "step4Chip");
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

function resizeCells(count) {
  while (state.cells.length < count) state.cells.push(createEmptyCell());
  while (state.cells.length > count) disposeCell(state.cells.pop());
  if (state.selectedCell >= state.cells.length) {
    state.selectedCell = Math.max(0, state.cells.length - 1);
  }
}

function setStep(step) {
  state.activeStep = step;
  document.querySelectorAll(".step-panel").forEach((panel) => {
    panel.classList.toggle("active", Number(panel.dataset.step) === step);
  });
  document.querySelectorAll(".step-chip").forEach((chip) => {
    chip.classList.toggle("active", Number(chip.dataset.stepTarget) === step);
  });
  els.stepSummary.textContent = `${step} / 4`;
  if (step >= 3) {
    renderPreview();
    renderExportPreview();
  }
  syncEditor();
}

function applyGrid() {
  state.rows = clamp(Number(els.rowsInput.value) || 1, 1, 8);
  state.cols = clamp(Number(els.colsInput.value) || 1, 1, 8);
  state.gap = clamp(Number(els.gapInput.value) || 0, 0, 60);
  state.outerGap = clamp(Number(els.outerGapInput.value) || 0, 0, 80);
  state.background = els.backgroundInput.value;
  els.rowsInput.value = state.rows;
  els.colsInput.value = state.cols;
  els.gapValue.textContent = state.gap;
  els.outerGapInput.value = state.outerGap;
  els.outerGapValue.textContent = state.outerGap;
  document.documentElement.style.setProperty("--gap", `${state.gap}px`);
  resizeCells(state.rows * state.cols);
  renderAll();
}

function renderPresets() {
  els.presetGrid.innerHTML = "";
  for (const preset of PRESETS) {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "preset";
    btn.dataset.rows = String(preset.rows);
    btn.dataset.cols = String(preset.cols);
    btn.innerHTML = `
      <span class="grid-mini" aria-hidden="true"></span>
      <div>
        <small>${preset.rows * preset.cols} ${t("cells")}</small>
        <strong>${preset.rows} x ${preset.cols}</strong>
      </div>
    `;
    const mini = btn.querySelector(".grid-mini");
    mini.style.gridTemplateColumns = `repeat(${preset.cols}, 1fr)`;
    mini.style.gridTemplateRows = `repeat(${preset.rows}, 1fr)`;
    mini.innerHTML = Array.from({ length: preset.rows * preset.cols }, () => "<span></span>").join("");
    btn.addEventListener("click", () => {
      els.rowsInput.value = preset.rows;
      els.colsInput.value = preset.cols;
      applyGrid();
    });
    els.presetGrid.appendChild(btn);
  }
}

function updatePresetActive() {
  const rows = Number(els.rowsInput.value);
  const cols = Number(els.colsInput.value);
  document.querySelectorAll(".preset").forEach((btn) => {
    const matches = Number(btn.dataset.rows) === rows && Number(btn.dataset.cols) === cols;
    btn.classList.toggle("active", matches);
  });
}

function renderStatus() {
  const total = state.cells.length;
  const filled = state.cells.filter((cell) => cell.bitmap).length;
  const complete = total > 0 && filled === total;
  els.gridSummary.textContent = `${state.rows} x ${state.cols}`;
  els.filledSummary.textContent = `${filled} / ${total}`;
  els.slotStatus.textContent = complete
    ? t("slotStatusReady")
    : format(t("slotStatusMissing"), { filled, total });
  els.toStep3.disabled = !complete;
  els.toStep4.disabled = !complete;
}

function renderSlots() {
  els.slotGrid.innerHTML = "";
  const template = document.getElementById("slotTemplate");
  state.cells.forEach((cell, index) => {
    const node = template.content.firstElementChild.cloneNode(true);
    const img = node.querySelector("img");
    const label = node.querySelector(".slot-label");
    node.querySelector(".slot-index").textContent = `#${index + 1}`;
    node.draggable = Boolean(cell.bitmap);
    node.dataset.index = String(index);
    if (cell.bitmap) {
      node.classList.remove("empty");
      img.src = cell.objectUrl;
      img.alt = cell.fileName;
      img.style.objectPosition = `${(cell.focusX + 1) * 50}% ${(cell.focusY + 1) * 50}%`;
      img.style.transform = `scale(${cell.zoom || 1})`;
      label.textContent = cell.fileName;
    } else {
      node.classList.add("empty");
      img.removeAttribute("src");
      label.textContent = t("emptySlot");
    }
    node.addEventListener("click", () => {
      state.selectedCell = index;
      if (hasCompleteGrid()) {
        setStep(3);
      }
      renderAll();
    });
    node.addEventListener("dragstart", (event) => {
      if (!cell.bitmap) {
        event.preventDefault();
        return;
      }
      state.dragIndex = index;
      event.dataTransfer.effectAllowed = "move";
      event.dataTransfer.setData("text/plain", String(index));
      node.classList.add("drag-source");
    });
    node.addEventListener("dragend", () => {
      state.dragIndex = null;
      node.classList.remove("drag-source");
      node.classList.remove("drag-over");
    });
    node.addEventListener("dragover", (event) => {
      if (state.dragIndex === null) return;
      event.preventDefault();
      node.classList.add("drag-over");
    });
    node.addEventListener("dragleave", () => {
      node.classList.remove("drag-over");
    });
    node.addEventListener("drop", (event) => {
      event.preventDefault();
      node.classList.remove("drag-over");
      const from = Number(event.dataTransfer.getData("text/plain") || state.dragIndex);
      if (Number.isNaN(from)) return;
      moveCell(from, index);
    });
    els.slotGrid.appendChild(node);
  });
}

function moveCell(from, to) {
  if (from === to || from < 0 || to < 0 || from >= state.cells.length || to >= state.cells.length) return;
  const [cell] = state.cells.splice(from, 1);
  state.cells.splice(to, 0, cell);
  state.selectedCell = to;
  renderAll();
}

function renderPreview() {
  els.collagePreview.style.gridTemplateColumns = `repeat(${state.cols}, minmax(0, 1fr))`;
  els.collagePreview.style.gridTemplateRows = `repeat(${state.rows}, minmax(0, 1fr))`;
  els.collagePreview.style.setProperty("--grid-gap", `${state.gap}px`);
  els.collagePreview.style.setProperty("--outer-gap", `${state.outerGap}px`);
  els.collagePreview.innerHTML = "";
  const template = document.getElementById("previewCellTemplate");
  state.cells.forEach((cell, index) => {
    const node = template.content.firstElementChild.cloneNode(true);
    const img = node.querySelector("img");
    const emptyNote = node.querySelector(".empty-note");
    node.querySelector(".cell-index").textContent = `#${index + 1}`;
    node.classList.toggle("selected", index === state.selectedCell);
    if (cell.bitmap) {
      node.classList.remove("empty");
      img.src = cell.objectUrl;
      img.alt = cell.fileName;
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
    node.addEventListener("pointerdown", (event) => startDrag(event, index, node));
    node.addEventListener("click", () => {
      state.selectedCell = index;
      syncEditor();
      renderPreview();
    });
    els.collagePreview.appendChild(node);
    if (cell.bitmap) {
      applyImagePlacement(img, node, cell);
    }
  });
}

function syncEditor() {
  const cell = state.cells[state.selectedCell];
  if (!cell) return;
  els.activeCellInfo.textContent = cell.bitmap
    ? `${state.selectedCell + 1}. ${t("field")}: ${cell.fileName}`
    : `${state.selectedCell + 1}. ${t("fieldEmpty")}`;
  if (cell.bitmap) {
    els.editorImage.src = cell.objectUrl;
    els.editorImage.alt = cell.fileName;
    applyImagePlacement(els.editorImage, els.editorFrame, cell);
    els.zoomInput.value = String(cell.zoom || 1);
    els.zoomValue.textContent = String(Math.round((cell.zoom || 1) * 100));
  } else {
    els.editorImage.removeAttribute("src");
    els.editorImage.alt = "";
    resetImagePlacement(els.editorImage);
    els.zoomInput.value = "1";
    els.zoomValue.textContent = "100";
  }
}

function renderExportPreview() {
  const targetWidth = clamp(Number(els.exportWidthInput.value) || state.exportWidth, 1200, 6000);
  state.exportWidth = targetWidth;
  els.exportWidthInput.value = String(targetWidth);
  els.exportWidthValue.textContent = String(targetWidth);
  const canvas = els.exportCanvas;
  const ctx = canvas.getContext("2d");
  const height = Math.round(targetWidth * (state.rows / state.cols));
  canvas.width = targetWidth;
  canvas.height = height;
  drawCollage(ctx, canvas.width, canvas.height);
}

function hasCompleteGrid() {
  return state.cells.length > 0 && state.cells.every((cell) => cell.bitmap);
}

function drawCollage(ctx, width, height) {
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

  ctx.save();
  ctx.fillStyle = state.background;
  ctx.fillRect(0, 0, width, height);
  const innerGap = state.gap;
  const outerGap = state.outerGap;
  const colAxis = buildAxis(width, state.cols, innerGap, outerGap);
  const rowAxis = buildAxis(height, state.rows, innerGap, outerGap);
  for (let i = 0; i < state.cells.length; i += 1) {
    const cell = state.cells[i];
    const col = i % state.cols;
    const row = Math.floor(i / state.cols);
    const x = colAxis[col].start;
    const y = rowAxis[row].start;
    const cellWidth = colAxis[col].size;
    const cellHeight = rowAxis[row].size;
    ctx.fillStyle = "rgba(255,255,255,0.04)";
    ctx.fillRect(x, y, cellWidth, cellHeight);
    if (cell?.bitmap) {
      const scale = Math.max(cellWidth / cell.width, cellHeight / cell.height);
      const zoom = clamp(cell.zoom || 1, 1, 4);
      const drawWidth = cell.width * scale * zoom;
      const drawHeight = cell.height * scale * zoom;
      const maxOffsetX = Math.max(0, drawWidth - cellWidth);
      const maxOffsetY = Math.max(0, drawHeight - cellHeight);
      const focusX = clamp((cell.focusX + 1) / 2, 0, 1);
      const focusY = clamp((cell.focusY + 1) / 2, 0, 1);
      const offsetX = focusX * maxOffsetX;
      const offsetY = focusY * maxOffsetY;

      ctx.save();
      ctx.beginPath();
      ctx.rect(x, y, cellWidth, cellHeight);
      ctx.clip();
      ctx.drawImage(cell.bitmap, x - offsetX, y - offsetY, drawWidth, drawHeight);
      ctx.restore();
    } else {
      ctx.fillStyle = "rgba(245,247,251,0.72)";
      ctx.font = `${Math.max(18, Math.min(cellWidth, cellHeight) * 0.09)}px Segoe UI, sans-serif`;
      ctx.textBaseline = "top";
      ctx.fillText(`${t("field")} ${i + 1}`, x + 14, y + 34);
    }
  }

  ctx.save();
  ctx.strokeStyle = "rgba(255,255,255,0.18)";
  ctx.lineWidth = 1;
  for (let i = 0; i < state.cells.length; i += 1) {
    const col = i % state.cols;
    const row = Math.floor(i / state.cols);
    const x = colAxis[col].start + 0.5;
    const y = rowAxis[row].start + 0.5;
    const cellWidth = Math.max(1, colAxis[col].size - 1);
    const cellHeight = Math.max(1, rowAxis[row].size - 1);
    ctx.strokeRect(x, y, cellWidth, cellHeight);
  }
  ctx.restore();
  ctx.restore();
}

function renderAll() {
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
}

async function loadFiles(fileList) {
  const files = Array.from(fileList).filter((file) => file.type.startsWith("image/"));
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
  const scale = Math.max(frameWidth / cell.width, frameHeight / cell.height);
  const zoom = clamp(cell.zoom || 1, 1, 4);
  const coverWidth = cell.width * scale * zoom;
  const coverHeight = cell.height * scale * zoom;
  const extraX = Math.max(0, coverWidth - frameWidth);
  const extraY = Math.max(0, coverHeight - frameHeight);
  const focusX = clamp((cell.focusX + 1) / 2, 0, 1);
  const focusY = clamp((cell.focusY + 1) / 2, 0, 1);
  return {
    coverWidth,
    coverHeight,
    extraX,
    extraY,
    offsetX: focusX * extraX,
    offsetY: focusY * extraY,
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
  img.style.width = `${metrics.coverWidth}px`;
  img.style.height = `${metrics.coverHeight}px`;
  img.style.left = `${-metrics.offsetX}px`;
  img.style.top = `${-metrics.offsetY}px`;
  img.style.objectFit = "fill";
  img.style.objectPosition = "50% 50%";
  img.style.transform = "none";
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

function getFrameMetrics(frame, cell) {
  const rect = frame.getBoundingClientRect();
  const metrics = getImageRenderMetrics(cell, rect.width, rect.height);
  return {
    frameWidth: rect.width,
    frameHeight: rect.height,
    coverWidth: metrics.coverWidth,
    coverHeight: metrics.coverHeight,
  };
}

function setCellZoom(index, nextZoom) {
  const cell = state.cells[index];
  if (!cell?.bitmap) return;
  cell.zoom = clamp(nextZoom, 1, 4);
  syncEditor();
  renderPreview();
  renderExportPreview();
}

function handleEditorWheel(event) {
  const cell = state.cells[state.selectedCell];
  if (!cell?.bitmap) return;
  event.preventDefault();
  const delta = -event.deltaY;
  const factor = 1 + delta * 0.0015;
  const nextZoom = clamp((cell.zoom || 1) * factor, 1, 4);
  setCellZoom(state.selectedCell, nextZoom);
}

function distance(a, b) {
  const dx = a.x - b.x;
  const dy = a.y - b.y;
  return Math.sqrt(dx * dx + dy * dy);
}

function handleEditorPointerDown(event) {
  if (event.pointerType !== "touch") {
    startDrag(event, state.selectedCell, els.editorFrame);
    return;
  }
  state.touchPoints.set(event.pointerId, { x: event.clientX, y: event.clientY });
  if (state.touchPoints.size === 1) {
    startDrag(event, state.selectedCell, els.editorFrame);
    return;
  }
  if (state.touchPoints.size >= 2) {
    stopDrag();
    const points = Array.from(state.touchPoints.values());
    const cell = state.cells[state.selectedCell];
    if (!cell?.bitmap) return;
    state.pinch = {
      startDistance: distance(points[0], points[1]),
      startZoom: cell.zoom || 1,
      index: state.selectedCell,
    };
  }
}

function handleEditorPointerMove(event) {
  if (event.pointerType !== "touch") return;
  if (!state.touchPoints.has(event.pointerId)) return;
  state.touchPoints.set(event.pointerId, { x: event.clientX, y: event.clientY });
  if (!state.pinch || state.touchPoints.size < 2) return;
  event.preventDefault();
  const points = Array.from(state.touchPoints.values());
  const nextDistance = distance(points[0], points[1]);
  if (state.pinch.startDistance <= 0) return;
  const ratio = nextDistance / state.pinch.startDistance;
  setCellZoom(state.pinch.index, state.pinch.startZoom * ratio);
}

function handleEditorPointerUp(event) {
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
  frame.setPointerCapture?.(event.pointerId);
  window.addEventListener("pointermove", onDragMove);
  window.addEventListener("pointerup", stopDrag, { once: true });
}

function onDragMove(event) {
  if (!state.dragging || event.pointerId !== state.dragging.pointerId) return;
  const cell = state.cells[state.dragging.index];
  if (!cell?.bitmap) return;
  const extraX = Math.max(0, state.dragging.coverWidth - state.dragging.frameWidth);
  const extraY = Math.max(0, state.dragging.coverHeight - state.dragging.frameHeight);
  if (extraX > 0) {
    const deltaX = event.clientX - state.dragging.startX;
    cell.focusX = clamp(state.dragging.startFocusX + deltaX / (extraX / 2), -1, 1);
  }
  if (extraY > 0) {
    const deltaY = event.clientY - state.dragging.startY;
    cell.focusY = clamp(state.dragging.startFocusY + deltaY / (extraY / 2), -1, 1);
  }
  syncEditor();
  renderPreview();
  renderExportPreview();
}

function stopDrag() {
  window.removeEventListener("pointermove", onDragMove);
  state.dragging = null;
}

function buildTimestampFilename(now = new Date()) {
  const pad2 = (value) => String(value).padStart(2, "0");
  const y = String(now.getFullYear());
  const m = pad2(now.getMonth() + 1);
  const d = pad2(now.getDate());
  const hh = pad2(now.getHours());
  const mm = pad2(now.getMinutes());
  const ss = pad2(now.getSeconds());
  return `fotocollage_${y}${m}${d}_${hh}${mm}${ss}.png`;
}

function exportPng() {
  const canvas = document.createElement("canvas");
  const width = clamp(Number(els.exportWidthInput.value) || 3000, 1200, 6000);
  const height = Math.round(width * (state.rows / state.cols));
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext("2d");
  drawCollage(ctx, width, height);
  const link = document.createElement("a");
  link.download = buildTimestampFilename(new Date());
  link.href = canvas.toDataURL("image/png");
  link.click();
}

function setUpdateStatus(message, showReload = false) {
  els.updateCheckStatus.textContent = message;
  els.updateCheckStatus.hidden = !message;
  els.reloadAppButton.hidden = !showReload;
}

async function fetchVersionInfo() {
  const response = await fetch("./version.json", { cache: "no-cache" });
  if (!response.ok) {
    throw new Error("Version file unavailable");
  }
  return normalizeVersionInfo(await response.json());
}

async function loadVersionInfo() {
  try {
    state.versionInfo = await fetchVersionInfo();
  } catch {
    state.versionInfo = { ...DEFAULT_VERSION_INFO };
  }
  renderVersionLabel();
}

async function checkForUpdates() {
  if (state.updateInProgress) return;
  state.updateInProgress = true;
  els.checkForUpdatesButton.disabled = true;
  setUpdateStatus(t("updateChecking"), false);
  try {
    await state.serviceWorkerRegistration?.update();
    const remoteVersion = await fetchVersionInfo();
    if (!remoteVersion.appVersion || !remoteVersion.cacheVersion) {
      setUpdateStatus(t("updateVersionIncomplete"), false);
      return;
    }
    if (versionSignature(remoteVersion) === versionSignature(state.versionInfo)) {
      setUpdateStatus(t("updateNoChange"), false);
      return;
    }
    setUpdateStatus(
      `${t("updateAvailablePrefix")}: ${remoteVersion.appVersion} \u00b7 ${remoteVersion.cacheVersion}. ${t("updateAvailableAction")}`,
      true
    );
  } catch {
    setUpdateStatus(t("updateFailed"), false);
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
    els.dropZone.classList.add("dragging");
  });
  els.dropZone.addEventListener("dragover", (event) => {
    event.preventDefault();
    els.dropZone.classList.add("dragging");
  });
  els.dropZone.addEventListener("dragleave", (event) => {
    event.preventDefault();
    els.dropZone.classList.remove("dragging");
  });
  els.dropZone.addEventListener("drop", (event) => {
    event.preventDefault();
    els.dropZone.classList.remove("dragging");
    void loadFiles(event.dataTransfer.files);
  });
  els.fileInput.addEventListener("change", () => {
    void loadFiles(els.fileInput.files);
    els.fileInput.value = "";
  });
}

function wireControls() {
  els.rowsInput.addEventListener("change", () => {
    applyGrid();
  });
  els.colsInput.addEventListener("change", () => {
    applyGrid();
  });
  els.gapInput.addEventListener("input", () => {
    applyGrid();
  });
  els.outerGapInput.addEventListener("input", () => {
    applyGrid();
  });
  els.backgroundInput.addEventListener("input", () => {
    applyGrid();
  });
  els.toStep2.addEventListener("click", () => setStep(2));
  els.toStep3.addEventListener("click", () => setStep(3));
  els.toStep4.addEventListener("click", () => setStep(4));
  document.querySelectorAll("[data-prev-step]").forEach((button) => {
    button.addEventListener("click", () => setStep(Number(button.dataset.prevStep)));
  });
  document.querySelectorAll(".step-chip").forEach((button) => {
    button.addEventListener("click", () => setStep(Number(button.dataset.stepTarget)));
  });
  els.prevCell.addEventListener("click", () => {
    state.selectedCell = (state.selectedCell - 1 + state.cells.length) % state.cells.length;
    renderAll();
  });
  els.nextCell.addEventListener("click", () => {
    state.selectedCell = (state.selectedCell + 1) % state.cells.length;
    renderAll();
  });
  els.resetFocus.addEventListener("click", () => {
    const cell = state.cells[state.selectedCell];
    if (!cell) return;
    cell.focusX = 0;
    cell.focusY = 0;
    renderAll();
  });
  els.editorFrame.addEventListener("pointerdown", handleEditorPointerDown);
  els.editorFrame.addEventListener("pointermove", handleEditorPointerMove);
  els.editorFrame.addEventListener("pointerup", handleEditorPointerUp);
  els.editorFrame.addEventListener("pointercancel", handleEditorPointerUp);
  els.editorFrame.addEventListener("wheel", handleEditorWheel, { passive: false });
  els.zoomInput.addEventListener("input", () => {
    setCellZoom(state.selectedCell, Number(els.zoomInput.value) || 1);
  });
  els.resetZoom.addEventListener("click", () => {
    setCellZoom(state.selectedCell, 1);
  });
  els.replaceCell.addEventListener("click", () => {
    els.replaceInput.click();
  });
  els.replaceInput.addEventListener("change", () => {
    const file = els.replaceInput.files?.[0];
    if (!file) return;
    void setCellImage(state.selectedCell, file).then(() => {
      renderAll();
    });
    els.replaceInput.value = "";
  });
  els.exportWidthInput.addEventListener("input", renderExportPreview);
  els.exportButton.addEventListener("click", exportPng);
  els.settingsButton.addEventListener("click", () => {
    setUpdateStatus("", false);
    els.settingsDialog.showModal();
  });
  els.languageSelect.addEventListener("change", () => {
    applyLanguagePreference(els.languageSelect.value);
  });
  els.checkForUpdatesButton.addEventListener("click", checkForUpdates);
  els.reloadAppButton.addEventListener("click", async () => {
    await state.serviceWorkerRegistration?.update().catch(() => {});
    window.location.reload();
  });
  els.settingsForm.addEventListener("submit", (event) => {
    event.preventDefault();
    els.settingsDialog.close();
  });
  window.addEventListener("resize", () => {
    if (state.activeStep >= 3) {
      renderPreview();
      renderExportPreview();
    }
  });
}

function renderAllWithoutExport() {
  updatePresetActive();
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
  els.languageSelect.value = preference;
  document.documentElement.lang = state.language;
}

function init() {
  loadInitialPreferences();
  translateStaticUi();
  renderPresets();
  resizeCells(state.rows * state.cols);
  renderSlotsStatusControls();
  wireControls();
  void loadVersionInfo().then(() => {
    renderVersionLabel();
  });
  registerServiceWorker();
  applyGrid();
  renderAllWithoutExport();
  els.exportWidthInput.value = String(state.exportWidth);
  els.exportWidthValue.textContent = String(state.exportWidth);
  els.outerGapInput.value = String(state.outerGap);
  els.outerGapValue.textContent = String(state.outerGap);
  renderVersionLabel();
}

init();
