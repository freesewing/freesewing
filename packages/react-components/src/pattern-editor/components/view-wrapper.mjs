// Hooks
import { useState, useEffect } from 'react'
import { usePatternSettings } from '../hooks/use-pattern-settings.mjs'
import { useDefaults } from '../hooks/use-defaults.mjs'
import { useMethods } from '../hooks/use-methods.mjs'
import { useViews } from '../hooks/use-components.mjs'

/*
 * Object holding all views
 */
const views = {
  //  measies: MeasiesView,
  //  draft: DraftView,
  //  print: PrintView,
  //  cut: CutView,
  //  export: ExportView,
  //  edit: EditView,
  //  test: TestView,
  //  logs: LogView,
  //  inspect: InspectView,
  //  time: TimeView,
  //  docs: DocsView,
}

/**
 * The editor view wrapper component
 *
 * Figures out what view to load initially,
 * and handles state for the pattern, inclding the view
 *
 * @param {object} props.components - An object holding all components that might be swizzled
 * @param {object} props.methods - An object holding all methods that might be swizzled
 * @param {object} props.defaults - An object holding all defaults that might be swizzled
 * @param {object} props.designs - An object holding all designs
 * @param {string} props.design - The design we are editing
 * @param {string} props.locale - Current locale/language
 * @param {function} props.t - Translation method
 */
export const ViewWrapper = (props) => {
  // Swizzled defaults
  const { ui: defaultUi } = useDefaults(props.defaults)

  // React state
  const [design, setDesign] = useState()
  const [view, setView] = useState()
  const [settings, setSettings] = usePatternSettings(props.preloadSettings || {})
  const [ui, setUi] = useState(props.preloadUi || defaultUi)

  //const [preloaded, setPreloaded] = useState(0)
  //const [mounted, setMounted] = useState(false)

  //useEffect(() => {
  //},[])

  // Figure out what view to load
  const [View, viewProps] = viewfinder({
    ...props,
    state: { view, setView, design, setDesign },
  })

  // Render the view
  return <View {...viewProps} />
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
   * Allow swizzling of methods
   */
  const { t } = useMethods(props.methods)

  /*
   * Allow swizzling of views
   */
  const views = useViews(props.components)

  /*
   * If no design is set, return the designs view
   */
  if (!props.designs[props.design] && !props.designs[props.state?.design])
    return [
      views.designs,
      {
        t: props.methods.t,
        designs: props.designs,
        setDesign: props.state.setDesign,
      },
    ]

  /*
   * If no view is set, return view picker
   */
  if (typeof props.state?.view === 'undefined')
    return [
      views.error,
      {
        locale: props.locale || 'en',
        t: props.methods.t,
        state: props.state,
      },
    ]

  /*
   * If a view is set, don't fight it
   */
  if (props.state?.view && views[props.state?.view]) return [views[props.state?.view], props]

  /*
   * Do we have a design?
   */
  if (!props.designs[props.design] && !props.designs[props.state?.design])
    return [
      views.designs,
      {
        designs: props.designs,
        locale: props.locale || 'en',
        t: props.methods.t,
        setDesign: props.state.setDesign,
      },
    ]

  /*
   * Do we have the measurements?
   */
  const [measiesOk, missing] = props.methods.hasRequiredMeasurements(
    props.designs[props.design || props.state?.design]
  )
  if (!measiesOk)
    return [
      views.measies,
      {
        locale: props.locale || 'en',
        t: props.methods.t,
        ...props.state,
      },
    ]

  return [
    views.error,
    {
      locale: props.locale || 'en',
      t: props.methods.t,
      setView: props.state.setView,
    },
  ]
}
