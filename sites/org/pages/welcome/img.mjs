// Hooks
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

/*
 * Each page MUST be wrapped in the PageWrapper component.
 * You also MUST spread props.page into this wrapper component
 * when path and locale come from static props (as here)
 * or set them manually.
 */
const WelcomeImgPage = ({ page }) => {
  const { t } = useTranslation(namespaces)

  return (
    <PageWrapper {...page} title={t('imgTitle')} layout={BareLayout} footer={false}>
      <DynamicAuthWrapper>
        <div className="m-auto max-w-lg text-center lg:mt-4 p-8">
          <DynamicImg title welcome />
        </div>
      </DynamicAuthWrapper>
    </PageWrapper>
  )
}

export default WelcomeImgPage

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, namespaces)),
      page: {
        locale,
        path: ['welcome', 'img'],
      },
    },
  }
}
