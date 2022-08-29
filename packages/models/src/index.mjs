import { measurements, neckstimate } from './neckstimate.mjs'

const getMeasurements = (size, breasts) => {
  const all = {}
  for (const m of measurements) {
    all[m] = neckstimate(size * 10, m, breasts)
  }

  return all
}

export const sizes = {
  womenswear: [28,30,32,34,36,38,40,42,44,46],
  menswear: [32,34,36,38,40,42,44,46,48,50],
}

export const womenswear28 = getMeasurements(28, true)
export const womenswear30 = getMeasurements(30, true)
export const womenswear32 = getMeasurements(32, true)
export const womenswear34 = getMeasurements(34, true)
export const womenswear36 = getMeasurements(36, true)
export const womenswear38 = getMeasurements(38, true)
export const womenswear40 = getMeasurements(40, true)
export const womenswear42 = getMeasurements(42, true)
export const womenswear44 = getMeasurements(44, true)
export const womenswear46 = getMeasurements(46, true)

export const menswear32 = getMeasurements(32, false)
export const menswear34 = getMeasurements(34, false)
export const menswear36 = getMeasurements(36, false)
export const menswear38 = getMeasurements(38, false)
export const menswear40 = getMeasurements(40, false)
export const menswear42 = getMeasurements(42, false)
export const menswear44 = getMeasurements(44, false)
export const menswear46 = getMeasurements(46, false)
export const menswear48 = getMeasurements(48, false)
export const menswear50 = getMeasurements(50, false)

export { measurements }

export const womenswear = {
  womenswear28,
  womenswear30,
  womenswear32,
  womenswear34,
  womenswear36,
  womenswear38,
  womenswear40,
  womenswear42,
  womenswear44,
  womenswear46,
}

export const menswear = {
  menswear32,
  menswear34,
  menswear36,
  menswear38,
  menswear40,
  menswear42,
  menswear44,
  menswear46,
  menswear48,
  menswear50,
}

