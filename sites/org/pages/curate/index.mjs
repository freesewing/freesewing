// Dependencies
import dynamic from 'next/dynamic'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
// Hooks
import { useTranslation } from 'next-i18next'
// Components
import { PageWrapper, ns as pageNs } from 'shared/components/wrappers/page.mjs'
import { ChoiceLink } from 'shared/components/choice-link.mjs'
import { KeyIcon, MeasureIcon, DesignIcon, PageIcon, PluginIcon } from 'shared/components/icons.mjs'
import { ns as authNs } from 'shared/components/wrappers/auth/index.mjs'

// Translation namespaces used on this page
const namespaces = ['curate', 'sets', ...new Set([...pageNs, ...authNs])]

/*
 * Some things should never generated as SSR
 * So for these, we run a dynamic import and disable SSR rendering
 */
const DynamicAuthWrapper = dynamic(
  () => import('shared/components/wrappers/auth/index.mjs').then((mod) => mod.AuthWrapper),
  { ssr: false }
)

/*
 * Each page MUST be wrapped in the PageWrapper component.
 * You also MUST spread props.page into this wrapper component
 * when path and locale come from static props (as here)
 * or set them manually.
 */
const CuratorPage = ({ page }) => {
  const { t } = useTranslation(['account'])

  return (
    <PageWrapper {...page}>
      <DynamicAuthWrapper requiredRole="curator">
        <div className="max-w-lg">
          <ChoiceLink
            title={t('sets:curatedSets')}
            icon={<MeasureIcon className="w-10 h-10 text-secondary" />}
            href="/curate/sets"
          >
            {t('sets:curateCuratedSets')}
          </ChoiceLink>
        </div>
      </DynamicAuthWrapper>
    </PageWrapper>
  )
}

export default CuratorPage

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, namespaces)),
      page: {
        locale,
        path: ['curate'],
      },
    },
  }
}
