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
     * Allow passing an array of update operations.
     * Note that we're not doing rigorous checking on the structure of the array.
     * If you mess it up, it's on you.
     */
    if (Array.isArray(path) && val === null) {
      for (const sub of path)
        setState((cur) =>
          Swizzled.methods.objUpdate(
            { ...cur },
            Swizzled.methods.statePrefixPath('settings', sub[0]),
            sub[1]
          )
        )
    } else
      setState((cur) =>
        Swizzled.methods.objUpdate(
          { ...cur },
          Swizzled.methods.statePrefixPath('settings', path),
          val
        )
      )
  },
  ui: (path, val) =>
    setState((cur) =>
      Swizzled.methods.objUpdate({ ...cur }, Swizzled.methods.statePrefixPath('ui', path), val)
    ),
  /*
   * These only hold a string, so we only take a value
   */
  design: (val) => setState((cur) => Swizzled.methods.objUpdate({ ...cur }, 'design', val)),
  view: (val) => setState((cur) => Swizzled.methods.objUpdate({ ...cur }, 'view', val)),
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
