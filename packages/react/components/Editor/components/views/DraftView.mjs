// Dependencies
import React from 'react'
import { draft, missingMeasurements } from '../../lib/index.mjs'
// Components
import { Null } from '../Null.mjs'
import { ZoomablePattern } from '../ZoomablePattern.mjs'
import { PatternLayout } from '../PatternLayout.mjs'

/**
 * The draft view allows users to tweak their pattern
 *
 * @param (object) props - All the props
 * @param {function} props.config - The editor configuration
 * @param {function} props.Design - The design constructor
 * @param {array} props.missingMeasurements - List of missing measurements for the current design
 * @param {object} props.state - The ViewWrapper state object
 * @param {object} props.state.settings - The current settings
 * @param {object} props.update - Helper object for updating the ViewWrapper state
 * @return {function} DraftView - React component
 */
export const DraftView = ({ Design, state, update, config }) => {
  /*
   * Don't trust that we have all measurements
   *
   * We do not need to change the view here. That is done in the central
   * ViewWrapper componenet. However, checking the measurements against
   * the design takes a brief moment, so this component will typically
   * render before that happens, and if measurements are missing it will
   * throw and error.
   *
   * So when measurements are missing, we just return here and the view
   * will switch on the next render loop.
   */
  if (missingMeasurements(state)) return <Null />

  /*
   * First, attempt to draft
   */
  const { pattern } = draft(Design, state.settings)

  let output = null
  let renderProps = false
  if (state.ui?.renderer === 'svg') {
    try {
      const __html = pattern.render()
      output = (
        <ZoomablePattern>
          <div className="tw-w-full tw-h-full" dangerouslySetInnerHTML={{ __html }} />
        </ZoomablePattern>
      )
    } catch (err) {
      console.log(err)
    }
  } else {
    renderProps = pattern.getRenderProps()
    output = (
      <ZoomablePattern
        renderProps={renderProps}
        patternLocale={state.locale || 'en'}
        rotate={state.ui.rotate}
      />
    )
  }

  return <PatternLayout {...{ update, Design, output, state, pattern, config }} />
}
