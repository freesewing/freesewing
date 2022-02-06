import pkg from '../package.json'

const err = 'FIXME: plugin-validate is not updated for recent core versions'
export default {
  name: pkg.name,
  version: pkg.version,
  hooks: {
    preRender: (svg) => svg.attributes.setIfUnset('freesewing:plugin-validate', pkg.version),
    preDraft: (pattern) => console.log(err),
    postDraft: (pattern) => console.log(err),
  },
}
