// Dependencies
import dynamic from 'next/dynamic'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
// Components
import { PageWrapper, ns as pageNs } from 'shared/components/wrappers/page.mjs'
import { ns as authNs } from 'shared/components/wrappers/auth/index.mjs'
import { ns as mfaNs } from 'shared/components/account/mfa.mjs'

// Translation namespaces used on this page
const namespaces = [...new Set([...mfaNs, ...authNs, ...pageNs])]

/*
 * Some things should never generated as SSR
 * So for these, we run a dynamic import and disable SSR rendering
 */
const DynamicAuthWrapper = dynamic(
  () => import('shared/components/wrappers/auth/index.mjs').then((mod) => mod.AuthWrapper),
  { ssr: false }
)

const DynamicMfa = dynamic(
  () => import('shared/components/account/mfa.mjs').then((mod) => mod.MfaSettings),
  { ssr: false }
)

/*
 * Each page MUST be wrapped in the PageWrapper component.
 * You also MUST spread props.page into this wrapper component
 * when path and locale come from static props (as here)
 * or set them manually.
 */
const AccountMfaPage = ({ page }) => (
  <PageWrapper {...page}>
    <DynamicAuthWrapper>
      <DynamicMfa title />
    </DynamicAuthWrapper>
  </PageWrapper>
)

export default AccountMfaPage

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, namespaces)),
      page: {
        locale,
        path: ['account', 'mfa'],
      },
    },
  }
}
