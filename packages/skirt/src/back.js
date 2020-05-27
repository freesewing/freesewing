import Aline from './alineback'
import Basic from './basicback'
import Wrapup from './alineback'
import Godet from './godetback'
import Noback from './noback'
import Basicsingledarted from './basicsingledartedback'
import Pencilgatherpanel from './pencilgatherpanelback'
import Mermaid from './mermaidback'

export default part => {
  let { store, options } = part.shorthand()

  if (options.skirttype === 'aline') return Aline(part)
    else if(options.skirttype === 'basic')  return Basic(part)
      else if(options.skirttype === 'wrapup') return Wrapup(part)
        else if(options.skirttype === 'godet') return Godet(part)
          else if(options.skirttype === 'panel') return Noback(part)
            else if(options.skirttype === 'panelflared') return Noback(part)
              else if(options.skirttype === 'paneltwisted') return Noback(part)
                else if(options.skirttype === 'paneldiagonal') return Noback(part)
                  else if(options.skirttype === 'basicsingledarted')  return Basicsingledarted(part)
                    else if(options.skirttype === 'pencilgatherpanel')  return Pencilgatherpanel(part)
                      else if(options.skirttype === 'mermaid')  return Mermaid(part)
          
}
