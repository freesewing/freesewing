import { measurements, neckstimate, SHEHER, HEHIM } from './neckstimate.mjs'

const getMeasurements = (size, pronouns) => {
  const all = {}
  for (const m of measurements) {
    all[m] = neckstimate(size * 10, m, pronouns)
  }

  return all
}

const multiplyMeasurements = (factor, pronouns) => {
  const all = {}
  for (const m of measurements) {
    all[m] = factor * neckstimate(pronouns === 0 ? '340' : '380', m, pronouns)
  }

  return all
}

export const groups = [ 'adult', 'doll', 'giant' ]

export const sizes = {
  adultsheher: [28,30,32,34,36,38,40,42,44,46],
  adulthehim: [32,34,36,38,40,42,44,46,48,50],
  dollsheher: [10, 20, 30, 40, 50, 60],
  dollhehim: [10, 20, 30, 40, 50, 60],
  giantsheher: [150, 200, 250, 300],
  gianthehim: [150, 200, 250, 300],
}

export const adultsheher28 = getMeasurements(28, SHEHER)
export const adultsheher30 = getMeasurements(30, SHEHER)
export const adultsheher32 = getMeasurements(32, SHEHER)
export const adultsheher34 = getMeasurements(34, SHEHER)
export const adultsheher36 = getMeasurements(36, SHEHER)
export const adultsheher38 = getMeasurements(38, SHEHER)
export const adultsheher40 = getMeasurements(40, SHEHER)
export const adultsheher42 = getMeasurements(42, SHEHER)
export const adultsheher44 = getMeasurements(44, SHEHER)
export const adultsheher46 = getMeasurements(46, SHEHER)

export const adulthehim32 = getMeasurements(32, HEHIM)
export const adulthehim34 = getMeasurements(34, HEHIM)
export const adulthehim36 = getMeasurements(36, HEHIM)
export const adulthehim38 = getMeasurements(38, HEHIM)
export const adulthehim40 = getMeasurements(40, HEHIM)
export const adulthehim42 = getMeasurements(42, HEHIM)
export const adulthehim44 = getMeasurements(44, HEHIM)
export const adulthehim46 = getMeasurements(46, HEHIM)
export const adulthehim48 = getMeasurements(48, HEHIM)
export const adulthehim50 = getMeasurements(50, HEHIM)

export const dollsheher10 = multiplyMeasurements(0.1, SHEHER)
export const dollsheher20 = multiplyMeasurements(0.2, SHEHER)
export const dollsheher30 = multiplyMeasurements(0.3, SHEHER)
export const dollsheher40 = multiplyMeasurements(0.4, SHEHER)
export const dollsheher50 = multiplyMeasurements(0.5, SHEHER)
export const dollsheher60 = multiplyMeasurements(0.6, SHEHER)

export const dollhehim10 = multiplyMeasurements(0.1, HEHIM)
export const dollhehim20 = multiplyMeasurements(0.2, HEHIM)
export const dollhehim30 = multiplyMeasurements(0.3, HEHIM)
export const dollhehim40 = multiplyMeasurements(0.4, HEHIM)
export const dollhehim50 = multiplyMeasurements(0.5, HEHIM)
export const dollhehim60 = multiplyMeasurements(0.6, HEHIM)

export const giantsheher150 = multiplyMeasurements(1.5, SHEHER)
export const giantsheher200 = multiplyMeasurements(2, SHEHER)
export const giantsheher250 = multiplyMeasurements(2.5, SHEHER)
export const giantsheher300 = multiplyMeasurements(3, SHEHER)

export const gianthehim150 = multiplyMeasurements(1.5, HEHIM)
export const gianthehim200 = multiplyMeasurements(2, HEHIM)
export const gianthehim250 = multiplyMeasurements(2.5, HEHIM)
export const gianthehim300 = multiplyMeasurements(3, HEHIM)


export const adultsheher = {
  28: adultsheher28,
  30: adultsheher30,
  32: adultsheher32,
  34: adultsheher34,
  36: adultsheher36,
  38: adultsheher38,
  40: adultsheher40,
  42: adultsheher42,
  44: adultsheher44,
  46: adultsheher46,
}
export const adulthehim = {
  32: adulthehim32,
  34: adulthehim34,
  36: adulthehim36,
  38: adulthehim38,
  40: adulthehim40,
  42: adulthehim42,
  44: adulthehim44,
  46: adulthehim46,
  48: adulthehim48,
  50: adulthehim50,
}
export const adults = {
  sheher: adultsheher,
  hehim:adulthehim,
}

export const dollsheher = {
  10: dollsheher10,
  20: dollsheher20,
  30: dollsheher30,
  40: dollsheher40,
  50: dollsheher50,
  60: dollsheher60,
}
export const dollhehim = {
  10: dollhehim10,
  20: dollhehim20,
  30: dollhehim30,
  40: dollhehim40,
  50: dollhehim50,
  60: dollhehim60,
}
export const dolls = {
  sheher: dollsheher,
  hehim: dollhehim,
}

export const giantsheher = {
  150: giantsheher150,
  200: giantsheher200,
  250: giantsheher250,
  300: giantsheher300,
}
export const gianthehim = {
  150: gianthehim150,
  200: gianthehim200,
  250: gianthehim250,
  300: gianthehim300,
}
export const giants = {
  sheher: giantsheher,
  hehim: gianthehim,
}

export { measurements }

