const nonHuman = {
  withoutBreasts: {
    dolls: {},
    giants: {}
  },
  withBreasts: {
    dolls: {},
    giants: {}
  }
}
const round = val => Math.round(val*10)/10

export const nonHumanMeasurements = models => {

  const { withBreasts, withoutBreasts } = models

  for (let i=0.1;i<1;i+=0.1) {
    const name = `Doll ${Math.round(i*10)}/10`
    nonHuman.withBreasts.dolls[name] = {}
    // withBreasts: Based on Anneke (size 34)
    for (const [m, val] of Object.entries(withBreasts.size34)) {
      nonHuman.withBreasts.dolls[name][m] = (m === 'shoulderSlope')
        ? val
        : round(val * i)
    }
    // withoutBreasts: Based on Ronan (size 42)
    nonHuman.withoutBreasts.dolls[name] = {}
    for (const [m, val] of Object.entries(withoutBreasts.size42)) {
      nonHuman.withoutBreasts.dolls[name][m] = (m === 'shoulderSlope')
        ? val
        : round(val * i)
    }
  }
  for (let i=1;i<=2.5;i+=0.5) {
    const name = `Giant ${i}/1`
    nonHuman.withBreasts.giants[name] = {}
    // withBreasts: Based on Anneke (size 34)
    for (const [m, val] of Object.entries(withBreasts.size34)) {
      nonHuman.withBreasts.giants[name][m] = (m === 'shoulderSlope')
        ? val
        : round(val * i)
    }
    nonHuman.withoutBreasts.giants[name] = {}
    // withoutBreasts: Based on Ronan (size 42)
    for (const [m, val] of Object.entries(withoutBreasts.size42)) {
      nonHuman.withoutBreasts.giants[name][m] = (m === 'shoulderSlope')
        ? val
        : round(val * i)
    }
  }

  return nonHuman
}

