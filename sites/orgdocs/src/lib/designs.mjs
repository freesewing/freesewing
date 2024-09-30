import designInfo from '../../../../config/software/designs.json' with { type: 'json' }

const designList = Object.keys(designInfo)
const designs = {}
for (const design of designList) {
  designs[design] = await import(`../../../../designs/${design}/src/index.mjs`)
}

export {
  designInfo,
  designList,
  designs,
}


