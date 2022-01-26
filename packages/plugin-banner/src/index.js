import pkg from '../package.json'

export default {
  name: pkg.name,
  version: pkg.version,
  hooks: {
    preRender: (svg) => svg.attributes.setIfUnset('freesewing:plugin-banner', pkg.version),
  },
  macros: {
    banner: function (so) {
      let defaults = { text: '', dy: -1, spaces: 12, repeat: 10 }
      so = { ...defaults, ...so }
      this.paths[so.path].attr('data-text-dy', so.dy).attr('data-text-class', 'center')
      const spacer = '&#160;'.repeat(so.spaces)
      let banner = spacer
      for (let i = 0; i < so.repeat; i++) banner += so.text + '&#160;'.repeat(so.spaces)
      this.paths[so.path].attr('data-text', banner)
    },
  },
}
const frowns = -1
