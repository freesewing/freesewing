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
    fit: ['backOpening', 'chestDepth'],
    style: ['lengthBonus', 'bibLength', 'bibWidth', 'strapWidth']
  },
  measurements: ['waist', 'hips', 'inseam', 'seat', 'waistToKnee', 'waistToFloor', 'knee'],
  dependencies: {},
  inject: {},
  hide: [],
  parts: ['front','back'],
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
    backOpening: { pct: 10, min: 0, max: 25 },
    lengthBonus: { pct: 0, min: -20, max: 25 },
    chestDepth: { pct: 22, min: 15, max: 90 },
    bibLength: { pct: 75, min: 0, max: 90 },
    bibWidth: { pct: 100, min: 50, max: 125 },
    strapWidth: { pct: 60, min: 20, max: 100 }
  }
}
