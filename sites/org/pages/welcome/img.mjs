// Hooks
import { useApp } from 'shared/hooks/use-app.mjs'
import { useTranslation } from 'next-i18next'
// Dependencies
import dynamic from 'next/dynamic'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
// Components
import { PageWrapper, ns as pageNs } from 'shared/components/wrappers/page.mjs'
import { BareLayout } from 'site/components/layouts/bare.mjs'
import { ns as authNs } from 'shared/components/wrappers/auth/index.mjs'
import { ns as imgNs } from 'shared/components/account/img.mjs'

// Translation namespaces used on this page
const namespaces = [...new Set([...imgNs, ...authNs, ...pageNs])]

/*
 * Some things should never generated as SSR
 * So for these, we run a dynamic import and disable SSR rendering
 */
const DynamicAuthWrapper = dynamic(
  () => import('shared/components/wrappers/auth/index.mjs').then((mod) => mod.AuthWrapper),
  { ssr: false }
)
const DynamicImg = dynamic(
  () => import('shared/components/account/img.mjs').then((mod) => mod.ImgSettings),
  { ssr: false }
)

const ImgPage = (props) => {
  const app = useApp(props)
  const { t } = useTranslation(namespaces)

  return (
    <PageWrapper app={app} title={t('imgTitle')} layout={BareLayout} footer={false}>
      <DynamicAuthWrapper app={app}>
        <div className="m-auto max-w-lg text-center lg:mt-24 p-8">
          <DynamicImg app={app} title welcome />
        </div>
      </DynamicAuthWrapper>
    </PageWrapper>
  )
}

export default ImgPage

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, namespaces)),
      page: {
        path: ['welcome', 'img'],
      },
    },
  }
}
