import pkg from '../package.json'

import Dxf from './dxf'

export default {
  name: pkg.name,
  version: pkg.version,
  hooks: {
    preRender: (svg) => svg.attributes.setIfUnset('freesewing:plugin-export-dxf', pkg.version),
    postDraft: (pattern, config = { precision: 1 }) => {
      pattern.exportDxf = () => new Dxf(config).render(pattern)
    },
  },
}
