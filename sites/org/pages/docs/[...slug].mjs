// Used in static paths
import { mdxPaths } from 'site/prebuild/mdx-paths.en.mjs'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
// Hooks
import { useState, useEffect } from 'react'
// Components
import Head from 'next/head'
import { PageWrapper, ns } from 'shared/components/wrappers/page.mjs'
import { Spinner } from 'shared/components/spinner.mjs'
import { components } from 'shared/components/mdx/index.mjs'
import { MdxWrapper } from 'shared/components/wrappers/mdx.mjs'
import { Toc } from 'shared/components/mdx/toc.mjs'
import { PrevNext } from 'shared/components/mdx/prev-next.mjs'
import { useDynamicDocs } from 'shared/components/dynamic-docs/org.mjs'

export const Loading = () => (
  <Spinner className="w-24 h-24 color-primary animate-spin m-auto mt-8" />
)

const HeadInfo = ({ frontmatter, locale, slug }) => (
  <Head>
    <meta property="og:title" content={frontmatter.title} key="title" />
    <meta property="og:type" content="article" key="type" />
    <meta property="og:description" content={``} key="type" />
    <meta property="og:article:author" content="Joost De Cock" key="author" />
    <meta
      property="og:image"
      content={`https://canary.backend.freesewing.org/og-img/en/org/${slug}}`}
      key="image"
    />
    <meta property="og:image:type" content="image/png" />
    <meta property="og:image:width" content="1200" />
    <meta property="og:image:height" content="630" />
    <meta property="og:url" content={`https://freesewing.org/${slug}`} key="url" />
    <meta property="og:locale" content={locale} key="locale" />
    <meta property="og:site_name" content="freesewing.org" key="site" />
    <title>{frontmatter.title + '- FreeSewing.org'}</title>
  </Head>
)

export const Page = ({ page, frontmatter, slug, locale, children }) => (
  <PageWrapper {...page} title={frontmatter.title}>
    <HeadInfo {...{ frontmatter, locale, slug }} />
    <div className="flex flex-row-reverse flex-wrap xl:flex-nowrap justify-end">
      {frontmatter.toc && frontmatter.toc.length > 0 && (
        <div className="mb-8 w-full xl:w-80 2xl:w-96 xl:pl-8 2xl:pl-16">
          <Toc toc={frontmatter.toc} wrap />
        </div>
      )}
      <div>
        {children}
        <PrevNext />
      </div>
    </div>
  </PageWrapper>
)

const DocsPage = ({ page, slug, locale, ...props }) => {
  const { MDX, frontmatter } = useDynamicDocs(locale, props.docsPath)

  return (
    <Page {...{ page, slug, frontmatter }} locale={locale}>
      <MdxWrapper MDX={MDX} site="org" />
    </Page>
  )
}

export default DocsPage

/*
 * getStaticProps() is used to fetch data at build-time.
 * To learn more, see: https://nextjs.org/docs/basic-features/data-fetching
 */
export async function getStaticProps({ locale, params }) {
  const slug = 'docs/' + params.slug.join('/')

  return {
    props: {
      ...(await serverSideTranslations('en', ['docs', ...ns])),
      docsPath: params.slug.join('/'),
      slug,
      locale,
      page: {
        locale,
        path: ['docs', ...params.slug],
      },
    },
  }
}

/*
 * getStaticPaths() is used to specify for which routes (think URLs)
 * this page should be used to generate the result.
 *
 * On this page, it is returning a list of routes (think URLs) for all
 * the mdx (markdown) content.
 * That list comes from mdxMeta, which is build in the prebuild step
 * and contains paths, titles, and intro for all markdown.
 *
 * To learn more, see: https://nextjs.org/docs/basic-features/data-fetching
 */
export async function getStaticPaths() {
  const somePaths = mdxPaths.filter((path) => path.split('/').length < 5 && path !== 'docs')

  return {
    paths: [
      ...somePaths.map((key) => `/${key}`),
      ...somePaths.map((key) => `/es/${key}`),
      ...somePaths.map((key) => `/de/${key}`),
      ...somePaths.map((key) => `/fr/${key}`),
      ...somePaths.map((key) => `/nl/${key}`),
    ],
    fallback: 'blocking',
  }
}
