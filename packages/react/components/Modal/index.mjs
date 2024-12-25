import React, { useState, useEffect, useContext } from 'react'
import { ModalContext } from '@freesewing/react/context/Modal'
import { CloseIcon } from '@freesewing/react/components/Icon'

const slideClasses = {
  left: 'tw--translate-x-full',
  right: 'tw-translate-x-full',
  top: 'tw--translate-y-full',
  bottom: 'tw-translate-y-full',
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
  bg = 'neutral lg:tw-neutral',
  bgOpacity = '100 lg:tw-bg-opacity-70',
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
    ? `lg:tw-opacity-0 ${slideClasses[slideFrom]} lg:tw-translate-x-0 lg:tw-translate-y-0`
    : 'tw-opacity-100 tw-translate-none'

  const stopClick = (evt) => {
    /*
     * Do not keep modal open for links (with a href)
     * but do keep it open for buttons (like a new modal context)
     */
    if (!evt.target.attributes.href) evt.stopPropagation()
  }

  return (
    <div
      className={`tw-fixed tw-top-0 tw-left-0 tw-m-0 tw-p-0 tw-shadow tw-w-full tw-h-screen
        tw-transform-all tw-duration-150 ${animation}
        tw-bg-${bg} tw-bg-opacity-${bgOpacity} hover:tw-cursor-pointer
        tw-flex tw-flex-${flex} tw-justify-${justify} tw-items-${items} lg:tw-p-12 tw-backdrop-blur-md`}
      onClick={close}
      style={{ zIndex: 250 }}
    >
      {bare ? (
        children
      ) : (
        <div
          onClick={keepOpenOnClick ? stopClick : null}
          className={`tw-z-30 tw-bg-base-100 tw-p-4 lg:tw-px-8 lg:tw-rounded-lg lg:tw-shadow-lg tw-max-h-full tw-overflow-auto hover:tw-cursor-default ${
            fullWidth ? 'tw-w-full' : ''
          }`}
        >
          {children}
          <button
            className="tw-fixed tw-bottom-2 tw-right-2 tw-daisy-btn tw-daisy-btn-neutral tw-daisy-btn-circle lg:tw-hidden"
            onClick={close}
          >
            <CloseIcon className="tw-w-8 tw-h-8" />
          </button>
        </div>
      )}
    </div>
  )
}
