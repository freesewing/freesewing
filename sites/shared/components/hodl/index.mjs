// Hooks
import { useEffect, useState } from 'react'
import { useTranslation } from 'next-i18next'
// Components
import { Spinner } from 'shared/components/spinner.mjs'
import { WarningIcon } from 'shared/components/icons.mjs'

// Update this when more translations are added
const messages = 11

// Gets a random id for a loading message
const msg = () => Math.floor(Math.random() * messages)

export const Hodl = ({ delay = 1.25, step = 2, noTitle = false }) => {
  const { t } = useTranslation(['hodl'])

  const [fade, setFade] = useState('opacity-100')
  const [tick, setTick] = useState(0)
  const [loadingStatus, setLoadingStatus] = useState([true, t('hodl:oneMoment')])
  const [shown, setShown] = useState({})

  useEffect(() => {
    if (tick > 0 && tick < 10) {
      let newMsg
      do {
        newMsg = msg()
      } while (typeof shown[newMsg] !== 'undefined')
      setLoadingStatus([true, t(`hodl:${newMsg}`)])
      const newShown = { ...shown }
      shown[newMsg] = true
      setShown(newShown)
    } else if (tick > 0) setLoadingStatus([true, t(`hodl:giveUp`), true])
  }, [tick])

  useEffect(() => {
    if (loadingStatus[1]) {
      if (loadingStatus[2]) {
        window.setTimeout(() => {
          setFade('opacity-0')
        }, 2000 * delay)
      } else {
        window.setTimeout(() => {
          setTick(tick + step)
        }, 1000 * delay)
      }
    }
  }, [loadingStatus[1]])

  if (!loadingStatus[1]) return null

  return (
    <>
      {!noTitle && <h1>{t('hodl:oneMoment')}</h1>}
      <div className="-ml-4 -mr-4 md:ml-0 md:mr-0 md:w-full">
        <div
          className={`md:max-w-2xl flex flex-row items-center gap-4 p-4 px-4 ${fade}
          transition-opacity duration-500 relative bg-primary overflow-hidden
          md:rounded-lg shadow text-secondary-content text-lg lg:text-xl font-medium md:bg-opacity-90
            `}
        >
          <span className="shrink-0 z-20">{loadingStatus[2] ? <WarningIcon /> : <Spinner />}</span>
          <div className="z-30">
            {typeof loadingStatus[1] === 'object' && loadingStatus[1].props
              ? loadingStatus[1]
              : t(loadingStatus[1])}
          </div>
          <div
            className={`md:rounded-l-lg transition-transform absolute top-0 left-0 h-full w-full z-10 ${
              tick < 10 ? 'bg-accent' : 'bg-warning'
            } duration-1000`}
            style={{ transform: `translate(-${100 - tick * 10}%, 0)` }}
          ></div>
        </div>
      </div>
    </>
  )
}
