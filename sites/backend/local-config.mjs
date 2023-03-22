/*
 * This method allows you to change/override the backend config
 *
 * It takes the initial (base) config object.
 * It must return the (modified) config object.
 *
 * Note that you can configure a lot via environment variables
 * but if you prefer to keep certain aspects of the config in
 * code, you can override this file.
 *
 * If you're running this in Docker, you can volume-mount only this file.
 * This gives you full control over the container configuration.
 */
export function postConfig(config) {
  return config
}
