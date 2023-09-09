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

export const ns = [navNs, 'docs']

/** checks for a slug that isn't a post, to prevent a prev or next button to it */
const isEndSlug = (slug) => slug.split('/').length === 1

/** layout for a page that displays a blog, showcase or newsletter */
export const PostLayout = ({ children = [], slug, frontmatter, locale }) => (
  <>
    <FrontmatterHead {...{ frontmatter, slug, locale }} />
    <BaseLayout>
      <BaseLayoutLeft>
        <MainSections />
        <NavLinks />
      </BaseLayoutLeft>

      <BaseLayoutProse>
        <div className="w-full">
          <Breadcrumbs />
          <h1 className="break-words searchme">{frontmatter.title}</h1>
          <div className="block xl:hidden">
            <Toc toc={frontmatter.toc} wrap />
          </div>
        </div>
        {children}
        <PrevNext noPrev={isEndSlug} noNext={isEndSlug} />
      </BaseLayoutProse>

      <BaseLayoutRight>
        <div className="hidden xl:block">
          <Toc toc={frontmatter.toc} wrap />
        </div>
      </BaseLayoutRight>
    </BaseLayout>
  </>
)
