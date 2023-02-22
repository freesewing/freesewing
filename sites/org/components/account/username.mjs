// Hooks
import { useState } from 'react'
import { useTranslation } from 'next-i18next'
import { useBackend } from 'site/hooks/useBackend.mjs'
import { useToast } from 'site/hooks/useToast.mjs'
// Components
import { Spinner } from 'shared/components/spinner.mjs'
import { Icons, welcomeSteps, BackToAccountButton } from './shared.mjs'
import { OkIcon, NoIcon } from 'shared/components/icons.mjs'
import { ContinueButton } from 'site/components/buttons/continue-button.mjs'

export const ns = ['account', 'toast']

export const UsernameSettings = ({ app, title = false, welcome = false }) => {
  const backend = useBackend(app)
  const toast = useToast()
  const { t } = useTranslation(ns)
  const [username, setUsername] = useState(app.account.username)
  const [available, setAvailable] = useState(true)

  const update = async (evt) => {
    evt.preventDefault()
    if (evt.target.value !== username) {
      setUsername(evt.target.value)
      const free = await backend.isUsernameAvailable(evt.target.value)
      setAvailable(free)
    }
  }

  const save = async () => {
    app.startLoading()
    const result = await backend.updateAccount({ username })
    if (result === true) toast.for.settingsSaved()
    else toast.for.backendError()
    app.stopLoading()
  }

  const nextHref =
    welcomeSteps[app.account.control].length > 4
      ? '/welcome/' + welcomeSteps[app.account.control][5]
      : '/docs/guide'

  let btnClasses = 'btn mt-4 capitalize '
  if (welcome) {
    btnClasses += 'w-64 '
    if (app.loading) btnClasses += 'btn-accent '
    else btnClasses += 'btn-secondary '
  } else {
    btnClasses += 'w-full '
    if (app.loading) btnClasses += 'btn-accent '
    else btnClasses += 'btn-primary '
  }

  return (
    <>
      {title ? <h1 className="text-4xl">{t('usernameTitle')}</h1> : null}
      <div className="flex flex-row items-center">
        <input
          value={username}
          onChange={update}
          className="input w-full input-bordered flex flex-row"
          type="text"
          placeholder={t('title')}
        />
        <span className={`-ml-10 rounded-full p-1 ${available ? 'bg-success' : 'bg-error'}`}>
          {available ? (
            <OkIcon className="w-5 h-5 text-neutral-content" stroke={4} />
          ) : (
            <NoIcon className="w-5 h-5 text-neutral-content" stroke={3} />
          )}
        </span>
      </div>
      <button className={btnClasses} disabled={!available} onClick={save}>
        <span className="flex flex-row items-center gap-2">
          {app.loading ? (
            <>
              <Spinner />
              <span>{t('processing')}</span>
            </>
          ) : available ? (
            t('save')
          ) : (
            t('usernameNotAvailable')
          )}
        </span>
      </button>

      {welcome ? (
        <>
          <ContinueButton app={app} btnProps={{ href: nextHref }} link />
          {welcomeSteps[app.account.control].length > 0 ? (
            <>
              <progress
                className="progress progress-primary w-full mt-12"
                value={500 / welcomeSteps[app.account.control].length}
                max="100"
              ></progress>
              <span className="pt-4 text-sm font-bold opacity-50">
                5 / {welcomeSteps[app.account.control].length}
              </span>
              <Icons
                done={welcomeSteps[app.account.control].slice(0, 4)}
                todo={welcomeSteps[app.account.control].slice(5)}
                current="username"
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
