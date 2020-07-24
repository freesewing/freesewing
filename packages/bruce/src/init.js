export default function init(part) {
  let { store, options, measurements, utils } = part.shorthand()

  // Don't run this every time, except when sampling
  store.setIfUnset('init', false)
  if (store.get('init') !== true || part.context.settings.sample) {
    /* Set vertical scale to 1 (no stretch) */
    store.set('yScale', 1)

    const hipsToUpperLeg = measurements.waistToUpperLeg - measurements.waistToHips
    /* Store rise, backRise and legBonus as absolute values */
    store.set('rise', hipsToUpperLeg * options.rise * store.get('yScale'))
    store.set('backRise', hipsToUpperLeg * options.backRise * store.get('yScale'))
    store.set('sideRise', store.get('backRise') * 0.75)
    store.set('frontRise', store.get('backRise') * 0.25)
    store.set('legBonus', hipsToUpperLeg * options.legBonus * store.get('yScale'))

    /* Set horizontal scale based on stretch */
    store.set('xScale', utils.stretchToScale(options.stretch))
    store.set('xScaleLegs', utils.stretchToScale(options.legStretch))

    /* Ratio of parts at the hips*/
    store.set('hips', measurements.hips * store.get('xScale'))
    store.set('hipsFront', store.get('hips') * options.hipRatioFront)
    let hipRatioSide = (1 - (options.hipRatioFront + options.hipRatioBack)) / 2
    store.set('hipsSide', store.get('hips') * hipRatioSide)
    store.set('hipsBack', store.get('hips') * options.hipRatioBack)

    /* Ratio of parts at the legs*/
    store.set('leg', measurements.upperLeg * store.get('xScaleLegs'))
    store.set('legInset', store.get('leg') * options.legRatioInset)
    let legRatioSide = 1 - options.legRatioInset - options.legRatioBack
    store.set('legSide', store.get('leg') * legRatioSide)
    store.set('legBack', store.get('leg') * options.legRatioBack)

    /* Gusset */
    store.set('gusset', measurements.hips * options.gussetRatio)
    store.set('gussetInsetRatio', options.gussetInsetRatio)

    /* Length helper */
    store.set('length', hipsToUpperLeg * store.get('yScale'))
    store.set('riseLength', hipsToUpperLeg + store.get('rise'))
    store.set('fullLength', store.get('riseLength') + store.get('legBonus') * store.get('yScale'))

    /* Height ratio front/inset */
    store.set(
      'heightInset',
      store.get('riseLength') * options.heightRatioInset +
        store.get('legBonus') * store.get('yScale')
    )
    store.set('heightFront', store.get('riseLength') * (1 - options.heightRatioInset))

    /* Absolute amount to raise the back */

    store.set('init', true)
  }
}
