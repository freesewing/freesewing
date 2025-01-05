import React, { useEffect } from 'react'
import { Spinner } from '@freesewing/react/components/Spinner'
import { TipIcon } from '@freesewing/react/components/Icon'
import { Null } from './Null.mjs'

const config = {
  timeout: 2,
  defaults: {
    color: 'secondary',
    icon: 'Spinner',
  },
}

const icons = {
  tip: TipIcon,
  spinner: Spinner,
}

export const LoadingStatus = ({ state, update }) => {
  useEffect(() => {
    if (typeof state._.loading === 'object') {
      for (const conf of Object.values(state._.loading)) {
        if (conf.fadeTimer)
          window.setTimeout(function () {
            update.fadeNotify(conf.id)
          }, conf.fadeTimer)
        if (conf.clearTimer)
          window.setTimeout(function () {
            update.clearNotify(conf.id)
          }, conf.clearTimer)
      }
    }
  }, [state._, update])

  if (!state._.loading || Object.keys(state._.loading).length < 1) return null

  return (
    <div className="tw-fixed tw-bottom-4 md:tw-buttom-28 tw-left-0 tw-w-full tw-z-30 md:tw-px-4 md:tw-mx-auto mb-4">
      <div className="tw-flex tw-flex-col tw-gap-2">
        {Object.entries(state._.loading).map(([id, custom]) => {
          const conf = {
            ...config.defaults,
            ...custom,
          }
          const Icon = icons[conf.icon] ? icons[conf.icon] : Null
          return (
            <div
              key={id}
              className={`tw-w-full md:tw-max-w-2xl tw-m-auto tw-bg-${
                conf.color
              } tw-flex tw-flex-row tw-items-center tw-gap-4 tw-p-4 tw-px-4 ${
                conf.fading ? 'tw-opacity-0' : 'tw-opacity-100'
              }
              tw-transition-opacity tw-delay-[${config.timeout * 1000 - 400}ms] tw-duration-300
              md:tw-rounded-lg tw-shadow tw-text-secondary-content tw-text-lg lg:tw-text-xl tw-font-medium md:tw-bg-opacity-90`}
            >
              <span className="tw-shrink-0">
                <Icon />
              </span>
              {conf.msg}
            </div>
          )
        })}
      </div>
    </div>
  )
}
