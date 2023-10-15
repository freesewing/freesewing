// Dependencies
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { nsMerge } from 'shared/utils.mjs'
// Hooks
import { useTranslation } from 'next-i18next'
// Components
import { PageWrapper, ns as pageNs } from 'shared/components/wrappers/page.mjs'
import { ns as setsNs } from 'shared/components/account/sets.mjs'
import { CuratedSets } from 'shared/components/curated-sets.mjs'

// Translation namespaces used on this page
const ns = nsMerge(setsNs, pageNs)

/*
 * Each page MUST be wrapped in the PageWrapper component.
 * You also MUST spread props.page into this wrapper component
 * when path and locale come from static props (as here)
 * or set them manually.
 */
const CuratedSetsPage = ({ page }) => {
  const { t } = useTranslation(ns)

  return (
    <PageWrapper {...page} title={t('account:curatedSets')}>
      <CuratedSets />
    </PageWrapper>
  )
}

export default CuratedSetsPage

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ns)),
      page: {
        locale,
        path: ['curated-sets'],
      },
    },
  }
}
