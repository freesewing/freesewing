export const calculateReduction = function(part) {
  let { store, measurements, options } = part.shorthand();
  if (store.get("reduction") === true) return;

  let chest = measurements.chestCircumference * (1 + options.chestEase);
  let waist = measurements.naturalWaist * (1 + options.waistEase);
  let hips = measurements.hipsCircumference * (1 + options.hipsEase);
  let waistReduction = chest - waist;
  let hipsReduction = chest - hips;

  // If your waist > chest, this pattern is not going to work for you as-is.
  if (waistReduction < 0) waistReduction = 0;
  if (hipsReduction < 0) hipsReduction = 0;
  store.set("waistReduction", waistReduction);
  store.set("hipsReduction", hipsReduction);
  store.set("reduction", true);
};

export const addButtons = function(part) {
  let { points, options, snippets, Snippet } = part.shorthand();
  let len = points.cfNeck.dist(points.cfHips) * (1 - options.buttonFreeLength);
  for (let i = 1; i <= options.buttons; i++) {
    points["button" + i] = points.cfNeck.shift(
      -90,
      (len / options.buttons) * i
    );
    snippets["button" + i] = new Snippet("button", points["button" + i]);
  }
  if (options.extraTopButton === "yes")
    snippets.topButton = new Snippet(
      "button",
      points.cfNeck.shift(-90, len / options.buttons / 2)
    );
};
