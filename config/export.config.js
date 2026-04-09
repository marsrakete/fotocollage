(() => {
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
  }
});

const DEFAULT_SOCIAL_SAFE_AREA = Object.freeze({ top: 0.05, right: 0.05, bottom: 0.05, left: 0.05 });
const SAFE_AREA_RATIOS_BY_PRESET = Object.freeze({
  "story-reel": Object.freeze({ top: 0.14, right: 0.06, bottom: 0.2, left: 0.06 }),
});

  window.FOTOCOLLAGE_EXPORT_CONFIG = {
    EXPORT_WIDTH_MIN,
    EXPORT_WIDTH_MAX,
    GIF_EXPORT_MIN_WIDTH,
    GIF_EXPORT_MAX_WIDTH,
    GIF_EXPORT_DEFAULT_WIDTH,
    EXPORT_PRESETS,
    EXPORT_PRESET_LABELS,
    DEFAULT_SOCIAL_SAFE_AREA,
    SAFE_AREA_RATIOS_BY_PRESET,
  };
})();
