import freesewing from '@freesewing/core'
import plugins from '@freesewing/plugin-bundle'
import config from '../config'
import draftBib from './bib'
// Intermediate steps for tutorial
import draftStep1 from './step1'
import draftStep2 from './step2'
import draftStep3 from './step3'
import draftStep4 from './step4'
import draftStep5 from './step5'
import draftStep6 from './step6'
import draftStep7 from './step7'
import draftStep8 from './step8'
import draftStep9 from './step9'
import draftStep10 from './step10'
import draftStep11 from './step11'

// Create new design
const Tutorial = new freesewing.Design(config, plugins)

// Attach the draft methods to the prototype
Tutorial.prototype.draftBib = draftBib
Tutorial.prototype.draftStep1 = draftStep1
Tutorial.prototype.draftStep2 = draftStep2
Tutorial.prototype.draftStep3 = draftStep3
Tutorial.prototype.draftStep4 = draftStep4
Tutorial.prototype.draftStep5 = draftStep5
Tutorial.prototype.draftStep6 = draftStep6
Tutorial.prototype.draftStep7 = draftStep7
Tutorial.prototype.draftStep8 = draftStep8
Tutorial.prototype.draftStep9 = draftStep9
Tutorial.prototype.draftStep10 = draftStep10
Tutorial.prototype.draftStep11 = draftStep11

// Named exports
export { config, Tutorial }

// Default export
export default Tutorial
