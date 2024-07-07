/*
 * Method that capitalizes a string (make the first character uppercase)
 *
 * @param {object} Swizzled - Swizzled code, not used here
 * @param {string} string - The input string to capitalize
 * @return {string} String - The capitalized input string
 */
export const capitalize = (Swizzled, string) =>
  typeof string === 'string' ? string.charAt(0).toUpperCase() + string.slice(1) : ''
