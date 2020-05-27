import freesewing from '@freesewing/core'
import plugins from '@freesewing/plugin-bundle'
import config from '../config'
import draftFront from './front'
import draftBack from './back'
import draftExtra from './extra'
import draftAlineback from './alineback'
import draftAlinefront from './alinefront'
import draftBasicback from './basicback'
import draftBasicfront from './basicfront'
import draftWaistband from './waistband'
import draftPanelfront from './panelfront'
import draftFlaredpanel from './flaredpanel'
import draftGodetback from './godetback'
import draftGodetfront from './godetfront'
import draftGodet from './godet'
import draftTwistedpanel from './twistedpanel'
import draftDiagonalpanel from './diagonalpanel'
import draftBasicsingledartedback from './basicsingledartedback'
import draftBasicsingledartedfront from './basicsingledartedfront'
import draftPencilgatherpanelback from './pencilgatherpanelback'
import draftPencilgatherpanelfront from './pencilgatherpanelfront'
import draftMermaidfront from './mermaidfront'
import draftMermaidback from './mermaidback'

// Create new design
const Pattern = new freesewing.Design(config, plugins)

// Attach the draft methods to the prototype
Pattern.prototype.draftFront = draftFront
Pattern.prototype.draftBack = draftBack
Pattern.prototype.draftExtra = draftExtra
Pattern.prototype.draftAlineback = draftAlineback
Pattern.prototype.draftAlinefront = draftAlinefront
Pattern.prototype.draftBasicback = draftBasicback
Pattern.prototype.draftBasicfront = draftBasicfront
Pattern.prototype.draftWaistband = draftWaistband
Pattern.prototype.draftPanelfront = draftPanelfront
Pattern.prototype.draftFlaredpanel = draftFlaredpanel
Pattern.prototype.draftGodetback = draftGodetback
Pattern.prototype.draftGodetfront = draftGodetfront
Pattern.prototype.draftGodet = draftGodet
Pattern.prototype.draftTwistedpanel = draftTwistedpanel
Pattern.prototype.draftDiagonalpanel = draftDiagonalpanel
Pattern.prototype.draftBasicsingledartedback = draftBasicsingledartedback
Pattern.prototype.draftBasicsingledartedfront = draftBasicsingledartedfront
Pattern.prototype.draftPencilgatherpanelback = draftPencilgatherpanelback
Pattern.prototype.draftPencilgatherpanelfront = draftPencilgatherpanelfront
Pattern.prototype.draftMermaidback = draftMermaidback
Pattern.prototype.draftMermaidfront = draftMermaidfront

export default Pattern
