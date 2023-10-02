// Dependencies
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { nsMerge, horFlexClasses } from 'shared/utils.mjs'
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
import { KeyIcon } from 'shared/components/icons.mjs'
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
  // Get confirmation ID and check from url
  const [confirmationId, confirmationCheck] = router.asPath.slice(1).split('/').slice(2)
  const { setAccount, setToken } = useAccount()
  const backend = useBackend()
  const { t } = useTranslation(ns)

  const [error, setError] = useState(false)

  useEffect(() => {
    const storeAccount = async (data) => {
      if (data?.token && data?.account) {
        setToken(data.token)
        setAccount(data.account)
        router.push('/account')
      } else {
        setError(data)
      }
    }
    // Async inside useEffect requires this approach
    const getConfirmation = async () => {
      // Reach out to backend
      const result = await backend.signInFromLink({
        id: confirmationId,
        check: confirmationCheck,
      })
      if (result.data?.token) return storeAccount(result.data)
      if (result.data.error) return setError(result.data.error)
      return setError(true)
    }
    // Call async method
    getConfirmation()
  }, [backend, confirmationCheck, confirmationId, router, setAccount, setToken])

  if (page) page.path = ['confirm', 'emailchange', confirmationId]

  // Short-circuit errors
  if (error)
    return (
      <Wrapper page={page} t={t}>
        <SigninFailed error={error} />
      </Wrapper>
    )

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

export async function getStaticPaths() {
  return {
    paths: [],
    fallback: true,
  }
}
