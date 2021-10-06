import { name, version } from '../package.json'

import Dxf from './dxf'

export default {
  name: name,
  version: version,
  hooks: {
    postDraft: (pattern, config = { precision: 1 }) => {
      pattern.exportDxf = () => new Dxf(config).render(pattern)
    },
  },
}
