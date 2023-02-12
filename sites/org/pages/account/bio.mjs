// Hooks
import { useApp } from 'site/hooks/useApp.mjs'
import { useTranslation } from 'next-i18next'
// Dependencies
import dynamic from 'next/dynamic'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
// Components
import { PageWrapper } from 'site/components/wrappers/page.mjs'
import { ns as authNs } from 'site/components/wrappers/auth/index.mjs'
import { BioSettings, ns as bioNs } from 'site/components/account/bio/index.mjs'

// Translation namespaces used on this page
const namespaces = ['account', ...authNs, ...bioNs]

/*
 * Some things should never generated as SSR
 * So for these, we run a dynamic import and disable SSR rendering
 */
const DynamicAuthWrapper = dynamic(
  () => import('site/components/wrappers/auth/index.mjs').then((mod) => mod.AuthWrapper),
  { ssr: false }
)

const DynamicBio = dynamic(
  () => import('site/components/account/bio/index.mjs').then((mod) => mod.BioSettings),
  { ssr: false }
)

const AccountPage = (props) => {
  const app = useApp(props)
  const { t } = useTranslation(namespaces)
  const crumbs = [
    [t('yourAccount'), 'account'],
    [t('bio'), 'bio'],
  ]

  return (
    <PageWrapper app={app} title={t('bio')} crumbs={crumbs}>
      <DynamicAuthWrapper app={app}>
        <DynamicBio app={app} />
      </DynamicAuthWrapper>
    </PageWrapper>
  )
}

export default AccountPage

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale)),
    },
  }
}
