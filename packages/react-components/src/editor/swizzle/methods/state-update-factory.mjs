/*
 * This creates the helper object for state updates
 */
export const stateUpdateFactory = (Swizzled, setState, setEphemeralState) => ({
  /*
   * This allows raw access to the entire state object
   */
  state: (path, val) => setState((cur) => Swizzled.methods.objUpdate({ ...cur }, path, val)),
  /*
   * These hold an object, so we take a path
   */
  settings: (path = null, val = null) => {
    /*
     * This check can be removed once all code is migrated to the new editor
     */
    if (Array.isArray(path) && Array.isArray(path[0]) && val === null) {
      throw new Error(
        'Update.settings was called with an array of operations. This is no longer supported.'
      )
    }
    return setState((cur) =>
      Swizzled.methods.undoableObjUpdate(
        'settings',
        { ...cur },
        Swizzled.methods.statePrefixPath('settings', path),
        val,
        setEphemeralState
      )
    )
  },
  /*
   * Helper to restore from undo state
   * Takes the index of the undo step in the array in ephemeral state
   */
  restore: async (i, ephemeralState) => {
    console.log({ i, ephemeralState })
    setState(ephemeralState.undos[i].restore)
    setEphemeralState((cur) => {
      cur.undos = cur.undos.slice(i + 1)
      return cur
    })
  },
  /*
   * Helper to toggle SA on or off as that requires managing sa, samm, and sabool
   */
  toggleSa: () =>
    setState((cur) => {
      const sa = cur.settings?.samm || (cur.settings?.units === 'imperial' ? 15.3125 : 10)
      const restore = Swizzled.methods.cloneObject(cur)
      // This requires 3 changes
      const update = cur.settings.sabool
        ? [
            ['sabool', 0],
            ['sa', 0],
            ['samm', sa],
          ]
        : [
            ['sabool', 1],
            ['sa', sa],
            ['samm', sa],
          ]
      for (const [key, val] of update) Swizzled.methods.objUpdate(cur, `settings.${key}`, val)
      // Which we'll group as 1 undo action
      Swizzled.methods.addUndoStep(
        {
          name: 'settings',
          path: ['settings', 'sa'],
          new: cur.settings.sabool ? 0 : sa,
          old: cur.settings.sabool ? sa : 0,
        },
        restore,
        setEphemeralState
      )

      return cur
    }),
  ui: (path, val) =>
    setState((cur) =>
      Swizzled.methods.undoableObjUpdate(
        'ui',
        { ...cur },
        Swizzled.methods.statePrefixPath('ui', path),
        val,
        setEphemeralState
      )
    ),
  /*
   * These only hold a string, so we only take a value
   */
  design: (val) => setState((cur) => Swizzled.methods.objUpdate({ ...cur }, 'design', val)),
  view: (val) => {
    // Only take valid view names
    if (!Swizzled.config.views.includes(val)) return console.log('not a valid view:', val)
    setState((cur) => ({ ...cur, view: val }))
    // Also add it onto the views (history)
    setEphemeralState((cur) => {
      if (!Array.isArray(cur.views)) cur.views = []
      return { ...cur, views: [val, ...cur.views] }
    })
  },
  viewBack: () => {
    setEphemeralState((eph) => {
      if (Array.isArray(eph.views) && Swizzled.config.views.includes(eph.views[1])) {
        // Load view at the 1 position of the history
        setState((cur) => ({ ...cur, view: eph.views[1] }))
        return { ...eph, views: eph.views.slice(1) }
      }

      return eph
    })
  },
  ux: (val) => setState((cur) => Swizzled.methods.objUpdate({ ...cur }, 'ux', val)),
  clearPattern: () =>
    setState((cur) => {
      const newState = { ...cur }
      Swizzled.methods.objUpdate(newState, 'settings', { measurements: cur.settings.measurements })
      /*
       * Let's also reset the renderer to React as that feels a bit like a pattern setting even though it's UI
       */
      Swizzled.methods.objUpdate(newState, 'ui', { ...newState.ui, renderer: 'react' })
      return newState
    }),
  clearAll: () => setState(Swizzled.config.initialState),
  /*
   * These are setters for the ephemeral state which is passed down as part of the
   * state object, but is not managed in the state backend because it's ephemeral
   */
  startLoading: (id, conf = {}) =>
    setEphemeralState((cur) => {
      const newState = { ...cur }
      if (typeof newState.loading !== 'object') newState.loading = {}
      if (typeof conf.color === 'undefined') conf.color = 'info'
      newState.loading[id] = {
        msg: Swizzled.methods.t('pe:genericLoadingMsg'),
        ...conf,
      }
      return newState
    }),
  stopLoading: (id) =>
    setEphemeralState((cur) => {
      const newState = { ...cur }
      if (typeof newState.loading[id] !== 'undefined') delete newState.loading[id]
      return newState
    }),
  clearLoading: (id) => setEphemeralState((cur) => ({ ...cur, loading: {} })),
  notify: (conf, id = false) =>
    setEphemeralState((cur) => {
      const newState = { ...cur }
      /*
       * Passing in an id allows making sure the same notification is not repeated
       * So if the id is set, and we have a loading state with that id, we just return
       */
      if (id && cur.loading?.[id]) return newState
      if (typeof newState.loading !== 'object') newState.loading = {}
      if (id === false) id = Date.now()
      newState.loading[id] = { ...conf, id, fadeTimer: Swizzled.config.notifyTimeout }
      return newState
    }),
  notifySuccess: (msg, id = false) =>
    setEphemeralState((cur) => {
      const newState = { ...cur }
      /*
       * Passing in an id allows making sure the same notification is not repeated
       * So if the id is set, and we have a loading state with that id, we just return
       */
      if (id && cur.loading?.[id]) return newState
      if (typeof newState.loading !== 'object') newState.loading = {}
      if (id === false) id = Date.now()
      newState.loading[id] = {
        msg,
        icon: 'success',
        color: 'success',
        id,
        fadeTimer: Swizzled.config.notifyTimeout,
      }
      return newState
    }),
  notifyFailure: (msg, id = false) =>
    setEphemeralState((cur) => {
      const newState = { ...cur }
      /*
       * Passing in an id allows making sure the same notification is not repeated
       * So if the id is set, and we have a loading state with that id, we just return
       */
      if (id && cur.loading?.[id]) return newState
      if (typeof newState.loading !== 'object') newState.loading = {}
      if (id === false) id = Date.now()
      newState.loading[id] = {
        msg,
        icon: 'failure',
        color: 'error',
        id,
        fadeTimer: Swizzled.config.notifyTimeout,
      }
      return newState
    }),
  fadeNotify: (id) =>
    setEphemeralState((cur) => {
      const newState = { ...cur }
      newState.loading[id] = { ...newState.loading[id], clearTimer: 600, id, fading: true }
      delete newState.loading[id].fadeTimer
      return newState
    }),
  clearNotify: (id) =>
    setEphemeralState((cur) => {
      const newState = { ...cur }
      if (typeof newState.loading[id] !== 'undefined') delete newState.loading[id]
      return newState
    }),
})
