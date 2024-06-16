// Hooks
import { useState, useEffect, useMemo } from 'react'
import { useDefaults } from '../hooks/use-defaults.mjs'

/**
 * The editor view wrapper component
 *
 * Figures out what view to load initially,
 * and handles state for the pattern, inclding the view
 *
 * @param (object) props - All the props
 * @param {object} props.swizzled - An object with swizzled components, hooks, methods, config, and defaults
 * @param {object} props.designs - An object holding all designs
 * @param {object} props.preload - Object holding state to preload
 * @param {object} props.locale - The locale (language) code
 * @param {object} props.design - A design name to force the editor to use this design
 */
export const ViewWrapper = ({
  swizzled,
  designs = {},
  preload = {},
  locale = 'en',
  design = false,
}) => {
  /*
   * Get swizzled useAccount, useControlState, and useEditorState hooks
   */
  const { useAccount, useControlState, useEditorState } = swizzled.hooks

  /*
   * Load account data and control state
   */
  const { account } = useAccount()
  const { control, setControl } = useControlState()

  // Editor state
  const [state, setState, update] = useEditorState(initialEditorState(swizzled.defaults, preload))

  /*
   * Get swizzled objUpdate method
   */
  //const { objUpdate } = props.methods

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
  const [View, extraProps] = viewfinder({ swizzled, design, designs, preload, state })

  // Render the view
  return (
    <>
      <p>{state?.view}</p>
      <View
        {...extraProps}
        state={{ ...state, control, locale }}
        update={{ ...update, control: setControl }}
        {...{ swizzled, designs }}
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
 * @param {object} props.swizzled - An object with swizzled components, hooks, methods, config, and defaults
 * @param {object} props.designs - An object holding all designs
 * @param {object} props.preload - Object holding state to preload
 * @param (object) props.state - React state passed down from the wrapper view
 */
const viewfinder = ({ swizzled, design, designs, preload, state }) => {
  /*
   * Grab Design from props or state and make them extra props
   */
  if (!design && state?.design) design = state.design
  const Design = designs?.[design] || false
  const extraProps = { design, Design }

  /*
   * If no design is set, return the designs view
   */
  if (!designs[design]) return [getViewComponent('designs', swizzled), extraProps]

  /*
   * If we have a design, do we have the measurements?
   */
  const [measurementsOk, missing] = swizzled.methods.hasRequiredMeasurements(
    designs[design],
    state.settings.measurements
  )
  if (!measurementsOk)
    return [
      getViewComponent('measurements', swizzled),
      { ...extraProps, missingMeasurements: missing },
    ]

  /*
   * If a view is set, return that
   */
  const view = getViewComponent(state?.view, swizzled)
  if (view) return [view, { ...extraProps, missingMeasurements: missing }]

  /*
   * If no obvious view was found, return the view picker
   */
  return [getViewComponent('picker', swizzled), extraProps]
}

const getViewComponent = (view = false, swizzled) =>
  view ? swizzled.components[swizzled.config.viewComponents[view]] : false

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
