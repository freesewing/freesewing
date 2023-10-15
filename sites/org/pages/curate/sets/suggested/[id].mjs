// Dependencies
import dynamic from 'next/dynamic'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { nsMerge } from 'shared/utils.mjs'
// Hooks
import { useTranslation } from 'next-i18next'
// Components
import { PageWrapper, ns as pageNs } from 'shared/components/wrappers/page.mjs'
import { CsetSubmission, ns as subNs } from 'shared/components/submissions/index.mjs'

// Translation namespaces used on this page
const ns = nsMerge(pageNs, subNs)

/*
 * Some things should never generated as SSR
 * So for these, we run a dynamic import and disable SSR rendering
 */
const DynamicAuthWrapper = dynamic(
  () => import('shared/components/wrappers/auth/index.mjs').then((mod) => mod.AuthWrapper),
  { ssr: false }
)

const CsetSubmissionPage = ({ page, id }) => {
  const { t } = useTranslation(ns)

  return (
    <PageWrapper {...page} title={t('submissions:msetSuggested')}>
      <DynamicAuthWrapper requiredRole="user">
        <CsetSubmission id={id} />
      </DynamicAuthWrapper>
    </PageWrapper>
  )
}

export default CsetSubmissionPage

export async function getStaticProps({ locale, params }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ns)),
      id: params.id,
      page: {
        locale,
        path: ['curate', 'sets', 'suggested', params.id],
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
