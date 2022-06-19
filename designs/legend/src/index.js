import freesewing from '@freesewing/core'
import plugins from '@freesewing/plugin-bundle'
import buttonsPlugin from '@freesewing/plugin-buttons'
import config from '../config/'
// Notation examples
import draftFabricLines from './fabriclines'
import draftSaLines from './salines'
import draftOtherLines from './otherlines'
import draftSa from './sa'
import draftNotches from './notches'
import draftButtons from './buttons'
import draftSnaps from './snaps'
import draftLogo from './logo'
import draftCutonfold from './cutonfold'
import draftGrainline from './grainline'
import draftDimension from './dimension'
import draftTitle from './title'
import draftScalebox from './scalebox'
import draftLineWidths from './linewidths'
import draftLineStrokes from './linestrokes'
import draftSizes from './sizes'

// Create design
const Legend = new freesewing.Design(config, [plugins, buttonsPlugin])

// Attach draft methods to prototype
const methods = {
  draftFabricLines,
  draftSaLines,
  draftOtherLines,
  draftSa,
  draftLogo,
  draftButtons,
  draftSnaps,
  draftNotches,
  draftCutonfold,
  draftGrainline,
  draftDimension,
  draftTitle,
  draftScalebox,
  draftLineWidths,
  draftLineStrokes,
  draftSizes,
}

for (const m of Object.keys(methods)) Legend.prototype[m] = methods[m]

// Named exports
export { config, Legend }

// Default export
export default Legend
