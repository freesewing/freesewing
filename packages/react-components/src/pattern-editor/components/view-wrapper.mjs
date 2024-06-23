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
  /*
   * Load control state
   */
  const { control, setControl } = Swizzled.hooks.useControlState(Swizzled)

  // Editor state
  const [state, setState, update] = Swizzled.hooks?.useEditorState
    ? Swizzled.hooks.useEditorState(Swizzled, initialEditorState(Swizzled, preload))
    : [null, null, null]

  // Figure out what view to load
  const [View, extraProps] = viewfinder({ design, designs, preload, state, Swizzled })

  // Render the view
  return (
    <>
      <p>{state?.view}</p>
      <View
        {...extraProps}
        state={{ ...state, control, locale }}
        update={{ ...update, control: setControl }}
        {...{ designs }}
      />
    </>
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
    state.settings.measurements
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
const initialEditorState = (Swizzled, preload = {}) => {
  /*
   * Get swizzled defaults
   */
  const { ui: defaultUi, settings: defaultSettings } = Swizzled.defaults

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
