// Dependencies
import { useState, useContext } from 'react'
import { useTranslation } from 'next-i18next'
// Hooks
import { useAccount } from 'shared/hooks/use-account.mjs'
import { useBackend } from 'shared/hooks/use-backend.mjs'
import { useToast } from 'shared/hooks/use-toast.mjs'
// Context
import { LoadingContext } from 'shared/context/loading-context.mjs'
// Components
import { Spinner } from 'shared/components/spinner.mjs'
import { Icons, welcomeSteps, BackToAccountButton } from './shared.mjs'
import { OkIcon, NoIcon } from 'shared/components/icons.mjs'
import { ContinueButton } from 'shared/components/buttons/continue-button.mjs'

export const ns = ['account', 'toast']

export const UsernameSettings = ({ title = false, welcome = false }) => {
  // Context
  const { loading, startLoading, stopLoading } = useContext(LoadingContext)

  // Hooks
  const { account, setAccount, token } = useAccount()
  const backend = useBackend(token)
  const toast = useToast()
  const { t } = useTranslation(ns)
  const [username, setUsername] = useState(account.username)
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
    startLoading()
    const result = await backend.updateAccount({ username })
    if (result.success) {
      setAccount(result.data.account)
      toast.for.settingsSaved()
    } else toast.for.backendError()
    stopLoading()
  }

  const nextHref =
    welcomeSteps[account.control].length > 4
      ? '/welcome/' + welcomeSteps[account.control][5]
      : '/docs/guide'

  let btnClasses = 'btn mt-4 capitalize '
  if (welcome) {
    btnClasses += 'w-64 '
    if (loading) btnClasses += 'btn-accent '
    else btnClasses += 'btn-secondary '
  } else {
    btnClasses += 'w-full '
    if (loading) btnClasses += 'btn-accent '
    else btnClasses += 'btn-primary '
  }

  return (
    <div className="max-w-xl">
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
          {loading ? (
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
          <ContinueButton btnProps={{ href: nextHref }} link />
          {welcomeSteps[account.control].length > 0 ? (
            <>
              <progress
                className="progress progress-primary w-full mt-12"
                value={500 / welcomeSteps[account.control].length}
                max="100"
              ></progress>
              <span className="pt-4 text-sm font-bold opacity-50">
                5 / {welcomeSteps[account.control].length}
              </span>
              <Icons
                done={welcomeSteps[account.control].slice(0, 4)}
                todo={welcomeSteps[account.control].slice(5)}
                current="username"
              />
            </>
          ) : null}
        </>
      ) : (
        <BackToAccountButton loading={loading} />
      )}
    </div>
  )
}
