import React, { useState } from 'react'

const colors = {
  comment: 'secondary',
  note: 'primary',
  tip: 'accent',
  warning: 'error',
  error: 'error',
  fixme: 'warning',
  link: 'secondary',
  related: 'info',
  tldr: 'info',
  none: '',
}

/**
 * This popout component is a way to make some content stand out
 *
 * @param {object} components - Object holding possibly swizzled components
 * @param {object} methods - Object holding possibly swizzled methods
 */
export const Popout = (props) => {
  /*
   * Load (swizzled) components
   */
  const { CloseIcon } = props.Swizzled.components

  /*
   * Load (swizzled) methods
   */
  const { t } = props.Swizzled.methods

  const [hide, setHide] = useState(false)
  if (hide) return null

  let type = 'none'
  for (const c in colors) {
    if (props[c]) type = c
  }
  const color = colors[type]
  const { className = '' } = props

  return props.compact ? (
    <div
      className={`relative ${
        props.dense ? 'my-1' : 'my-8'
      } bg-${color} bg-opacity-5 -ml-4 -mr-4 sm:ml-0 sm:mr-0 ${className}`}
    >
      <div
        className={`
          border-y-4 sm:border-0 sm:border-l-4 px-4
          shadow text-base border-${color}
          flex flex-row items-center
        `}
      >
        <div className={`font-bold uppercase text-${color}`}>
          {props.title || (
            <>
              <span>{t(`pe:${type}`).toUpperCase()}</span>
              <span className="px-3">|</span>
            </>
          )}
        </div>
        <div className="popout-content">{props.noP ? props.children : <p>{props.children}</p>}</div>
      </div>
    </div>
  ) : (
    <div
      className={`relative my-8 bg-${color} bg-opacity-5 -ml-4 -mr-4 sm:ml-0 sm:mr-0 ${className}`}
    >
      <div
        className={`
          border-y-4 sm:border-0 sm:border-l-4 px-6 sm:px-8 py-4 sm:py-2
          shadow text-base border-${color}
        `}
      >
        <div className={`font-bold flex flex-row gap-1 items-end justify-between`}>
          <div>
            <span className={`font-bold uppercase text-${color}`}>
              {type === 'tldr' ? 'TL;DR' : t(`pe:${type}`).toUpperCase()}
            </span>
            <span className={`font-normal text-base text-${color}`}>
              {type === 'comment' && (
                <>
                  {' '}
                  by <b>{props.by}</b>
                </>
              )}
            </span>
          </div>
          {props.hideable && (
            <button onClick={() => setHide(true)} className="hover:text-secondary" title="Close">
              <CloseIcon />
            </button>
          )}
        </div>
        <div className="py-1 first:mt-0 popout-content">{props.children}</div>
        {type === 'comment' && <div className={`font-bold italic text-${color}`}>{props.by}</div>}
      </div>
    </div>
  )
}
