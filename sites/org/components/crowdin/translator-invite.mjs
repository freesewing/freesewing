// Dependencies
import { siteConfig } from 'site/site.config.mjs'
import translators from 'site/prebuild/translators.json'
// Context
import { LoadingStatusContext } from 'shared/context/loading-status-context.mjs'
// Hooks
import { useBackend } from 'shared/hooks/use-backend.mjs'
import { useState, useContext } from 'react'
import { useTranslation } from 'next-i18next'
// Components
import { ChoiceButton } from 'shared/components/choice-button.mjs'
import { I18nIcon } from 'shared/components/icons.mjs'
import { Popout } from 'shared/components/popout/index.mjs'
import { WebLink } from 'shared/components/link.mjs'

export const ns = ['translation', 'locales']

const languages = [
  ...siteConfig.languages.filter((lang) => lang !== 'en'),
  ...siteConfig.languagesWip,
].sort()

export const TranslatorInvite = () => {
  // Hooks
  const { t } = useTranslation(ns)
  const backend = useBackend()
  const { setLoadingStatus } = useContext(LoadingStatusContext)

  // State
  const [team, setTeam] = useState(false)
  const [sent, setSent] = useState(false)

  const sendInvite = async () => {
    setLoadingStatus([true, 'status:contactingBackend'])
    const result = await backend.sendTranslatorInvite(team)
    if (result.success) {
      setSent(true)
      setLoadingStatus([true, 'status:settingsSaved', true, true])
    } else setLoadingStatus([true, 'status:backendError', true, false])
  }

  if (sent)
    return (
      <>
        <Popout tip>
          <h5>{t('translation:inviteSent')}</h5>
          <p>{t('translation:successNote')}</p>
        </Popout>
        <Popout link compact>
          <WebLink
            href="https://freesewing.dev/guides/translation"
            txt={t('translation:seeTranslationGuide')}
          />
        </Popout>
      </>
    )

  return team ? (
    <>
      <p>
        <button className="btn btn-primary mr-2" onClick={sendInvite}>
          {t(`locales:sendMeAnInvite`)}: {t(`locales:${team}`)}
        </button>
        <button className="btn btn-primary btn-outline" onClick={() => setTeam(false)}>
          Join a different team
        </button>
      </p>
    </>
  ) : (
    <>
      <p>{t('translation:pleaseChooseTeam')}</p>
      <h5>{t('translation:whatTeam')}</h5>
      <div className="flex flex-col gap-2 lg:grid lg:grid-cols-2 gap-2 mt- mb-82">
        {languages.map((language) => (
          <ChoiceButton
            noMargin
            key={language}
            icon={<I18nIcon />}
            title={t('translation:languageTeam', { language: t('locales:' + language) })}
            onClick={() => setTeam(language)}
          >
            <div className="text-sm flex flex-row flex-wrap gap-1">
              {Object.keys(translators[language]).map((name, i) => (
                <span
                  key={i}
                  className="bg-secondary bg-opacity-10 rounded px-2 text-sm border border-secondary"
                >
                  {name}
                </span>
              ))}
            </div>
          </ChoiceButton>
        ))}
      </div>
    </>
  )
}
