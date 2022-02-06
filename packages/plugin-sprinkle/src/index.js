import pkg from '../package.json'

export default {
  name: pkg.name,
  version: pkg.version,
  hooks: {
    preRender: (svg) => svg.attributes.setIfUnset('freesewing:plugin-sprinkle', pkg.version),
  },
  macros: {
    sprinkle: function (so) {
      for (let pid of so.on) {
        this.snippets[pid + '-' + so.snippet] = new this.Snippet(so.snippet, this.points[pid])
        if (so.scale) this.snippets[pid + '-' + so.snippet].attr('data-scale', so.scale)
        if (so.rotate) this.snippets[pid + '-' + so.snippet].attr('data-rotate', so.rotate)
      }
    },
  },
}
