import { name, version } from '../package.json'

export default {
  name: name,
  version: version,
  hooks: {
    preRender: function (svg) {
      if (svg.attributes.get('freesewing:plugin-sprinkle') === false)
        svg.attributes.set('freesewing:plugin-sprinkle', version)
    }
  },
  macros: {
    sprinkle: function (so) {
      for (let pid of so.on)
        this.snippets[pid + '-' + so.snippet] = new this.Snippet(so.snippet, this.points[pid])
    }
  }
}
