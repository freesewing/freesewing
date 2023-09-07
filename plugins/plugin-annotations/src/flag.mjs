const storeRoot = ['plugins', 'plugin-annotations', 'flags']

// This is also the order in which they will be displayed
export const flagTypes = ['error', 'warn', 'note', 'info', 'tip', 'fixme']

export const flagStores = [
  ['flag.info', (store, data) => flag('info', store, data)],
  ['flag.tip', (store, data) => flag('tip', store, data)],
  ['flag.note', (store, data) => flag('note', store, data)],
  ['flag.warn', (store, data) => flag('warn', store, data)],
  ['flag.fixme', (store, data) => flag('fixme', store, data)],
  ['flag.error', (store, data) => flag('error', store, data)],
  ['flag.preset', (store, preset) => flag('preset', store, preset)],
  ['unflag.info', (store, id) => unflag('info', store, id)],
  ['unflag.tip', (store, id) => unflag('tip', store, id)],
  ['unflag.note', (store, id) => unflag('note', store, id)],
  ['unflag.warn', (store, id) => unflag('warn', store, id)],
  ['unflag.fixme', (store, id) => unflag('fixme', store, id)],
  ['unflag.error', (store, id) => unflag('error', store, id)],
  ['unflag.preset', (store, preset) => unflag('preset', store, preset)],
]

/*
 * Method that adds a flag to the store
 *
 * @param {type} string - The type of flag
 * @param {store} object - The pattern store
 * @param {data} object - The flag data
 */
function flag(type, store, data) {
  // Load presets
  if (type === 'preset' && presets[data]) {
    data = presets[data]
    type = data.type
  }

  if (!data.id && !data.msg) {
    store.log.warning(`store.flag.${type} called without an id or msg property`)
    console.log(data)
    return
  }

  store.set([...storeRoot, type, data.id ? data.id : data.msg], data)
}

/*
 * Method that removes a flag from the store
 *
 * @param {type} string - The type of flag
 * @param {store} object - The pattern store
 * @param {id} string - The flag id to remove
 */
function unflag(type, store, id) {
  if (type === 'preset' && presets[preset]) {
    id = presets[preset].id || presets[preset].msg
    type = presets[preset].type
  }
  store.unset([...storeRoot, type, id])
}

/*
 * Available flag presets
 */
const presets = {
  expand: {
    type: 'tip',
    msg: 'flag:expandIsOff',
    suggest: {
      text: 'flag:enable',
      icon: 'expand',
      update: {
        settings: ['expand', 1],
      },
    },
  },
}
