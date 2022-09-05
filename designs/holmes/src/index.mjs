import { Design } from '@freesewing/core'
import { data } from '../data.mjs'

// Parts
import { gore } from './gore.mjs'
import { visor } from './visor.mjs'
import { ear } from './ear.mjs'

// Create new design
const Holmes = new Design({
  data,
  parts: [ gore, visor, ear ],
})

// Named exports
export { gore, visor, ear, Holmes }
