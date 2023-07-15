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
      <div className="flex flex-row items-start mt-8 w-full justify-between 2xl:px-36 xl:px-12 px-4">
        <div className="max-w-96 w-1/4 mt-8 hidden lg:block">
          <MainSections {...{ siteNav, slug }} />
          <NavLinks {...{ siteNav, slug }} />
        </div>
        <div className="grow w-full m-auto max-w-prose mt-0 mb-8">
          <div className="w-full">
            <Breadcrumbs {...{ siteNav, slug }} />
            <h1 className="break-words searchme">{title}</h1>
            <div className="block xl:hidden">{tip}</div>
          </div>
          <Search />
        </div>
        <div className="max-w-96 w-1/4 mt-8 hidden xl:block">{tip}</div>
      </div>
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
