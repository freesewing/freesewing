import { version } from '../package.json'

export const info = {
  version,
  name: 'aaron',
  design: 'Joost De Cock',
  code: 'Joost De Cock',
  department: 'tops',
  type: 'pattern',
  difficulty: 2,
  optionGroups: {
    fit: ['chestEase', 'hipsEase', 'stretchFactor', 'draftForHighBust'],
    style: [
      'armholeDrop',
      'backlineBend',
      'necklineBend',
      'necklineDrop',
      'shoulderStrapWidth',
      'shoulderStrapPlacement',
      'lengthBonus',
    ],
  },
}

export const measurements = [
    'biceps',
    'chest',
    'hpsToWaistBack',
    'waistToHips',
    'neck',
    'shoulderSlope',
    'shoulderToShoulder',
    'hips',
]

export const optionalMeasurements = ['highBust']

