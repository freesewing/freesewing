import { Toaster as DefaultToaster } from 'react-hot-toast'

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

const style = {
  info: 'bg-info border',
  warning: 'bg-warning border',
  error: 'bg-error border',
  accent: 'bg-accent border',
  success: 'bg-success border',
}
export const Toast = ({ type = 'info', children }) => {
  console.log('tasting')
  return (
    <div className={`w-64 alert shadow bg-base-100 p-0`}>
      <div className={`w-full m-0 bg-${type} p-4 border bg-opacity-30 rounded-lg`}>{children}</div>
    </div>
  )
}
