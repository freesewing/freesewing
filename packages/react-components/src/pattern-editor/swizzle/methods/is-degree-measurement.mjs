/*
 * A list of measurments that are degrees (rather than mm)
 */
const degreeMeasurements = ['shoulderSlope']

/**
 * Helper method to determine whether a measurement uses degrees
 *
 * @param {object} Swizzled - Swizzled code, not used here
 * @param {string} name - The name of the measurement
 * @return {bool} isDegree - True if the measurment is a degree measurement
 */
export const isDegreeMeasurement = (Swizzled, name) => degreeMeasurements.indexOf(name) !== -1
