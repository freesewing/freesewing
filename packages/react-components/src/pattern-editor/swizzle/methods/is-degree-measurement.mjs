/*
 * A list of measurments that are degrees (rather than mm)
 */
const degreeMeasurements = ['shoulderSlope']

/**
 * Helper method to determine whether a measurement uses degrees
 *
 * @param {object} methods - An object holding possibly swizzled methods (unused here)
 * @param {string} name - The name of the measurement
 * @return {bool} isDegree - True if the measurment is a degree measurement
 */
export const isDegreeMeasurement = (methods, name) => degreeMeasurements.indexOf(name) !== -1
