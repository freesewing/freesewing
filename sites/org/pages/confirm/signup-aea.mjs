// Dependencies
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { nsMerge, getSearchParam } from 'shared/utils.mjs'
// Hooks
import { useEffect, useState } from 'react'
import { useBackend } from 'shared/hooks/use-backend.mjs'
import { useTranslation } from 'next-i18next'
// Components
import { PageWrapper, ns as pageNs } from 'shared/components/wrappers/page.mjs'
import { BareLayout, ns as layoutNs } from 'site/components/layouts/bare.mjs'
import { WelcomeWrapper } from 'shared/components/wrappers/welcome.mjs'
import { Spinner } from 'shared/components/spinner.mjs'
import { Popout } from 'shared/components/popout/index.mjs'

// Translation namespaces used on this page
const ns = nsMerge(pageNs, layoutNs, 'confirm', 'locales', 'themes')

const SignupLinkExpired = () => <Popout fixme>Implement SignupLinkExpired compnonent</Popout>

const ActiveSignUpPage = () => {
  const backend = useBackend()
  const { t } = useTranslation(ns)

  const [error, setError] = useState(false)
  const [id, setId] = useState()
  const [check, setCheck] = useState()

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
