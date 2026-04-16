(() => {
  const STENCIL_OPTIONS = Object.freeze([
    Object.freeze({
      id: "word",
      label: Object.freeze({ de: "Wort", en: "Word", fr: "Mot" }),
    }),
    Object.freeze({
      id: "heart",
      src: "./config/stencils/heart.svg",
      label: Object.freeze({ de: "Herz", en: "Heart", fr: "Coeur" }),
    }),
    Object.freeze({
      id: "flower",
      src: "./config/stencils/flower.svg",
      label: Object.freeze({ de: "Blume", en: "Flower", fr: "Fleur" }),
    }),
    Object.freeze({
      id: "clover",
      src: "./config/stencils/clover.svg",
      label: Object.freeze({ de: "Kleeblatt", en: "Clover", fr: "Trefle" }),
    }),
    Object.freeze({
      id: "lightning",
      src: "./config/stencils/lightning.svg",
      label: Object.freeze({ de: "Blitz", en: "Lightning", fr: "Eclair" }),
    }),
    Object.freeze({
      id: "rose",
      src: "./config/stencils/rose.svg",
      label: Object.freeze({ de: "Rose", en: "Rose", fr: "Rose" }),
    }),
    Object.freeze({
      id: "sun",
      src: "./config/stencils/sun.svg",
      label: Object.freeze({ de: "Sonne", en: "Sun", fr: "Soleil" }),
    }),
    Object.freeze({
      id: "kraken",
      src: "./config/stencils/kraken.svg",
      label: Object.freeze({ de: "Krake", en: "Kraken", fr: "Kraken" }),
    }),
    Object.freeze({
      id: "splash",
      src: "./config/stencils/splash.svg",
      label: Object.freeze({ de: "Klecks", en: "Splash", fr: "Tache" }),
    }),
    Object.freeze({
      id: "horse",
      src: "./config/stencils/horse.svg",
      label: Object.freeze({ de: "Pferd", en: "Horse", fr: "Cheval" }),
    }),
    Object.freeze({
      id: "piglet",
      src: "./config/stencils/piglet.svg",
      label: Object.freeze({ de: "Ferkel", en: "Piglet", fr: "Porcelet" }),
    }),
    Object.freeze({
      id: "stegosaurus",
      src: "./config/stencils/stegosaurus.svg",
      label: Object.freeze({ de: "Stegosaurus", en: "Stegosaurus", fr: "Stegosaurus" }),
    }),
    Object.freeze({
      id: "balloons-50",
      src: "./config/stencils/balloons-50.svg",
      label: Object.freeze({ de: "Ballons 50", en: "Balloons 50", fr: "Ballons 50" }),
    }),
    Object.freeze({
      id: "france-map",
      src: "./config/stencils/france-map.svg",
      label: Object.freeze({ de: "Frankreich-Karte", en: "France map", fr: "Carte France" }),
    }),
    Object.freeze({
      id: "germany-map",
      src: "./config/stencils/germany-map.svg",
      label: Object.freeze({ de: "Deutschland-Karte", en: "Germany map", fr: "Carte Allemagne" }),
    }),
    Object.freeze({
      id: "birthday-cake",
      src: "./config/stencils/birthday-cake.svg",
      label: Object.freeze({ de: "Geburtstagstorte", en: "Birthday cake", fr: "Gateau d'anniversaire" }),
    }),
    Object.freeze({
      id: "rocket",
      src: "./config/stencils/rocket.svg",
      label: Object.freeze({ de: "Rakete", en: "Rocket", fr: "Fusee" }),
    }),
    Object.freeze({
      id: "ball",
      src: "./config/stencils/ball.svg",
      label: Object.freeze({ de: "Ball", en: "Ball", fr: "Balle" }),
    }),
    Object.freeze({
      id: "gift",
      src: "./config/stencils/gift.svg",
      label: Object.freeze({ de: "Geschenk", en: "Gift", fr: "Cadeau" }),
    }),
    Object.freeze({
      id: "medals",
      src: "./config/stencils/medals.svg",
      label: Object.freeze({ de: "Medaillen", en: "Medals", fr: "Medailles" }),
    }),
    Object.freeze({
      id: "bicycle",
      src: "./config/stencils/bicycle.svg",
      label: Object.freeze({ de: "Fahrrad", en: "Bicycle", fr: "Velo" }),
    }),
    Object.freeze({
      id: "thumbs-up",
      src: "./config/stencils/thumbs-up.svg",
      label: Object.freeze({ de: "Daumen hoch", en: "Thumbs up", fr: "Pouce leve" }),
    }),
    Object.freeze({
      id: "balloons-4",
      src: "./config/stencils/balloons-4.svg",
      label: Object.freeze({ de: "4 Ballons", en: "4 balloons", fr: "4 ballons" }),
    }),
    Object.freeze({
      id: "muffin",
      src: "./config/stencils/muffin.svg",
      label: Object.freeze({ de: "Muffin", en: "Muffin", fr: "Muffin" }),
    }),
    Object.freeze({
      id: "many-hearts",
      src: "./config/stencils/many-hearts.svg",
      label: Object.freeze({ de: "Viele Herzen", en: "Many hearts", fr: "Beaucoup de coeurs" }),
    }),
    Object.freeze({
      id: "camper-van",
      src: "./config/stencils/camper-van.svg",
      label: Object.freeze({ de: "Campingbulli", en: "Camper van", fr: "Van camping" }),
    }),
    Object.freeze({
      id: "christmas-tree",
      src: "./config/stencils/christmas-tree.svg",
      label: Object.freeze({ de: "Weihnachtsbaum", en: "Christmas tree", fr: "Sapin de Noel" }),
    }),
    Object.freeze({
      id: "uk-map",
      src: "./config/stencils/uk-map.svg",
      label: Object.freeze({ de: "Vereinigtes Koenigreich", en: "United Kingdom map", fr: "Carte Royaume-Uni" }),
    }),
    Object.freeze({
      id: "balloon",
      src: "./config/stencils/balloon.svg",
      label: Object.freeze({ de: "Ballon", en: "Balloon", fr: "Ballon" }),
    }),
    Object.freeze({
      id: "tent",
      src: "./config/stencils/tent.svg",
      label: Object.freeze({ de: "Zelt", en: "Tent", fr: "Tente" }),
    }),
    Object.freeze({
      id: "ship",
      src: "./config/stencils/ship.svg",
      label: Object.freeze({ de: "Schiff", en: "Ship", fr: "Bateau" }),
    }),
    Object.freeze({
      id: "house",
      src: "./config/stencils/house.svg",
      label: Object.freeze({ de: "Haus", en: "House", fr: "Maison" }),
    }),
    Object.freeze({
      id: "fist-bump",
      src: "./config/stencils/fist-bump.svg",
      label: Object.freeze({ de: "Fist Bump", en: "Fist bump", fr: "Poings" }),
    }),
    Object.freeze({
      id: "two-apples",
      src: "./config/stencils/two-apples.svg",
      label: Object.freeze({ de: "Zwei Aepfel", en: "Two apples", fr: "Deux pommes" }),
    }),
    Object.freeze({
      id: "rain-cloud",
      src: "./config/stencils/rain-cloud.svg",
      label: Object.freeze({ de: "Regenwolke", en: "Rain cloud", fr: "Nuage de pluie" }),
    }),
    Object.freeze({
      id: "watering-can",
      src: "./config/stencils/watering-can.svg",
      label: Object.freeze({ de: "Giesskanne", en: "Watering can", fr: "Arrosoir" }),
    }),
    Object.freeze({
      id: "stay-cool",
      src: "./config/stencils/stay-cool.svg",
      label: Object.freeze({ de: "Bleib cool", en: "Stay cool", fr: "Reste cool" }),
    }),
  ]);

  window.FOTOCOLLAGE_STENCIL_CONFIG = Object.freeze({
    STENCIL_OPTIONS,
  });
})();
