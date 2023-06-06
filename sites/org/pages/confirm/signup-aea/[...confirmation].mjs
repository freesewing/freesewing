// Hooks
import { useEffect, useState } from 'react'
import { useAccount } from 'shared/hooks/use-account.mjs'
import { useBackend } from 'shared/hooks/use-backend.mjs'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'
// Dependencies
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
// Components
import { PageWrapper, ns as pageNs } from 'shared/components/wrappers/page.mjs'
import { BareLayout, ns as layoutNs } from 'site/components/layouts/bare.mjs'
import { WelcomeWrapper } from 'shared/components/wrappers/welcome.mjs'
import { Spinner } from 'shared/components/spinner.mjs'
import { Popout } from 'shared/components/popout.mjs'

// Translation namespaces used on this page
const ns = Array.from(new Set([...pageNs, ...layoutNs, 'confirm', 'locales', 'themes']))

const SignupLinkExpired = () => <Popout fixme>Implement SignupLinkExpired compnonent</Popout>

const ActiveSignUpPage = () => {
  const router = useRouter()
  // Get confirmation ID and check from url
  const [confirmationId, confirmationCheck] = router.asPath.slice(1).split('/').slice(2)
  const page = {
    path: ['confirm', 'emailchange', confirmationId],
  }

  const { token } = useAccount()
  const backend = useBackend(token)
  const { t } = useTranslation(ns)

  const [id, setId] = useState(false)
  const [error, setError] = useState(false)

  useEffect(() => {
    // Async inside useEffect requires this approach
    const getConfirmation = async () => {
      // Reach out to backend
      const data = await backend.loadConfirmation({
        id: confirmationId,
        check: confirmationCheck,
      })
      if (data instanceof Error) setError(true)
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
        <Spinner className="w-16 h-16 m-auto text-primary animate-spin mt-12" />
        <pre>{JSON.stringify(id)}</pre>
      </WelcomeWrapper>
      <br />
    </PageWrapper>
  )
}

export default ActiveSignUpPage

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
