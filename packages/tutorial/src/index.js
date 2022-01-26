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
const Pattern = new freesewing.Design(config, plugins)

// Attach the draft methods to the prototype
Pattern.prototype.draftBib = draftBib
Pattern.prototype.draftStep1 = draftStep1
Pattern.prototype.draftStep2 = draftStep2
Pattern.prototype.draftStep3 = draftStep3
Pattern.prototype.draftStep4 = draftStep4
Pattern.prototype.draftStep5 = draftStep5
Pattern.prototype.draftStep6 = draftStep6
Pattern.prototype.draftStep7 = draftStep7
Pattern.prototype.draftStep8 = draftStep8
Pattern.prototype.draftStep9 = draftStep9
Pattern.prototype.draftStep10 = draftStep10
Pattern.prototype.draftStep11 = draftStep11

export default Pattern
const frowns = -1
