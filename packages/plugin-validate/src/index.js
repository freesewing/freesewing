import { version, name } from '../package.json'
import validate from './validate'

const err = 'FIXME: plugin-validate is not updated for recent core versions'
export default {
  name: name,
  version: version,
  hooks: {
    preRender: (svg) => svg.attributes.setIfUnset('freesewing:plugin-validate', version),
    preDraft: (pattern) => console.log(err),
    postDraft: (pattern) => console.log(err),
  },
}
