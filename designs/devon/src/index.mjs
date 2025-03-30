import { Design } from '@freesewing/core'
import { i18n } from '../i18n/index.mjs'
import { data } from '../data.mjs'
// Parts
import { base } from './base.mjs'
import { back } from './back.mjs'
import { backPanel } from './backpanel.mjs'
import { backSide } from './backside.mjs'
import { backYoke } from './backyoke.mjs'
import { collar } from './collar.mjs'
import { cuff } from './cuff.mjs'
import { front } from './front.mjs'
import { frontFacing } from './frontfacing.mjs'
import { frontInside } from './frontinside.mjs'
import { frontPanel } from './frontpanel.mjs'
import { frontSidePanel } from './frontsidepanel.mjs'
import { frontYoke } from './frontyoke.mjs'
import { pocket } from './pocket.mjs'
import { pocketflap } from './pocketflap.mjs'
import { sleeve } from './sleeve.mjs'
import { topSleeve } from './topsleeve.mjs'
import { underSleeve } from './undersleeve.mjs'
import { sleeveAlternative } from './sleeveAlternative.mjs'
import { waistband } from './waistband.mjs'

// Create new design
const Devon = new Design({
  data,
  parts: [
    base,
    back,
    backPanel,
    backSide,
    backYoke,
    collar,
    cuff,
    front,
    frontFacing,
    frontYoke,
    frontSidePanel,
    frontPanel,
    frontInside,
    pocket,
    pocketflap,
    sleeve,
    topSleeve,
    underSleeve,
    sleeveAlternative,
    waistband,
  ],
})

// Named exports
export {
  base,
  back,
  backPanel,
  backSide,
  backYoke,
  collar,
  cuff,
  front,
  frontFacing,
  frontInside,
  frontPanel,
  frontSidePanel,
  frontYoke,
  pocket,
  pocketflap,
  sleeve,
  topSleeve,
  underSleeve,
  sleeveAlternative,
  waistband,
  i18n,
  Devon,
}

// http://localhost:8000/new/devon#view=%22inspect%22&settings=%7B%22measurements%22%3A%7B%22biceps%22%3A349.25%2C%22chest%22%3A1075%2C%22hpsToBust%22%3A295%2C%22hpsToWaistBack%22%3A470%2C%22neck%22%3A405%2C%22shoulderToShoulder%22%3A395%2C%22shoulderSlope%22%3A13%2C%22waistToArmpit%22%3A260%2C%22waistToHips%22%3A90%2C%22shoulderToWrist%22%3A600%2C%22wrist%22%3A195%2C%22highBust%22%3A1050%7D%2C%22units%22%3A%22metric%22%2C%22metadata%22%3A%7B%22setName%22%3A%22WvW+2025%22%7D%2C%22only%22%3A%5B%22brian.front%22%2C%22brian.back%22%5D%7D
//http://localhost:8000/new/devon#view=%22inspect%22&settings=%7B%22measurements%22%3A%7B%22biceps%22%3A349.25%2C%22chest%22%3A1075%2C%22hpsToBust%22%3A295%2C%22hpsToWaistBack%22%3A470%2C%22neck%22%3A405%2C%22shoulderToShoulder%22%3A395%2C%22shoulderSlope%22%3A13%2C%22waistToArmpit%22%3A260%2C%22waistToHips%22%3A90%2C%22shoulderToWrist%22%3A600%2C%22wrist%22%3A195%2C%22highBust%22%3A1050%2C%22hips%22%3A920%2C%22seat%22%3A980%2C%22seatBack%22%3A520%2C%22seatFront%22%3A460%2C%22waist%22%3A930%2C%22waistBack%22%3A470%2C%22waistFront%22%3A460%2C%22shoulderToElbow%22%3A394%7D%2C%22units%22%3A%22metric%22%2C%22metadata%22%3A%7B%22setName%22%3A%22WvW+2025%22%7D%2C%22options%22%3A%7B%22armholeDepth%22%3A0.1%7D%2C%22only%22%3A%5B%22devon.sleeve%22%5D%7D

// http://localhost:8000/new/devon#view=%22inspect%22&settings=%7B%22measurements%22%3A%7B%22biceps%22%3A349.25%2C%22chest%22%3A1075%2C%22hpsToBust%22%3A295%2C%22hpsToWaistBack%22%3A470%2C%22neck%22%3A405%2C%22shoulderToShoulder%22%3A395%2C%22shoulderSlope%22%3A13%2C%22waistToArmpit%22%3A260%2C%22waistToHips%22%3A90%2C%22shoulderToWrist%22%3A600%2C%22wrist%22%3A195%2C%22highBust%22%3A1050%7D%2C%22units%22%3A%22metric%22%2C%22metadata%22%3A%7B%22setName%22%3A%22WvW+2025%22%7D%2C%22only%22%3A%5B%22devon.front%22%2C%22devon.back%22%2C%22devon.base%22%2C%22devon.frontYoke%22%2C%22devon.backYoke%22%5D%2C%22options%22%3A%7B%22draftForHighBust%22%3Atrue%2C%22shoulderEase%22%3A0.06%7D%7D
//http://localhost:8000/new/devon#view=%22inspect%22&settings=%7B%22measurements%22%3A%7B%22biceps%22%3A340%2C%22chest%22%3A1060%2C%22hpsToBust%22%3A330%2C%22hpsToWaistBack%22%3A400%2C%22neck%22%3A350%2C%22shoulderToShoulder%22%3A360%2C%22shoulderSlope%22%3A14%2C%22waistToArmpit%22%3A190%2C%22waistToHips%22%3A120%2C%22shoulderToWrist%22%3A600%2C%22wrist%22%3A195%2C%22highBust%22%3A970%2C%22hips%22%3A1020%2C%22seat%22%3A1120%2C%22seatBack%22%3A590%2C%22seatFront%22%3A530%2C%22waist%22%3A880%2C%22waistBack%22%3A400%2C%22waistFront%22%3A480%2C%22shoulderToElbow%22%3A350%7D%2C%22units%22%3A%22metric%22%2C%22metadata%22%3A%7B%22setName%22%3A%22WvW+2025%22%7D%2C%22options%22%3A%7B%22draftForHighBust%22%3Atrue%2C%22lengthBonus%22%3A0.2%2C%22bicepsEase%22%3A0.08%7D%2C%22only%22%3A%5B%22devon.sleeve%22%5D%7D
