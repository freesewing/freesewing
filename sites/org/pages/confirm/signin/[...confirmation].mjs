// Hooks
import { useEffect, useState } from 'react'
import { useAccount } from 'shared/hooks/use-account.mjs'
import { useBackend } from 'shared/hooks/use-backend.mjs'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'
// Dependencies
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import Link from 'next/link'
// Components
import { PageWrapper } from 'shared/components/wrappers/page.mjs'
import { BareLayout } from 'site/components/layouts/bare.mjs'
import { Spinner } from 'shared/components/spinner.mjs'
import { Robot } from 'shared/components/robot/index.mjs'
import { FlexButtonText } from 'site/components/buttons/flex-button-text.mjs'
import { LeftIcon, KeyIcon } from 'shared/components/icons.mjs'

// Translation namespaces used on this page
const ns = Array.from(new Set(['signin', 'locales', 'themes']))

export const SigninLinkExpired = () => {
  const { t } = useTranslation('signin')

  return (
    <div className="p-8 max-w-md">
      <h1 className="text-center">{t('signInFailed')}</h1>
      <Robot pose="shrug" className="w-2/3 m-auto" embed />
      <Link className="btn btn-primary btn-lg w-full" href="/signin">
        <FlexButtonText>
          <LeftIcon />
          {t('back')}
          <KeyIcon />
        </FlexButtonText>
      </Link>
    </div>
  )
}

const Wrapper = ({ page, t, children }) => (
  <PageWrapper {...page} title={t('signin:oneMomentPlease')} layout={BareLayout} footer={false}>
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
      if (result?.data?.token) return storeAccount(result.data)
      if (result.status === 404) return setError(404)

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
        <SigninLinkExpired />
      </Wrapper>
    )

  return (
    <Wrapper page={page} t={t}>
      <h1>{t('oneMomentPlease')}</h1>
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
