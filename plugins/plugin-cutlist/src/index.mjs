import { name, version } from '../data.mjs'
import { Point } from '@freesewing/core'

export const plugin = {
  name,
  version,
  store: [
    ['addCut', addCut],
    ['removeCut', removeCut],
    ['setGrain', setGrain],
    ['setCutOnFold', setCutOnFold],
  ],
}

// More specifically named exports
export const cutlistPlugin = plugin
export const pluginCutlist = plugin

/**
 * Add a set of cutting instructions for the part
 * @param {Store} store                   the Store
 * @param {string} partName               the name of the part
 * @param {Object} so                     a set of cutting instructions for a material
 * @param {number} so.cut = 2             the number of pieces to cut from the specified fabric
 * @param {string} so.material = fabric   the name of the material to cut from
 * @param {boolean} so.identical = false  should even numbers of pieces be cut in the same direction or mirrored
 * @param {boolean} so.bias = false       should the pieces in these cutting instructions be cut on the bias
 * @param {boolean} so.ignoreOnFold       should these cutting instructions ignore any cutOnFold information set by the part
 */
function addCut(store, partName, so = {}) {
  const { cut = 2, material = 'fabric', identical = false, bias = false, ignoreOnFold = false } = so
  if (cut === false) {
    if (material === false) store.unset(['cutlist', partName, 'materials'])
    else store.unset(['cutlist', partName, 'materials', material])
    return store
  }
  if (!(Number.isInteger(cut) && cut > -1)) {
    store.log.error(`Tried to set cut to a value that is not a positive integer`)
    return store
  }
  if (typeof material !== 'string') {
    store.log.warning(`Tried to set material to a value that is not a string`)
    return store
  }
  const path = ['cutlist', partName, 'materials', material]
  const existing = store.get(path) || []
  store.set(path, existing.concat({ cut, identical, bias, ignoreOnFold }))

  return store
}

/** Method to remove the cut info */
function removeCut(store, partName, material = false) {
  return addCut(store, partName, { cut: false, material })
}

/** Method to add the grain info */
function setGrain(store, partName, grain = false) {
  const path = ['cutlist', partName, 'grain']
  if (grain === false) return store.unset(path)
  if (typeof grain !== 'number') {
    store.log.error('Called part.setGrain() with a value that is not a number')
    return store
  }
  return store.set(path, grain)
}

/** Method to add the cutOnFold info */
function setCutOnFold(store, partName, p1, p2) {
  const path = ['cutlist', partName, 'cutOnFold']
  if (p1 === false && typeof p2 === 'undefined') {
    return store.unset(path)
  }
  if (p1 instanceof Point && p2 instanceof Point) {
    store.set(path, [p1, p2])
  } else
    store.log.error('Called part.setCutOnFold() but at least one parameter is not a Point instance')

  return store
}
