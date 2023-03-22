// Hooks
import { useApp } from 'site/hooks/useApp.mjs'
import { useTranslation } from 'next-i18next'
// Dependencies
import dynamic from 'next/dynamic'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
// Components
import { PageWrapper, ns as pageNs } from 'site/components/wrappers/page.mjs'
import { BareLayout } from 'site/components/layouts/bare.mjs'
import { ns as authNs } from 'site/components/wrappers/auth/index.mjs'
import { ns as compareNs } from 'site/components/account/compare.mjs'

// Translation namespaces used on this page
const namespaces = [...new Set([...compareNs, ...authNs, ...pageNs])]

/*
 * Some things should never generated as SSR
 * So for these, we run a dynamic import and disable SSR rendering
 */
const DynamicAuthWrapper = dynamic(
  () => import('site/components/wrappers/auth/index.mjs').then((mod) => mod.AuthWrapper),
  { ssr: false }
)
const DynamicCompare = dynamic(
  () => import('site/components/account/compare.mjs').then((mod) => mod.CompareSettings),
  { ssr: false }
)

const ComparePage = (props) => {
  const app = useApp(props)
  const { t } = useTranslation(namespaces)

  return (
    <PageWrapper app={app} title={t('title')} layout={BareLayout} footer={false}>
      <DynamicAuthWrapper app={app}>
        <div className="m-auto max-w-lg text-center lg:mt-12 p-8">
          <DynamicCompare app={app} title welcome />
        </div>
      </DynamicAuthWrapper>
    </PageWrapper>
  )
}

export default ComparePage

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, namespaces)),
    },
  }
}
