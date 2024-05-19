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
 */
export const ViewWrapper = (props) => {
  /*
   * Get swizzled defaults
   */
  const { ui: defaultUi } = useDefaults(props.defaults)

  /*
   * Get swizzled useAccount and useControlState hooks
   */
  const { useAccount, useControlState, useEditorState } = props.hooks

  /*
   * Get swizzled objUpdate method
   */
  const { objUpdate } = props.methods

  /*
   * Load account data and control state
   */
  const { account } = useAccount()
  const controlState = useControlState()

  // React state
  const [state, setState, update] = useEditorState({
    settings: props.preloadSettings,
    ui: props.preloadUi || defaultUi,
  })
  const [ui, setUi] = useState(props.preloadUi || defaultUi)

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
  const [View, viewProps] = viewfinder({
    ...props,
    state: { view, setView, design, setDesign, settings },
  })

  // Render the view
  return <View {...viewProps} update={update} />
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
    ...props.state,
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
