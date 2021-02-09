import { version } from '../package.json'

export default {
  name: 'cornelius',
  version,
  design: 'Wouter Van Wageningen',
  code: 'Wouter Van Wageningen',
  department: 'unisex',
  type: 'pattern',
  difficulty: 6,
  tags: ['pants'],
  optionGroups: {
    fit: ['fullness'],
    style: []
  },
  measurements: ['waist', 'hips', 'inseam', 'seat', 'waistToKnee', 'waistToFloor', 'knee'],
  dependencies: {},
  inject: {},
  hide: [],
  parts: ['front','back', 'legband'],
  options: {
    pctAtoO: 50,
    pctAtoC: 25,
    pctUtoA: 25,
    pctJtoA: 25,
    pctZtoR: 35,
    pctRtoZin: 75,
    pctRtoZup: 25,
    pctRtoKin: 75,
    pctRtoKdown: 25,
    pctKtoRout: 15,
    pctKtoRup: 25,
    pctKtoH: 70,
    fullness: { pct: 0, min: 0, max: 35 },
  }
}
