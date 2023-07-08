import { useTranslation } from 'next-i18next'
import toastMethod from 'react-hot-toast'
import { OkIcon, NoIcon, TipIcon, WarningIcon, ChatIcon } from 'shared/components/icons.mjs'

const icons = {
  success: <OkIcon className="w-6 h-6 text-success" />,
  error: <NoIcon className="w-6 h-6 text-error" />,
  info: <TipIcon className="w-6 h-6 text-info" />,
  warning: <WarningIcon className="w-6 h-6 text-warning" />,
  accent: <ChatIcon className="w-6 h-6 text-accent" />,
}

const Toast = ({ type = 'info', children }) => (
  <div className={`w-64 alert shadow bg-base-100 p-0`}>
    <div
      className={`w-full m-0 bg-${type} p-4 border bg-opacity-30 rounded-lg flex flex-row items-center`}
    >
      {icons[type]}
      <div>{children}</div>
    </div>
  </div>
)

/* Custom toast methods */
const toastMethods = (t) => ({
  info: (children) => toastMethod.custom(<Toast type="info">{children}</Toast>),
  warning: (children) => toastMethod.custom(<Toast type="warning">{children}</Toast>),
  error: (children) => toastMethod.custom(<Toast type="error">{children}</Toast>),
  accent: (children) => toastMethod.custom(<Toast type="accent">{children}</Toast>),
  success: (children) => toastMethod.custom(<Toast type="success">{children}</Toast>),
  for: {
    settingsSaved: () =>
      toastMethod.custom(
        <Toast type="success">
          <span>{t('settingsSaved')}</span>
        </Toast>
      ),
    backendError: () =>
      toastMethod.custom(
        <Toast type="error">
          <span>{t('backendError')} ¯\_(ツ)_/¯</span>
        </Toast>
      ),
  },
})

/*
 * The toast hook
 */
export function useToast() {
  const { t } = useTranslation(['toast'])

  return toastMethods(t)
}
