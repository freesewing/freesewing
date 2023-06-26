// Dependencies
import dynamic from 'next/dynamic'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
// Components
import { PageWrapper, ns as pageNs } from 'shared/components/wrappers/page.mjs'
import { BareLayout } from 'site/components/layouts/bare.mjs'
import { ns as authNs } from 'shared/components/wrappers/auth/index.mjs'
import { ns as bioNs } from 'shared/components/account/bio.mjs'

// Translation namespaces used on this page
const namespaces = [...new Set([...bioNs, ...authNs, ...pageNs])]

/*
 * Some things should never generated as SSR
 * So for these, we run a dynamic import and disable SSR rendering
 */
const DynamicAuthWrapper = dynamic(
  () => import('shared/components/wrappers/auth/index.mjs').then((mod) => mod.AuthWrapper),
  { ssr: false }
)
const DynamicBio = dynamic(
  () => import('shared/components/account/bio.mjs').then((mod) => mod.BioSettings),
  { ssr: false }
)

/*
 * Each page MUST be wrapped in the PageWrapper component.
 * You also MUST spread props.page into this wrapper component
 * when path and locale come from static props (as here)
 * or set them manually.
 */
const WelcomeBioPage = ({ page }) => (
  <PageWrapper {...page} layout={BareLayout} footer={false}>
    <DynamicAuthWrapper>
      <div className="m-auto max-w-lg text-center lg:mt-24 p-8">
        <DynamicBio title welcome />
      </div>
    </DynamicAuthWrapper>
  </PageWrapper>
)

export default WelcomeBioPage

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, namespaces)),
      page: {
        locale,
        path: ['welcome', 'bio'],
      },
    },
  }
}
