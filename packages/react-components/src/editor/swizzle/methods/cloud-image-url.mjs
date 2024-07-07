/*
 * Returns the URL of a cloud-hosted image (cloudflare in this case) based on the ID and Variant
 * @param {object} Swizzled - Swizzled code, not used here
 */
export const cloudImageUrl = (Swizzled, { id = 'default-avatar', variant = 'public' }) => {
  /*
   * Return something default so that people will actually change it
   */
  if (!id || id === 'default-avatar') return Swizzled.config.cloudImageDflt

  /*
   * If the variant is invalid, set it to the smallest thumbnail so
   * people don't load enourmous images by accident
   */
  if (!Swizzled.config.cloudImageVariants.includes(variant)) variant = 'sq100'

  return `${Swizzled.config.cloudImageUrl}${id}/${variant}`
}
