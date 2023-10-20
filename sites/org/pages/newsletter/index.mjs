// Dependencies
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { nsMerge } from 'shared/utils.mjs'
// Hooks
import { useTranslation } from 'next-i18next'
// Components
import { PageWrapper, ns as pageNs } from 'shared/components/wrappers/page.mjs'
import { SubscribeToNewsletter, ns as nlNs } from 'shared/components/newsletter/index.mjs'

// Translation namespaces used on this page
const namespaces = nsMerge(pageNs, nlNs)

/*
 * Each page MUST be wrapped in the PageWrapper component.
 * You also MUST spread props.page into this wrapper component
 * when path and locale come from static props (as here)
 * or set them manually.
 */
const NewsletterPage = ({ page }) => {
  const { t } = useTranslation(namespaces)

  return (
    <PageWrapper {...page} title={t('newsletter:newsletter')}>
      <div className="max-w-xl">
        <p>{t('newsletter:subscribePitch')}</p>
        <SubscribeToNewsletter />
      </div>
    </PageWrapper>
  )
}

export default NewsletterPage

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, namespaces)),
      page: {
        locale,
        path: ['newsletter'],
      },
    },
  }
}
