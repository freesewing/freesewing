import { nsMerge } from 'shared/utils.mjs'
// Dependencies
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
// Hooks
import { useTranslation } from 'next-i18next'
// Components
import { PageWrapper, ns as pageNs } from 'shared/components/wrappers/page.mjs'
import { AuthWrapper, ns as authNs } from 'shared/components/wrappers/auth/index.mjs'
import { EditCuratedSet, ns as csetNs } from 'shared/components/curated-sets.mjs'

// Translation namespaces used on this page
const ns = nsMerge(pageNs, authNs, csetNs, 'curate')

const EditCuratedSetPage = ({ page, id }) => {
  const { t } = useTranslation(ns)

  return (
    <PageWrapper {...page} title={`${t('curate:set')}: ${id}`}>
      <AuthWrapper requiredRole="curator">
        <EditCuratedSet id={id} />
      </AuthWrapper>
    </PageWrapper>
  )
}

export default EditCuratedSetPage

export async function getStaticProps({ locale, params }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ns)),
      id: params.id,
      page: {
        locale,
        path: ['curate', 'sets', params.id],
      },
    },
  }
}

export async function getStaticPaths() {
  return {
    paths: [],
    fallback: true,
  }
}
