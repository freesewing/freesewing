import { name, version } from '../package.json'

export const plugin = {
  name,
  version,
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

// More specifically named exports
export const sprinklePlugin = plugin
export const pluginSprinkle = plugin

