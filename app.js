function createGridSlots(rows, cols) {
  const slots = [];
  for (let y = 0; y < rows; y += 1) {
    for (let x = 0; x < cols; x += 1) {
      slots.push({ x, y, w: 1, h: 1 });
    }
  }
  return slots;
}

const PRESETS = [
  {
    id: "mosaic-top1-bottom2",
    label: "Oben 1, unten 2",
    rows: 2,
    cols: 2,
    slots: [
      { x: 0, y: 0, w: 2, h: 1 },
      { x: 0, y: 1, w: 1, h: 1 },
      { x: 1, y: 1, w: 1, h: 1 },
    ],
  },
  {
    id: "mosaic-top2-bottom1",
    label: "Oben 2, unten 1",
    rows: 2,
    cols: 2,
    slots: [
      { x: 0, y: 0, w: 1, h: 1 },
      { x: 1, y: 0, w: 1, h: 1 },
      { x: 0, y: 1, w: 2, h: 1 },
    ],
  },
  {
    id: "mosaic-left1-right2",
    label: "Links 1, rechts 2",
    rows: 2,
    cols: 2,
    slots: [
      { x: 0, y: 0, w: 1, h: 2 },
      { x: 1, y: 0, w: 1, h: 1 },
      { x: 1, y: 1, w: 1, h: 1 },
    ],
  },
  {
    id: "mosaic-left2-right1",
    label: "Links 2, rechts 1",
    rows: 2,
    cols: 2,
    slots: [
      { x: 0, y: 0, w: 1, h: 1 },
      { x: 0, y: 1, w: 1, h: 1 },
      { x: 1, y: 0, w: 1, h: 2 },
    ],
  },
  {
    id: "mosaic-top1-bottom3",
    label: "Oben 1, unten 3",
    rows: 2,
    cols: 3,
    slots: [
      { x: 0, y: 0, w: 3, h: 1 },
      { x: 0, y: 1, w: 1, h: 1 },
      { x: 1, y: 1, w: 1, h: 1 },
      { x: 2, y: 1, w: 1, h: 1 },
    ],
  },
  {
    id: "mosaic-top3-bottom1",
    label: "Oben 3, unten 1",
    rows: 2,
    cols: 3,
    slots: [
      { x: 0, y: 0, w: 1, h: 1 },
      { x: 1, y: 0, w: 1, h: 1 },
      { x: 2, y: 0, w: 1, h: 1 },
      { x: 0, y: 1, w: 3, h: 1 },
    ],
  },
  {
    id: "story-left-main",
    label: "Story links, rechts 2",
    rows: 2,
    cols: 3,
    slots: [
      { x: 0, y: 0, w: 1, h: 2 },
      { x: 1, y: 0, w: 2, h: 1 },
      { x: 1, y: 1, w: 2, h: 1 },
    ],
  },
  {
    id: "story-right-main",
    label: "Story rechts, links 2",
    rows: 2,
    cols: 3,
    slots: [
      { x: 0, y: 0, w: 2, h: 1 },
      { x: 0, y: 1, w: 2, h: 1 },
      { x: 2, y: 0, w: 1, h: 2 },
    ],
  },
  {
    id: "story-center-main",
    label: "Story Mitte, Seiten 4",
    rows: 2,
    cols: 3,
    slots: [
      { x: 1, y: 0, w: 1, h: 2 },
      { x: 0, y: 0, w: 1, h: 1 },
      { x: 0, y: 1, w: 1, h: 1 },
      { x: 2, y: 0, w: 1, h: 1 },
      { x: 2, y: 1, w: 1, h: 1 },
    ],
  },
  {
    id: "corner-2x2-top-left",
    label: "3x3 Ecke: 2x2 oben links",
    rows: 3,
    cols: 3,
    slots: [
      { x: 0, y: 0, w: 2, h: 2 },
      { x: 2, y: 0, w: 1, h: 1 },
      { x: 2, y: 1, w: 1, h: 1 },
      { x: 0, y: 2, w: 1, h: 1 },
      { x: 1, y: 2, w: 1, h: 1 },
      { x: 2, y: 2, w: 1, h: 1 },
    ],
  },
  {
    id: "corner-2x2-top-right",
    label: "3x3 Ecke: 2x2 oben rechts",
    rows: 3,
    cols: 3,
    slots: [
      { x: 1, y: 0, w: 2, h: 2 },
      { x: 0, y: 0, w: 1, h: 1 },
      { x: 0, y: 1, w: 1, h: 1 },
      { x: 0, y: 2, w: 1, h: 1 },
      { x: 1, y: 2, w: 1, h: 1 },
      { x: 2, y: 2, w: 1, h: 1 },
    ],
  },
  {
    id: "corner-2x2-bottom-left",
    label: "3x3 Ecke: 2x2 unten links",
    rows: 3,
    cols: 3,
    slots: [
      { x: 0, y: 1, w: 2, h: 2 },
      { x: 0, y: 0, w: 1, h: 1 },
      { x: 1, y: 0, w: 1, h: 1 },
      { x: 2, y: 0, w: 1, h: 1 },
      { x: 2, y: 1, w: 1, h: 1 },
      { x: 2, y: 2, w: 1, h: 1 },
    ],
  },
  {
    id: "corner-2x2-bottom-right",
    label: "3x3 Ecke: 2x2 unten rechts",
    rows: 3,
    cols: 3,
    slots: [
      { x: 1, y: 1, w: 2, h: 2 },
      { x: 0, y: 0, w: 1, h: 1 },
      { x: 1, y: 0, w: 1, h: 1 },
      { x: 2, y: 0, w: 1, h: 1 },
      { x: 0, y: 1, w: 1, h: 1 },
      { x: 0, y: 2, w: 1, h: 1 },
    ],
  },
  { id: "grid-2x1", label: "2 Felder (oben/unten)", rows: 2, cols: 1, slots: createGridSlots(2, 1) },
  { id: "grid-1x2", label: "2 Felder (links/rechts)", rows: 1, cols: 2, slots: createGridSlots(1, 2) },
  { id: "grid-2x2", label: "2 x 2", rows: 2, cols: 2, slots: createGridSlots(2, 2) },
  { id: "grid-3x3", label: "3 x 3", rows: 3, cols: 3, slots: createGridSlots(3, 3) },
  { id: "grid-2x3", label: "2 x 3", rows: 2, cols: 3, slots: createGridSlots(2, 3) },
  { id: "grid-3x2", label: "3 x 2", rows: 3, cols: 2, slots: createGridSlots(3, 2) },
  { id: "grid-4x3", label: "4 x 3", rows: 4, cols: 3, slots: createGridSlots(4, 3) },
  { id: "grid-1x4-square", label: "1 x 4 (quadratisch)", rows: 1, cols: 4, slots: createGridSlots(1, 4) },
  { id: "grid-4x1-square", label: "4 x 1 (quadratisch)", rows: 4, cols: 1, slots: createGridSlots(4, 1) },
  {
    id: "grid-4x1-tall2",
    label: "4 x 1 (2 Einheiten Höhe)",
    rows: 2,
    cols: 4,
    slots: [
      { x: 0, y: 0, w: 1, h: 2 },
      { x: 1, y: 0, w: 1, h: 2 },
      { x: 2, y: 0, w: 1, h: 2 },
      { x: 3, y: 0, w: 1, h: 2 },
    ],
  },
  {
    id: "grid-1x4-wide2",
    label: "1 x 4 (2 Einheiten Breite)",
    rows: 4,
    cols: 2,
    slots: [
      { x: 0, y: 0, w: 2, h: 1 },
      { x: 0, y: 1, w: 2, h: 1 },
      { x: 0, y: 2, w: 2, h: 1 },
      { x: 0, y: 3, w: 2, h: 1 },
    ],
  },
  {
    id: "grid-3x1-tall3",
    label: "3 x 1 (3 Einheiten Hoehe)",
    rows: 3,
    cols: 3,
    slots: [
      { x: 0, y: 0, w: 1, h: 3 },
      { x: 1, y: 0, w: 1, h: 3 },
      { x: 2, y: 0, w: 1, h: 3 },
    ],
  },
  {
    id: "grid-1x3-wide3",
    label: "1 x 3 (3 Einheiten Breite)",
    rows: 3,
    cols: 3,
    slots: [
      { x: 0, y: 0, w: 3, h: 1 },
      { x: 0, y: 1, w: 3, h: 1 },
      { x: 0, y: 2, w: 3, h: 1 },
    ],
  },
  {
    id: "grid-4x1-tall4",
    label: "4 x 1 (4 Einheiten Hoehe)",
    rows: 4,
    cols: 4,
    slots: [
      { x: 0, y: 0, w: 1, h: 4 },
      { x: 1, y: 0, w: 1, h: 4 },
      { x: 2, y: 0, w: 1, h: 4 },
      { x: 3, y: 0, w: 1, h: 4 },
    ],
  },
  {
    id: "grid-1x4-wide4",
    label: "1 x 4 (4 Einheiten Breite)",
    rows: 4,
    cols: 4,
    slots: [
      { x: 0, y: 0, w: 4, h: 1 },
      { x: 0, y: 1, w: 4, h: 1 },
      { x: 0, y: 2, w: 4, h: 1 },
      { x: 0, y: 3, w: 4, h: 1 },
    ],
  },
  {
    id: "grid-1x2-wide2",
    label: "1 x 2 (2 Einheiten Breite)",
    rows: 2,
    cols: 2,
    slots: [
      { x: 0, y: 0, w: 2, h: 1 },
      { x: 0, y: 1, w: 2, h: 1 },
    ],
  },
  {
    id: "grid-2x1-tall2",
    label: "2 x 1 (2 Einheiten Hoehe)",
    rows: 2,
    cols: 2,
    slots: [
      { x: 0, y: 0, w: 1, h: 2 },
      { x: 1, y: 0, w: 1, h: 2 },
    ],
  },
  {
    id: "triptych-vertical",
    label: "Triptychon vertikal",
    rows: 1,
    cols: 3,
    slots: createGridSlots(1, 3),
  },
  {
    id: "triptych-horizontal",
    label: "Triptychon horizontal",
    rows: 3,
    cols: 1,
    slots: createGridSlots(3, 1),
  },
];

