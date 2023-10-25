// Dependencies
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
// Components
import { PageWrapper, ns as pageNs } from 'shared/components/wrappers/page.mjs'
import { Search } from 'site/components/search.mjs'
import { Popout } from 'shared/components/popout/index.mjs'
import { PageLink } from 'shared/components/link.mjs'
import { NavLinks, Breadcrumbs, MainSections } from 'shared/components/navigation/sitenav.mjs'
import {
  BaseLayout,
  BaseLayoutLeft,
  BaseLayoutProse,
  BaseLayoutRight,
} from 'shared/components/base-layout.mjs'

const namespaces = [...pageNs]

const SearchPage = ({ page }) => {
  const title = 'Search'

  const tip = (
    <Popout tip compact>
      The <PageLink href="/sitemap" txt="sitemap" /> can also be helpful to find things.
    </Popout>
  )

  return (
    <PageWrapper {...page}>
      <BaseLayout>
        <BaseLayoutLeft>
          <MainSections />
          <NavLinks />
        </BaseLayoutLeft>
        <BaseLayoutProse>
          <div className="w-full">
            <Breadcrumbs />
            <h1 className="break-words searchme">{title}</h1>
            <div className="block xl:hidden">{tip}</div>
          </div>
          <Search />
        </BaseLayoutProse>
        <BaseLayoutRight>{tip}</BaseLayoutRight>
      </BaseLayout>
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
