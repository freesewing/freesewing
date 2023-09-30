// Dependencies
import dynamic from 'next/dynamic'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { nsMerge } from 'shared/utils.mjs'
// Hooks
import { useTranslation } from 'next-i18next'
// Components
import { PageWrapper, ns as pageNs } from 'shared/components/wrappers/page.mjs'
import { ns as authNs } from 'shared/components/wrappers/auth/index.mjs'
import { ns as apikeysNs } from 'shared/components/account/apikeys.mjs'

// Translation namespaces used on this page
const ns = nsMerge(apikeysNs, authNs, pageNs)

/*
 * Some things should never generated as SSR
 * So for these, we run a dynamic import and disable SSR rendering
 */
const DynamicAuthWrapper = dynamic(
  () => import('shared/components/wrappers/auth/index.mjs').then((mod) => mod.AuthWrapper),
  { ssr: false }
)

const DynamicApikeys = dynamic(
  () => import('shared/components/account/apikeys.mjs').then((mod) => mod.Apikeys),
  { ssr: false }
)

/*
 * Each page MUST be wrapped in the PageWrapper component.
 * You also MUST spread props.page into this wrapper component
 * when path and locale come from static props (as here)
 * or set them manually.
 */
const AccountApikeysPage = ({ page }) => {
  const { t } = useTranslation(ns)

  return (
    <PageWrapper {...page} title={t('apikeys')}>
      <DynamicAuthWrapper>
        <DynamicApikeys />
      </DynamicAuthWrapper>
    </PageWrapper>
  )
}

export default AccountApikeysPage

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ns)),
      page: {
        locale,
        path: ['account', 'apikeys'],
      },
    },
  }
}
