import { version } from '../package.json'

// ?? 🤔 ?? --> https://en.freesewing.dev/packages/core/config

export default {
  name: 'holmes',
  version,
  design: 'Erica Alcusa Sáez',
  code: ['Erica Alcusa Sáez', 'bobgeorgethe3rd'],
  department: 'accessories',
  type: 'pattern',
  difficulty: 3,
  optionGroups: {
    fit: ['headEase'],
    style: [
      'lengthRatio',
      'goreNumber',
      'visorAngle',
      'visorWidth',
      'earLength',
      'earWidth',
      'buttonhole',
    ],
    advanced: ['visorLength'],
  },
  measurements: ['head'],
  dependencies: {},
  inject: {},
  hide: [],
  parts: ['gore', 'visor', 'ear'],
  options: {
<<<<<<< HEAD
	headEase: { pct: 3, min: 0, max: 15 },
    lengthRatio: { pct: 55, min: 40, max: 60 },
    goreNumber: { count: 6, min: 4, max: 20 },
    visorAngle: { deg: 45, min: 10, max: 90 },
    visorWidth: { pct: 6.5, min: 3, max: 15 },
	earLength: { pct: 100, min: 80, max: 150 },
	earWidth: { pct: 100, min: 80, max: 150 },
	visorLength: { pct: 100, min: 80, max: 150 },
	buttonhole: {bool: false}
=======
    headEase: { pct: 5, min: 0, max: 15 },
    lengthRatio: { pct: 55, min: 40, max: 60 },
    goreNumber: { count: 6, min: 4, max: 20 },
    visorAngle: { deg: 45, min: 10, max: 90 },
    visorWidth: { pct: 5, min: 3, max: 15 },
    earLength: { pct: 100, min: 80, max: 150 },
    earWidth: { pct: 100, min: 80, max: 150 },
    visorLength: { pct: 100, min: 80, max: 150 },
    buttonhole: { bool: false },
>>>>>>> 08fac92c3c6221d66153cf6acdc469aee6a849f6
  },
}
