import { version, name } from '../package.json'

export default {
  name: name,
  version: version,
  hooks: {
    preRender: function (svg, attributes) {
      if (svg.attributes.get('freesewing:plugin-svgattr') === false) {
        for (let key of Object.keys(attributes)) svg.attributes.add(key, attributes[key])
        svg.attributes.add('freesewing:plugin-svgattr', version)
      }
    }
  }
}
