import { dolls, giants } from '@freesewing/models'

const nonHuman = {
  menswear: {
    dolls: dolls.cisFemale,
    giants: giants.cisMale,
  },
  womenswear: {
    dolls: dolls.cisFemale,
    giants: giants.cisMale,
  }
}
const round = val => Math.round(val*10)/10
for (let i=0.1;i<0.7;i+=0.1) {
  const name = `${Math.round(i*10)}/10`
  nonHuman.womenswear.dolls[name] = {}
  // womenswear: Based on womenswear34
  for (const [m, val] of Object.entries(womenswear34)) {
    nonHuman.womenswear.dolls[name][m] = (m === 'shoulderSlope')
      ? val
      : round(val * i)
  }
  nonHuman.menswear.dolls[name] = {}
  // menswear: Based on menswear42
  for (const [m, val] of Object.entries(menswear42)) {
    nonHuman.menswear.dolls[name][m] = (m === 'shoulderSlope')
      ? val
      : round(val * i)
  }
}
for (let i=1.5;i<=3;i+=0.5) {
  const name = `${i}/1`
  nonHuman.womenswear.giants[name] = {}
  // womenswear: Based on womenswear34
  for (const [m, val] of Object.entries(womenswear34)) {
    nonHuman.womenswear.giants[name][m] = (m === 'shoulderSlope')
      ? val
      : round(val * i)
  }
  nonHuman.menswear.giants[name] = {}
  // menswear: Based on menswear42
  for (const [m, val] of Object.entries(menswear42)) {
    nonHuman.menswear.giants[name][m] = (m === 'shoulderSlope')
      ? val
      : round(val * i)
  }
}

export default nonHuman

