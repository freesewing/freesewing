import { useState, useEffect } from 'react'
//import { Spinner } from 'shared/components/spinner.mjs'
//import { OkIcon, WarningIcon } from 'shared/components/icons.mjs'
//import { useTranslation } from 'next-i18next'

export const LoadingStatus = ({ Swizzled, state, update }) => {
  //const { t } = useTranslation(ns)
  console.log('component')
  const [fade, setFade] = useState('opacity-100')
  //const [timer, setTimer] = useState(false)
  useEffect(() => {
    console.log('fade effect')
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
    //  if (state._.loading loadingStatus[2]) {
    //    if (timer) clearTimeout(timer)
    //    setTimer(
    //      window.setTimeout(
    //        () => {
    //          setFade('opacity-0')
    //        },
    //        timeout * 1000 - 350
    //      )
    //    )
    //  }
  }, [state._])

  if (!state._.loading || Object.keys(state._.loading).length < 1) return null

  //let color = 'secondary'
  //let icon = <Swizzled.components.Spinner />
  //if (loadingStatus[2]) {
  //  color = loadingStatus[3] ? 'success' : 'error'
  //  icon = loadingStatus[3] ? (
  //    <OkIcon stroke={4} className="w-8 h-8" />
  //  ) : (
  //    <WarningIcon className="w-8 h-8" stroke={2} />
  //  )
  //}

  return (
    <div className="fixed bottom-0 md:buttom-28 left-0 w-full z-30 md:px-4 md:mx-auto mb-4">
      <div className="flex flex-col gap-2">
        {Object.entries(state._.loading).map(([id, config]) => {
          const conf = {
            ...Swizzled.config.loadingStatus.defaults,
            ...config,
          }
          const Icon =
            typeof conf.icon === 'undefined'
              ? Swizzled.components.Spinner
              : Swizzled.components[`${Swizzled.methods.capitalize(conf.icon)}Icon`] ||
                Swizzled.components.Noop
          return (
            <div
              className={`w-full md:max-w-2xl m-auto bg-${
                conf.color
              } flex flex-row items-center gap-4 p-4 px-4 ${
                conf.fading ? 'opacity-0' : 'opacity-100'
              }
              transition-opacity delay-[${
                Swizzled.config.loadingStatus.timeout * 1000 - 400
              }ms] duration-300
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
