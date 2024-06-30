// Hooks
import { useState, useEffect, useMemo } from 'react'

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
  // Editor state
  const [state, setState, update] = Swizzled.hooks.useEditorState(
    initialEditorState(Swizzled, preload, { locale })
  )

  // Don't bother before state is initialized
  if (!state) return <Swizzled.components.TemporaryLoader />

  // Figure out what view to load
  const [View, extraProps] = viewfinder({ design, designs, preload, state, Swizzled })

  /*
   * Almost all editor state has a default settings, and when that is selected
   * we just unset that value in the state. This way, state holds only what is
   * customized, and it makes it a lot easier to see how a pattern was edited.
   * The big exception is the 'ui.control' setting. If it is unset, a bunch of
   * components will not function properly. We could guard against this by passing
   * the default to all of these components, but instead, we just check that state
   * is undefined, and if so pass down the default control value here.
   * This way, should more of these exceptions get added over time, we can use
   * the same centralized solution.
   */
  const passDownState =
    typeof state.ui.control === 'undefined'
      ? { ...state, ui: { ...state.ui, control: Swizzled.config.defaultControl } }
      : state

  return state.ui.kiosk ? (
    <div className="flex flex-row items-top">
      <Swizzled.components.ViewMenu update={update} state={passDownState} />
      <div
        className={
          state.ui.kiosk ? 'z-30 w-screen h-screen fixed top-0 left-0 bg-base-100' : 'grow w-full'
        }
      >
        <View {...extraProps} {...{ update, designs }} state={passDownState} />
      </div>
    </div>
  ) : (
    <div className="flex flex-row items-top">
      <Swizzled.components.ViewMenu update={update} state={passDownState} />
      <div className="grow w-full">
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
  const Design = designs?.[design] || false
  const extraProps = { design, Design }

  /*
   * If no design is set, return the designs view
   */
  if (!designs[design]) return [getViewComponent('designs', Swizzled), extraProps]

  /*
   * If we have a design, do we have the measurements?
   */
  const [measurementsOk, missing] = Swizzled.methods.hasRequiredMeasurements(
    designs[design],
    state.settings?.measurements
  )
  if (!measurementsOk)
    return [
      getViewComponent('measurements', Swizzled),
      { ...extraProps, missingMeasurements: missing },
    ]

  /*
   * If a view is set, return that
   */
  const view = getViewComponent(state?.view, Swizzled)
  if (view) return [view, { ...extraProps, missingMeasurements: missing }]

  /*
   * If no obvious view was found, return the view picker
   */
  return [getViewComponent('picker', Swizzled), extraProps]
}

const getViewComponent = (view = false, Swizzled) =>
  view ? Swizzled.components[Swizzled.config.viewComponents[view]] : false

/*
 * This helper method constructs the initial state object.
 *
 * It will look for preloadSettings and preloadUi and use those to set the initial state.
 * If they are not present, it will fall back to the relevant defaults
 * @param {object} defaults - The defaults prop passed to the ViewWrapper component
 * @return {object} initial - The initial Editor State object
 */
const initialEditorState = (Swizzled, preload = {}, locale = 'en', extra = {}) => {
  /*
   * Get swizzled defaults
   */
  const { ui: defaultUi, settings: defaultSettings } = Swizzled.defaults

  /*
   * Create initial state object
   */
  const initial = {
    settings: false,
    ui: false,
    locale,
    ...extra,
  }

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
