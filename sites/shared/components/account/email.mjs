// Dependencies
import { useState, useContext } from 'react'
import { useTranslation } from 'next-i18next'
// Hooks
import { useAccount } from 'shared/hooks/use-account.mjs'
import { useBackend } from 'shared/hooks/use-backend.mjs'
import { useLoadingStatus } from 'shared/hooks/use-loading-status.mjs'
// Verification methods
import { validateEmail, validateTld } from 'shared/utils.mjs'
// Components
import { BackToAccountButton } from './shared.mjs'
import { Popout } from 'shared/components/popout/index.mjs'

export const ns = ['account', 'status']

export const EmailSettings = ({ title = false }) => {
  // Hooks
  const { account, setAccount } = useAccount()
  const backend = useBackend()
  const { t } = useTranslation(ns)
  const { setLoadingStatus, LoadingStatus } = useLoadingStatus()

  // State
  const [email, setEmail] = useState(account.email)
  const [changed, setChanged] = useState(false)

  // Helper method to update account
  const save = async () => {
    setLoadingStatus([true, 'processingUpdate'])
    const result = await backend.updateAccount({ email })
    if (result.success) {
      setAccount(result.data.account)
      setLoadingStatus([true, 'settingsSaved', true, true])
    } else setLoadingStatus([true, 'backendError', true, true])
    setChanged(true)
  }

  // Is email valid?
  const valid = (validateEmail(email) && validateTld(email)) || false

  return (
    <div className="max-w-xl">
      <LoadingStatus />
      {title ? <h2 className="text-4xl">{t('emailTitle')}</h2> : null}
      {changed ? (
        <Popout note>
          <h3>{t('oneMoreThing')}</h3>
          <p>{t('emailChangeConfirmation')}</p>
        </Popout>
      ) : (
        <>
          <div className="flex flex-row items-center mt-4">
            <input
              value={email}
              onChange={(evt) => setEmail(evt.target.value)}
              className="input w-full input-bordered flex flex-row"
              type="text"
            />
          </div>
          <button
            className="btn mt-4 btn-primary w-full"
            onClick={save}
            disabled={!valid || email.toLowerCase() === account.email}
          >
            {t('save')}
          </button>
        </>
      )}
      <BackToAccountButton />
    </div>
  )
}
