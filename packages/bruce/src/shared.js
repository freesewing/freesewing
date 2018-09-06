export function init(part) {
  let {store, options, measurements, utils} = part.shorthand();

  if(store.get('init') !== true) {
    /* Set vertical scale to 1 (no stretch) */
    store.set('yScale', 1);

    /* Store rise, backRise and legBonus as absolute values */
    store.set('rise', measurements.hipsToUpperLeg * options.rise * store.get('yScale'));
    store.set('backRise', measurements.hipsToUpperLeg * options.backRise * store.get('yScale'));
    store.set('sideRise', store.get('backRise') * 0.75);
    store.set('frontRise', store.get('backRise') * 0.25);

    store.set('legBonus', measurements.hipsToUpperLeg * options.legBonus * store.get('yScale'));

    /* Set horizontal scale based on stretch */
    store.set('xScale', utils.stretchToScale(options.stretch));
    store.set('xScaleLegs', utils.stretchToScale(options.legStretch));

    /* Ratio of parts at the hips*/
    store.set('hips', measurements.hipsCircumference * store.get('xScale'));
    store.set('hipsFront', store.get('hips') * options.hipRatioFront);
    store.set('hipsSide', store.get('hips') * options.hipRatioSide);
    store.set('hipsBack', store.get('hips') * options.hipRatioBack);

    /* Ratio of parts at the legs*/
    store.set('leg', measurements.upperLegCircumference * store.get('xScaleLegs'));
    store.set('legInset', store.get('leg') * options.legRatioInset);
    store.set('legSide', store.get('leg') *  options.legRatioSide);
    store.set('legBack', store.get('leg') *  options.legRatioBack);

    /* Gusset */
    store.set('gusset', measurements.hipsCircumference * options.gussetRatio);
    store.set('gussetInsetRatio', options.gussetInsetRatio);

    /* Length helper */
    store.set('length', measurements.hipsToUpperLeg * store.get('yScale'));
    store.set('riseLength', measurements.hipsToUpperLeg + store.get('rise'));
    store.set('fullLength', store.get('riseLength') + store.get('legBonus'));

    /* Height ratio front/inset */
    store.set('heightInset', store.get('fullLength') * options.heightRatioInset);
    store.set('heightFront', store.get('fullLength') * options.heightRatioFront);

    /* Absolute amount to raise the back */

    console.log(store.get('init'));
    store.set('init', true);
  }

}
