export const cutlistStores = [
  ['cutlist.addCut', addCut],
  ['cutlist.setCut', setCut],
  ['cutlist.removeCut', removeCut],
  ['cutlist.setGrain', setGrain],
  ['cutlist.setCutOnFold', setCutOnFold],
  ['cutlist.getCutFabrics', getCutFabrics],
]

export const cutlistHooks = {
  prePartDraft: [
    function (pattern) {
      const injectedPart = pattern.config.inject[pattern.activePart]
      if (!injectedPart) return

      const store = pattern.setStores[pattern.activeSet]
      const injectedCutlist = store.get(['cutlist', injectedPart], {})
      store.set(['cutlist', pattern.activePart], { ...injectedCutlist })
    },
  ],
}

/**
 * Add a set of cutting instructions for the part
 * @param {Store} store                   the Store
 * @param {Object} so                     a set of cutting instructions for a material
 * @param {number} so.cut = 2             the number of pieces to cut from the specified fabric
 * @param {string} so.from = fabric       the name of the material to cut from
 * @param {boolean} so.identical = false  should even numbers of pieces be cut in the same direction or mirrored
 * @param {boolean} so.onBias = false     should the pieces in these cutting instructions be cut on the bias
 * @param {boolean} so.onFold = false     should these cutting instructions ignore any cutOnFold information set by the part
 */
function addCut(store, so = {}) {
  if (Array.isArray(so)) {
    for (const cut of so) addCut(store, cut)
    return store
  }
  const { cut = 2, from = 'fabric', identical = false, onBias = false, onFold = false } = so

  const partName = store.get('activePart')
  if (cut === false) {
    if (from === false) store.unset(['cutlist', partName, 'materials'])
    else store.unset(['cutlist', partName, 'materials', from])
    return store
  }
  if (!(Number.isInteger(cut) && cut > -1)) {
    store.log.error(`Tried to set cut to a value that is not a positive integer`)
    return store
  }
  if (typeof from !== 'string') {
    store.log.warn(`Tried to set material to a value that is not a string`)
    return store
  }
  const path = ['cutlist', partName, 'materials', from]
  const existing = store.get(path, [])
  store.set(path, existing.concat({ cut, identical, onBias, onFold }))

  return store
}

/** Method to remove the cut info */
function removeCut(store, from = false) {
  return addCut(store, { cut: false, from })
}

/** Method to set (remove + add) the cut info */
function setCut(store, so) {
  removeCut(store)
  return addCut(store, so)
}

/** Method to add the grain info (called by grainline and cutonfold macros) */
function setGrain(store, grain = false) {
  const partName = store.get('activePart')
  const path = ['cutlist', partName, 'grain']
  if (grain === false) return store.unset(path)
  if (typeof grain !== 'number') {
    store.log.error('Called part.setGrain() with a value that is not a number')
    return store
  }
  return store.set(path, grain)
}

/** Method to add the cutOnFold info (called by cutonfold macro)  */
function setCutOnFold(store, p1, p2) {
  const partName = store.get('activePart')
  const path = ['cutlist', partName, 'cutOnFold']
  if (p1 === false && typeof p2 === 'undefined') {
    return store.unset(path)
  }
  if (!isNaN(p1.x) && !isNaN(p1.y) && !isNaN(p2.x) && !isNaN(p2.y)) {
    store.set(path, [p1, p2])
  } else
    store.log.error('Called part.setCutOnFold() but at least one parameter is not a Point instance')

  return store
}

/** Get a list of fabrics used by the pattern for the given settings */
function getCutFabrics(store, settings) {
  const cutlist = store.get('cutlist')
  const list = settings.only ? [].concat(settings.only) : Object.keys(cutlist)

  const fabrics = []
  list.forEach((partName) => {
    if (!cutlist[partName]?.materials) {
      return
    }
    for (var m in cutlist[partName].materials) {
      if (!fabrics.includes(m)) fabrics.push(m)
    }
  })

  return fabrics
}
