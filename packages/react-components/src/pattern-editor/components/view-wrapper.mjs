// Hooks
import { useState, useEffect, useMemo } from 'react'
import { useDefaults } from '../hooks/use-defaults.mjs'

/**
 * The editor view wrapper component
 *
 * Figures out what view to load initially,
 * and handles state for the pattern, inclding the view
 *
 * @param {object} props.components - An object holding all components that might be swizzled
 * @param {object} props.hooks - An object holding all hooks that might be swizzled
 * @param {object} props.methods - An object holding all methods that might be swizzled
 * @param {object} props.defaults - An object holding all defaults that might be swizzled
 * @param {object} props.designs - An object holding all designs
 * @param {string} props.design - The design we are editing
 * @param {string} props.locale - Current locale/language
 * @param {function} props.t - Translation method
 * @param {object} props.preload - Object holding state to preload
 */
export const ViewWrapper = (props) => {
  /*
   * Get swizzled useAccount, useControlState, and useEditorState hooks
   */
  const { useAccount, useControlState, useEditorState } = props.hooks

  /*
   * Get swizzled objUpdate method
   */
  //const { objUpdate } = props.methods

  /*
   * Load account data and control state
   */
  const { account } = useAccount()
  const controlState = useControlState()

  // Editor state
  const [state, setState, update] = useEditorState(
    initialEditorState(props.defaults, props.preload)
  )

  // Helper methods for settings/ui updates
  //const toggleSa = useMemo(
  //  () => ({
  //    setSettings((curSettings) => {
  //      const sa = curSettings.samm || (account?.imperial ? 15.3125 : 10)

  //      if (curSettings.sabool)
  //        return objUpdate({ ...curSettings }, [
  //          [['sabool'], 0],
  //          [['sa'], 0],
  //          [['samm'], sa],
  //        ])
  //      else {
  //        return objUpdate({ ...curSettings }, [
  //          [['sabool'], 1],
  //          [['sa'], sa],
  //          [['samm'], sa],
  //        ])
  //      }
  //    })
  //  },
  //  setControl: controlState.update,
  //  }),
  //  [setSettings, setUi, account, controlState]
  //)

  // Figure out what view to load
  const [View, viewProps] = viewfinder({ ...props, state })

  // Render the view
  return <View {...viewProps} state={state} update={update} />
}

/**
 * Helper method to figure out what view to load
 * based on the props passed in, and destructure
 * the props we need for it.
 *
 * @param (object) props - All the props
 * @param (string) props.design - Current design we are editing
 * @param (object) props.designs - Object holding all designs
 * @param (string) props.locale - String holding the locale/language
 * @param (object) props.state - React state passed down from the wrapper view
 * @param (object) props.methods - All possible swizzled methods
 * @param (object) props.components - All possible swizzled components
 */
const viewfinder = (props) => {
  /*
   * Grab design from props or state
   */
  const design = props.design || props.state?.design
  const Design = design ? props.designs[design] : false

  /*
   * Shared props to pass down to all views
   */
  const sharedProps = {
    components: props.components,
    methods: props.methods,
    design,
    Design,
    locale: props.locale || 'en',
  }

  /*
   * Construct object holding all views from swizzled components
   */
  const views = {
    designs: props.components.DesignsView,
    measurements: props.components.MeasurementsView,
    error: props.components.ErrorView,
  }

  /*
   * If no design is set, return the designs view
   */
  if (!props.designs[design]) return [views.designs, { ...sharedProps, designs: props.designs }]

  /*
   * If we have a design, do we have the measurements?
   */
  const [measurementsOk, missing] = props.methods.hasRequiredMeasurements(props.designs[design])
  if (!measurementsOk) return [views.measurements, { ...sharedProps, missingMeasurements: missing }]

  /*
   * If no view is set, return view picker
   */
  if (!props.state?.view) return [views.error, sharedProps]

  /*
   * If a view is set, return that
   */
  if (props.state?.view && views[props.state?.view]) return [views[props.state?.view], props]

  return [views.error, sharedProps]
}

/*
 * This helper method constructs the initial state object.
 *
 * It will look for preloadSettings and preloadUi and use those to set the initial state.
 * If they are not present, it will fall back to the relevant defaults
 * @param {object} defaults - The defaults prop passed to the ViewWrapper component
 * @return {object} initial - The initial Editor State object
 */
const initialEditorState = (defaults = {}, preload = {}) => {
  /*
   * Get swizzled defaults
   */
  const { ui: defaultUi, settings: defaultSettings } = useDefaults(defaults)

  /*
   * Create initial state object
   */
  const initial = { settings: false, ui: false }

  /*
   * Set preload state
   */
  if (typeof preload.settings === 'object') initial.settings = { ...preload.settings }
  if (typeof preload.ui === 'object') initial.ui = { ...preload.ui }

  /*
   * Fall-back to default state
   */
  if (initial.settings === false) initial.settings = { ...defaultSettings }
  if (initial.ui === false) initial.ui = { ...defaultUi }

  return initial
}
