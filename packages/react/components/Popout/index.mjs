import React, { useState } from 'react'
import { CloseIcon } from '@freesewing/react/components/Icon'

const colors = {
  comment: 'secondary',
  error: 'error',
  fixme: 'warning',
  link: 'secondary',
  none: '',
  note: 'primary',
  related: 'info',
  tip: 'accent',
  tldr: 'info',
  warning: 'error',
}

/**
 * This popout component is a way to make some content stand out
 *
 * @param {object} props - All React props
 * @param {object} props.comment - Set this to make it a comment popout
 * @param {object} props.error - Set this to make it a error popout
 * @param {object} props.fixme - Set this to make it a fixme popout
 * @param {object} props.link - Set this to make it a link popout
 * @param {object} props.note - Set this to make it a note popout
 * @param {object} props.related - Set this to make it a related popout
 * @param {object} props.tip - Set this to make it a tip popout
 * @param {object} props.tldr - Set this to make it a tldr popout
 * @param {object} props.warning - Set this to make it a warning popout
 * @param {string} props.title - The popout title
 * @param {string} noP - Do not wrap the content in a p tag
 */
export const Popout = (props) => {
  // Make this hideable/dismissable
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
      className={`tw-relative ${
        props.dense ? 'tw-my-1' : 'tw-my-8'
      } tw-bg-${color} tw-bg-opacity-5 tw--ml-4 tw--mr-4 sm:tw-ml-0 sm:tw-mr-0 ${className}`}
    >
      <div
        className={`
          tw-border-y-4 sm:tw-border-0 sm:tw-border-l-4 tw-px-4
          tw-shadow tw-text-base border-${color}
          tw-flex tw-flex-row tw-items-center
        `}
      >
        <div className={`tw-font-bold tw-uppercase tw-text-${color}`}>
          {props.title || (
            <>
              <span>{type.toUpperCase()}</span>
              <span className="tw-px-3">|</span>
            </>
          )}
        </div>
        <div className="popout-content">{props.noP ? props.children : <p>{props.children}</p>}</div>
      </div>
    </div>
  ) : (
    <div
      className={`tw-relative tw-my-8 tw-bg-${color} tw-bg-opacity-5 tw--ml-4 tw--mr-4 sm:tw-ml-0 sm:tw-mr-0 ${className}`}
    >
      <div
        className={`
          tw-border-y-4 sm:tw-border-0 sm:tw-border-l-4 tw-px-6 sm:tw-px-8 tw-py-4 sm:tw-py-2
          tw-shadow tw-text-base tw-border-${color} tw-border-solid
        `}
      >
        <div
          className={`tw-font-bold tw-flex tw-flex-row tw-gap-1 tw-items-end tw-justify-between`}
        >
          <div>
            <span className={`tw-font-bold tw-uppercase tw-text-${color}`}>
              {type === 'tldr' ? 'TL;DR' : type.toUpperCase()}
            </span>
            <span className={`tw-font-normal tw-text-base text-${color}`}>
              {type === 'tw-comment' && (
                <>
                  {' '}
                  by <b>{props.by}</b>
                </>
              )}
            </span>
          </div>
          {props.hideable && (
            <button onClick={() => setHide(true)} className="hover:tw-text-secondary" title="Close">
              <CloseIcon />
            </button>
          )}
        </div>
        <div className="tw-py-1 first:tw-mt-0 tw-popout-content">{props.children}</div>
        {type === 'comment' && (
          <div className={`tw-font-bold tw-italic text-${color}`}>{props.by}</div>
        )}
      </div>
    </div>
  )
}
