// Dependencies
import { useState } from 'react'
import { useTranslation } from 'next-i18next'
// Hooks
import { useAccount } from 'shared/hooks/use-account.mjs'
import { useBackend } from 'shared/hooks/use-backend.mjs'
import { useLoadingStatus, ns as statusNs } from 'shared/hooks/use-loading-status.mjs'
// Components
import { BackToAccountButton, Choice } from './shared.mjs'
// Config
import { siteConfig as conf } from 'site/site.config.mjs'

export const ns = ['account', 'locales', statusNs]

export const LanguageSettings = ({ title = false }) => {
  // Hooks
  const { account, setAccount } = useAccount()
  const { setLoadingStatus, LoadingStatus } = useLoadingStatus()
  const backend = useBackend()
  const { t } = useTranslation(ns)

  // State
  const [language, setLanguage] = useState(account.language || 'en')

  // Helper method to update the account
  const update = async (lang) => {
    if (lang !== language) {
      setLoadingStatus([true, 'processingUpdate'])
      setLanguage(lang)
      const result = await backend.updateAccount({ language: lang })
      if (result.success) {
        setAccount(result.data.account)
        setLoadingStatus([true, 'settingsSaved', true, true])
      } else setLoadingStatus([true, 'backendError', true, true])
    }
  }

  return (
    <div className="max-w-xl">
      <LoadingStatus />
      {title ? <h2 className="text-4xl">{t('languageTitle')}</h2> : null}
      {conf.languages.map((val) => (
        <Choice val={val} t={t} update={update} current={language} key={val}>
          <span className="block text-lg leading-5">{t(`locales:${val}`)}</span>
        </Choice>
      ))}
      <BackToAccountButton />
    </div>
  )
}
