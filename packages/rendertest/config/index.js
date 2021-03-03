import { version } from '../package.json'

export default {
  name: 'rendertest',
  version,
  design: 'Joost De Cock',
  code: 'Joost De Cock',
  department: 'womenswear',
  type: 'pattern',
  difficulty: 1,
  tags: ['example'],
  optionGroups: {
    size: ['width'],
    content: ['colors', 'circles', 'text', 'snippets', 'macros']
  },
  measurements: [],
  parts: ['test'],
  options: {
    width: { mm: 200, min: 50, max: 500 },
    colors: { bool: true },
    circles: { bool: true },
    text: { bool: true },
    snippets: { bool: true },
    macros: { bool: true },
    widthHd: { bool: true }
  }
}
