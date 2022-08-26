import pkg from '../package.json' assert { type: 'json' }

const { version } = pkg

export const info = {
  version,
  name: 'brian',
  design: 'Joost De Cock',
  code: 'Joost De Cock',
  department: 'tops',
  type: 'block',
  difficulty: 3,
  optionGroups: {
    fit: [
      'chestEase',
      'collarEase',
      'bicepsEase',
      'cuffEase',
      'shoulderEase',
      'lengthBonus',
      'sleeveLengthBonus',
      'draftForHighBust',
    ],
    style: ['s3Collar', 's3Armhole'],
    advanced: [
      'acrossBackFactor',
      'armholeDepthFactor',
      'backNeckCutout',
      'frontArmholeDeeper',
      'shoulderSlopeReduction',
      'sleeveWidthGuarantee',
      {
        sleevecap: [
          'sleevecapEase',
          'sleevecapTopFactorX',
          'sleevecapTopFactorY',
          'sleevecapBackFactorX',
          'sleevecapBackFactorY',
          'sleevecapFrontFactorX',
          'sleevecapFrontFactorY',
          'sleevecapQ1Offset',
          'sleevecapQ2Offset',
          'sleevecapQ3Offset',
          'sleevecapQ4Offset',
          'sleevecapQ1Spread1',
          'sleevecapQ1Spread2',
          'sleevecapQ2Spread1',
          'sleevecapQ2Spread2',
          'sleevecapQ3Spread1',
          'sleevecapQ3Spread2',
          'sleevecapQ4Spread1',
          'sleevecapQ4Spread2',
        ],
      },
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
  'shoulderToWrist',
  'wrist',
]

export const optionalMeasurements = ['highBust']

