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
    fit: ['fullness','waistReduction'],
    style: ['waistbandBelowWaist','cuffStyle','cuffWidth','ventLength'],
    advanced: ['bandBelowKnee', 'kneeToBelow']
  },
  parts: ['frontpoints','back','front','waistband','legband','legbandkeystone','pocket','pocketfacing'],
  inject: {
    front: 'frontpoints',
    back: 'frontpoints',
    pocket: 'frontpoints',
    pocketfacing: 'frontpoints'
  },
  measurements: ['waist', 'hips', 'inseam', 'seat', 'waistToKnee', 'waistToHips', 'waistToFloor', 'knee'],
  dependencies: {
    back: 'front',
    legband: ['back','front'],
    legbandkeystone: ['back','front'],
    waistband: ['back','front']
  },
  hide: ['frontpoints'],
  options: {
    pctAtoO: 0.50,
    pctAtoC: 0.25,
    pctUtoA: 0.25,
    pctJtoA: 0.25,
    pctZtoR: 0.35,
    pctRtoZin: 0.75,
    pctRtoZup: 0.25,
    pctRtoKin: 0.75,
    pctRtoKdown: 0.25,
    pctKtoRout: 0.15,
    pctKtoRup: 0.25,
    pctKtoH: 0.70,
    pctSeatAdjustment: 0.50,  
    kneeToBelow: { pct: 94, min: 85, max: 110 },
    ventLength: { pct: 70, min: 50, max: 110 },
    fullness: { pct: 0, min: 0, max: 55 },
    waistbandBelowWaist: { pct: 5, min: 0, max: 15 },
    waistReduction: { pct: 1, min: -2, max: 10 },
    cuffWidth: { pct: 0, min: -50, max: 150 },
    cuffStyle: { dflt: 'traditional', list: [ 'traditional', 'elegant', 'keystone' ]},
    bandBelowKnee: {pct: 25, min: 15, max: 50 },
  }
}
