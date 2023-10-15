// Dependencies
import dynamic from 'next/dynamic'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { nsMerge } from 'shared/utils.mjs'
// Components
import { PageWrapper, ns as pageNs } from 'shared/components/wrappers/page.mjs'
import { BareLayout } from 'site/components/layouts/bare.mjs'
import { ns as authNs } from 'shared/components/wrappers/auth/index.mjs'

// Translation namespaces used on this page
const ns = nsMerge('account', authNs, pageNs)

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

export const WelcomeWrapper = ({ children }) => (
  <DynamicAuthWrapper>
    <div className="m-auto max-w-2xl lg:mt-24 p-8">{children}</div>
  </DynamicAuthWrapper>
)

/*
 * Each page MUST be wrapped in the PageWrapper component.
 * You also MUST spread props.page into this wrapper component
 * when path and locale come from static props (as here)
 * or set them manually.
 */
const WelcomePage = ({ page }) => (
  <PageWrapper {...page} layout={BareLayout} footer={false}>
    <WelcomeWrapper>
      <DynamicControl title welcome />
    </WelcomeWrapper>
  </PageWrapper>
)

export default WelcomePage

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ns)),
      page: {
        path: ['welcome'],
      },
    },
  }
}
