// Hooks
import { useState } from 'react'
import { useTranslation } from 'next-i18next'
import { useBackend } from 'site/hooks/useBackend.mjs'
import { useToast } from 'site/hooks/useToast.mjs'
// Components
import { BackToAccountButton, Choice } from './shared.mjs'
// Config
import { freeSewingConfig as conf } from 'site/freesewing.config.mjs'

export const ns = ['account', 'locales', 'toast']

export const LanguageSettings = ({ app, title = false }) => {
  const backend = useBackend(app)
  const toast = useToast()
  const { t } = useTranslation(ns)
  const [language, setLanguage] = useState(app.account.language || 'en')

  const update = async (lang) => {
    if (lang !== language) {
      app.startLoading()
      setLanguage(lang)
      const result = await backend.updateAccount({ language: lang })
      if (result === true) toast.for.settingsSaved()
      else toast.for.backendError()
      app.stopLoading()
    }
  }

  return (
    <>
      {title ? <h2 className="text-4xl">{t('languageTitle')}</h2> : null}
      {conf.languages.map((val) => (
        <Choice val={val} t={t} update={update} current={language} key={val}>
          <span className="block text-lg leading-5">{t(`locales:${val}`)}</span>
        </Choice>
      ))}
      <BackToAccountButton loading={app.loading} />
    </>
  )
}
