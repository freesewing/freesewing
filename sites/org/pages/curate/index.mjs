// Dependencies
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { nsMerge } from 'shared/utils.mjs'
// Hooks
import { useTranslation } from 'next-i18next'
// Components
import { PageWrapper, ns as pageNs } from 'shared/components/wrappers/page.mjs'
import { AuthWrapper } from 'shared/components/wrappers/auth/index.mjs'
import { CsetIcon, OpackIcon } from 'shared/components/icons.mjs'
import { ns as authNs } from 'shared/components/wrappers/auth/index.mjs'
import { CardLink } from 'shared/components/link.mjs'

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
    <PageWrapper {...page} title={t('curate:curate')}>
      <AuthWrapper requiredRole="curator">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-2 max-w-6xl">
          <CardLink
            title={t('curate:sets')}
            icon={<CsetIcon className="w-10 h-10 text-secondary" />}
            href="/curate/sets"
            text={t('curate:curateSets')}
          />
          <CardLink
            title={t('curate:packs')}
            icon={<OpackIcon className="w-10 h-10 text-secondary" />}
            href="/curate/packs"
            text={t('curate:curatePacks')}
          />
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
        path: ['curate'],
      },
    },
  }
}
