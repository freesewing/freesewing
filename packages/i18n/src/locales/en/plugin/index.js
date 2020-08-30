import brian from './patterns/brian.yaml'
import aaron from './patterns/aaron.yaml'
import bruce from './patterns/bruce.yaml'
import hugo from './patterns/hugo.yaml'
import simon from './patterns/simon.yaml'
import cfp from './patterns/cfp.yaml'
import cutonfold from './plugins/cutonfold.yaml'
import grainline from './plugins/grainline.yaml'
import scalebox from './plugins/scalebox.yaml'
import title from './plugins/title.yaml'

let files = {
  brian,
  aaron,
  bruce,
  hugo,
  simon,
  cfp,
  cutonfold,
  grainline,
  scalebox,
  title
}

let messages = {}

for (let file of Object.keys(files)) {
  for (let msg of Object.keys(files[file])) messages[msg] = files[file][msg]
}

export default messages
