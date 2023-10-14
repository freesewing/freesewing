// Dependencies
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
// Hooks
import { useTranslation } from 'next-i18next'
// Components
import { PageWrapper, ns as pageNs } from 'shared/components/wrappers/page.mjs'
import { ReadMore } from 'shared/components/mdx/read-more.mjs'

const ns = [...pageNs, 'common']

const SitemapPage = ({ page }) => {
  const { t } = useTranslation(ns)

  return (
    <PageWrapper {...page} title={t('common:sitemap')}>
      <div className="mdx">
        <ReadMore root ignoreControl recurse site="org" />
      </div>
    </PageWrapper>
  )
}

export default SitemapPage

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ns)),
      page: {
        locale,
        path: ['sitemap'],
      },
    },
  }
}
