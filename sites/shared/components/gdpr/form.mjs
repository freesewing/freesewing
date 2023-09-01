// Hooks
import { useState } from 'react'
import { useTranslation } from 'next-i18next'
// Components
import { Popout } from 'shared/components/popout/index.mjs'
import { Link } from 'shared/components/link.mjs'
import { GdprAccountDetails, ns as gdprNs } from 'shared/components/gdpr/details.mjs'

export const ns = ['gdpr', gdprNs]

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

export const ConsentForm = ({ submit }) => {
  // State
  const [details, setDetails] = useState(false)
  const [consent1, setConsent1] = useState(false)
  const [consent2, setConsent2] = useState(false)

  // Hooks
  const { t } = useTranslation(ns)

  const giveConsent = () => {
    setConsent1(true)
    setConsent2(true)
  }

  return (
    <>
      <h1>{t('gdpr:privacyMatters')}</h1>
      <p>{t('gdpr:compliant')}</p>
      <p>{t('gdpr:consentWhyAnswer')}</p>
      <h5 className="mt-8">{t('gdpr:accountQuestion')}</h5>
      {details ? <GdprAccountDetails /> : null}
      {consent1 ? (
        <>
          <Checkbox value={consent1} setter={setConsent1} label={t('gdpr:yesIDo')} />
          <Checkbox value={consent2} setter={setConsent2} label={t('gdpr:openDataQuestion')} />
        </>
      ) : (
        <button className="btn btn-primary btn-lg w-full mt-4" onClick={giveConsent}>
          {t('gdpr:clickHere')}
        </button>
      )}
      {consent1 && !consent2 ? <Popout note>{t('openDataInfo')}</Popout> : null}
      <p className="text-center">
        <button className="btn btn-neutral btn-ghost btn-sm" onClick={() => setDetails(!details)}>
          {t(details ? 'gdpr:hideDetails' : 'gdpr:showDetails')}
        </button>
      </p>
      {!consent1 && <Popout note>{t('gdpr:noConsentNoAccountCreation')}</Popout>}
      {consent1 && (
        <button
          onClick={() => submit({ consent1, consent2 })}
          className="btn btn-lg w-full mt-8 btn-primary"
        >
          <span>{t('gdpr:createAccount')}</span>
        </button>
      )}
      <p className="text-center opacity-50 mt-12">
        <Link href="/docs/various/privacy" className="hover:text-secondary underline">
          FreeSewing Privacy Notice
        </Link>
      </p>
    </>
  )
}
