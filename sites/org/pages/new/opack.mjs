// Dependencies
import dynamic from 'next/dynamic'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { nsMerge } from 'shared/utils.mjs'
// Hooks
import { useTranslation } from 'next-i18next'
// Components
import { PageWrapper, ns as pageNs } from 'shared/components/wrappers/page.mjs'
import { ns as authNs } from 'shared/components/wrappers/auth/index.mjs'
import { V3Wip } from 'shared/components/v3-wip.mjs'

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

//const DynamicNewSet = dynamic(
//  () => import('shared/components/account/sets.mjs').then((mod) => mod.NewSet),
//  { ssr: false }
//)

/*
 * Each page MUST be wrapped in the PageWrapper component.
 * You also MUST spread props.page into this wrapper component
 * when path and locale come from static props (as here)
 * or set them manually.
 */
const NewOptionsPackPage = ({ page }) => {
  const { t } = useTranslation(ns)

  return (
    <PageWrapper {...page} title={t('account:opackNew')}>
      <DynamicAuthWrapper>
        <V3Wip />
      </DynamicAuthWrapper>
    </PageWrapper>
  )
}

export default NewOptionsPackPage

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ns)),
      page: {
        locale,
        path: ['new', 'xset'],
      },
    },
  }
}
