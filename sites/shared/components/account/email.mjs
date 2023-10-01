// Dependencies
import { useState, useContext } from 'react'
import { useTranslation } from 'next-i18next'
// Context
import { LoadingStatusContext } from 'shared/context/loading-status-context.mjs'
// Hooks
import { useAccount } from 'shared/hooks/use-account.mjs'
import { useBackend } from 'shared/hooks/use-backend.mjs'
// Verification methods
import { validateEmail, validateTld } from 'shared/utils.mjs'
// Components
import { BackToAccountButton } from './shared.mjs'
import { Popout } from 'shared/components/popout/index.mjs'
import { EmailInput } from 'shared/components/inputs.mjs'
import { DynamicOrgDocs } from 'site/components/dynamic-org-docs.mjs'

export const ns = ['account', 'status']

export const EmailSettings = () => {
  // Hooks
  const { account, setAccount } = useAccount()
  const backend = useBackend()
  const { t, i18n } = useTranslation(ns)
  const { setLoadingStatus } = useContext(LoadingStatusContext)

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
      {changed ? (
        <Popout note>
          <h3>{t('oneMoreThing')}</h3>
          <p>{t('emailChangeConfirmation')}</p>
        </Popout>
      ) : (
        <>
          <EmailInput
            id="account-email"
            label={t('account:email')}
            placeholder={t('account:email')}
            update={setEmail}
            labelBL={t('emailTitle')}
            current={email}
            original={account.email}
            valid={() => valid}
            docs={<DynamicOrgDocs language={i18n.language} path={`site/account/email`} />}
          />
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
