/*
 * This creates the helper object for state updates
 */
export const stateUpdateFactory = (Swizzled, setState) => ({
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
})