const PRESET_LABELS = Object.freeze({
  "mosaic-top1-bottom2": {
    de: "Oben 1, unten 2",
    en: "Top 1, bottom 2",
    fr: "En haut 1, en bas 2",
  },
  "mosaic-top2-bottom1": {
    de: "Oben 2, unten 1",
    en: "Top 2, bottom 1",
    fr: "En haut 2, en bas 1",
  },
  "mosaic-left1-right2": {
    de: "Links 1, rechts 2",
    en: "Left 1, right 2",
    fr: "A gauche 1, a droite 2",
  },
  "mosaic-left2-right1": {
    de: "Links 2, rechts 1",
    en: "Left 2, right 1",
    fr: "A gauche 2, a droite 1",
  },
  "mosaic-top1-bottom3": {
    de: "Oben 1, unten 3",
    en: "Top 1, bottom 3",
    fr: "En haut 1, en bas 3",
  },
  "mosaic-top3-bottom1": {
    de: "Oben 3, unten 1",
    en: "Top 3, bottom 1",
    fr: "En haut 3, en bas 1",
  },
  "story-left-main": {
    de: "Story links, rechts 2",
    en: "Story left, right 2",
    fr: "Story a gauche, 2 a droite",
  },
  "story-right-main": {
    de: "Story rechts, links 2",
    en: "Story right, left 2",
    fr: "Story a droite, 2 a gauche",
  },
  "story-center-main": {
    de: "Story Mitte, Seiten 4",
    en: "Story center, sides 4",
    fr: "Story centre, cotes 4",
  },
  "corner-2x2-top-left": {
    de: "3x3 Ecke: 2x2 oben links",
    en: "3x3 corner: 2x2 top left",
    fr: "Coin 3x3: 2x2 en haut a gauche",
  },
  "corner-2x2-top-right": {
    de: "3x3 Ecke: 2x2 oben rechts",
    en: "3x3 corner: 2x2 top right",
    fr: "Coin 3x3: 2x2 en haut a droite",
  },
  "corner-2x2-bottom-left": {
    de: "3x3 Ecke: 2x2 unten links",
    en: "3x3 corner: 2x2 bottom left",
    fr: "Coin 3x3: 2x2 en bas a gauche",
  },
  "corner-2x2-bottom-right": {
    de: "3x3 Ecke: 2x2 unten rechts",
    en: "3x3 corner: 2x2 bottom right",
    fr: "Coin 3x3: 2x2 en bas a droite",
  },
  "grid-2x1": {
    de: "2 Felder (oben/unten)",
    en: "2 slots (top/bottom)",
    fr: "2 cases (haut/bas)",
  },
  "grid-1x2": {
    de: "2 Felder (links/rechts)",
    en: "2 slots (left/right)",
    fr: "2 cases (gauche/droite)",
  },
  "grid-2x2": {
    de: "2 x 2",
    en: "2 x 2",
    fr: "2 x 2",
  },
  "grid-3x3": {
    de: "3 x 3",
    en: "3 x 3",
    fr: "3 x 3",
  },
  "grid-2x3": {
    de: "2 x 3",
    en: "2 x 3",
    fr: "2 x 3",
  },
  "grid-3x2": {
    de: "3 x 2",
    en: "3 x 2",
    fr: "3 x 2",
  },
  "grid-4x3": {
    de: "4 x 3",
    en: "4 x 3",
    fr: "4 x 3",
  },
  "grid-1x4-square": {
    de: "1 x 4 (quadratisch)",
    en: "1 x 4 (square)",
    fr: "1 x 4 (carre)",
  },
  "grid-4x1-square": {
    de: "4 x 1 (quadratisch)",
    en: "4 x 1 (square)",
    fr: "4 x 1 (carre)",
  },
  "grid-4x1-tall2": {
    de: "4 x 1 (2 Einheiten Höhe)",
    en: "4 x 1 (2 units height)",
    fr: "4 x 1 (hauteur 2 unites)",
  },
  "grid-1x4-wide2": {
    de: "1 x 4 (2 Einheiten Breite)",
    en: "1 x 4 (2 units width)",
    fr: "1 x 4 (largeur 2 unites)",
  },
  "grid-3x1-tall3": {
    de: "3 x 1 (3 Einheiten Hoehe)",
    en: "3 x 1 (3 units height)",
    fr: "3 x 1 (hauteur 3 unites)",
  },
  "grid-1x3-wide3": {
    de: "1 x 3 (3 Einheiten Breite)",
    en: "1 x 3 (3 units width)",
    fr: "1 x 3 (largeur 3 unites)",
  },
  "grid-4x1-tall4": {
    de: "4 x 1 (4 Einheiten Hoehe)",
    en: "4 x 1 (4 units height)",
    fr: "4 x 1 (hauteur 4 unites)",
  },
  "grid-1x4-wide4": {
    de: "1 x 4 (4 Einheiten Breite)",
    en: "1 x 4 (4 units width)",
    fr: "1 x 4 (largeur 4 unites)",
  },
  "grid-1x2-wide2": {
    de: "1 x 2 (2 Einheiten Breite)",
    en: "1 x 2 (2 units width)",
    fr: "1 x 2 (largeur 2 unites)",
  },
  "grid-2x1-tall2": {
    de: "2 x 1 (2 Einheiten Hoehe)",
    en: "2 x 1 (2 units height)",
    fr: "2 x 1 (hauteur 2 unites)",
  },
  "triptych-vertical": {
    de: "Triptychon vertikal",
    en: "Triptych vertical",
    fr: "Triptyque vertical",
  },
  "triptych-horizontal": {
    de: "Triptychon horizontal",
    en: "Triptych horizontal",
    fr: "Triptyque horizontal",
  },
});

