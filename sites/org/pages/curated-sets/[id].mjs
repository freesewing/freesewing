// Dependencies
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { nsMerge } from 'shared/utils.mjs'
// Hooks
import { useTranslation } from 'next-i18next'
// Components
import { PageWrapper, ns as pageNs } from 'shared/components/wrappers/page.mjs'
import { ns as setsNs } from 'shared/components/account/sets.mjs'
import { CuratedSet } from 'shared/components/curated-sets.mjs'

// Translation namespaces used on this page
const ns = nsMerge(setsNs, pageNs)

/*
 * Each page MUST be wrapped in the PageWrapper component.
 * You also MUST spread props.page into this wrapper component
 * when path and locale come from static props (as here)
 * or set them manually.
 */
const CuratedSetPage = ({ page, id }) => {
  const { t } = useTranslation(ns)

  return (
    <PageWrapper {...page} title={`${t('account:curatedSets')}: #${id}`}>
      <CuratedSet id={id} />
    </PageWrapper>
  )
}

export default CuratedSetPage

export async function getStaticProps({ locale, params }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ns)),
      id: params.id,
      page: {
        locale,
        path: ['curated-sets', params.id],
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
