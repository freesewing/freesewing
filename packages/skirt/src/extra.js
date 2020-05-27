import Panel from './waistband'
import Godet from './godet'
import Noextra from './noextra'


export default part => {
    let { store, options } = part.shorthand()
  
    if (options.skirttype === 'godet') return Godet(part)
        else if(options.skirttype === 'panel') return Panel(part)
            else if(options.skirttype === 'panelflared') return Panel(part)
                else if(options.skirttype === 'paneltwisted') return Panel(part)
                    else if(options.skirttype === 'aline') return Noextra(part)
                        else if(options.skirttype === 'basic')  return Noextra(part)
                            else if(options.skirttype === 'wrapup') return Noextra(part)
                                else if(options.skirttype === 'paneldiagonal') return Panel(part)
                                    else if(options.skirttype === 'basicsingledarted')  return Noextra(part)
                                        else if(options.skirttype === 'basicsingledarted')  return Noextra(part)
                                            else if(options.skirttype === 'pencilgatherpanel')  return Noextra(part)
                                                else if(options.skirttype === 'mermaid')  return Noextra(part)

         
  }
  