const EXPORT_WIDTH_MIN = 600;
const EXPORT_WIDTH_MAX = 6000;
const GIF_EXPORT_MIN_WIDTH = 480;
const GIF_EXPORT_MAX_WIDTH = 800;
const GIF_EXPORT_DEFAULT_WIDTH = 800;

const EXPORT_PRESETS = Object.freeze([
  { id: "free", group: "free", aspectWidth: null, aspectHeight: null, width: null },
  { id: "ratio-1-1", group: "free", aspectWidth: 1, aspectHeight: 1, width: null },
  { id: "ratio-4-5", group: "free", aspectWidth: 4, aspectHeight: 5, width: null },
  { id: "ratio-3-4", group: "free", aspectWidth: 3, aspectHeight: 4, width: null },
  { id: "ratio-9-16", group: "free", aspectWidth: 9, aspectHeight: 16, width: null },
  { id: "ratio-16-9", group: "free", aspectWidth: 16, aspectHeight: 9, width: null },
  { id: "ratio-3x1-high", group: "free", aspectWidth: 1, aspectHeight: 3, width: null },
  { id: "ratio-1x3-wide", group: "free", aspectWidth: 3, aspectHeight: 1, width: null },
  { id: "ratio-4x1-high", group: "free", aspectWidth: 1, aspectHeight: 4, width: null },
  { id: "ratio-1x4-wide", group: "free", aspectWidth: 4, aspectHeight: 1, width: null },
  { id: "instagram-feed", group: "social", aspectWidth: 4, aspectHeight: 5, width: 1080 },
  { id: "instagram-square", group: "social", aspectWidth: 1, aspectHeight: 1, width: 1080 },
  { id: "instagram-landscape", group: "social", aspectWidth: 191, aspectHeight: 100, width: 1080 },
  { id: "story-reel", group: "social", aspectWidth: 9, aspectHeight: 16, width: 1080 },
  { id: "facebook-feed", group: "social", aspectWidth: 4, aspectHeight: 5, width: 1080 },
  { id: "open-graph", group: "social", aspectWidth: 1200, aspectHeight: 630, width: 1200 },
  { id: "x-landscape", group: "social", aspectWidth: 16, aspectHeight: 9, width: 1600 },
  { id: "linkedin-wide", group: "social", aspectWidth: 191, aspectHeight: 100, width: 1200 },
  { id: "pinterest-pin", group: "social", aspectWidth: 2, aspectHeight: 3, width: 1000 },
]);

const EXPORT_PRESET_LABELS = Object.freeze({
  free: {
    de: { title: "Frei", subtitle: "Aktuelles Collage-Format" },
    en: { title: "Free", subtitle: "Current collage ratio" },
    fr: { title: "Libre", subtitle: "Format actuel du collage" },
  },
  "ratio-1-1": {
    de: { title: "Quadratisch", subtitle: "1:1 · freie Breite" },
    en: { title: "Square", subtitle: "1:1 · free width" },
    fr: { title: "Carre", subtitle: "1:1 · largeur libre" },
  },
  "ratio-4-5": {
    de: { title: "Portrait", subtitle: "4:5 · freie Breite" },
    en: { title: "Portrait", subtitle: "4:5 · free width" },
    fr: { title: "Portrait", subtitle: "4:5 · largeur libre" },
  },
  "ratio-3-4": {
    de: { title: "Portrait klassisch", subtitle: "3:4 · freie Breite" },
    en: { title: "Classic portrait", subtitle: "3:4 · free width" },
    fr: { title: "Portrait classique", subtitle: "3:4 · largeur libre" },
  },
  "ratio-9-16": {
    de: { title: "Story Hochformat", subtitle: "9:16 · freie Breite" },
    en: { title: "Story portrait", subtitle: "9:16 · free width" },
    fr: { title: "Story portrait", subtitle: "9:16 · largeur libre" },
  },
  "ratio-16-9": {
    de: { title: "Breitbild", subtitle: "16:9 · freie Breite" },
    en: { title: "Widescreen", subtitle: "16:9 · free width" },
    fr: { title: "Grand ecran", subtitle: "16:9 · largeur libre" },
  },
  "ratio-3x1-high": {
    de: { title: "3x1 hoch", subtitle: "1:3 · freie Breite" },
    en: { title: "3x1 tall", subtitle: "1:3 · free width" },
    fr: { title: "3x1 haut", subtitle: "1:3 · largeur libre" },
  },
  "ratio-1x3-wide": {
    de: { title: "1x3 breit", subtitle: "3:1 · freie Breite" },
    en: { title: "1x3 wide", subtitle: "3:1 · free width" },
    fr: { title: "1x3 large", subtitle: "3:1 · largeur libre" },
  },
  "ratio-4x1-high": {
    de: { title: "4x1 hoch", subtitle: "1:4 · freie Breite" },
    en: { title: "4x1 tall", subtitle: "1:4 · free width" },
    fr: { title: "4x1 haut", subtitle: "1:4 · largeur libre" },
  },
  "ratio-1x4-wide": {
    de: { title: "1x4 breit", subtitle: "4:1 · freie Breite" },
    en: { title: "1x4 wide", subtitle: "4:1 · free width" },
    fr: { title: "1x4 large", subtitle: "4:1 · largeur libre" },
  },
  "instagram-feed": {
    de: { title: "Instagram Feed", subtitle: "4:5 · 1080 px" },
    en: { title: "Instagram Feed", subtitle: "4:5 · 1080 px" },
    fr: { title: "Instagram Feed", subtitle: "4:5 · 1080 px" },
  },
  "instagram-square": {
    de: { title: "Instagram Quadrat", subtitle: "1:1 · 1080 px" },
    en: { title: "Instagram Square", subtitle: "1:1 · 1080 px" },
    fr: { title: "Instagram Carre", subtitle: "1:1 · 1080 px" },
  },
  "instagram-landscape": {
    de: { title: "Instagram Quer", subtitle: "1,91:1 · 1080 px" },
    en: { title: "Instagram Landscape", subtitle: "1.91:1 · 1080 px" },
    fr: { title: "Instagram Paysage", subtitle: "1,91:1 · 1080 px" },
  },
  "story-reel": {
    de: { title: "Story / Reel", subtitle: "9:16 · 1080 px" },
    en: { title: "Story / Reel", subtitle: "9:16 · 1080 px" },
    fr: { title: "Story / Reel", subtitle: "9:16 · 1080 px" },
  },
  "facebook-feed": {
    de: { title: "Facebook Feed", subtitle: "4:5 · 1080 px" },
    en: { title: "Facebook Feed", subtitle: "4:5 · 1080 px" },
    fr: { title: "Facebook Feed", subtitle: "4:5 · 1080 px" },
  },
  "open-graph": {
    de: { title: "Open Graph / Twitter", subtitle: "1200 x 630 · 1200 px" },
    en: { title: "Open Graph / Twitter", subtitle: "1200 x 630 · 1200 px" },
    fr: { title: "Open Graph / Twitter", subtitle: "1200 x 630 · 1200 px" },
  },
  "x-landscape": {
    de: { title: "X / Twitter", subtitle: "16:9 · 1600 px" },
    en: { title: "X / Twitter", subtitle: "16:9 · 1600 px" },
    fr: { title: "X / Twitter", subtitle: "16:9 · 1600 px" },
  },
  "linkedin-wide": {
    de: { title: "LinkedIn", subtitle: "1,91:1 · 1200 px" },
    en: { title: "LinkedIn", subtitle: "1.91:1 · 1200 px" },
    fr: { title: "LinkedIn", subtitle: "1,91:1 · 1200 px" },
  },
  "pinterest-pin": {
    de: { title: "Pinterest Pin", subtitle: "2:3 · 1000 px" },
    en: { title: "Pinterest Pin", subtitle: "2:3 · 1000 px" },
    fr: { title: "Pinterest Pin", subtitle: "2:3 · 1000 px" },
  },
});

