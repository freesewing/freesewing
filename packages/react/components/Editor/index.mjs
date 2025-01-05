// Dependencies
import { designs } from '@freesewing/collection'
import { hasRequiredMeasurements, initialEditorState } from './lib/index.mjs'
import { mergeConfig } from './config/index.mjs'
// Hooks
import React, { useState } from 'react'
import { useEditorState } from './hooks/useEditorState.mjs'
// Components
import { View } from './components/views/index.mjs'
import { Spinner } from '@freesewing/react/components/Spinner'
import { AsideViewMenu } from './components/AsideViewMenu.mjs'
import { LoadingStatus } from './components/LoadingStatus.mjs'

/**
 * FreeSewing's pattern editor
 *
 * Editor is the high-level FreeSewing component
 * that provides the entire pattern editing environment
 * This is a high-level wrapper that figures out what view to load initially,
 * and handles state for the pattern, including the view
 *
 * @param {object} props - All React props
 * @param {object} props.config - A configuration object for the editor
 * @param {object} props.design - A design name to force the editor to use this design
 * @param {object} props.preload - Any state to preload
 */
export const Editor = ({ config = {}, design = false, preload = {} }) => {
  /*
   * Ephemeral state will not be stored in the state backend
   * It is used for things like loading state and so on
   */
  const [ephemeralState, setEphemeralState] = useState({})

  /*
   * Merge custom and default configuration
   */
  const editorConfig = mergeConfig(config)

  /*
   * The Editor state is kept in a state backend (URL)
   */
  const allState = useEditorState(
    initialEditorState(preload, config),
    setEphemeralState,
    editorConfig
  )

  const state = allState[0]
  const update = allState[2]

  /*
   * Don't bother before state is initialized
   */
  if (!state) return <Spinner />

  // Figure out what view to load
  const [view, extraProps] = viewfinder({ design, designs, preload, state, config: editorConfig })

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
    state.ui?.ux === undefined
      ? {
          ...state,
          ui: { ...(state.ui || {}), ux: editorConfig.defaultUx },
          _: { ...ephemeralState, missingMeasurements },
        }
      : { ...state, _: { ...ephemeralState, missingMeasurements } }

  return (
    <div className="flex flex-row items-top">
      {editorConfig.withAside ? <AsideViewMenu update={update} state={passDownState} /> : null}
      <div
        className={
          state.ui?.kiosk
            ? 'md:z-30 md:w-screen md:h-screen md:fixed md:top-0 md:left-0 md:bg-base-100'
            : 'grow w-full'
        }
      >
        <LoadingStatus state={passDownState} update={update} />
        <View
          {...extraProps}
          {...{ view, update, designs, config: editorConfig }}
          state={passDownState}
        />
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
 * @param (object) props.state - React state passed down from the wrapper view
 * @param (object) props.config - The editor config
 */
const viewfinder = ({ design, designs, state, config }) => {
  /*
   * Grab Design from props or state and make them extra props
   */
  if (!design && state?.design) design = state.design
  const Design = designs[design] || false
  const extraProps = { design, Design }

  /*
   * If no design is set, return the designs view
   */
  if (!designs[design]) return ['designs', extraProps]

  /*
   * If we have a design, do we have the measurements?
   */
  const [measurementsOk, missingMeasurements] = hasRequiredMeasurements(
    designs[design],
    state.settings?.measurements
  )
  if (missingMeasurements) extraProps.missingMeasurements = missingMeasurements

  /*
   * Allow all views that do not require measurements before
   * we force the user to the measurements view
   */
  if (state.view && config.measurementsFreeViews.includes(state.view))
    return [state.view, extraProps]

  /*
   * Force the measurements view if measurements are missing
   */
  if (!measurementsOk) return ['measurements', extraProps]

  /*
   * If a view is set, return that
   */
  if (state.view) return [state.view, extraProps]

  /*
   * If no obvious view was found, return the view picker
   */
  return ['picker', extraProps]
}
