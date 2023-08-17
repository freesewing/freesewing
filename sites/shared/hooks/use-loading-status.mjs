import { useState } from 'react'
import { Spinner } from 'shared/components/spinner.mjs'

const LoadingStatus = ({ loadingStatus }) =>
  loadingStatus[0] ? (
    <div className="fixed top-28 left-0 w-full z-30">
      <div
        className={`w-full max-w-lg m-auto bg-secondary flex flex-row gap-4 p-4 px-4
        rounded-lg shadow text-secondary-content text-medium bg-opacity-90`}
      >
        <Spinner /> {loadingStatus[1]}
      </div>
    </div>
  ) : null

export const useLoadingStatus = () => {
  const [loadingStatus, setLoadingStatus] = useState([false])

  return {
    setLoadingStatus,
    loading: loadingStatus[0],
    LoadingStatus: () => <LoadingStatus loadingStatus={loadingStatus} />,
  }
}