const DEFAULT_SOCIAL_SAFE_AREA = Object.freeze({ top: 0.05, right: 0.05, bottom: 0.05, left: 0.05 });
const SAFE_AREA_RATIOS_BY_PRESET = Object.freeze({
  "story-reel": Object.freeze({ top: 0.14, right: 0.06, bottom: 0.2, left: 0.06 }),
});

const DEFAULT_VERSION_INFO = Object.freeze({
  appVersion: "1.2.39",
  cacheVersion: "v61",
  label: "README um Schnellstart in 30 Sekunden ergaenzt",
});

const ZOOM_MIN = 0.35;
const ZOOM_MAX = 4;
const TEXT_INSET_PX = 6;
const DEFAULT_TEXT_Y = 0.9;

const STORAGE_KEYS = {
  language: "fotocollage-language",
  layout: "fotocollage-layout",
  watermark: "fotocollage-watermark",
};

const I18N = {
  de: {
    appTitle: "Foto-Collage",
    heroEyebrow: "Marsrakete",
    heroLede:
      "In wenigen Schritten zur fertigen Collage: Vorlage wählen, Fotos laden, Ausschnitte feinjustieren und als PNG, JPG, PDF oder animiertes GIF speichern.",
    settingsAria: "Einstellungen \u00f6ffnen",
    settingsButtonLabel: "Einstellungen",
    helpAria: "Hilfe \u00f6ffnen",
    helpButtonLabel: "Hilfe",
    helpTitle: "Hilfe",
    helpLoading: "README wird geladen \u2026",
    helpFailed: "README konnte nicht geladen werden.",
    step1Title: "Schritt 1: Collage-Vorlage",
    step1Desc: "W\u00e4hle eine Vorlage f\u00fcr deine Collage.",
    step2Title: "Schritt 2: Fotos laden",
    step2Desc: "Lade genau so viele Fotos, wie das Raster ben\u00f6tigt. Fehlende Pl\u00e4tze bleiben markiert.",
    uploadTitle: "Fotos ziehen oder ausw\u00e4hlen",
    uploadDesc: "Alle Bilder werden der Reihe nach in die freien Felder gesetzt. Reihenfolge per Drag und Drop möglich.",
    uploadTitleMobile: "Fotos ausw\u00e4hlen",
    uploadDescMobile: "Tippe auf das Feld oben und w\u00e4hle Bilder von deinem Ger\u00e4t aus. Die Reihenfolge kannst du danach per Drag und Drop \u00e4ndern.",
    step3Title: "Schritt 3: Feinschliff",
    step3Desc: "Bearbeite direkt in der Vorschau: ziehen f\u00fcr den Ausschnitt, Mausrad/Pinch f\u00fcr Zoom. Zum Umordnen nutze den Button Sortieren.",
    activeCellTitle: "Aktives Feld",
    dragHint: "Direkt in der Vorschau verschieben und zoomen",
    reorderModeEnable: "Sortieren",
    reorderModeDisable: "Sortieren beenden",
    reorderModeHintIdle: "Sortiermodus: Tippe zuerst das Quellbild, dann das Zielfeld an.",
    reorderModeHintSource: "Sortiermodus: Tippe ein Zielfeld an oder erneut auf die Quelle zum Abbrechen.",
    step4Title: "Schritt 4: Export",
    step4Desc: "Die Collage wird in hoher Aufl\u00f6sung gerendert und kann geteilt oder als PNG/JPEG/PDF/GIF gespeichert werden.",
    exportFormatLabel: "Exportformat",
    gifDelayLabel: "Sekunden zwischen Frames",
    exportFormatPng: "PNG",
    exportFormatJpeg: "JPEG",
    exportFormatPdf: "PDF",
    exportFormatGif: "GIF (animiert)",
    exportPresetLabel: "Export-Preset",
    exportPresetGroupFree: "Freie Formate",
    exportPresetGroupSocial: "Social Media",
    watermarkTitle: "Wasserzeichen",
    watermarkTextLabel: "Text",
    watermarkPositionLabel: "Position",
    watermarkFontLabel: "Schriftart",
    watermarkColorLabel: "Textfarbe",
    watermarkSizeLabel: "Schriftgröße",
    watermarkEnabledLabel: "Immer im Export anzeigen",
    watermarkTopLeft: "Links oben",
    watermarkTopRight: "Rechts oben",
    watermarkBottomLeft: "Links unten",
    watermarkBottomRight: "Rechts unten",
    watermarkCenter: "Mittig",
    gifRendering: "GIF wird erzeugt …",
    gifRenderingFrame: "GIF wird erzeugt … Frame {current} von {total}",
    exportFailed: "Export fehlgeschlagen.",
    exportWidthLabel: "Exportbreite",
    gapLabel: "Abstand",
    outerGapLabel: "Randabstand",
    exportHelp:
      "Der Export skaliert das gew\u00e4hlte Raster samt Zwischenr\u00e4umen und verwendet die aktuellen Ausschnitte.",
    textOverflowWarning: "Der Text ist gr\u00f6\u00dfer als das Feld und wird beschnitten.",
    safeAreaHint: "Safe Area aktiv f\u00fcr dieses Social-Preset.",
    safeAreaTextWarning: "Mindestens ein Text liegt au\u00dferhalb der Safe Area.",
    settingsTitle: "Einstellungen",
    settingsIntro: "Sprache und Aktualisierung der App.",
    updatesTitle: "Updates",
    languageLabel: "Sprache",
    autoLanguage: "Automatisch",
    checkForUpdates: "Auf Update pr\u00fcfen",
    reload: "Neu laden",
    close: "Schlie\u00dfen",
    toPhotos: "Weiter zu den Fotos",
    toFineTune: "Weiter zum Feinschliff",
    toExport: "Weiter zum Export",
    share: "Teilen",
    savePng: "Speichern",
    resetSettings: "Einstellungen zur\u00fccksetzen",
    resetSettingsConfirm: "M\u00f6chtest du die Layout-Einstellungen wirklich zur\u00fccksetzen?",
    prevCell: "Vorheriges Feld",
    nextCell: "N\u00e4chstes Feld",
    replaceCell: "Bild ersetzen",
    resetFocus: "Ausschnitt zur\u00fccksetzen",
    zoomLabel: "Zoom",
    resetZoom: "Zoom zur\u00fccksetzen",
    textEditorTitle: "Text im Feld",
    textLabel: "Text",
    textPlaceholder: "Text im Feld platzieren",
    textSizeLabel: "Schriftgr\u00f6\u00dfe",
    textFontLabel: "Schriftart",
    textBold: "Fett",
    textItalic: "Kursiv",
    textColorLabel: "Textfarbe",
    resetTextPosition: "Textposition zur\u00fccksetzen",
    step1Chip: "1. Vorlage",
    step2Chip: "2. Fotos",
    step3Chip: "3. Feinschliff",
    step4Chip: "4. Export",
    cells: "Felder",
    field: "Feld",
    fieldEmpty: "Feld ist leer",
    emptySlot: "Leer",
    slotStatusReady: "Bereit f\u00fcr den Feinschliff. Verschiebe Fotos mit Drag und Drop.",
    slotStatusMissing: "{filled} von {total} Feldern belegt. Es fehlen noch Bilder.",
    uploadLimitExceeded: "Es k\u00f6nnen maximal {max} Bilder f\u00fcr diese Vorlage geladen werden.",
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
    heroEyebrow: "Marsrakete",
    heroLede:
      "Create a collage in just a few steps: Choose a template, load photos, fine-tune the cropping, and save as a PNG, JPG, PDF, or animated GIF.",
    settingsAria: "Open settings",
    settingsButtonLabel: "Settings",
    helpAria: "Open help",
    helpButtonLabel: "Help",
    helpTitle: "Help",
    helpLoading: "Loading README \u2026",
    helpFailed: "Could not load README.",
    step1Title: "Step 1: Collage template",
    step1Desc: "Choose a template for your collage.",
    step2Title: "Step 2: Load photos",
    step2Desc: "Load exactly as many photos as the grid needs. Empty slots stay highlighted.",
    uploadTitle: "Drag photos or choose files",
    uploadDesc: "All images are placed into the free slots in order. You can reorder them via drag and drop.",
    uploadTitleMobile: "Choose photos",
    uploadDescMobile: "Tap the field above and pick images from your device. You can reorder them afterwards via drag and drop.",
    step3Title: "Step 3: Fine-tune",
    step3Desc: "Edit directly in the preview: drag to pan, mouse wheel or pinch to zoom. Use Sort mode to reorder photos.",
    activeCellTitle: "Active slot",
    dragHint: "Move and zoom directly in the preview",
    reorderModeEnable: "Sort",
    reorderModeDisable: "Finish sorting",
    reorderModeHintIdle: "Sort mode: tap the source image first, then tap the target slot.",
    reorderModeHintSource: "Sort mode: tap a target slot, or tap source again to cancel.",
    step4Title: "Step 4: Export",
    step4Desc: "The collage is rendered in high resolution and can be shared or saved as PNG/JPEG/PDF/GIF.",
    exportFormatLabel: "Export format",
    gifDelayLabel: "Seconds between frames",
    exportFormatPng: "PNG",
    exportFormatJpeg: "JPEG",
    exportFormatPdf: "PDF",
    exportFormatGif: "GIF (animated)",
    exportPresetLabel: "Export preset",
    exportPresetGroupFree: "Flexible formats",
    exportPresetGroupSocial: "Social media",
    watermarkTitle: "Watermark",
    watermarkTextLabel: "Text",
    watermarkPositionLabel: "Position",
    watermarkFontLabel: "Font family",
    watermarkColorLabel: "Text color",
    watermarkSizeLabel: "Font size",
    watermarkEnabledLabel: "Always on export",
    watermarkTopLeft: "Top left",
    watermarkTopRight: "Top right",
    watermarkBottomLeft: "Bottom left",
    watermarkBottomRight: "Bottom right",
    watermarkCenter: "Center",
    gifRendering: "Rendering GIF …",
    gifRenderingFrame: "Rendering GIF … frame {current} of {total}",
    exportFailed: "Export failed.",
    exportWidthLabel: "Export width",
    gapLabel: "Spacing",
    outerGapLabel: "Outer gap",
    exportHelp: "The export scales the chosen grid, including spacing, and uses the current crops.",
    textOverflowWarning: "The text is larger than the slot and will be clipped.",
    safeAreaHint: "Safe area is active for this social preset.",
    safeAreaTextWarning: "At least one text is outside the safe area.",
    settingsTitle: "Settings",
    settingsIntro: "Language and app updates.",
    updatesTitle: "Updates",
    languageLabel: "Language",
    autoLanguage: "Auto",
    checkForUpdates: "Check for updates",
    reload: "Reload",
    close: "Close",
    toPhotos: "Continue to photos",
    toFineTune: "Continue to fine-tuning",
    toExport: "Continue to export",
    share: "Share",
    savePng: "Save",
    resetSettings: "Reset settings",
    resetSettingsConfirm: "Do you really want to reset the layout settings?",
    prevCell: "Previous slot",
    nextCell: "Next slot",
    replaceCell: "Replace image",
    resetFocus: "Reset crop",
    zoomLabel: "Zoom",
    resetZoom: "Reset zoom",
    textEditorTitle: "Slot text",
    textLabel: "Text",
    textPlaceholder: "Place text inside this slot",
    textSizeLabel: "Font size",
    textFontLabel: "Font family",
    textBold: "Bold",
    textItalic: "Italic",
    textColorLabel: "Text color",
    resetTextPosition: "Reset text position",
    step1Chip: "1. Template",
    step2Chip: "2. Photos",
    step3Chip: "3. Fine-tune",
    step4Chip: "4. Export",
    cells: "slots",
    field: "slot",
    fieldEmpty: "slot is empty",
    emptySlot: "Empty",
    slotStatusReady: "Ready for fine-tuning. Reorder photos with drag and drop.",
    slotStatusMissing: "{filled} of {total} slots filled. More photos are needed.",
    uploadLimitExceeded: "You can load a maximum of {max} images for this template.",
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
    heroEyebrow: "Marsrakete",
    heroLede:
      "Cr\u00e9ez un collage en quelques \u00e9tapes: choisissez un mod\u00e8le, imoprtez vos photos, ajustez le cadrage et enregistrez en PNG, JPG, PDF ou GIF animé.",
    settingsAria: "Ouvrir les param\u00e8tres",
    settingsButtonLabel: "Param\u00e8tres",
    helpAria: "Ouvrir l'aide",
    helpButtonLabel: "Aide",
    helpTitle: "Aide",
    helpLoading: "Chargement du README \u2026",
    helpFailed: "Impossible de charger le README.",
    step1Title: "\u00c9tape 1: Mod\u00e8le de collage",
    step1Desc: "Choisissez un modele pour votre collage.",
    step2Title: "\u00c9tape 2: Charger les photos",
    step2Desc: "Chargez exactement autant de photos que la grille en demande. Les emplacements vides restent visibles.",
    uploadTitle: "Glissez des photos ou choisissez des fichiers",
    uploadDesc: "Toutes les images sont plac\u00e9es dans les emplacements libres, dans l'ordre. R\u00e9organisation possible par glisser-d\u00e9poser.",
    uploadTitleMobile: "Choisir des photos",
    uploadDescMobile: "Touchez le champ ci-dessus et choisissez des images depuis votre appareil. Vous pourrez ensuite r\u00e9ordonner par glisser-d\u00e9poser.",
    step3Title: "\u00c9tape 3: Fignolage",
    step3Desc: "Modifiez directement dans l'aper\u00e7u: glisser pour le cadrage, molette/pincement pour zoomer. Utilisez le mode Trier pour r\u00e9ordonner les photos.",
    activeCellTitle: "Emplacement actif",
    dragHint: "Deplacez et zoomez directement dans l'aper\u00e7u",
    reorderModeEnable: "Trier",
    reorderModeDisable: "Terminer le tri",
    reorderModeHintIdle: "Mode tri: touchez d'abord l'image source, puis la case cible.",
    reorderModeHintSource: "Mode tri: touchez une case cible ou la source a nouveau pour annuler.",
    step4Title: "\u00c9tape 4: Export",
    step4Desc: "Le collage est rendu en haute r\u00e9solution et peut \u00eatre partag\u00e9 ou enregistr\u00e9 en PNG/JPEG/PDF/GIF.",
    exportFormatLabel: "Format d'export",
    gifDelayLabel: "Secondes entre les images",
    exportFormatPng: "PNG",
    exportFormatJpeg: "JPEG",
    exportFormatPdf: "PDF",
    exportFormatGif: "GIF (animé)",
    exportPresetLabel: "Preset d'export",
    exportPresetGroupFree: "Formats libres",
    exportPresetGroupSocial: "Reseaux sociaux",
    watermarkTitle: "Filigrane",
    watermarkTextLabel: "Texte",
    watermarkPositionLabel: "Position",
    watermarkFontLabel: "Police",
    watermarkColorLabel: "Couleur du texte",
    watermarkSizeLabel: "Taille de police",
    watermarkEnabledLabel: "Toujours visible à l'export",
    watermarkTopLeft: "En haut à gauche",
    watermarkTopRight: "En haut à droite",
    watermarkBottomLeft: "En bas à gauche",
    watermarkBottomRight: "En bas à droite",
    watermarkCenter: "Milieu",
    gifRendering: "Création du GIF …",
    gifRenderingFrame: "Création du GIF … image {current} sur {total}",
    exportFailed: "Échec de l'export.",
    exportWidthLabel: "Largeur d'export",
    gapLabel: "Espacement",
    outerGapLabel: "Marge ext\u00e9rieure",
    exportHelp:
      "L'export met \u00e0 l'\u00e9chelle la grille choisie, espaces compris, avec le cadrage actuel.",
    textOverflowWarning: "Le texte est plus grand que la case et sera rogn\u00e9.",
    safeAreaHint: "Safe Area active pour ce preset social.",
    safeAreaTextWarning: "Au moins un texte est en dehors de la Safe Area.",
    settingsTitle: "Param\u00e8tres",
    settingsIntro: "Langue et mises \u00e0 jour de l'application.",
    updatesTitle: "Mises \u00e0 jour",
    languageLabel: "Langue",
    autoLanguage: "Auto",
    checkForUpdates: "V\u00e9rifier les mises \u00e0 jour",
    reload: "Recharger",
    close: "Fermer",
    toPhotos: "Continuer vers les photos",
    toFineTune: "Continuer vers le fignolage",
    toExport: "Continuer vers l'export",
    share: "Partager",
    savePng: "Enregistrer",
    resetSettings: "R\u00e9initialiser les param\u00e8tres",
    resetSettingsConfirm: "Voulez-vous vraiment r\u00e9initialiser les param\u00e8tres de mise en page ?",
    prevCell: "Emplacement pr\u00e9c\u00e9dent",
    nextCell: "Emplacement suivant",
    replaceCell: "Remplacer l'image",
    resetFocus: "R\u00e9initialiser le cadrage",
    zoomLabel: "Zoom",
    resetZoom: "R\u00e9initialiser le zoom",
    textEditorTitle: "Texte du cadre",
    textLabel: "Texte",
    textPlaceholder: "Placer du texte dans cette case",
    textSizeLabel: "Taille de police",
    textFontLabel: "Police",
    textBold: "Gras",
    textItalic: "Italique",
    textColorLabel: "Couleur du texte",
    resetTextPosition: "R\u00e9initialiser la position du texte",
    step1Chip: "1. Mod\u00e8le",
    step2Chip: "2. Photos",
    step3Chip: "3. Fignolage",
    step4Chip: "4. Export",
    cells: "cases",
    field: "case",
    fieldEmpty: "case vide",
    emptySlot: "Vide",
    slotStatusReady: "Pr\u00eat pour le fignolage. R\u00e9ordonnez les photos par glisser-d\u00e9poser.",
    slotStatusMissing: "{filled} sur {total} cases remplies. Il manque encore des photos.",
    uploadLimitExceeded: "Vous pouvez charger au maximum {max} images pour ce mod\u00e8le.",
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
  activePresetId: "grid-2x2",
  gap: 12,
  outerGap: 12,
  background: "#101828",
  activeStep: 1,
  cells: [],
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
  exportFormat: "png",
  gifDelaySeconds: 1,
  languagePreference: "auto",
  language: "de",
  readmeText: "",
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
  helpButton: document.getElementById("helpButton"),
  helpButtonLabel: document.getElementById("helpButtonLabel"),
  versionLabel: document.getElementById("versionLabel"),
  gridSummary: document.getElementById("gridSummary"),
  filledSummary: document.getElementById("filledSummary"),
  stepSummary: document.getElementById("stepSummary"),
  presetGrid: document.getElementById("presetGrid"),
  gapLabel: document.getElementById("gapLabel"),
  gapInput: document.getElementById("gapInput"),
  gapValue: document.getElementById("gapValue"),
  outerGapLabel: document.getElementById("outerGapLabel"),
  outerGapInput: document.getElementById("outerGapInput"),
  outerGapValue: document.getElementById("outerGapValue"),
  backgroundInput: document.getElementById("backgroundInput"),
  resetSettingsButton: document.getElementById("resetSettingsButton"),
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
  replaceCell: document.getElementById("replaceCell"),
  replaceInput: document.getElementById("replaceInput"),
  resetFocus: document.getElementById("resetFocus"),
  zoomInput: document.getElementById("zoomInput"),
  zoomValue: document.getElementById("zoomValue"),
  zoomLabel: document.getElementById("zoomLabel"),
  resetZoom: document.getElementById("resetZoom"),
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
  settingsDialog: document.getElementById("settingsDialog"),
  settingsForm: document.getElementById("settingsForm"),
  helpDialog: document.getElementById("helpDialog"),
  helpForm: document.getElementById("helpForm"),
  helpTitle: document.getElementById("helpTitle"),
  readmeStatus: document.getElementById("readmeStatus"),
  readmeContent: document.getElementById("readmeContent"),
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
  exportWarning: document.getElementById("exportWarning"),
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
    gap: 12,
    outerGap: 12,
    background: "#101828",
    presetId: "grid-2x2",
  };
}

