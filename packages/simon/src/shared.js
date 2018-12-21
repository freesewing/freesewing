export const calculateReduction = function(part) {
  let { store, measurements, options } = part.shorthand();
  if(store.get('reduction') === true) return;

  let chest = measurements.chestCircumference * (1+ options.chestEase);
  let waist = measurements.naturalWaist * (1+ options.waistEase);
  let hips = measurements.hipsCircumference * (1+ options.hipsEase);
  let waistReduction = chest - waist;
  let hipsReduction = chest - hips;

  // If your waist > chest, this pattern is not going to work for you as-is.
  if (waistReduction < 0) waistReduction = 0;
  if (hipsReduction < 0) hipsReduction = 0;
  store.set("waistReduction", waistReduction);
  store.set("hipsReduction", hipsReduction);
  store.set("reduction", true);
}

