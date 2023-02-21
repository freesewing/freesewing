// Hooks
import { useApp } from 'site/hooks/useApp.mjs'
import { useTranslation } from 'next-i18next'
// Dependencies
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
// Components
import { PageWrapper } from 'site/components/wrappers/page.mjs'
import { BareLayout } from 'site/components/layouts/bare.mjs'
import { AuthWrapper, ns as authNs } from 'site/components/wrappers/auth/index.mjs'
import { UsernameSettings, ns as usernameNs } from 'site/components/account/username/index.mjs'

// Translation namespaces used on this page
const namespaces = [...usernameNs, ...authNs]

const UsernamePage = (props) => {
  const app = useApp(props)
  const { t } = useTranslation(namespaces)

  return (
    <PageWrapper app={app} title={t('title')} layout={BareLayout} footer={false}>
      <AuthWrapper app={app}>
        <div className="m-auto max-w-lg text-center lg:mt-12 p-8">
          <UsernameSettings app={app} title welcome />
        </div>
      </AuthWrapper>
    </PageWrapper>
  )
}

export default UsernamePage

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, namespaces)),
    },
  }
}
