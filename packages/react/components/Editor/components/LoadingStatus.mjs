import React, { useEffect } from 'react'
import { Spinner } from '@freesewing/react/components/Spinner'

const config = {
  timeout: 2,
  defaults: {
    color: 'secondary',
    icon: 'Spinner',
  },
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
    <div className="fixed bottom-0 md:buttom-28 left-0 w-full z-30 md:px-4 md:mx-auto mb-4">
      <div className="flex flex-col gap-2">
        {Object.entries(state._.loading).map(([id, custom]) => {
          const conf = {
            ...config.defaults,
            ...custom,
          }
          const Icon = typeof conf.icon === 'undefined' ? Spinner : Spinner //Swizzled.components[`${Swizzled.methods.capitalize(conf.icon)}Icon`] || Swizzled.components.Noop
          return (
            <div
              key={id}
              className={`w-full md:max-w-2xl m-auto bg-${
                conf.color
              } flex flex-row items-center gap-4 p-4 px-4 ${
                conf.fading ? 'opacity-0' : 'opacity-100'
              }
              transition-opacity delay-[${config.timeout * 1000 - 400}ms] duration-300
              md:rounded-lg shadow text-secondary-content text-lg lg:text-xl font-medium md:bg-opacity-90`}
            >
              <span className="shrink-0">
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
