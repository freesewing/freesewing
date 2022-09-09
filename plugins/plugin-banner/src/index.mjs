import { version, name } from '../data.mjs'

export const plugin = {
  name,
  version,
  macros: {
    banner: function (so) {
      const defaults = {
        text: '',
        dy: -1,
        spaces: 12,
        repeat: 10
      }
      so = { ...defaults, ...so }
      this.paths[so.path].attr('data-text-dy', so.dy).attr('data-text-class', 'center')
      const spacer = '&#160;'.repeat(so.spaces)
      let banner = spacer
      for (let i = 0; i < so.repeat; i++) banner += so.text + '&#160;'.repeat(so.spaces)
      this.paths[so.path].attr('data-text', banner)
    },
  },
}

// More specifically named exports
export const bannerPlugin = plugin
export const pluginBanner = plugin
