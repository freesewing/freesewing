/*
 * This helper method constructs the initial state object.
 *
 * If they are not present, it will fall back to the relevant defaults
 * @param {object} Swizzled - The swizzled data
 * @return {object} initial - The initial Editor State object
 */
export const initialEditorState = (Swizzled, preload) => {
  /*
   * Create initial state object
   */
  const initial = { ...Swizzled.config.initialState }

  /*
   * FIXME: Add preload support, from URL or other sources, rather than just passing in an object
   */

  return initial
}
