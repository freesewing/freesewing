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
import { DocsLayout } from 'site/components/layouts/docs.mjs'

export const ns = pageNs

export const Loading = () => (
  <Spinner className="w-24 h-24 color-primary animate-spin m-auto mt-8" />
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

    if (MDX) compileMdx()
  }, [setMdxContent, setFrontmatter, MDX])

  return { mdxContent, frontmatter }
}

export const DocsPage = ({ page, slug, locale, site, mdx }) => {
  const { mdxContent, frontmatter } = useCompiledMdx(mdx, site)

  return (
    <PageWrapper
      {...page}
      title={frontmatter.title}
      layout={(props) => <DocsLayout {...props} {...{ slug, frontmatter }} />}
    >
      <div className="flex flex-row-reverse flex-wrap xl:flex-nowrap justify-end">
        <div>{mdxContent}</div>
      </div>
    </PageWrapper>
  )
}
