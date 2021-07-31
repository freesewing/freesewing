import { version, name } from '../package.json'

const notches =
  '<g id="notch"><circle cy="0" cx="0" r="1.4" fill="currentColor" stroke="none"/><circle cy="0" cx="0" r="2.8" fill="none" stroke="currentColor"/></g><g id="bnotch"><path d="M -1.1 -1.1 L 1.1 1.1 M 1.1 -1.1 L -1.1 1.1" fill="none" stroke="currentColor" /><circle cy="0" cx="0" r="2.8" fill="none" stroke="currentColor" /></g>'

export default {
  name: name,
  version: version,
  hooks: {
    preRender: function (svg) {
      if (svg.attributes.get('freesewing:plugin-notches') === false) {
        svg.defs += notches
        svg.attributes.add('freesewing:plugin-notches', version)
      }
    },
  },
}
