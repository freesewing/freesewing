import { useTranslation } from 'next-i18next'
import toastMethod from 'react-hot-toast'
import { Toast } from 'site/components/toast/index.mjs'

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
