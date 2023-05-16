import React, { useContext } from 'react'
import { useSwipeable } from 'react-swipeable'
import { useHotkeys } from 'react-hotkeys-hook'
import { ModalContext } from 'shared/context/modal-context.mjs'
import { ModalMenu } from 'site/components/navigation/modal-menu.mjs'

/* This component should wrap all swipeable content */
export const SwipeWrapper = ({ children, app }) => {
  const { setModal, clearModal } = useContext(ModalContext) || {}

  /*
   * Swipe handling for the entire site
   */
  const swipeHandlers = useSwipeable({
    onSwipedLeft: (evt) => {
      // Only process the first swipe event
      evt.event.stopPropagation()
      clearModal()
    },
    onSwipedRight: (evt) => {
      // Only process the first swipe event
      evt.event.stopPropagation()
      // FIXME: Make this not be such a PITA
      //setModal(<ModalMenu app={app} />)
    },
    trackMouse: true,
  })

  // Always close modal when Escape key is hit
  useHotkeys('esc', (evt) => {
    evt.preventDefault()
    clearModal()
  })

  // Return swipe wrapper
  return (
    <div ref={swipeHandlers.ref} onMouseDown={swipeHandlers.onMouseDown}>
      {children}
    </div>
  )
}
