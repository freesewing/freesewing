// Dependencies
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { nsMerge, getSearchParam } from 'shared/utils.mjs'
// Hooks
import { useTranslation } from 'next-i18next'
import { useState, useEffect } from 'react'
// Components
import { PageWrapper, ns as pageNs } from 'shared/components/wrappers/page.mjs'
import { AuthWrapper, ns as authNs } from 'shared/components/wrappers/auth/index.mjs'
import { EditCuratedSet, ns as csetNs } from 'shared/components/curated-sets.mjs'

// Translation namespaces used on this page
const ns = nsMerge(pageNs, authNs, csetNs, 'curate')

const EditCuratedSetPage = ({ page }) => {
  const { t } = useTranslation(ns)
  const [id, setId] = useState()

  useEffect(() => {
    const newId = getSearchParam('id')
    if (newId !== id) setId(newId)
  }, [id])

  return (
    <PageWrapper {...page} title={`${t('curate:set')}: ${id}`}>
      <AuthWrapper requiredRole="curator">
        <EditCuratedSet id={id} />
      </AuthWrapper>
    </PageWrapper>
  )
}

export default EditCuratedSetPage

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ns)),
      page: {
        locale,
        path: ['curate', 'csets'],
      },
    },
  }
}
