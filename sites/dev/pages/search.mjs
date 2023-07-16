// Dependencies
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
// Hooks
import { useNavigation } from 'site/hooks/use-navigation.mjs'
// Components
import { PageWrapper } from 'shared/components/wrappers/page.mjs'
import { Search } from 'site/components/search.mjs'
import { Popout } from 'shared/components/popout.mjs'
import { PageLink } from 'shared/components/page-link.mjs'
import { NavLinks, Breadcrumbs, MainSections } from 'shared/components/navigation/sitenav.mjs'
import {
  BaseLayout,
  BaseLayoutLeft,
  BaseLayoutProse,
  BaseLayoutRight,
} from 'shared/components/base-layout.mjs'

const SearchPage = ({ page, slug }) => {
  /*
   * Get the siteNav object from the useNavigation hook
   * FIXME: ignorecontrol is not yet implmented here
   */
  const { siteNav } = useNavigation({ ignoreControl: true })
  const title = siteNav.about.t

  const tip = (
    <Popout tip compact>
      The <PageLink href="/sitemap" txt="sitemap" /> can also be helpful to find things.
    </Popout>
  )

  return (
    <PageWrapper {...page}>
      <BaseLayout>
        <BaseLayoutLeft>
          <MainSections {...{ siteNav, slug }} />
          <NavLinks {...{ siteNav, slug }} />
        </BaseLayoutLeft>
        <BaseLayoutProse>
          <div className="w-full">
            <Breadcrumbs {...{ siteNav, slug }} />
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
      ...(await serverSideTranslations('en')),
      slug: 'search',
      page: {
        path: ['search'],
      },
    },
  }
}
