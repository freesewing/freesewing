import { useEffect } from 'react'
import Page from 'site/components/wrappers/page.js'
import useApp from 'site/hooks/useApp.js'
import useBackend from 'site/hooks/useBackend.js'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useTranslation } from 'next-i18next'
import Layout from 'site/components/layouts/bare'
import Link from 'next/link'
import { useState } from 'react'
import WelcomeWrapper from 'site/components/wrappers/welcome.js'
import Spinner from 'shared/components/icons/spinner.js'
import { useRouter } from 'next/router'
import Popout from 'shared/components/popout.js'
import {
  GdprProfileDetails,
  GdprMeasurementsDetails,
  namespaces as gdprNs,
} from 'site/components/gdpr/details.js'
import Robot from 'shared/components/robot/index.js'

// Translation namespaces used on this page
const namespaces = [...gdprNs]

export const SignupLinkExpired = () => {
  const { t } = useTranslation('confirm')

  return (
    <div className="p-8 max-w-md">
      <h1 className="text-center">{t('signupLinkExpired')}</h1>
      <Robot pose="shrug" className="w-full" embed />
      <Link className="btn btn-primary btn-lg w-full" href="/signup">
        {t('signupAgain')}
      </Link>
    </div>
  )
}

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

const ConfirmSignUpPage = (props) => {
  const app = useApp(props)
  const backend = useBackend(app)
  const { t } = useTranslation(namespaces)
  const router = useRouter()

  const [id, setId] = useState(false)
  const [pDetails, setPDetails] = useState(false)
  const [mDetails, setMDetails] = useState(false)
  const [profile, setProfile] = useState(false)
  const [measurements, setMeasurements] = useState(false)
  const [openData, setOpenData] = useState(true)
  const [ready, setReady] = useState(false)
  const [error, setError] = useState(false)

  const createAccount = async () => {
    let consent = 0
    if (profile) consent = 1
    if (profile && measurements) consent = 2
    if (profile && measurements && openData) consent = 3
    if (consent > 0 && id) {
      const data = await backend.confirmSignup({ consent, id, ...app.loadHelpers })
      if (data?.token && data?.account) {
        app.setToken(data.token)
        app.setAccount(data.account)
        router.push('/welcome')
      } else {
        // Something went wrong
        console.log('something went wrong')
      }
    }
  }

  useEffect(() => {
    // Async inside useEffect requires this approach
    const getConfirmation = async () => {
      // Get confirmation ID and check from url
      const [confirmationId, confirmationCheck] = router.asPath.slice(1).split('/').slice(2)
      // Reach out to backend
      const data = await backend.loadConfirmation({
        id: confirmationId,
        check: confirmationCheck,
        ...app.loadHelpers,
      })
      if (data instanceof Error) setError(true)
      setReady(true)
      setId(confirmationId)
    }
    // Call async method
    getConfirmation()
  }, [])

  // Short-circuit errors
  if (error)
    return (
      <Page app={app} title={t('joinFreeSewing')} layout={Layout} footer={false}>
        <WelcomeWrapper theme={app.theme}>
          <SignupLinkExpired />
        </WelcomeWrapper>
      </Page>
    )

  const partA = (
    <>
      <h5 className="mt-8">{t('profileQuestion')}</h5>
      {pDetails ? <GdprProfileDetails /> : null}
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
          <p className="text-center">
            <button
              className="btn btn-neutral btn-ghost btn-sm"
              onClick={() => setPDetails(!pDetails)}
            >
              {t(pDetails ? 'hideDetails' : 'showDetails')}
            </button>
          </p>
          <Popout warning>{t('noConsentNoAccount')}</Popout>
        </>
      )}
    </>
  )
  const partB = (
    <>
      <h5 className="mt-8">{t('peopleQuestion')}</h5>
      {mDetails ? <GdprMeasurementsDetails /> : null}
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
      {mDetails && measurements ? (
        <Checkbox value={openData} setter={setOpenData} label={t('openDataQuestion')} />
      ) : null}
      {measurements && !openData ? <Popout note>{t('openDataInfo')}</Popout> : null}
      {!measurements && (
        <>
          <p className="text-center">
            <button
              className="btn btn-neutral btn-ghost btn-sm"
              onClick={() => setMDetails(!mDetails)}
            >
              {t(mDetails ? 'hideDetails' : 'showDetails')}
            </button>
          </p>
          <Popout warning>{t('noConsentNoPatterns')}</Popout>
        </>
      )}
    </>
  )

  return (
    <Page app={app} title={t('joinFreeSewing')} layout={Layout} footer={false}>
      <WelcomeWrapper theme={app.theme}>
        {ready ? (
          <>
            <h1>{t('privacyMatters')}</h1>
            <p>{t('compliant')}</p>
            <p>{t('consentWhyAnswer')}</p>
            {partA}
            {profile && partB}
          </>
        ) : (
          <Spinner className="w-8 h-8 m-auto" />
        )}
        {profile && !measurements && (
          <button
            className="btn btn-primary btn-outline btn-lg w-full mt-4"
            onClick={createAccount}
          >
            {t('createLimitedAccount')}
          </button>
        )}
        {profile && measurements && (
          <button
            onClick={createAccount}
            className={`btn btn-lg w-full mt-8 ${app.loading ? 'btn-accent' : 'btn-primary'}`}
          >
            {app.loading ? (
              <>
                <Spinner />
                <span>{t('processing')}</span>
              </>
            ) : (
              <span>{t('createAccount')}</span>
            )}
          </button>
        )}
        <p className="text-center opacity-50 mt-12">
          <Link href="/docs/various/privacy" className="hover:text-secondary underline">
            FreeSewing Privacy Notice
          </Link>
        </p>
      </WelcomeWrapper>
    </Page>
  )
}

export default ConfirmSignUpPage

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale)),
    },
  }
}

export async function getStaticPaths() {
  return {
    paths: [],
    fallback: true,
  }
}
