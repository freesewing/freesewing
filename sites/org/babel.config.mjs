import docusaurusPreset from '@docusaurus/core/lib/babel/preset.js'
import importAttributesPlugin from '@babel/plugin-syntax-import-attributes'

export default {
  presets: [docusaurusPreset],
  plugins: [importAttributesPlugin],
}
