//  __SDEFILE__ - This file is a dependency for the stand-alone environment
import { useState, useEffect, useContext } from 'react'
import { useSwipeable } from 'react-swipeable'
import { ModalContext } from 'shared/context/modal-context.mjs'

const slideClasses = {
  left: '-translate-x-full',
  right: 'translate-x-full',
  top: '-translate-y-full',
  bottom: 'translate-y-full',
}

export const ModalWrapper = ({
  children = null,
  flex = 'row',
  justify = 'center',
  items = 'center',
  bg = 'base-100 lg:bg-base-300',
  bgOpacity = '100 lg:bg-opacity-95',
  bare = false,
  keepOpenOnClick = false,
  slideFrom = 'left',
  keepOpenOnSwipe = false,
  fullWidth = false,
}) => {
  const { clearModal } = useContext(ModalContext)
  const [animate, setAnimate] = useState('in')

  const close = (evt) => {
    // Only process the first swipe event
    if (evt?.event) evt.event.stopPropagation()
    setAnimate('out')
    window.setTimeout(clearModal, 150)
  }

  const swipeActions = {}
  if (!keepOpenOnSwipe) {
    if (slideFrom === 'left') swipeActions.onSwipedLeft = close
    else if (slideFrom === 'right') swipeActions.onSwipedRight = close
    else if (slideFrom === 'top') swipeActions.onSwipedUp = close
    else if (slideFrom === 'bottom') swipeActions.onSwipedDown = close
  }

  const swipeHandlers = useSwipeable({
    ...swipeActions,
    trackMouse: true,
  })

  useEffect(() => {
    // only turn off animation if it's animating in
    if (animate === 'in') setAnimate(false)
  }, [animate])

  // CSS classes for animation
  const animation = animate
    ? `lg:opacity-0 ${slideClasses[slideFrom]} lg:translate-x-0 lg:translate-y-0`
    : 'opacity-100 translate-none'

  return (
    <div
      ref={swipeHandlers.ref}
      onMouseDown={swipeHandlers.onMouseDown}
      className={`fixed top-0 left-0 m-0 p-0 shadow w-full h-screen
        transform-all duration-150 ${animation}
        bg-${bg} bg-opacity-${bgOpacity} z-50 hover:cursor-pointer
        flex flex-${flex} justify-${justify} items-${items} lg:p-12`}
      onClick={keepOpenOnClick ? null : close}
    >
      {bare ? (
        children
      ) : (
        <div
          className={`bg-base-100 p-4 lg:px-8 lg:rounded-lg lg:shadow-lg max-h-full overflow-auto ${
            fullWidth ? 'w-full' : ''
          }`}
        >
          {children}
        </div>
      )}
    </div>
  )
}
