// Hooks
import { useState } from 'react'
import { useTranslation } from 'next-i18next'
import { useBackend } from 'site/hooks/useBackend.mjs'
import { useToast } from 'site/hooks/useToast.mjs'
// Components
import { Choice, Icons, welcomeSteps, BackToAccountButton } from './shared.mjs'
import { ContinueButton } from 'site/components/buttons/continue-button.mjs'

export const ns = ['account', 'toast']

export const ImperialSettings = ({ app, title = false, welcome = false }) => {
  const backend = useBackend(app)
  const toast = useToast()
  const { t } = useTranslation(ns)
  const [selection, setSelection] = useState(app.account?.imperial === true ? 'imperial' : 'metric')

  const update = async (val) => {
    if (val !== selection) {
      app.startLoading()
      const result = await backend.updateAccount({ imperial: val === 'imperial' ? true : false })
      if (result === true) {
        setSelection(val)
        toast.for.settingsSaved()
      } else toast.for.backendError()
      app.stopLoading()
    }
  }

  const nextHref =
    welcomeSteps[app.account?.control].length > 3
      ? '/welcome/' + welcomeSteps[app.account?.control][3]
      : '/docs/guide'

  return (
    <>
      {title ? <h1 className="text-4xl">{t('unitsTitle')}</h1> : <h1></h1>}
      {['metric', 'imperial'].map((val) => (
        <Choice
          val={val}
          t={t}
          update={update}
          current={selection}
          bool
          key={val}
          boolIcons={{ yes: <span>&quot;</span>, no: <span>cm</span> }}
        >
          <span className="block text-lg leading-5">
            {selection === 1 && val === 2 ? t('showMore') : t(`${val}Units`)}
          </span>
          <span className="block text-normal font-light normal-case pt-1">{t(`${val}Unitsd`)}</span>
        </Choice>
      ))}
      {welcome ? (
        <>
          <ContinueButton app={app} btnProps={{ href: nextHref }} link />
          {welcomeSteps[app.account?.control].length > 0 ? (
            <>
              <progress
                className="progress progress-primary w-full mt-12"
                value={300 / welcomeSteps[app.account?.control].length}
                max="100"
              ></progress>
              <span className="pt-4 text-sm font-bold opacity-50">
                3 / {welcomeSteps[app.account?.control].length}
              </span>
              <Icons
                done={welcomeSteps[app.account?.control].slice(0, 2)}
                todo={welcomeSteps[app.account?.control].slice(3)}
                current="units"
              />
            </>
          ) : null}
        </>
      ) : (
        <BackToAccountButton loading={app.loading} />
      )}
    </>
  )
}
