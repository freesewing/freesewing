/*
 * A translation fallback method in case none is passed in
 *
 * @param {object} Swizzled - Swizzled code, not used here
 * @param {string} key - The input
 * @return {string} key - The input is returned
 */
export const t = (Swizzled, key) => (Array.isArray(key) ? key[0] : key)
