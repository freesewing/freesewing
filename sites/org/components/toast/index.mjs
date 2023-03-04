import { Toaster as DefaultToaster } from 'react-hot-toast'
import { OkIcon, NoIcon, TipIcon, WarningIcon, ChatIcon } from 'shared/components/icons.mjs'

export const Toaster = () => (
  <DefaultToaster
    position="bottom-right"
    toastOptions={{
      className: 'bg-base-100 text-base-content',
      success: {
        className: 'bg-success text-success-content',
      },
      error: {
        className: 'bg-error text-error-content',
      },
      loading: {
        className: 'bg-warning text-warning-content',
      },
      custom: {
        className: 'bg-accent text-accent-content',
      },
    }}
  />
)

const icons = {
  success: <OkIcon className="w-6 h-6 text-success" />,
  error: <NoIcon className="w-6 h-6 text-error" />,
  info: <TipIcon className="w-6 h-6 text-info" />,
  warning: <WarningIcon className="w-6 h-6 text-warning" />,
  accent: <ChatIcon className="w-6 h-6 text-accent" />,
}

export const Toast = ({ type = 'info', children }) => (
  <div className={`w-64 alert shadow bg-base-100 p-0`}>
    <div
      className={`w-full m-0 bg-${type} p-4 border bg-opacity-30 rounded-lg flex flex-row items-center`}
    >
      {icons[type]}
      <div>{children}</div>
    </div>
  </div>
)
