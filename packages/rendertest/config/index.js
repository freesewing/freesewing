import { version } from '../package.json'

export default {
  name: 'rendertest',
  version,
  design: 'Joost De Cock',
  code: 'Joost De Cock',
  department: 'accessories',
  type: 'pattern',
  difficulty: 1,
  optionGroups: {
    size: ['width'],
    content: ['colors', 'circles', 'text', 'snippets', 'macros'],
  },
  measurements: [],
  parts: ['test'],
  options: {
    width: { mm: 200, min: 50, max: 500, testIgnore: true },
    strokeColors: { bool: true },
    strokeWidths: { bool: true },
    strokeStyles: { bool: true },
    strokeCombos: { bool: true },
    circles: { bool: true },
    text: { bool: true },
    snippets: { bool: true },
    macros: { bool: true },
  },
}
