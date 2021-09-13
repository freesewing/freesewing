import { version } from '../package.json'

// ?? 🤔 ?? --> https://en.freesewing.dev/packages/core/config

export default {
  name: 'lunetius',
  version,
  design: 'starf',
  code: 'starf',
  department: 'tops',
  type: 'pattern',
  difficulty: 1,
  tags: [
    'freesewing',
    'design',
    'diy',
    'fashion',
    'made to measure',
    'parametric design',
    'pattern',
    'sewing',
    'sewing pattern'
  ],
  optionGroups: {
      fit:
      ['headRatio','neckRatio']
      ,
      style: ['lengthBonus','widthBonus',
	      'length',]
  },
    measurements: ['waistToKnee','waistToUpperLeg','waistToFloor','hpsToWaistBack','neck','shoulderToShoulder','shoulderToElbow','waistToHips'],
  dependencies: {},
  inject: {},
  hide: [],
  parts: ['lacerna'],
  options: {
      headRatio: {pct: 100, min: 80, max: 120},
      lengthBonus:{ pct: 105, min: 60, max: 130 },
      widthBonus: {pct: 100, min:50, max: 130},
      length: {
	  list: ['ToKnee',
		 'ToBelowKnee',
		 'ToHips',
		 'ToUpperLeg','ToFloor'],
	  dflt: 'ToBelowKnee'
      },
      neckRatio: {pct: 115, min: 95, max: 130},
  }
}
