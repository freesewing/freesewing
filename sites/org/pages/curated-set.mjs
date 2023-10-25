// Dependencies
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { nsMerge, getSearchParam } from 'shared/utils.mjs'
// Hooks
import { useTranslation } from 'next-i18next'
import { useState, useEffect } from 'react'
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
const CuratedSetPage = ({ page }) => {
  const { t } = useTranslation(ns)

  const [id, setId] = useState()

  useEffect(() => {
    const newId = getSearchParam('id')
    if (newId !== id) setId(newId)
  }, [id])

  return (
    <PageWrapper {...page} title={`${t('account:curatedSets')}: #${id}`}>
      <CuratedSet id={id} />
    </PageWrapper>
  )
}

export default CuratedSetPage

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ns)),
      page: {
        locale,
        path: ['curated-set'],
      },
    },
  }
}
