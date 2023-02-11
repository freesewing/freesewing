// Hooks
import { useApp } from 'site/hooks/useApp.mjs'
import { useTranslation } from 'next-i18next'
// Dependencies
import dynamic from 'next/dynamic'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
// Components
import { PageWrapper } from 'site/components/wrappers/page.mjs'
import { BareLayout } from 'site/components/layouts/bare.mjs'
import { ns as authNs } from 'site/components/wrappers/auth/index.mjs'
import { Popout } from 'shared/components/popout.mjs'
import { PageLink } from 'shared/components/page-link.mjs'

// Translation namespaces used on this page
const namespaces = ['account', ...authNs]

/*
 * Some things should never generated as SSR
 * So for these, we run a dynamic import and disable SSR rendering
 */
const DynamicAuthWrapper = dynamic(
  () => import('site/components/wrappers/auth/index.mjs').then((mod) => mod.AuthWrapper),
  { ssr: false }
)

const DynamicAccountProfile = dynamic(
  () => import('site/components/account/profile.mjs').then((mod) => mod.AccountProfile),
  { ssr: false }
)

const AccountPage = (props) => {
  const app = useApp(props)
  const { t } = useTranslation(namespaces)
  const crumbs = [[t('profile'), 'profile']]

  return (
    <PageWrapper app={app} title={t('yourProfile')} crumbs={crumbs}>
      <DynamicAuthWrapper app={app}>
        <DynamicAccountProfile app={app} />
      </DynamicAuthWrapper>
      <Popout link compact>
        <PageLink href={`/users/${app.account.username}`} txt={`/users/${app.account?.username}`} />
      </Popout>
      <pre>{JSON.stringify(app.toasts, null, 2)}</pre>
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
