// Used in static paths
import { run } from '@mdx-js/mdx'
import jsxRuntime from 'react/jsx-runtime'
// Hooks
import { useState, useEffect } from 'react'
// Components
import Head from 'next/head'
import { PageWrapper, ns as pageNs } from 'shared/components/wrappers/page.mjs'
import { Spinner } from 'shared/components/spinner.mjs'
import { components } from 'shared/components/mdx/index.mjs'
import { MdxWrapper } from 'shared/components/wrappers/mdx.mjs'
import { Toc } from 'shared/components/mdx/toc.mjs'
import { PrevNext } from 'shared/components/prev-next.mjs'

export const ns = pageNs

export const Loading = () => (
  <Spinner className="w-24 h-24 color-primary animate-spin m-auto mt-8" />
)

export const HeadInfo = ({ frontmatter, locale, slug, site }) => (
  <Head>
    <meta property="og:title" content={frontmatter.title} key="title" />
    <meta property="og:type" content="article" key="type" />
    <meta property="og:description" content={frontmatter.intro} key="description" />
    <meta property="og:article:author" content="Joost De Cock" key="author" />
    <meta
      property="og:image"
      content={`https://canary.backend.freesewing.org/og-img/en/${site}/${slug}}`}
      key="image"
    />
    <meta property="og:image:type" content="image/png" />
    <meta property="og:image:width" content="1200" />
    <meta property="og:image:height" content="630" />
    <meta property="og:url" content={`https://freesewing.${site}/${slug}`} key="url" />
    <meta property="og:locale" content={locale} key="locale" />
    <meta property="og:site_name" content={`freesewing.${site}`} key="site" />
    <title>{`${frontmatter.title} - FreeSewing.${site}`}</title>
  </Head>
)

export const useCompiledMdx = (MDX, site) => {
  // State
  const [frontmatter, setFrontmatter] = useState({ title: 'freeSewing.' + site })
  const [mdxContent, setMdxContent] = useState(<Loading />)

  useEffect(() => {
    async function compileMdx() {
      const evaled = await run(MDX, { ...jsxRuntime })
      setMdxContent(<MdxWrapper MDX={evaled.default} site={site} />)
      setFrontmatter(evaled.frontmatter)
    }

    compileMdx()
  }, [setMdxContent, setFrontmatter, MDX])

  return { mdxContent, frontmatter }
}

export const DocsPage = ({ page, slug, locale, site, mdx }) => {
  const { mdxContent, frontmatter } = useCompiledMdx(mdx, site)

  return (
    <PageWrapper {...page} title={frontmatter.title}>
      <HeadInfo {...{ frontmatter, locale, slug, site }} />
      <div className="flex flex-row-reverse flex-wrap xl:flex-nowrap justify-end">
        {frontmatter.toc && frontmatter.toc.length > 0 && (
          <div className="mb-8 w-full xl:w-80 2xl:w-96 xl:pl-8 2xl:pl-16">
            <Toc toc={frontmatter.toc} wrap />
          </div>
        )}
        <div>
          {mdxContent}
          <PrevNext slug={slug} />
        </div>
      </div>
    </PageWrapper>
  )
}
