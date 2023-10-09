import { NavigationContext } from 'shared/context/navigation-context.mjs'
import { nsMerge } from 'shared/utils.mjs'
// Hooks
import { useContext } from 'react'
// Components
import Head from 'next/head'
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

export const FrontmatterHead = ({ frontmatter, slug, locale }) => (
  <Head>
    <meta property="og:title" content={frontmatter.title} key="title" />
    <meta property="og:type" content="article" key="type" />
    <meta property="og:description" content={frontmatter.intro || frontmatter.title} key="type" />
    <meta
      property="og:article:author"
      content={frontmatter.author || frontmatter.maker || 'Joost De Cock'}
      key="author"
    />
    <meta
      property="og:image"
      content={`https://canary.backend.freesewing.org/og-img/en/org/${slug}}`}
      key="image"
    />
    <meta property="og:image:type" content="image/png" />
    <meta property="og:image:width" content="1200" />
    <meta property="og:image:height" content="630" />
    <meta property="og:url" content={`https://freesewing.org/${slug}`} key="url" />
    <meta property="og:locale" content={locale || 'en'} key="locale" />
    <meta property="og:site_name" content="freesewing.org" key="site" />
    <title>{frontmatter.title + '- FreeSewing.org'}</title>
  </Head>
)

export const DocsLayout = ({ children = [], frontmatter }) => {
  const { slug, locale } = useContext(NavigationContext)

  return (
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
          <PrevNext slug={slug} noPrev={slug === 'docs'} />
        </BaseLayoutProse>

        <BaseLayoutRight>
          <MdxMetaData frontmatter={frontmatter} slug={slug} locale="en" />
          <div className="hidden xl:block">
            <Toc toc={frontmatter.toc} wrap />
          </div>
        </BaseLayoutRight>
      </BaseLayout>
    </>
  )
}
