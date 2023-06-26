// Dependencies
import { useState, useContext } from 'react'
import { useTranslation } from 'next-i18next'
// Hooks
import { useAccount } from 'shared/hooks/use-account.mjs'
import { useBackend } from 'shared/hooks/use-backend.mjs'
import { useToast } from 'shared/hooks/use-toast.mjs'
// Context
import { LoadingContext } from 'shared/context/loading-context.mjs'
// Verification methods
import { validateEmail, validateTld } from 'shared/utils.mjs'
// Components
import { BackToAccountButton } from './shared.mjs'
import { Popout } from 'shared/components/popout.mjs'

export const ns = ['account', 'toast']

export const EmailSettings = ({ title = false }) => {
  // Context
  const { loading, startLoading, stopLoading } = useContext(LoadingContext)

  // Hooks
  const { account, setAccount, token } = useAccount()
  const backend = useBackend(token)
  const { t } = useTranslation(ns)
  const toast = useToast()

  // State
  const [email, setEmail] = useState(account.email)
  const [changed, setChanged] = useState(false)

  // Helper method to update account
  const save = async () => {
    startLoading()
    const result = await backend.updateAccount({ email })
    if (result.success) {
      setAccount(result.data.account)
      toast.for.settingsSaved()
    } else toast.for.backendError()
    setChanged(true)
    stopLoading()
  }

  // Is email valid?
  const valid = (validateEmail(email) && validateTld(email)) || false

  return (
    <div className="max-w-xl">
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
      <BackToAccountButton loading={loading} />
    </div>
  )
}
