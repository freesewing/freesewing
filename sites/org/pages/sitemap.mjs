// Dependencies
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
// Components
import { PageWrapper, ns } from 'shared/components/wrappers/page.mjs'
import { ReadMore } from 'shared/components/mdx/read-more.mjs'
import { ns as navNs } from 'site/hooks/use-navigation.mjs'

const SitemapPage = ({ page }) => (
  <PageWrapper {...page}>
    <div className="mdx">
      <ReadMore root ignoreControl recurse site="org" />
    </div>
  </PageWrapper>
)

export default SitemapPage

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, [...ns, ...navNs])),
      page: {
        locale,
        path: ['sitemap'],
      },
    },
  }
}
