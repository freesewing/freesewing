// Dependencies
import React, { useContext } from 'react'
import { draft, missingMeasurements } from '../../lib/index.mjs'
// Context
import { ModalContext } from '@freesewing/react/context/Modal'
// Components
import { ModalWrapper } from '@freesewing/react/components/Modal'
import { Null } from '@freesewing/react/components/Null'
import { ZoomablePattern } from '../ZoomablePattern.mjs'
import { PatternLayout } from '../PatternLayout.mjs'
import { DraftMenu } from '../menus/DraftMenu.mjs'
import { Xray } from '@freesewing/react/components/Xray'

/**
 * The inspect view allows users to inspect their pattern
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
export const InspectView = ({ Design, state, update, config }) => {
  const { setModal, clearModal, modalContent } = useContext(ModalContext)

  const info = {
    set: (info) => setModal(<ModalWrapper keepOpenOnClick>{info}</ModalWrapper>),
    clear: clearModal,
  }

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

  const renderProps = pattern.getRenderProps()
  const output = (
    <>
      <ZoomablePattern
        renderProps={renderProps}
        patternLocale={state.locale || 'en'}
        rotate={state.ui.rotate}
      >
        <Xray
          renderProps={renderProps}
          drillProps={{ info }}
          className={`freesewing pattern tw-w-full ${state.ui?.rotate ? 'tw--rotate-90' : ''}`}
        />
      </ZoomablePattern>
      {modalContent}
    </>
  )

  return <PatternLayout {...{ update, Design, output, state, pattern, config }} />
}
