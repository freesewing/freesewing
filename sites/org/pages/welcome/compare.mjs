// Dependencies
import dynamic from 'next/dynamic'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
// Components
import { PageWrapper, ns as pageNs } from 'shared/components/wrappers/page.mjs'
import { BareLayout } from 'site/components/layouts/bare.mjs'
import { ns as authNs } from 'shared/components/wrappers/auth/index.mjs'
import { ns as compareNs } from 'shared/components/account/compare.mjs'

// Translation namespaces used on this page
const namespaces = [...new Set([...compareNs, ...authNs, ...pageNs])]

/*
 * Some things should never generated as SSR
 * So for these, we run a dynamic import and disable SSR rendering
 */
const DynamicAuthWrapper = dynamic(
  () => import('shared/components/wrappers/auth/index.mjs').then((mod) => mod.AuthWrapper),
  { ssr: false }
)
const DynamicCompare = dynamic(
  () => import('shared/components/account/compare.mjs').then((mod) => mod.CompareSettings),
  { ssr: false }
)

/*
 * Each page MUST be wrapped in the PageWrapper component.
 * You also MUST spread props.page into this wrapper component
 * when path and locale come from static props (as here)
 * or set them manually.
 */
const WelcomeComparePage = ({ page }) => (
  <PageWrapper {...page} layout={BareLayout} footer={false}>
    <DynamicAuthWrapper>
      <div className="m-auto max-w-lg text-center lg:mt-4 p-8">
        <DynamicCompare title welcome />
      </div>
    </DynamicAuthWrapper>
  </PageWrapper>
)

export default WelcomeComparePage

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, namespaces)),
      page: {
        locale,
        path: ['welcome', 'compare'],
      },
    },
  }
}
