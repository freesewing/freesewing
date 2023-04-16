// Hooks
import { useApp } from 'shared/hooks/use-app.mjs'
import { useTranslation } from 'next-i18next'
// Dependencies
import dynamic from 'next/dynamic'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
// Components
import { PageWrapper } from 'shared/components/wrappers/page.mjs'
import { BareLayout } from 'site/components/layouts/bare.mjs'
import { ns as authNs } from 'shared/components/wrappers/auth/index.mjs'

// Translation namespaces used on this page
const namespaces = [...new Set(['account', ...authNs])]

/*
 * Some things should never generated as SSR
 * So for these, we run a dynamic import and disable SSR rendering
 */
const DynamicAuthWrapper = dynamic(
  () => import('shared/components/wrappers/auth/index.mjs').then((mod) => mod.AuthWrapper),
  { ssr: false }
)

const DynamicControl = dynamic(
  () => import('shared/components/account/control.mjs').then((mod) => mod.ControlSettings),
  { ssr: false }
)

const WelcomePage = (props) => {
  const app = useApp(props)
  const { t } = useTranslation(namespaces)

  return (
    <PageWrapper app={app} title={t('title')} layout={BareLayout} footer={false}>
      <DynamicAuthWrapper app={app}>
        <div className="m-auto max-w-lg text-center lg:mt-24 p-8">
          <DynamicControl app={app} title welcome />
        </div>
      </DynamicAuthWrapper>
    </PageWrapper>
  )
}

export default WelcomePage

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale)),
      page: {
        path: ['welcome'],
      },
    },
  }
}
