import { useState, useEffect } from 'react'
import { Spinner } from 'shared/components/spinner.mjs'
import { OkIcon, WarningIcon } from 'shared/components/icons.mjs'
import { useTranslation } from 'next-i18next'

export const ns = ['status']

/*
 * Timeout in seconds before the loading status dissapears
 */
const timeout = 2

const LoadingStatus = ({ loadingStatus }) => {
  const { t } = useTranslation(ns)

  const [fade, setFade] = useState('opacity-100')
  const [timer, setTimer] = useState(false)

  useEffect(() => {
    if (loadingStatus[2]) {
      if (timer) clearTimeout(timer)
      setTimer(
        window.setTimeout(() => {
          setFade('opacity-0')
        }, timeout * 1000 - 350)
      )
    }
  }, [loadingStatus[2]])

  if (!loadingStatus[0]) return null

  let color = 'secondary'
  let icon = <Spinner />
  if (loadingStatus[2]) {
    color = loadingStatus[3] ? 'success' : 'error'
    icon = loadingStatus[3] ? (
      <OkIcon stroke={4} className="w-8 h-8" />
    ) : (
      <WarningIcon className="w-8 h-8" stroke={2} />
    )
  }

  return (
    <div className="fixed top-0 md:top-28 left-0 w-full z-30 md:px-4 md:mx-auto">
      <div
        className={`w-full md:max-w-2xl m-auto bg-${color} flex flex-row gap-4 p-4 px-4 ${fade}
        transition-opacity delay-[${timeout * 1000 - 400}ms] duration-300
        md:rounded-lg shadow text-secondary-content text-lg lg:text-xl font-medium md:bg-opacity-90`}
      >
        {icon}
        {t(loadingStatus[1])}
      </div>
    </div>
  )
}

export const useLoadingStatus = () => {
  /*
   * LoadingStatus should hold an array with 1 to 4 elements:
   * 0 => Show loading status or not (true or false)
   * 1 => Message to show
   * 2 => Set this to true to make the loadingStatus dissapear after 2 seconds
   * 3 => Set this to true to show success, false to show error (only when 2 is true)
   */
  const [loadingStatus, setLoadingStatus] = useState([false])
  const [timer, setTimer] = useState(false)

  useEffect(() => {
    if (loadingStatus[2]) {
      if (timer) clearTimeout(timer)
      setTimer(
        window.setTimeout(() => {
          setLoadingStatus([false])
        }, timeout * 1000)
      )
    }
  }, [loadingStatus[2]])

  return {
    setLoadingStatus,
    loading: loadingStatus[0],
    LoadingStatus: () => <LoadingStatus loadingStatus={loadingStatus} />,
  }
}
