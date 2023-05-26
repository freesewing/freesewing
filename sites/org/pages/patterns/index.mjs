// Dependencies
import dynamic from 'next/dynamic'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
// Components
import { PageWrapper, ns as pageNs } from 'shared/components/wrappers/page.mjs'
import { Popout } from 'shared/components/popout.mjs'

import { ns as authNs } from 'shared/components/wrappers/auth/index.mjs'
import { ns as setsNs } from 'shared/components/account/sets.mjs'

// Translation namespaces used on this page
const namespaces = [...new Set([...setsNs, ...authNs, ...pageNs])]

/*
 * Some things should never generated as SSR
 * So for these, we run a dynamic import and disable SSR rendering
 */
const DynamicAuthWrapper = dynamic(
  () => import('shared/components/wrappers/auth/index.mjs').then((mod) => mod.AuthWrapper),
  { ssr: false }
)

/*
 * Each page MUST be wrapped in the PageWrapper component.
 * You also MUST spread props.page into this wrapper component
 * when path and locale come from static props (as here)
 * or set them manually.
 */
const SetsIndexPage = ({ page }) => (
  <PageWrapper {...page}>
    <DynamicAuthWrapper>
      <Popout fixme compact>
        This page has not been created yet
      </Popout>
    </DynamicAuthWrapper>
  </PageWrapper>
)

export default SetsIndexPage

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, namespaces)),
      page: {
        locale,
        path: ['patterns'],
      },
    },
  }
}
