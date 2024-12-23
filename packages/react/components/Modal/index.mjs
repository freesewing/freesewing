import React, { useState, useEffect, useContext } from 'react'
import { ModalContext } from '@freesewing/react/context/Modal'
import { CloseIcon } from '@freesewing/react/components/Icon'

const slideClasses = {
  left: '-translate-x-full',
  right: 'translate-x-full',
  top: '-translate-y-full',
  bottom: 'translate-y-full',
}

/**
 * This component wraps modal content, making sure the layout is ok and handling transitions
 *
 * @param {object} props - All React props
 * @param {array} children - Content to render inside the modal
 * @param {string} flex - Flexbox direction (row or col)
 * @param {string} justify - Flexbox justify value
 * @param {string} items - Flexbox items value
 * @param {string} bg - Background
 * @param {string} bgOpacity - Background opacity
 * @param {bool} bare - Set true to not handle layout
 * @param {bool} keepOpenOnClick - Set to true to prevent a click in the modal content to close the modal
 * @param {string} slideFrom - Direction to slide in from
 * @param {bool} fullWidth - Set to true to not constrain the width
 */
export const ModalWrapper = ({
  children = null,
  flex = 'row',
  justify = 'center',
  items = 'center',
  bg = 'neutral lg:neutral',
  bgOpacity = '100 lg:bg-opacity-70',
  bare = false,
  keepOpenOnClick = false,
  slideFrom = 'left',
  fullWidth = false,
}) => {
  const { clearModal } = useContext(ModalContext)
  const [animate, setAnimate] = useState('in')

  const close = (evt) => {
    // Only process the first event
    if (evt?.event) evt.event.stopPropagation()
    setAnimate('out')
    window.setTimeout(clearModal, 150)
  }

  useEffect(() => {
    // only turn off animation if it's animating in
    if (animate === 'in') setAnimate(false)
  }, [animate])

  // CSS classes for animation
  const animation = animate
    ? `lg:opacity-0 ${slideClasses[slideFrom]} lg:translate-x-0 lg:translate-y-0`
    : 'opacity-100 translate-none'

  const stopClick = (evt) => {
    /*
     * Do not keep modal open for links (with a href)
     * but do keep it open for buttons (like a new modal context)
     */
    if (!evt.target.attributes.href) evt.stopPropagation()
  }

  return (
    <div
      className={`fixed top-0 left-0 m-0 p-0 shadow w-full h-screen
        transform-all duration-150 ${animation}
        bg-${bg} bg-opacity-${bgOpacity} hover:cursor-pointer
        flex flex-${flex} justify-${justify} items-${items} lg:p-12 backdrop-blur-md`}
      onClick={close}
      style={{ zIndex: 250 }}
    >
      {bare ? (
        children
      ) : (
        <div
          onClick={keepOpenOnClick ? stopClick : null}
          className={`z-30 bg-base-100 p-4 lg:px-8 lg:rounded-lg lg:shadow-lg max-h-full overflow-auto hover:cursor-default ${
            fullWidth ? 'w-full' : ''
          }`}
        >
          {children}
          <button
            className="fixed bottom-2 right-2 daisy-btn daisy-btn-neutral daisy-btn-circle lg:hidden"
            onClick={close}
          >
            <CloseIcon className="w-8 h-8" />
          </button>
        </div>
      )}
    </div>
  )
}
