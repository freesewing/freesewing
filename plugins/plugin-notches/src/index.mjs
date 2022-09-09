import { name, version } from '../data.mjs'

const notches = `
<g id="notch">
  <circle cy="0" cx="0" r="1.4" class="fill-note" />
  <circle cy="0" cx="0" r="2.8" class="note" />
</g>
<g id="bnotch">
  <path d="M -1.1 -1.1 L 1.1 1.1 M 1.1 -1.1 L -1.1 1.1" class="note" />
  <circle cy="0" cx="0" r="2.8" class="note" />
</g>`

export const plugin = {
  name,
  version,
  hooks: {
    preRender: function (svg) {
      if (svg.defs.indexOf(`id="notch"`) === -1) svg.defs += notches
    },
  },
}

// More specifically named exports
export const notchesPlugin = plugin
export const pluginNotches = plugin

