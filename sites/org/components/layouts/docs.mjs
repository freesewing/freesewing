import { NavigationContext } from 'shared/context/navigation-context.mjs'
import { nsMerge } from 'shared/utils.mjs'
// Hooks
import { useContext } from 'react'
// Components
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
import { MdxMetaData, ns as metaNs } from 'shared/components/mdx/meta.mjs'
import { PrevNext } from 'shared/components/prev-next.mjs'

export const ns = nsMerge(navNs, 'docs', metaNs)

export const DocsLayout = ({ children = [], frontmatter }) => {
  const { slug, locale } = useContext(NavigationContext)

  return (
    <>
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
          <PrevNext slug={slug} noPrev={slug === 'docs'} />
        </BaseLayoutProse>

        <BaseLayoutRight>
          <MdxMetaData frontmatter={frontmatter} slug={slug} locale={locale} />
          <div className="hidden xl:block">
            <Toc toc={frontmatter.toc} wrap />
          </div>
        </BaseLayoutRight>
      </BaseLayout>
    </>
  )
}
