// Format a percentage (as in, between 0 and 1)
export const formatPercentage = (methods, val) => Math.round(1000 * val) / 10 + '%'
