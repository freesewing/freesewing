import { expect } from 'chai'

/*
 * This runs unit tests for the plugin configuration
 * It expects the following:
 *
 * @param object plugin: The plugin object
 */
export const sharedPluginTests = (plugin) => {
  describe('Shared Plugin Tests', () => {
    it('Should have a name property', () => {
      expect(typeof plugin.name).to.equal('string')
      expect(plugin.name.length).to.be.greaterThan(2)
    })
    it('Should have a version property', () => {
      expect(typeof plugin.version).to.equal('string')
      expect(plugin.version.length).to.be.greaterThan(2)
    })
    it('Version should be a proper semantic version', () => {
      const chunks = plugin.version.split('.')
      if (chunks.length > 3) {
        expect(plugin.version.split('.').length).to.equal(4)
        expect(chunks[2]).to.contain.oneOf(['-alpha', '-beta', '-rc'])
      } else expect(plugin.version.split('.').length).to.equal(3)
    })
  })
}