function normalizeLayoutSettings(raw) {
  const defaults = getDefaultLayoutSettings();
  const gap = clamp(Number(raw?.gap) || defaults.gap, 0, 60);
  const outerGap = clamp(Number(raw?.outerGap) || defaults.outerGap, 0, 80);
  const background = /^#[0-9a-f]{6}$/i.test(String(raw?.background || ""))
    ? String(raw.background)
    : defaults.background;
  const presetId = typeof raw?.presetId === "string" ? raw.presetId : "";
  return { gap, outerGap, background, presetId };
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

function translateStaticUi() {
  document.title = t("appTitle");
  setText(els.heroEyebrow, "heroEyebrow");
  setText(els.appTitle, "appTitle");
  setText(els.heroLede, "heroLede");
  setText(els.settingsButtonLabel, "settingsButtonLabel");
  setText(els.helpButtonLabel, "helpButtonLabel");
  els.settingsButton.setAttribute("aria-label", t("settingsAria"));
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
  setText(els.exportPresetLabel, "exportPresetLabel");
  setText(els.gapLabel, "gapLabel");
  setText(els.outerGapLabel, "outerGapLabel");
  setText(els.exportFormatLabel, "exportFormatLabel");
  setText(els.gifDelayLabel, "gifDelayLabel");
  setText(els.exportWidthLabel, "exportWidthLabel");
  setText(els.exportHelp, "exportHelp");
  setText(els.settingsTitle, "settingsTitle");
  setText(els.settingsIntro, "settingsIntro");
  setText(els.helpTitle, "helpTitle");
  setText(els.updatesTitle, "updatesTitle");
  setText(els.languageLabel, "languageLabel");
  setText(els.checkForUpdatesButton, "checkForUpdates");
  setText(els.reloadAppButton, "reload");
  setText(els.toStep2, "toPhotos");
  setText(els.toStep3, "toFineTune");
  setText(els.toStep4, "toExport");
  setText(els.shareButton, "share");
  setText(els.downloadButton, "savePng");
  setText(els.resetSettingsButton, "resetSettings");
  setText(els.prevCell, "prevCell");
  setText(els.nextCell, "nextCell");
  setText(els.replaceCell, "replaceCell");
  updateReorderModeUi();
  setText(els.resetFocus, "resetFocus");
  setText(els.zoomLabel, "zoomLabel");
  setText(els.resetZoom, "resetZoom");
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
  if (els.helpDialog.open && !state.readmeText) {
    els.readmeStatus.textContent = t("helpLoading");
  }
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

function getExportPresetDefinition() {
  return EXPORT_PRESETS.find((preset) => preset.id === state.exportPresetId) || EXPORT_PRESETS[0];
}

function getExportPresetCopy(preset, language = state.language) {
  const labels = EXPORT_PRESET_LABELS[preset.id];
  return labels?.[language] || labels?.de || labels?.en || { title: preset.id, subtitle: "" };
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
  const collageRatio = layout.rows / layout.cols;
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

function buildLayoutRects(width, height, layout) {
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

function resizeCells(count) {
  while (state.cells.length < count) state.cells.push(createEmptyCell());
  while (state.cells.length > count) disposeCell(state.cells.pop());
  if (state.selectedCell >= state.cells.length) {
    state.selectedCell = Math.max(0, state.cells.length - 1);
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
  els.stepSummary.textContent = `${step} / 4`;
  if (step >= 3) {
    renderPreview();
    renderExportPreview();
  }
  syncEditor();
}

function applyGrid(options = {}) {
  const { persist = true } = options;
  state.gap = clamp(Number(els.gapInput.value) || 0, 0, 60);
  state.outerGap = clamp(Number(els.outerGapInput.value) || 0, 0, 80);
  state.background = els.backgroundInput.value;
  els.backgroundInput.value = state.background;
  els.gapValue.textContent = state.gap;
  els.outerGapInput.value = state.outerGap;
  els.outerGapValue.textContent = state.outerGap;
  document.documentElement.style.setProperty("--gap", `${state.gap}px`);
  const layout = getActiveLayoutDefinition();
  if (persist) {
    saveLayoutSettings({
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
  for (const preset of PRESETS) {
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
    const miniCellSize = 14;
    const miniGap = 4;
    const miniWidth = preset.cols * miniCellSize + Math.max(0, preset.cols - 1) * miniGap;
    const miniHeight = preset.rows * miniCellSize + Math.max(0, preset.rows - 1) * miniGap;
    mini.style.gridTemplateColumns = `repeat(${preset.cols}, 1fr)`;
    mini.style.gridTemplateRows = `repeat(${preset.rows}, 1fr)`;
    mini.style.width = `${miniWidth}px`;
    mini.style.height = `${miniHeight}px`;
    mini.innerHTML = "";
    preset.slots.forEach((slot) => {
      const span = document.createElement("span");
      span.style.gridColumn = `${slot.x + 1} / span ${slot.w}`;
      span.style.gridRow = `${slot.y + 1} / span ${slot.h}`;
      mini.appendChild(span);
    });
    btn.addEventListener("click", () => {
      state.activePresetId = preset.id;
      applyGrid();
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
  const complete = total > 0 && filled === total;
  const activePreset = PRESETS.find((preset) => preset.id === state.activePresetId);
  els.gridSummary.textContent = activePreset
    ? `${getPresetLabel(activePreset)} (${activePreset.slots.length} ${t("cells")})`
    : "-";
  els.filledSummary.textContent = `${filled} / ${total}`;
  els.slotStatus.textContent = complete
    ? t("slotStatusReady")
    : format(t("slotStatusMissing"), { filled, total });
  els.toStep3.disabled = !complete;
  els.toStep4.disabled = !complete;
  updateUploadConstraints();
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

function swapCells(first, second) {
  if (first === second || first < 0 || second < 0 || first >= state.cells.length || second >= state.cells.length) return;
  const tmp = state.cells[first];
  state.cells[first] = state.cells[second];
  state.cells[second] = tmp;
  state.selectedCell = second;
}

function handleReorderModeTap(index) {
  const cell = state.cells[index];
  if (!cell?.bitmap) {
    return;
  }
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
  els.collagePreview.style.aspectRatio = `${layout.cols} / ${layout.rows}`;
  els.collagePreview.style.setProperty("--grid-gap", `${state.gap}px`);
  els.collagePreview.style.setProperty("--outer-gap", `${state.outerGap}px`);
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
    node.style.left = `${rect.x}px`;
    node.style.top = `${rect.y}px`;
    node.style.width = `${rect.width}px`;
    node.style.height = `${rect.height}px`;
    node.style.background = state.background;
    if (cell.bitmap) {
      applyImagePlacement(img, node, cell);
    }
    applyTextOverlayStyle(textOverlay, cell, rect.width, rect.height);
    textOverlay.classList.toggle("interactive", index === state.selectedCell && hasCellText(cell));
  });
}

function syncEditor() {
  const cell = state.cells[state.selectedCell];
  if (!cell) return;
  els.editorFrame.style.background = state.background;
  const baseInfo = cell.bitmap
    ? `${state.selectedCell + 1}. ${t("field")}: ${cell.fileName}`
    : `${state.selectedCell + 1}. ${t("fieldEmpty")}`;
  const reorderHint = state.reorderMode
    ? (state.reorderSourceIndex === null ? t("reorderModeHintIdle") : t("reorderModeHintSource"))
    : "";
  els.activeCellInfo.textContent = reorderHint ? `${baseInfo} • ${reorderHint}` : baseInfo;
  if (cell.bitmap) {
    els.zoomInput.value = String(cell.zoom || 1);
    els.zoomValue.textContent = String(Math.round((cell.zoom || 1) * 100));
  } else {
    els.zoomInput.value = "1";
    els.zoomValue.textContent = "100";
  }
  els.textInput.value = cell.text || "";
  els.textSizeInput.value = String(clamp(Number(cell.fontSize) || 48, 12, 160));
  els.textSizeValue.textContent = String(clamp(Number(cell.fontSize) || 48, 12, 160));
  els.textFontSelect.value = cell.fontFamily || "Segoe UI, system-ui, sans-serif";
  els.textBoldInput.checked = Boolean(cell.bold);
  els.textItalicInput.checked = Boolean(cell.italic);
  els.textColorInput.value = /^#[0-9a-f]{6}$/i.test(String(cell.color || "")) ? cell.color : "#ffffff";
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
  const contentRect = options.contentRect || getCollageContentRect(width, height);
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
    const x = rect.x;
    const y = rect.y;
    const cellWidth = rect.width;
    const cellHeight = rect.height;
    ctx.fillStyle = "rgba(255,255,255,0.04)";
    ctx.fillRect(x, y, cellWidth, cellHeight);
    if (cell?.bitmap && i < visibleCount) {
      const scale = Math.max(cellWidth / cell.width, cellHeight / cell.height);
      const zoom = clamp(cell.zoom || 1, ZOOM_MIN, ZOOM_MAX);
      const drawWidth = cell.width * scale * zoom;
      const drawHeight = cell.height * scale * zoom;
      const focusX = clamp(cell.focusX || 0, -1, 1);
      const focusY = clamp(cell.focusY || 0, -1, 1);
      const panRangeX = Math.abs(drawWidth - cellWidth);
      const panRangeY = Math.abs(drawHeight - cellHeight);
      const drawX = x + (cellWidth - drawWidth) / 2 - focusX * (panRangeX / 2);
      const drawY = y + (cellHeight - drawHeight) / 2 - focusY * (panRangeY / 2);

      ctx.save();
      ctx.beginPath();
      ctx.rect(x, y, cellWidth, cellHeight);
      ctx.clip();
      ctx.drawImage(cell.bitmap, drawX, drawY, drawWidth, drawHeight);
      ctx.restore();
    } else {
      ctx.fillStyle = "rgba(245,247,251,0.72)";
      ctx.font = `${Math.max(18, Math.min(cellWidth, cellHeight) * 0.09)}px Segoe UI, sans-serif`;
      ctx.textBaseline = "top";
      ctx.fillText(`${t("field")} ${i + 1}`, x + 14, y + 34);
    }
    drawCellText(ctx, cell, x, y, cellWidth, cellHeight);
  }

  ctx.save();
  ctx.strokeStyle = "rgba(255,255,255,0.18)";
  ctx.lineWidth = 1;
  for (let i = 0; i < state.cells.length; i += 1) {
    const rect = rects[i];
    if (!rect) continue;
    const x = rect.x + 0.5;
    const y = rect.y + 0.5;
    const cellWidth = Math.max(1, rect.width - 1);
    const cellHeight = Math.max(1, rect.height - 1);
    ctx.strokeRect(x, y, cellWidth, cellHeight);
  }
  ctx.restore();
  ctx.restore();
  drawWatermark(ctx, width, height);
}

function renderAll() {
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
}

async function loadFiles(fileList) {
  const remaining = getRemainingUploadSlots();
  if (remaining <= 0) return;
  const imageFiles = Array.from(fileList).filter((file) => file.type.startsWith("image/"));
  if (imageFiles.length > remaining) {
    window.alert(format(t("uploadLimitExceeded"), { max: remaining }));
  }
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
  const scale = Math.max(frameWidth / cell.width, frameHeight / cell.height);
  const zoom = clamp(cell.zoom || 1, ZOOM_MIN, ZOOM_MAX);
  const coverWidth = cell.width * scale * zoom;
  const coverHeight = cell.height * scale * zoom;
  const panRangeX = Math.abs(coverWidth - frameWidth);
  const panRangeY = Math.abs(coverHeight - frameHeight);
  const focusX = clamp(cell.focusX || 0, -1, 1);
  const focusY = clamp(cell.focusY || 0, -1, 1);
  const drawX = (frameWidth - coverWidth) / 2 - focusX * (panRangeX / 2);
  const drawY = (frameHeight - coverHeight) / 2 - focusY * (panRangeY / 2);
  return {
    coverWidth,
    coverHeight,
    panRangeX,
    panRangeY,
    drawX,
    drawY,
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
  img.style.left = `${metrics.drawX}px`;
  img.style.top = `${metrics.drawY}px`;
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
  if (!preset || preset.group !== "social") return null;
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
  const safeRect = getSafeAreaRect(els.exportCanvas.width, els.exportCanvas.height, preset);
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
  if (safeRect) {
    messages.push(t("safeAreaHint"));
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

function drawCellText(ctx, cell, x, y, width, height) {
  if (!hasCellText(cell)) {
    return;
  }
  const layout = getCellTextLayout(ctx, cell, width, height);

  ctx.save();
  ctx.beginPath();
  ctx.rect(x, y, width, height);
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

function drawWatermark(ctx, canvasWidth, canvasHeight) {
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
  const padding = 24;
  const lines = cleaned.split("\n");
  let baseX = padding;
  let baseY = padding;
  if (position === "top-right") {
    baseX = canvasWidth - padding;
    baseY = padding;
  } else if (position === "bottom-left") {
    baseX = padding;
    baseY = canvasHeight - padding - (lines.length * lineHeight);
  } else if (position === "bottom-right") {
    baseX = canvasWidth - padding;
    baseY = canvasHeight - padding - (lines.length * lineHeight);
  } else if (position === "center") {
    baseX = canvasWidth / 2;
    baseY = (canvasHeight - lines.length * lineHeight) / 2;
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
}

function setExportStatus(message, loading = false) {
  els.exportStatus.textContent = message;
  els.exportStatus.hidden = !message;
  els.exportStatus.classList.toggle("loading", Boolean(loading && message));
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
    const blob = await canvasToBlob(canvas, "image/jpeg", 0.92);
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
    setUpdateStatus(
      `${t("updateAvailablePrefix")}: ${remoteVersion.appVersion} \u00b7 ${remoteVersion.cacheVersion}${remoteLabel}. ${t("updateAvailableAction")}`,
      true
    );
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
    if (getRemainingUploadSlots() <= 0) return;
    event.preventDefault();
    els.dropZone.classList.add("dragging");
  });
  els.dropZone.addEventListener("dragover", (event) => {
    if (getRemainingUploadSlots() <= 0) return;
    event.preventDefault();
    els.dropZone.classList.add("dragging");
  });
  els.dropZone.addEventListener("dragleave", (event) => {
    event.preventDefault();
    els.dropZone.classList.remove("dragging");
  });
  els.dropZone.addEventListener("drop", (event) => {
    if (getRemainingUploadSlots() <= 0) return;
    event.preventDefault();
    els.dropZone.classList.remove("dragging");
    void loadFiles(event.dataTransfer.files);
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
  els.gapInput.addEventListener("input", () => {
    applyGrid();
  });
  els.outerGapInput.addEventListener("input", () => {
    applyGrid();
  });
  els.backgroundInput.addEventListener("input", () => {
    applyGrid();
  });
  els.resetSettingsButton.addEventListener("click", () => {
    if (!window.confirm(t("resetSettingsConfirm"))) {
      return;
    }
    const defaults = getDefaultLayoutSettings();
    safeStorageRemove(STORAGE_KEYS.layout);
    state.activePresetId = defaults.presetId;
    els.gapInput.value = String(defaults.gap);
    els.outerGapInput.value = String(defaults.outerGap);
    els.backgroundInput.value = defaults.background;
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
  els.toggleReorderMode?.addEventListener("click", () => {
    state.reorderMode = !state.reorderMode;
    state.reorderSourceIndex = null;
    updateReorderModeUi();
    syncEditor();
    renderPreview();
  });
  els.resetFocus.addEventListener("click", () => {
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
    setCellZoom(state.selectedCell, Number(els.zoomInput.value) || 1);
  });
  els.resetZoom.addEventListener("click", () => {
    setCellZoom(state.selectedCell, 1);
  });
  els.textInput.addEventListener("input", () => {
    const cell = state.cells[state.selectedCell];
    if (!cell) return;
    cell.text = els.textInput.value;
    syncEditor();
    renderPreview();
    renderExportPreview();
  });
  els.textSizeInput.addEventListener("input", () => {
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
    const cell = state.cells[state.selectedCell];
    if (!cell) return;
    cell.fontFamily = els.textFontSelect.value;
    syncEditor();
    renderPreview();
    renderExportPreview();
  });
  els.textBoldInput.addEventListener("change", () => {
    const cell = state.cells[state.selectedCell];
    if (!cell) return;
    cell.bold = els.textBoldInput.checked;
    syncEditor();
    renderPreview();
    renderExportPreview();
  });
  els.textItalicInput.addEventListener("change", () => {
    const cell = state.cells[state.selectedCell];
    if (!cell) return;
    cell.italic = els.textItalicInput.checked;
    syncEditor();
    renderPreview();
    renderExportPreview();
  });
  els.textColorInput.addEventListener("input", () => {
    const cell = state.cells[state.selectedCell];
    if (!cell) return;
    cell.color = els.textColorInput.value;
    syncEditor();
    renderPreview();
    renderExportPreview();
  });
  els.resetTextPosition.addEventListener("click", () => {
    const cell = state.cells[state.selectedCell];
    if (!cell) return;
    cell.textX = 0.5;
    cell.textY = DEFAULT_TEXT_Y;
    syncEditor();
    renderPreview();
    renderExportPreview();
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
    els.settingsDialog.showModal();
  });
  els.helpButton.addEventListener("click", () => {
    els.helpDialog.showModal();
    void loadReadmeContent();
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
  els.helpForm.addEventListener("submit", (event) => {
    event.preventDefault();
    els.helpDialog.close();
  });
  window.addEventListener("resize", () => {
    updateUploadUiForDevice();
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
  if (els.gapInput) {
    els.gapInput.value = String(layout.gap);
  }
  if (els.outerGapInput) {
    els.outerGapInput.value = String(layout.outerGap);
  }
  if (els.backgroundInput) {
    els.backgroundInput.value = layout.background;
  }
}

function init() {
  loadInitialPreferences();
  loadInitialLayoutSettings();
  loadWatermarkSettings();
  updateUploadUiForDevice();
  translateStaticUi();
  renderPresets();
  resizeCells(getActiveLayoutDefinition().slots.length);
  renderSlotsStatusControls();
  wireControls();
  void loadVersionInfo().then(() => {
    renderVersionLabel();
    void checkForUpdates({ showChecking: false, silentNoChange: true, silentError: true });
  });
  registerServiceWorker();
  updateExportActionButtons();
  applyGrid();
  renderAllWithoutExport();
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
}

init();
