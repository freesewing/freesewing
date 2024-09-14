// Hooks
import { useState, useMemo } from 'react'

/**
 * The editor view wrapper component
 *
 * Figures out what view to load initially,
 * and handles state for the pattern, inclding the view
 *
 * @param (object) props - All the props
 * @param {object} props.designs - An object holding all designs
 * @param {object} props.preload - Object holding state to preload
 * @param {object} props.locale - The locale (language) code
 * @param {object} props.design - A design name to force the editor to use this design
 * @param {object} props.Swizzled - An object holding swizzled code
 */
export const ViewWrapper = ({
  designs = {},
  preload = {},
  locale = 'en',
  design = false,
  Swizzled,
}) => {
  /*
   * Ephemeral state will not be stored in the state backend
   * It is used for things like loading state and so on
   */
  const [ephemeralState, setEphemeralState] = useState({})
  // Editor state
  const [state, setState, update] = Swizzled.hooks.useEditorState(
    Swizzled.methods.initialEditorState(preload),
    setEphemeralState
  )

  // Don't bother before state is initialized
  if (!state) return <Swizzled.components.TemporaryLoader />

  // Figure out what view to load
  const [View, extraProps] = viewfinder({ design, designs, preload, state, Swizzled })

  /*
   * Pass this down to allow disabling features that require measurements
   */
  const { missingMeasurements = [] } = extraProps

  /*
   * Almost all editor state has a default settings, and when that is selected
   * we just unset that value in the state. This way, state holds only what is
   * customized, and it makes it a lot easier to see how a pattern was edited.
   * The big exception is the 'ui.ux' setting. If it is unset, a bunch of
   * components will not function properly. We could guard against this by passing
   * the default to all of these components, but instead, we just check that state
   * is undefined, and if so pass down the default ux value here.
   * This way, should more of these exceptions get added over time, we can use
   * the same centralized solution.
   */
  const passDownState =
    state.ui.ux === undefined
      ? {
          ...state,
          ui: { ...state.ui, ux: Swizzled.config.defaultUx },
          _: { ...ephemeralState, missingMeasurements },
        }
      : { ...state, _: { ...ephemeralState, missingMeasurements } }

  return (
    <div className="flex flex-row items-top">
      {Swizzled.config.withAside ? (
        <Swizzled.components.AsideViewMenu update={update} state={passDownState} />
      ) : null}
      <div
        className={
          state.ui.kiosk
            ? 'md:z-30 md:w-screen md:h-screen md:fixed md:top-0 md:left-0 md:bg-base-100'
            : 'grow w-full'
        }
      >
        <Swizzled.components.LoadingStatus state={passDownState} update={update} />
        <View {...extraProps} {...{ update, designs }} state={passDownState} />
      </div>
    </div>
  )
}

/**
 * Helper method to figure out what view to load
 * based on the props passed in, and destructure
 * the props we need for it.
 *
 * @param (object) props - All the props
 * @param {object} props.design - The (name of the) current design
 * @param {object} props.designs - An object holding all designs
 * @param {object} props.preload - Object holding state to preload
 * @param (object) props.state - React state passed down from the wrapper view
 */
const viewfinder = ({ design, designs, preload, state, Swizzled }) => {
  /*
   * Grab Design from props or state and make them extra props
   */
  if (!design && state?.design) design = state.design
  const Design = designs[design] || false
  const extraProps = { design, Design }

  /*
   * If no design is set, return the designs view
   */
  if (!designs[design]) return [getViewComponent('designs', Swizzled), extraProps]

  /*
   * If we have a design, do we have the measurements?
   */
  const [measurementsOk, missingMeasurements] = Swizzled.methods.hasRequiredMeasurements(
    designs[design],
    state.settings?.measurements
  )
  if (missingMeasurements) extraProps.missingMeasurements = missingMeasurements

  /*
   * Allow all views that do not require measurements before
   * we force the user to the measurements view
   */
  if (state.view && Swizzled.config.measurementsFreeViews.includes(state.view)) {
    const view = getViewComponent(state.view, Swizzled)
    if (view) return [view, extraProps]
  }

  if (!measurementsOk) return [getViewComponent('measurements', Swizzled), extraProps]

  /*
   * If a view is set, return that
   */
  const view = getViewComponent(state.view, Swizzled)
  if (view) return [view, extraProps]

  /*
   * If no obvious view was found, return the view picker
   */
  return [getViewComponent('picker', Swizzled), extraProps]
}

const getViewComponent = (view = false, Swizzled) =>
  view ? Swizzled.components[Swizzled.config.viewComponents[view]] : false
