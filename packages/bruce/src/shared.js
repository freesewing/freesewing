export function init(part) {
  let {store, options, measurements, utils} = part.shorthand();

  /* Set vertical scale to 1 (no stretch) */
  store.setIfUnset('yScale', 1);

  /* Set horizontal scale based on stretch */
  store.setIfUnset('xScale', utils.stretchToScale(options.stretch));
  store.setIfUnset('xScaleLegs', utils.stretchToScale(options.legStretch));

  /* Ratio of parts at the hips*/
  store.setIfUnset('hips', measurements.hipsCircumference * store.get('xScale'));
  store.setIfUnset('hipsFront', store.get('hips') * options.hipRatioFront);
  store.setIfUnset('hipsSide', store.get('hips') * options.hipRatioSide);
  store.setIfUnset('hipsBack', store.get('hips') * options.hipRatioBack);

  /* Ratio of parts at the legs*/
  store.setIfUnset('leg', measurements.upperLegCircumference * store.get('xScaleLegs'));
  store.setIfUnset('legInset', store.get('leg') * options.legRatioInset);
  store.setIfUnset('legSide', store.get('leg') *  options.legRatioSide);
  store.setIfUnset('legBack', store.get('leg') *  options.legRatioBack);

  /* Gusset */
  store.setIfUnset('gusset', measurements.hipsCircumference * options.gussetRatio);
  store.setIfUnset('gussetInsetRatio', options.gussetInsetRatio);

  /* Length helper */
  store.setIfUnset('length', measurements.hipsToUpperLeg * store.get('yScale'));
  store.setIfUnset('riseLength', (measurements.hipsToUpperLeg + options.rise) * store.get('yScale'));
  store.setIfUnset('fullLength', (measurements.hipsToUpperLeg + options.rise) + options.legBonus * store.get('yScale'));

  /* Height ratio front/inset */
  store.setIfUnset('heightInset', store.get('fullLength') * options.heightRatioInset);
  store.setIfUnset('heightFront', store.get('fullLength') * options.heightRatioFront);

  /* Absolute amount to raise the back */
  store.setIfUnset('backRise', measurements.hipsCircumference * options.backRise);
  store.setIfUnset('sideRise', store.get('backRise') * 0.75);
  store.setIfUnset('frontRise', store.get('backRise') * 0.25);
}
