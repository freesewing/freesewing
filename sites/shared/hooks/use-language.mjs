import { useTranslation } from 'next-i18next'

export const useLanguage = () => {
  const { i18n } = useTranslation()

  return i18n?.language
}
