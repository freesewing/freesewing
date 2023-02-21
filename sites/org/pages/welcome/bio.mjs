// Hooks
import { useApp } from 'site/hooks/useApp.mjs'
import { useTranslation } from 'next-i18next'
// Dependencies
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
// Components
import { PageWrapper } from 'site/components/wrappers/page.mjs'
import { BareLayout } from 'site/components/layouts/bare.mjs'
import { AuthWrapper, ns as authNs } from 'site/components/wrappers/auth/index.mjs'
import { BioSettings, ns as bioNs } from 'site/components/account/bio/index.mjs'

// Translation namespaces used on this page
const namespaces = [...bioNs, ...authNs]

const BioPage = (props) => {
  const app = useApp(props)
  const { t } = useTranslation(namespaces)

  return (
    <PageWrapper app={app} title={t('title')} layout={BareLayout} footer={false}>
      <AuthWrapper app={app}>
        <div className="m-auto max-w-lg text-center lg:mt-12 p-8">
          <BioSettings app={app} title welcome />
        </div>
      </AuthWrapper>
    </PageWrapper>
  )
}

export default BioPage

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, namespaces)),
    },
  }
}
