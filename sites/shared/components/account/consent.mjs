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
import Link from 'next/link'
import { Popout } from 'shared/components/popout.mjs'
import { BackToAccountButton } from './shared.mjs'
import { SaveSettingsButton } from 'shared/components/buttons/save-settings-button.mjs'
import {
  GdprProfileDetails,
  GdprMeasurementsDetails,
  ns as gdprNs,
} from 'site/components/gdpr/details.mjs'

export const ns = [...gdprNs, 'account', 'toast']

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
  // Context
  const { loading, startLoading, stopLoading } = useContext(LoadingContext)

  // Hooks
  const { account, token, setAccount, setToken } = useAccount()
  const backend = useBackend(token)
  const toast = useToast()
  const { t } = useTranslation(ns)

  // State
  const [profile, setProfile] = useState(account?.consent > 0)
  const [measurements, setMeasurements] = useState(account?.consent > 1)
  const [openData, setOpenData] = useState(account?.consent > 2)

  // Helper method to update the account
  const update = async () => {
    let newConsent = 0
    if (profile) newConsent = 1
    if (profile && measurements) newConsent = 2
    if (profile && measurements && openData) newConsent = 3
    if (newConsent !== account.consent) {
      startLoading()
      const result = await backend.updateAccount({ consent: newConsent })
      if (result === true) toast.for.settingsSaved()
      else toast.for.backendError()
      stopLoading()
    }
  }

  // Helper method to remove the account
  const removeAccount = async () => {
    startLoading()
    const result = await backend.removeAccount()
    if (result === true) toast.for.settingsSaved()
    else toast.for.backendError()
    setToken(null)
    setAccount({ username: false })
    stopLoading()
  }

  // Part A of the consent screen
  const partA = (
    <>
      <h5 className="mt-8">{t('profileQuestion')}</h5>
      <GdprProfileDetails />
      {profile ? (
        <Checkbox value={profile} setter={setProfile} label={t('yesIDo')} />
      ) : (
        <>
          <button
            className="btn btn-primary btn-lg w-full mt-4 flex flex-row items-center justify-between"
            onClick={() => setProfile(!profile)}
          >
            {t('clickHere')}
            <span>1/2</span>
          </button>
          <Popout warning>{t('profileWarning')}</Popout>
        </>
      )}
    </>
  )
  // Part B of the consent screen
  const partB = (
    <>
      <h5 className="mt-8">{t('setQuestion')}</h5>
      <GdprMeasurementsDetails />
      {measurements ? (
        <Checkbox value={measurements} setter={setMeasurements} label={t('yesIDo')} />
      ) : (
        <button
          className="btn btn-primary btn-lg w-full mt-4 flex flex-row items-center justify-between"
          onClick={() => setMeasurements(!measurements)}
        >
          {t('clickHere')}
          <span>2/2</span>
        </button>
      )}
      {measurements ? (
        <Checkbox value={openData} setter={setOpenData} label={t('openDataQuestion')} />
      ) : null}
      {measurements && !openData ? <Popout note>{t('openDataInfo')}</Popout> : null}
      {!measurements && <Popout warning>{t('noConsentNoPatterns')}</Popout>}
    </>
  )

  return (
    <div className="max-w-xl xl:pl-4">
      {title ? <h2 className="text-4xl">{t('privacyMatters')}</h2> : null}
      <p>{t('compliant')}</p>
      <p>{t('consentWhyAnswer')}</p>
      {partA}
      {profile && partB}
      {profile && measurements ? <SaveSettingsButton btnProps={{ onClick: update }} /> : null}
      {profile && !measurements ? (
        <SaveSettingsButton
          label={t('revokeConsent')}
          btnProps={{
            onClick: update,
            className: 'btn mt-4 capitalize w-full btn-warning',
          }}
        />
      ) : null}
      {!profile ? (
        <SaveSettingsButton
          label={t('account:removeAccount')}
          btnProps={{
            onClick: removeAccount,
            className: 'btn mt-4 capitalize w-full btn-error',
          }}
        />
      ) : null}

      <BackToAccountButton loading={loading} />
      <p className="text-center opacity-50 mt-12">
        <Link href="/docs/various/privacy" className="hover:text-secondary underline">
          FreeSewing Privacy Notice
        </Link>
      </p>
    </div>
  )
}
