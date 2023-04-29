import aaron from './patterns/aaron.yaml'
import brian from './patterns/brian.yaml'
import bruce from './patterns/bruce.yaml'
import cfp from './patterns/cfp.yaml'
import charlie from './patterns/charlie.yaml'
import hugo from './patterns/hugo.yaml'
import simon from './patterns/simon.yaml'
import teagan from './patterns/teagan.yaml'

import cutlist from './plugins/cutlist/yaml'
import cutonfold from './plugins/cutonfold.yaml'
import grainline from './plugins/grainline.yaml'
import scalebox from './plugins/scalebox.yaml'
import title from './plugins/title.yaml'

const files = {
  aaron,
  brian,
  bruce,
  cfp,
  charlie,
  hugo,
  simon,
  teagan,
  cutlist,
  cutonfold,
  grainline,
  scalebox,
  title,
}

const messages = {}

for (const file in files) {
  for (const [key, val] of Object.entries(files[file])) messages[key] = val
}

export default messages
