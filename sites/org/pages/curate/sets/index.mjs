// Dependencies
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { nsMerge } from 'shared/utils.mjs'
// Hooks
import { useTranslation } from 'next-i18next'
// Components
import { PageWrapper, ns as pageNs } from 'shared/components/wrappers/page.mjs'
import { ns as authNs } from 'shared/components/wrappers/auth/index.mjs'
import { AuthWrapper } from 'shared/components/wrappers/auth/index.mjs'
import { CuratedSets } from 'shared/components/curated-sets.mjs'
import { CsetSubmissions } from 'shared/components/submissions/index.mjs'

// Translation namespaces used on this page
const ns = nsMerge('curate', 'sets', pageNs, authNs)

/*
 * Each page MUST be wrapped in the PageWrapper component.
 * You also MUST spread props.page into this wrapper component
 * when path and locale come from static props (as here)
 * or set them manually.
 */
const CuratorPage = ({ page }) => {
  const { t } = useTranslation(ns)

  return (
    <PageWrapper {...page} title={t('curate:curateSets')}>
      <AuthWrapper requiredRole="curator">
        <div className="max-w-6xl">
          <h2>{t('curate:suggestedSets')}</h2>
          <CsetSubmissions />
          <h2>{t('curate:sets')}</h2>
          <CuratedSets href={(id) => `/curate/sets/${id}`} />
        </div>
      </AuthWrapper>
    </PageWrapper>
  )
}

export default CuratorPage

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ns)),
      page: {
        locale,
        path: ['curate', 'sets'],
      },
    },
  }
}
