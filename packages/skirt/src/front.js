import Aline from './alinefront'
import Basic from './basicfront'
import Panel from './panelfront'
import Wrapup from './wrapupfront'
import Panelflared from './flaredpanel'
import Godet from './godetfront'
import Paneltwisted from './twistedpanel'
import Paneldiagonal from './diagonalpanel'
import Basicsingledarted from './basicsingledartedfront'
import Pencilgatherpanel from './pencilgatherpanelfront'
import Mermaid from './mermaidfront'

export default part => {
  let { store, options } = part.shorthand()

  if (options.skirttype === 'aline') return Aline(part)
    else if(options.skirttype === 'basic')  return Basic(part)
      else if(options.skirttype === 'panel') return Panel(part)
        else if(options.skirttype === 'wrapup') return Wrapup(part)
          else if(options.skirttype === 'panelflared') return Panelflared(part)
            else if(options.skirttype === 'godet') return Godet(part)
              else if(options.skirttype === 'paneltwisted') return Paneltwisted(part)
                else if(options.skirttype === 'paneldiagonal') return Paneldiagonal(part)
                  else if(options.skirttype === 'basicsingledarted')  return Basicsingledarted(part)
                    else if(options.skirttype === 'pencilgatherpanel')  return Pencilgatherpanel(part)
                      else if(options.skirttype === 'mermaid')  return Mermaid(part)


}
