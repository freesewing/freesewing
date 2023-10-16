// Context
import { LoadingStatusContext } from 'shared/context/loading-status-context.mjs'
// Hooks
import { useState, useContext } from 'react'
import { useTranslation } from 'next-i18next'
import { useAccount } from 'shared/hooks/use-account.mjs'
import { useBackend } from 'shared/hooks/use-backend.mjs'
// Components
import { Icons, welcomeSteps, BackToAccountButton } from './shared.mjs'
import { OkIcon, NoIcon } from 'shared/components/icons.mjs'
import { ContinueButton } from 'shared/components/buttons/continue-button.mjs'
import { StringInput } from 'shared/components/inputs.mjs'
import { DynamicOrgDocs } from 'site/components/dynamic-org-docs.mjs'

export const ns = ['account', 'status']

export const UsernameSettings = ({ welcome = false }) => {
  // Hooks
  const { account, setAccount } = useAccount()
  const backend = useBackend()
  const { setLoadingStatus } = useContext(LoadingStatusContext)
  const { t, i18n } = useTranslation(ns)
  const [username, setUsername] = useState(account.username)
  const [available, setAvailable] = useState(true)

  const update = async (value) => {
    if (value !== username) {
      setUsername(value)
      const result = await backend.isUsernameAvailable(value)
      if (result?.response?.response?.status === 404) setAvailable(true)
      else setAvailable(false)
    }
  }

  const save = async () => {
    setLoadingStatus([true, 'processingUpdate'])
    const result = await backend.updateAccount({ username })
    if (result.success) {
      setAccount(result.data.account)
      setLoadingStatus([true, 'settingsSaved', true, true])
    } else setLoadingStatus([true, 'backendError', true, true])
  }

  const nextHref =
    welcomeSteps[account.control].length > 4
      ? '/welcome/' + welcomeSteps[account.control][5]
      : '/docs/guide'

  let btnClasses = 'btn mt-4 capitalize '
  if (welcome) btnClasses += 'w-64 btn-secondary'
  else btnClasses += 'w-full btn-primary'

  return (
    <div className="max-w-xl">
      <StringInput
        id="account-username"
        label={t('usernameTitle')}
        current={username}
        update={update}
        valid={() => available}
        placeholder={'Sorcha Ni Dhubghaill'}
        labelBL={
          <span className="flex flex-row gap-1 items-center">
            {available ? (
              <>
                <OkIcon className="w-4 h-4 text-success" stroke={4} /> {t('usernameAvailable')}
              </>
            ) : (
              <>
                <NoIcon className="w-4 h-4 text-error" stroke={3} /> {t('usernameNotAvailable')}
              </>
            )}
          </span>
        }
        docs={<DynamicOrgDocs language={i18n.language} path={`site/account/username`} />}
      />
      <button className={btnClasses} disabled={!available} onClick={save}>
        <span className="flex flex-row items-center gap-2">
          {available ? t('save') : t('usernameNotAvailable')}
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
        <BackToAccountButton />
      )}
    </div>
  )
}
