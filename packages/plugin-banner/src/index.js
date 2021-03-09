import { name, version } from '../package.json'

export default {
  name: name,
  version: version,
  hooks: {
    preRender: function (svg) {
      if (svg.attributes.get('freesewing:plugin-banner') === false)
        svg.attributes.set('freesewing:plugin-banner', version)
    }
  },
  macros: {
    banner: function (so) {
      let defaults = { text: [], dy: -1, spaces: 8, repeat: 25 }
      so = { ...defaults, ...so }
      this.paths[so.path].attr('data-text-dy', so.dy).attr('data-text-class', 'center')
      for (let i = 0; i < so.repeat; i++) {
        for (let t of so.text) this.paths[so.path].attr('data-text', t)
        this.paths[so.path].attr('data-text', '&#160;'.repeat(so.spaces))
      }
    }
  }
}
