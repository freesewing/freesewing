// Hooks
import { useEffect, useState, useContext } from 'react'
import { useAccount } from 'shared/hooks/use-account.mjs'
import { useBackend } from 'shared/hooks/use-backend.mjs'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'
// Context
import { LoadingContext } from 'shared/context/loading-context.mjs'
// Dependencies
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import Link from 'next/link'
// Components
import { PageWrapper, ns as pageNs } from 'shared/components/wrappers/page.mjs'
import { BareLayout, ns as layoutNs } from 'site/components/layouts/bare.mjs'
import { WelcomeWrapper } from 'shared/components/wrappers/welcome.mjs'
import { Spinner } from 'shared/components/spinner.mjs'
import { Popout } from 'shared/components/popout/index.mjs'
import { GdprAccountDetails, ns as gdprNs } from 'shared/components/gdpr/details.mjs'

// Translation namespaces used on this page
const ns = Array.from(new Set([...pageNs, ...layoutNs, ...gdprNs, 'confirm', 'locales', 'themes']))

const SignupLinkExpired = () => <Popout fixme>Implement SignupLinkExpired compnonent</Popout>

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

const ConfirmSignUpPage = () => {
  // Context
  const { loading } = useContext(LoadingContext)
  const router = useRouter()
  // Get confirmation ID and check from url
  const [confirmationId, confirmationCheck] = router.asPath.slice(1).split('/').slice(2)
  const page = {
    path: ['confirm', 'emailchange', confirmationId],
  }

  const { token, setAccount, setToken } = useAccount()
  const backend = useBackend(token)
  const { t } = useTranslation(ns)

  const [id, setId] = useState(false)
  const [details, setDetails] = useState(false)
  const [consent1, setConsent1] = useState(false)
  const [consent2, setConsent2] = useState(false)
  const [ready, setReady] = useState(false)
  const [error, setError] = useState(false)

  const createAccount = async () => {
    let consent = 0
    if (consent1) consent = 1
    if (consent1 && consent2) consent = 2
    if (consent > 0 && id) {
      const result = await backend.confirmSignup({ consent, id })
      if (result.success) {
        setToken(result.data.token)
        setAccount(result.data.account)
        router.push('/welcome')
      } else {
        // Something went wrong
        console.log('something went wrong')
      }
    }
  }

  const giveConsent = () => {
    setConsent1(true)
    setConsent2(true)
  }

  useEffect(() => {
    // Async inside useEffect requires this approach
    const getConfirmation = async () => {
      // Reach out to backend
      const data = await backend.loadConfirmation({
        id: confirmationId,
        check: confirmationCheck,
      })
      if (data instanceof Error) setError(true)
      setReady(true)
      setId(confirmationId)
    }
    // Call async method
    getConfirmation()
  }, [backend, confirmationCheck, confirmationId])

  // Short-circuit errors
  if (error)
    return (
      <PageWrapper {...page} title={t('joinFreeSewing')} layout={BareLayout} footer={false}>
        <WelcomeWrapper>
          <SignupLinkExpired />
        </WelcomeWrapper>
      </PageWrapper>
    )

  return (
    <PageWrapper {...page} title={t('joinFreeSewing')} layout={BareLayout} footer={false}>
      <WelcomeWrapper>
        {ready ? (
          <>
            <h1>{t('gdpr:privacyMatters')}</h1>
            <p>{t('gdpr:compliant')}</p>
            <p>{t('gdpr:consentWhyAnswer')}</p>
            <h5 className="mt-8">{t('gdpr:accountQuestion')}</h5>
            {details ? <GdprAccountDetails /> : null}
            {consent1 ? (
              <>
                <Checkbox value={consent1} setter={setConsent1} label={t('gdpr:yesIDo')} />
                <Checkbox
                  value={consent2}
                  setter={setConsent2}
                  label={t('gdpr:openDataQuestion')}
                />
              </>
            ) : (
              <button className="btn btn-primary btn-lg w-full mt-4" onClick={giveConsent}>
                {t('gdpr:clickHere')}
              </button>
            )}
            {consent1 && !consent2 ? <Popout note>{t('openDataInfo')}</Popout> : null}
            <p className="text-center">
              <button
                className="btn btn-neutral btn-ghost btn-sm"
                onClick={() => setDetails(!details)}
              >
                {t(details ? 'gdpr:hideDetails' : 'gdpr:showDetails')}
              </button>
            </p>
            {!consent1 && <Popout note>{t('gdpr:noConsentNoAccountCreation')}</Popout>}
          </>
        ) : (
          <Spinner className="w-8 h-8 m-auto" />
        )}
        {consent1 && (
          <button
            onClick={createAccount}
            className={`btn btn-lg w-full mt-8 ${loading ? 'btn-accent' : 'btn-primary'}`}
          >
            {loading ? (
              <>
                <Spinner />
                <span>{t('gdpr:processing')}</span>
              </>
            ) : (
              <span>{t('gdpr:createAccount')}</span>
            )}
          </button>
        )}
        <p className="text-center opacity-50 mt-12">
          <Link href="/docs/various/privacy" className="hover:text-secondary underline">
            FreeSewing Privacy Notice
          </Link>
        </p>
      </WelcomeWrapper>
      <br />
    </PageWrapper>
  )
}

export default ConfirmSignUpPage

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ns)),
    },
  }
}

export async function getStaticPaths() {
  return {
    paths: [],
    fallback: true,
  }
}
