// Hooks
import { useApp } from 'site/hooks/useApp.mjs'
import { useTranslation } from 'next-i18next'
// Dependencies
import dynamic from 'next/dynamic'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
// Components
import { PageWrapper, ns as pageNs } from 'site/components/wrappers/page.mjs'
import { ns as authNs } from 'site/components/wrappers/auth/index.mjs'
import { ns as consentNs } from 'site/components/account/consent.mjs'

// Translation namespaces used on this page
const namespaces = [...new Set([...consentNs, ...authNs, ...pageNs])]

/*
 * Some things should never generated as SSR
 * So for these, we run a dynamic import and disable SSR rendering
 */
const DynamicAuthWrapper = dynamic(
  () => import('site/components/wrappers/auth/index.mjs').then((mod) => mod.AuthWrapper),
  { ssr: false }
)

const DynamicConsent = dynamic(
  () => import('site/components/account/consent.mjs').then((mod) => mod.ConsentSettings),
  { ssr: false }
)

const AccountPage = (props) => {
  const app = useApp(props)
  const { t } = useTranslation(namespaces)
  const crumbs = [
    [t('account:yourAccount'), '/account'],
    [t('consent'), '/account/consent'],
  ]

  return (
    <PageWrapper app={app} title={t('account:consent')} crumbs={crumbs}>
      <DynamicAuthWrapper app={app}>
        <DynamicConsent app={app} title />
      </DynamicAuthWrapper>
    </PageWrapper>
  )
}

export default AccountPage

export async function getStaticProps({ locale }) {
  console.log(namespaces)
  return {
    props: {
      ...(await serverSideTranslations(locale, namespaces)),
    },
  }
}
