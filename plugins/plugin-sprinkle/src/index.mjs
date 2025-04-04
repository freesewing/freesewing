import about from '../about.json' with { type: 'json' }

export const plugin = {
  ...about,
  macros: {
    sprinkle: function (so, { snippets, Snippet, points }) {
      for (let pid of so.on) {
        snippets[pid + '-' + so.snippet] = new Snippet(so.snippet, points[pid])
        if (so.scale) snippets[pid + '-' + so.snippet].attr('data-scale', so.scale)
        if (so.rotate) snippets[pid + '-' + so.snippet].attr('data-rotate', so.rotate)
      }
    },
  },
}

// More specifically named exports
export const sprinklePlugin = plugin
export const pluginSprinkle = plugin
