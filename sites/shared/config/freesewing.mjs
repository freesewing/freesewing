/* URL to strapi for blog, showcase, and newsletter posts */
export const strapiHost = 'https://posts.freesewing.org'

/* URL to FreeSewing's monorepo on Github */
export const monorepo = 'https://github.com/freesewing/freesewing'

/* Default theme */
export const defaultTheme = 'light'

/* A list of all measurements used by FreeSewing */
export const measurements = [
  'ankle',
  'biceps',
  'bustFront',
  'bustPointToUnderbust',
  'bustSpan',
  'chest',
  'crossSeam',
  'crossSeamFront',
  'crotchDepth',
  'heel',
  'head',
  'highBust',
  'highBustFront',
  'hips',
  'hpsToBust',
  'hpsToWaistBack',
  'hpsToWaistFront',
  'inseam',
  'knee',
  'neck',
  'seat',
  'seatBack',
  'shoulderSlope',
  'shoulderToElbow',
  'shoulderToShoulder',
  'shoulderToWrist',
  'underbust',
  'upperLeg',
  'waist',
  'waistBack',
  'waistToArmhole',
  'waistToFloor',
  'waistToHips',
  'waistToKnee',
  'waistToSeat',
  'waistToUnderbust',
  'waistToUpperLeg',
  'wrist',
]

/* A list of measurments that are degrees (rather than mm) */
export const degreeMeasurements = ['shoulderSlope']

/* Helper method to determine whether a measurement uses degrees */
export const isDegreeMeasurement = (measie) => degreeMeasurements.indexOf(measie) !== -1


