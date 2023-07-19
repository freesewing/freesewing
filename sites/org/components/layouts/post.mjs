// Hooks
import { useNavigation } from 'site/hooks/use-navigation.mjs'
// Components
import { FrontmatterHead } from './docs.mjs'
import {
  BaseLayout,
  BaseLayoutLeft,
  BaseLayoutProse,
  BaseLayoutRight,
} from 'shared/components/base-layout.mjs'
import {
  NavLinks,
  Breadcrumbs,
  MainSections,
  ns as navNs,
} from 'shared/components/navigation/sitenav.mjs'
import { Toc } from 'shared/components/mdx/toc.mjs'
import { PrevNext } from 'shared/components/prev-next.mjs'

export const ns = [navNs, 'docs'] //navNs

const isEndSlug = (slug) => slug.split('/').length === 1

export const PostLayout = ({ children = [], slug, frontmatter }) => {
  const { siteNav } = useNavigation({ ignoreControl: true })

  return (
    <>
      <BaseLayout>
        <BaseLayoutLeft>
          <MainSections {...{ siteNav, slug }} />
          <NavLinks {...{ siteNav, slug }} />
        </BaseLayoutLeft>

        <BaseLayoutProse>
          <div className="w-full">
            <Breadcrumbs {...{ siteNav, slug }} />
            <h1 className="break-words searchme">{frontmatter.title}</h1>
            <div className="block xl:hidden">
              <Toc toc={frontmatter.toc} wrap />
            </div>
          </div>
          {children}
          <PrevNext slug={slug} noPrev={isEndSlug} noNext={isEndSlug} />
        </BaseLayoutProse>

        <BaseLayoutRight>
          <div className="hidden xl:block">
            <Toc toc={frontmatter.toc} wrap />
          </div>
        </BaseLayoutRight>
      </BaseLayout>
    </>
  )
}
