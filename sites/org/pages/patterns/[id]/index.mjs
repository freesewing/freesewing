// Dependencies
import dynamic from 'next/dynamic'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { nsMerge } from 'shared/utils.mjs'
// Hooks
import { useTranslation } from 'next-i18next'
// Components
import { PageWrapper, ns as pageNs } from 'shared/components/wrappers/page.mjs'
import { ns as authNs } from 'shared/components/wrappers/auth/index.mjs'
import { ns as patternsNs } from 'shared/components/account/patterns.mjs'

// Translation namespaces used on this page
const ns = nsMerge(patternsNs, authNs, pageNs, 'status')

/*
 * Some things should never generated as SSR
 * So for these, we run a dynamic import and disable SSR rendering
 */
const DynamicPattern = dynamic(
  () => import('shared/components/account/patterns.mjs').then((mod) => mod.Pattern),
  { ssr: false }
)

/*
 * Each page MUST be wrapped in the PageWrapper component.
 * You also MUST spread props.page into this wrapper component
 * when path and locale come from static props (as here)
 * or set them manually.
 */
const PatternPage = ({ page, id }) => {
  const { t } = useTranslation(ns)

  return (
    <PageWrapper {...page} title={`${t('patterns')}: #${id}`}>
      <DynamicPattern id={id} publicOnly />
    </PageWrapper>
  )
}

export default PatternPage

export async function getStaticProps({ locale, params }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ns)),
      id: params.id,
      page: {
        locale,
        path: ['account', 'patterns', params.id],
      },
    },
  }
}

/*
 * getStaticPaths() is used to specify for which routes (think URLs)
 * this page should be used to generate the result.
 * To learn more, see: https://nextjs.org/docs/basic-features/data-fetching
 */
export const getStaticPaths = async () => ({ paths: [], fallback: true })
