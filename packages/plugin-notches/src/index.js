import { version, name } from '../package.json'

const notches =
  '<g id="notch"><circle cy="0" cx="0" r="1.4" class="fill-note" /><circle cy="0" cx="0" r="2.8" class="note" /></g><g id="bnotch"><path d="M -1.1 -1.1 L 1.1 1.1 M 1.1 -1.1 L -1.1 1.1" class="note stroke-xl" /><circle cy="0" cx="0" r="2.8" class="note" /></g>'

export default {
  name: name,
  version: version,
  hooks: {
    preRender: function (svg) {
      if (svg.attributes.get('freesewing:plugin-notches') === false) {
        svg.defs += notches
        svg.attributes.set('freesewing:plugin-notches', version)
      }
    },
  },
}
