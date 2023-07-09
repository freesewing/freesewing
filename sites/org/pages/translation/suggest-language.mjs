// Dependencies
import dynamic from 'next/dynamic'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
// Hooks
import { useTranslation } from 'next-i18next'
// Components
import { PageWrapper, ns as pageNs } from 'shared/components/wrappers/page.mjs'
import { BareLayout as Layout } from 'site/components/layouts/bare.mjs'
import { Breadcrumbs } from 'shared/components/breadcrumbs.mjs'

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
  () =>
    import('site/components/crowdin/suggest-language.mjs').then((mod) => mod.SuggestLanguageForm),
  { ssr: false }
)

const SuggestLanguagePage = ({ page }) => {
  const { t } = useTranslation(namespaces)

  const title = t('translation:suggestLanguage')

  return (
    <PageWrapper {...page} layout={Layout}>
      <div className="max-w-4xl mx-auto p-4 mt-4">
        <Breadcrumbs
          crumbs={[
            { s: 'translation', t: t('translation:translation') },
            { s: 'translation/join', t: title },
          ]}
          title={title}
        />

        <h1>{title}</h1>
        <p>
          {t('translation:suggestIntro')}
          <br />
          {t('translation:thatIsAwesome')} {t('translation:thanksSoMuch')}
        </p>
        <DynamicAuthWrapper>
          <DynamicForm />
        </DynamicAuthWrapper>
      </div>
    </PageWrapper>
  )
}

export default SuggestLanguagePage

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, namespaces)),
      page: {
        locale,
        path: ['translation/suggest-language'],
      },
    },
  }
}
