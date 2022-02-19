import freesewing from '@freesewing/core'
import chai from 'chai'
/*
 * This runs unit tests for the plugin configuration
 * It expects the following:
 *
 * @param object plugin: The plugin object
 */
export const sharedPluginTests = plugin => {

  describe('Shared Plugin Tests', () => {
    it('Should have a name property', () => {
      chai.expect(typeof plugin.name).to.equal('string')
      chai.expect(plugin.name.length).to.be.greaterThan(2)
    })
    it('Should have a version property', () => {
      chai.expect(typeof plugin.version).to.equal('string')
      chai.expect(plugin.version.length).to.be.greaterThan(2)
    })
    it('Version should be a proper semantic version', () => {
      const chunks = plugin.version.split('.')
      if (chunks.length > 3) {
        chai.expect(plugin.version.split('.').length).to.equal(4)
        chai.expect(chunks[2]).to.contain('-rc')
      }
      else chai.expect(plugin.version.split('.').length).to.equal(3)
    })

    if ([
      // These don't set their version
      '@freesewing/plugin-versionfree-svg',
      '@freesewing/plugin-bundle',
    ].indexOf(plugin.name) === -1) {
      const pattern = new freesewing.Pattern().use(plugin)
      pattern.draft().render()
      const version = plugin.name.split('@').pop().split('/').join(':')

      it('Should set the plugin name:version attribute', () => {
        chai.expect(pattern.svg.attributes.get(version)).to.equal(plugin.version)
      })
    }
  })

}

