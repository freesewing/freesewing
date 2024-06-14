/*
 * Returns the URL of a cloud-hosted image (cloudflare in this case) based on the ID and Variant
 */
export const cloudImageUrl = (methods, { id = 'default-avatar', variant = 'public' }) => {
  const config = methods.getConfig()
  /*
   * Return something default so that people will actually change it
   */
  if (!id || id === 'default-avatar') return config.cloudImageDflt

  /*
   * If the variant is invalid, set it to the smallest thumbnail so
   * people don't load enourmous images by accident
   */
  if (!config.cloudImageVariants.includes(variant)) variant = 'sq100'

  return `${config.cloudImageUrl}${id}/${variant}`
}
