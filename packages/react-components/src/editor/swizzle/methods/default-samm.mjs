export const defaultSamm = (Swizzled, units, inMm = true) => {
  const dflt = units === 'imperial' ? 0.5 : 1
  return inMm ? Swizzled.methods.measurementAsMm(dflt, units) : dflt
}
