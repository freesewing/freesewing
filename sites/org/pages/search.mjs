// Dependencies
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
// Components
import { PageWrapper, ns as pageNs } from 'shared/components/wrappers/page.mjs'
import { Search } from 'site/components/search.mjs'
import { Popout } from 'shared/components/popout.mjs'
import { PageLink } from 'shared/components/page-link.mjs'

const namespaces = [...pageNs]

const SearchPage = ({ page }) => {
  const title = 'Search'

  const tip = (
    <Popout tip compact>
      The <PageLink href="/sitemap" txt="sitemap" /> can also be helpful to find things.
    </Popout>
  )

  return (
    <PageWrapper {...page} title={title}>
      <Search />
      {tip}
    </PageWrapper>
  )
}

export default SearchPage

export async function getStaticProps() {
  return {
    props: {
      ...(await serverSideTranslations('en', namespaces)),
      page: {
        path: ['search'],
      },
    },
  }
}
