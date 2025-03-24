import { Design } from '@freesewing/core'
import { i18n } from '../i18n/index.mjs'
import { data } from '../data.mjs'
// Parts
import { base } from './base.mjs'
import { back } from './back.mjs'
import { backYoke } from './backyoke.mjs'
import { front } from './front.mjs'
import { frontYoke } from './frontyoke.mjs'

// Create new design
const Devon = new Design({
  data,
  parts: [base, back, backYoke, front, frontYoke],
})

// Named exports
export { base, back, backYoke, front, frontYoke, i18n, Devon }

// http://localhost:8000/new/devon#view=%22inspect%22&settings=%7B%22measurements%22%3A%7B%22biceps%22%3A349.25%2C%22chest%22%3A1075%2C%22hpsToBust%22%3A295%2C%22hpsToWaistBack%22%3A470%2C%22neck%22%3A405%2C%22shoulderToShoulder%22%3A395%2C%22shoulderSlope%22%3A13%2C%22waistToArmpit%22%3A260%2C%22waistToHips%22%3A90%2C%22shoulderToWrist%22%3A600%2C%22wrist%22%3A195%2C%22highBust%22%3A1050%7D%2C%22units%22%3A%22metric%22%2C%22metadata%22%3A%7B%22setName%22%3A%22WvW+2025%22%7D%2C%22only%22%3A%5B%22brian.front%22%2C%22brian.back%22%5D%7D
