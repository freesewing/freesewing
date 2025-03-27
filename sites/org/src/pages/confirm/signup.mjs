// Dependencies
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { nsMerge, getSearchParam } from 'shared/utils.mjs'
// Hooks
import { useEffect, useState } from 'react'
import { useAccount } from 'shared/hooks/use-account.mjs'
import { useBackend } from 'shared/hooks/use-backend.mjs'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'
// Components
import { PageWrapper, ns as pageNs } from 'shared/components/wrappers/page.mjs'
import { BareLayout, ns as layoutNs } from 'site/components/layouts/bare.mjs'
import { WelcomeWrapper } from 'shared/components/wrappers/welcome.mjs'
import { Spinner } from 'shared/components/spinner.mjs'
import { Popout } from 'shared/components/popout/index.mjs'
import { ConsentForm, ns as gdprNs } from 'shared/components/gdpr/form.mjs'

// Translation namespaces used on this page
const ns = nsMerge(pageNs, layoutNs, gdprNs, 'confirm', 'susi')

const SignupLinkExpired = () => <Popout fixme>Implement SignupLinkExpired component</Popout>

const ConfirmSignUpPage = () => {
  // Hooks
  const router = useRouter()

  const { setAccount, setToken } = useAccount()
  const backend = useBackend()
  const { t } = useTranslation(ns)

  const [ready, setReady] = useState(false)
  const [error, setError] = useState(false)
  const [id, setId] = useState()
  const [check, setCheck] = useState()

  const createAccount = async ({ consent1, consent2 }) => {
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
      }
    }
  }

  useEffect(() => {
    const newId = getSearchParam('id')
    const newCheck = getSearchParam('check')
    if (newId !== id) setId(newId)
    if (newCheck !== check) setCheck(newCheck)
  }, [id, check])

  useEffect(() => {
    // Async inside useEffect requires this approach
    const getConfirmation = async () => {
      // Reach out to backend
      const data = await backend.loadConfirmation({ id, check })
      if (data instanceof Error) setError(true)
      setReady(true)
    }
    // Call async method
    getConfirmation()
  }, [backend, id, check])

  const page = {
    path: ['confirm', 'emailchange', id],
  }

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
        {ready ? <ConsentForm submit={createAccount} /> : <Spinner className="w-8 h-8 m-auto" />}
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
