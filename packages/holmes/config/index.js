import { version } from '../package.json'

// ?? 🤔 ?? --> https://en.freesewing.dev/packages/core/config

export default {
  name: 'holmes',
  version: "2.17.5",
  design: 'Erica Alcusa Sáez',
  code: 'Erica Alcusa Sáez, bobgeorgethe3rd',
  department: 'accessories',
  type: 'pattern',
  difficulty: 3,
  optionGroups: {
	fit: ['head_ease'],
    style: ['lengthRatio', 'goreNumber', 'billAngle', 'billWidth','ear_length','ear_width','buttonhole'],
	advanced:['bill_length'],
  },
  measurements: ['head'],
  dependencies: {},
  inject: {},
  hide: [],
  parts: ['gore', 'bill', 'ear'],
  options: {
	head_ease: { mm: 19, min: 0, max: 50 },
    lengthRatio: { pct: 55, min: 40, max: 60 },
    goreNumber: { count: 6, min: 4, max: 20 },
    billAngle: { deg: 45, min: 10, max: 90 },
    billWidth: { mm: 30, min: 5, max: 100 },
	ear_length: { pct: 100, min: 80, max: 150 },
	ear_width: { pct: 100, min: 80, max: 150 },
	bill_length: { pct: 100, min: 80, max: 150 },
	buttonhole: {bool: false}
  },
}
