// Dependencies
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { nsMerge, horFlexClasses, getSearchParam } from 'shared/utils.mjs'
// Hooks
import { useEffect, useState } from 'react'
import { useAccount } from 'shared/hooks/use-account.mjs'
import { useBackend } from 'shared/hooks/use-backend.mjs'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'
// Components
import { PageWrapper, ns as pageNs } from 'shared/components/wrappers/page.mjs'
import { BareLayout } from 'site/components/layouts/bare.mjs'
import { Spinner } from 'shared/components/spinner.mjs'
import { Robot } from 'shared/components/robot/index.mjs'
import { KeyIcon, LockIcon } from 'shared/components/icons.mjs'
import { MfaInput } from 'shared/components/inputs.mjs'
import Link from 'next/link'

// Translation namespaces used on this page
const ns = nsMerge('susi', 'locales', 'themes', pageNs)

const SigninFailed = ({ error }) => {
  const { t } = useTranslation(ns)

  let title = t('susi:signinFailed')
  let msg = t('susi:who knows')
  if (error) {
    if (error === 'noSuchUser') {
      title = t('susi:noSuchUser')
      msg = t('susi:noSuchUserMsg')
    } else if (error === 'consentLacking') {
      title = t('susi:consentLacking')
      msg = t('susi:consentLackingMsg')
    } else if (error === 'statusLacking') {
      title = t('susi:statusLacking')
      msg = t('susi:statusLackingMsg')
    } else if (error === 'accountBlocked') {
      title = t('susi:accountBlocked')
      msg = t('susi:accountBlockedMsg')
    } else if (error === 'signInFailed') {
      title = t('susi:signInFailed')
      msg = t('susi:signInFailedMsg')
    }
  }

  return (
    <div className="p-8 max-w-md">
      <h3 className="text-center">{title}</h3>
      <Robot pose="shrug" className="w-2/3 m-auto" embed />
      <p>{msg}</p>
      <Link className={`btn btn-primary w-full ${horFlexClasses}`} href="/signin">
        <KeyIcon />
        {t('susi:signIn')}
      </Link>
    </div>
  )
}

const Wrapper = ({ page, t, children }) => (
  <PageWrapper {...page} title={t('susi:oneMomentPlease')} layout={BareLayout} footer={false}>
    <section className="m-0 p-0 w-full">
      <div className="mt-4 lg:mt-32 max-w-xl m-auto">{children}</div>
    </section>
  </PageWrapper>
)

/*
 * Each page MUST be wrapped in the PageWrapper component.
 * You also MUST spread props.page into this wrapper component
 * and set path and locale when it's dynamic (like on this page)
 */
const ConfirmSignInPage = ({ page }) => {
  const router = useRouter()
  const { setAccount, setToken } = useAccount()
  const backend = useBackend()
  const { t } = useTranslation(ns)

  const [error, setError] = useState(false)
  const [id, setId] = useState()
  const [check, setCheck] = useState()
  const [mfa, setMfa] = useState(false)
  const [mfaCode, setMfaCode] = useState()

  useEffect(() => {
    const newId = getSearchParam('id')
    const newCheck = getSearchParam('check')
    if (newId !== id) setId(newId)
    if (newCheck !== check) setCheck(newCheck)
  }, [id, check])

  const storeAccount = async (data) => {
    if (data?.token && data?.account) {
      setToken(data.token)
      setAccount(data.account)
      router.push('/account')
    } else {
      setError(data)
    }
  }

  useEffect(() => {
    // Async inside useEffect requires this approach
    const getConfirmation = async () => {
      // Reach out to backend
      const result = await backend.signInFromLink({ id, check, token: mfaCode })
      if (result.data?.token) return storeAccount(result.data)
      if (result.data.error) {
        if (result.data.error === 'mfaTokenRequired') {
          return setMfa(true)
        } else {
          return setError(result.data.error)
        }
      }
      return setError(true)
    }
    // Call async method
    if (id) getConfirmation()
  }, [backend, id, check, router, setAccount, setToken, setMfa])

  if (page) page.path = ['confirm', 'emailchange', id]

  // Short-circuit errors
  if (error)
    return (
      <Wrapper page={page} t={t}>
        <SigninFailed error={error} />
      </Wrapper>
    )

  if (mfa) {
    const btnClasses = `btn btn-primary capitalize w-full mt-4 'btn-primary'
    } transition-colors ease-in-out duration-300 ${horFlexClasses}`
    return (
      <Wrapper page={page} t={t}>
        <h1 className="text-inherit text-3xl lg:text-5xl mb-4 pb-0 text-center">
          {t('susi:mfaCode')}
        </h1>
        <p className="text-inherit text-lg text-center">{t('susi:mfaCodeMsg')}</p>
        <MfaInput label={t('susi:mfaCode')} update={setMfaCode} value={mfaCode} />
        <button
          className={btnClasses}
          tabIndex="-1"
          role="button"
          onClick={async () => {
            const result = await backend.signInFromLink({ id, check, token: mfaCode })
            if (result.data?.token) return storeAccount(result.data)
            if (result.data.error) {
              return setError(result.data.error)
            }
            return setError(true)
          }}
        >
          <span className="hidden lg:block">
            <KeyIcon />
          </span>
          <span className="pl-2">{t('susi:signIn')}</span>
          <span className="hidden lg:block">
            <LockIcon />
          </span>
        </button>
      </Wrapper>
    )
  }

  return (
    <Wrapper page={page} t={t}>
      <h1>{t('susi:oneMomentPlease')}</h1>
      <Spinner className="w-8 h-8 m-auto animate-spin" />
    </Wrapper>
  )
}

export default ConfirmSignInPage

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ns)),
    },
  }
}
