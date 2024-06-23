/*
 * This method drafts the pattern
 *
 * @param {object} Swizzled - Swizzled code, not used here
 * @param {function} Design - The Design constructor
 * @param {object} settings - The settings for the pattern
 * @return {object} data - The drafted pattern, along with errors and failure data
 */
export const draft = (Swizzled, Design, settings) => {
  const data = {
    // The pattern
    pattern: new Design(settings),
    // Any errors logged by the pattern
    errors: [],
    // If the pattern fails to draft, this will hold the error
    failure: false,
  }
  // Draft the pattern or die trying
  try {
    data.pattern.draft()
    data.errors.push(...data.pattern.store.logs.error)
    for (const store of data.pattern.setStores) data.errors.push(...store.logs.error)
  } catch (error) {
    data.failure = error
  }

  return data
}
