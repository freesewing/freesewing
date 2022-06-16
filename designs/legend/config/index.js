import { version } from '../package.json'

export default {
  version,
  name: 'legend',
  design: 'Joost De Cock',
  code: 'Joost De Cock',
  department: 'accessories',
  type: 'pattern',
  difficulty: 1,
  tags: ['documentation'],
  optionGroups: {
    fit: ['fixme'],
  },
  measurements: [],
  parts: [
    'fabricLines',
    'saLines',
    'otherLines',
    'sa',
    'logo',
    'notches',
    'buttons',
    'snaps',
    'cutonfold',
    'grainline',
    'dimension',
    'title',
    'scalebox',
    'lineWidths',
    'lineStrokes',
    'sizes',
  ],
  options: {
    focus: '',
    // Optiongroups are needed for now, because workbench
    fixme: {
      pct: 50,
      min: 0,
      max: 100,
    },
  },
}
