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

const ns = [...pageNs]

const SearchPage = ({ page }) => {
  const title = 'Search'

  const tip = (
    <Popout tip compact>
      The <PageLink href="/sitemap" txt="sitemap" /> can also be helpful to find things.
    </Popout>
  )

  return (
    <PageWrapper {...page} layout={false}>
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
          <Search language={page.locale} />
        </BaseLayoutProse>
        <BaseLayoutRight>{tip}</BaseLayoutRight>
      </BaseLayout>
    </PageWrapper>
  )
}

export default SearchPage

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ns)),
      page: {
        path: ['search'],
        locale,
      },
    },
  }
}
