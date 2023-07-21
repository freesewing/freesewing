// Dependencies
import dynamic from 'next/dynamic'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
// Hooks
import { useTranslation } from 'next-i18next'
// Components
import { PageWrapper, ns as pageNs } from 'shared/components/wrappers/page.mjs'

// Translation namespaces used on this page
const namespaces = [...new Set(pageNs), 'translation', 'locales']

/*
 * Some things should never generated as SSR
 * So for these, we run a dynamic import and disable SSR rendering
 */
const DynamicAuthWrapper = dynamic(
  () => import('shared/components/wrappers/auth/index.mjs').then((mod) => mod.AuthWrapper),
  { ssr: false }
)

const DynamicForm = dynamic(
  () => import('site/components/crowdin/translator-invite.mjs').then((mod) => mod.TranslatorInvite),
  { ssr: false }
)

const TranslationJoinPage = ({ page }) => {
  const { t } = useTranslation(namespaces)

  const title = t('translation:joinATranslationTeam')

  return (
    <PageWrapper {...page} title={title}>
      <p>
        {t('translation:joinIntro')}
        <br />
        {t('translation:thatIsAwesome')} {t('translation:thanksSoMuch')}
      </p>
      <DynamicAuthWrapper>
        <DynamicForm />
      </DynamicAuthWrapper>
    </PageWrapper>
  )
}

export default TranslationJoinPage

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, namespaces)),
      page: {
        locale,
        path: ['translation/join'],
      },
    },
  }
}
