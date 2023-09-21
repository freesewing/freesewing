// Dependencies
import { useState, useContext } from 'react'
import { useTranslation } from 'next-i18next'
import { nsMerge } from 'shared/utils.mjs'
// Context
import { LoadingStatusContext } from 'shared/context/loading-status-context.mjs'
// Hooks
import { useAccount } from 'shared/hooks/use-account.mjs'
import { useBackend } from 'shared/hooks/use-backend.mjs'
// Components
import Link from 'next/link'
import { Popout } from 'shared/components/popout/index.mjs'
import { BackToAccountButton } from './shared.mjs'
import { SaveSettingsButton } from 'shared/components/buttons/save-settings-button.mjs'
import { GdprAccountDetails, ns as gdprNs } from 'shared/components/gdpr/details.mjs'

export const ns = nsMerge(gdprNs, 'account', 'status')

const Checkbox = ({ value, setter, label, children = null }) => (
  <div
    className={`form-control p-4 hover:cursor-pointer rounded border-l-8 my-2
    ${value ? 'border-success bg-success' : 'border-error bg-error'}
    bg-opacity-10 shadow`}
    onClick={() => setter(value ? false : true)}
  >
    <div className="form-control flex flex-row items-center gap-2">
      <input
        type="checkbox"
        className="checkbox"
        checked={value ? 'checked' : ''}
        onChange={() => setter(value ? false : true)}
      />
      <span className="label-text">{label}</span>
    </div>
    {children}
  </div>
)

export const ConsentSettings = ({ title = false }) => {
  // Hooks
  const { account, setAccount, setToken } = useAccount()
  const backend = useBackend()
  const { setLoadingStatus } = useContext(LoadingStatusContext)
  const { t } = useTranslation(ns)

  // State
  const [consent1, setConsent1] = useState(account?.consent > 0)
  const [consent2, setConsent2] = useState(account?.consent > 1)

  // Helper method to update the account
  const update = async () => {
    let newConsent = 0
    if (consent1) newConsent = 1
    if (consent1 && consent2) newConsent = 2
    if (newConsent !== account.consent) {
      setLoadingStatus([true, 'processingUpdate'])
      const result = await backend.updateAccount({ consent: newConsent })
      if (result.data?.result === 'success') {
        setLoadingStatus([true, 'settingsSaved', true, true])
        setAccount(result.data.account)
      } else setLoadingStatus([true, 'backendError', true, true])
    }
  }

  // Helper method to remove the account
  const removeAccount = async () => {
    setLoadingStatus([true, 'processingUpdate'])
    const result = await backend.removeAccount()
    if (result === true) setLoadingStatus([true, 'settingsSaved', true, true])
    else setLoadingStatus([true, 'backendError', true, true])
    setToken(null)
    setAccount({ username: false })
  }

  return (
    <div className="max-w-xl xl:pl-4">
      {title ? <h2 className="text-4xl">{t('privacyMatters')}</h2> : null}
      <p>{t('compliant')}</p>
      <p>{t('consentWhyAnswer')}</p>
      <h5 className="mt-8">{t('accountQuestion')}</h5>
      <GdprAccountDetails />
      {consent1 ? (
        <Checkbox value={consent1} setter={setConsent1} label={t('yesIDo')} />
      ) : (
        <button
          className="btn btn-primary btn-lg w-full mt-4"
          onClick={() => setConsent1(!consent1)}
        >
          {t('clickHere')}
        </button>
      )}
      {consent1 ? (
        <Checkbox value={consent2} setter={setConsent2} label={t('openDataQuestion')} />
      ) : null}
      {consent1 && !consent2 ? <Popout note>{t('openDataInfo')}</Popout> : null}
      {!consent1 && <Popout warning>{t('noConsentNoAccount')}</Popout>}
      {consent1 ? (
        <SaveSettingsButton btnProps={{ onClick: update }} />
      ) : (
        <SaveSettingsButton
          label={t('account:removeAccount')}
          btnProps={{
            onClick: removeAccount,
            className: 'btn mt-4 capitalize w-full btn-error',
          }}
        />
      )}
      <BackToAccountButton />
      <p className="text-center opacity-50 mt-12">
        <Link href="/docs/various/privacy" className="hover:text-secondary underline">
          FreeSewing Privacy Notice
        </Link>
      </p>
    </div>
  )
}
