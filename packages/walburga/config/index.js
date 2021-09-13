import { version } from '../package.json'

// ?? 🤔 ?? --> https://en.freesewing.dev/packages/core/config

export default {
  name: 'walburga',
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
	'sewing pattern',
  ],
  optionGroups: {
      fit:
      ['headRatio']
      ,
      style: ['lengthBonus','widthBonus',
	      'length',
	      'neckoRatio',
	     // 'width',
	      'hipLengthBonus',
	      'neckline'
	     ],
  },
    measurements: [
	'head',
	'neck',
//	'shoulderToElbow',
	'shoulderToShoulder',
//	'biceps',
	'hpsToWaistBack',
	'waistToKnee',
	'waistToHips',
//	'waist',
//	'chest',
//	'seat',
//	'hips',
	'waistToFloor',
	'waistToUpperLeg'
    ],
    dependencies: {front: 'base',
		   back: 'base'},
    inject: {
	front: 'base',
	back: 'base'
    },
    hide: ['base',],
  options: {
      headRatio: {pct: 100, min: 80, max: 120},
      lengthBonus:{ pct: 85, min: 60, max: 130 }, 
      widthBonus: {pct: 95, min:50, max: 130},
      length: {
	  list: ['ToKnee',
		 'ToMidLeg','ToFloor'],
	  dflt: 'ToKnee'
      },
      neckline: {bool: true},
      neckoRatio: {pct: 100, min:10, max:190},
      hipLengthBonus: {pct:95, min:80, max:120 }
      // advanced
//      forceWidth: {bool: false}  
  },
}
