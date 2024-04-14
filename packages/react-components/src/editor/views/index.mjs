// React hooks
import { useState, useEffect } from 'react'
import { usePatternSettings } from '../use-pattern-settings.mjs'
// Views
import { MeasiesView } from './measies.mjs'
// Defaults
import { defaultUi } from '../defaults.mjs'

/*
 * Object holding all views
 */
const views = {
  measies: MeasiesView,
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

/*
 * A translation fallback method in case none is passed in
 */
const fallBackT = (key) => key

/**
 * The editor view wrapper component
 *
 * Figures out what view to load initially,
 * and handles state for the pattern, inclding the view
 *
 * @param {object} props.components - An object holding all components that might be swizzled
 * @param {object} props.designs - An object holding all designs
 * @param {string} props.design - The design we are editing
 * @param {string} props.locale - Current locale/language
 * @param {object} props.methods - An object holding all methods that might be swizzled
 * @param {function} props.t - Translation method
 */
export const EditorView = (props) => {

  // React state
  const [design, setDesign] = useState()
  const [view, setView] = useState()
  const [settings, setSettings] = usePatternSettings(props.preloadSettings || {})
  const [ui, setUi] = useState(props.preloadUi || defaultUi)

  //const [preloaded, setPreloaded] = useState(0)
  //const [mounted, setMounted] = useState(false)

  // Swizzled components
  const { DesignsView, ErrorView } = props.components
  views.designs = DesignsView
  views.error = ErrorView

  //useEffect(() => {
  //},[])

  // Figure out what view to load
  const [View, viewProps] = viewfinder({
    ...props,
    state: { view, setView, design, setDesign, },
    methods: props.methods,
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
 */
const viewfinder = ({
  design=false, // Current design we are editing
  designs={},   // Object holding all designs
  locale='en',  // Current language/locale
  t=fallBackT,  // Translation method
  state,        // React state values and setters
  methods,      // All possible swizzled methods
}) => {
  /*
   * If a view is set, don't fight it
   */
  if (state.view && views[state.view]) return [ views[state.view], props ]

  /*
   * Do we have a design?
   */
  if (!designs[design] && !designs[state.design]) return [ views.designs, { designs, locale, t, setDesign: state.setDesign } ]

  /*
   * Do we have the measurements?
   */
  const [measiesOk, missing] = methods.hasRequiredMeasurements(designs[design || state.design])
  if (!measiesOk) return [views.measies, { locale, t, ...state }]


  return [views.error, { locale, t, setView: state.setView } ]
}
