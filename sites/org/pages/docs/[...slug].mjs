import { nsMerge } from 'shared/utils.mjs'
// Used in static paths
import { pages } from 'site/prebuild/docs.en.mjs'
// Dependencies
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import * as runtime from 'react/jsx-runtime'
import { runSync } from '@mdx-js/mdx'
// Components
import { PageWrapper, ns as pageNs } from 'shared/components/wrappers/page.mjs'
import { MdxWrapper } from 'shared/components/wrappers/mdx.mjs'
import { DocsLayout, ns as layoutNs } from 'site/components/layouts/docs.mjs'
// MDX without webpack
import { mdxLoader } from 'shared/mdx/loader.mjs'

export const ns = nsMerge(pageNs, layoutNs, 'designs', 'account', 'tags')

/**
 * A page to display documentation markdown
 * Each page MUST be wrapped in the PageWrapper component.
 * You also MUST spread props.page into this wrapper component
 * when path and locale come from static props (as here)
 * or set them manually.
 */
const Page = ({ page, locale, intro, frontmatter, mdx, mdxSlug }) => (
  <PageWrapper
    {...page}
    locale={locale}
    title={frontmatter.title}
    intro={intro}
    layout={(props) => <DocsLayout {...props} {...{ slug: page.path.join('/'), frontmatter }} />}
  >
    <MdxWrapper mdx={mdx} site="org" slug={mdxSlug} />
  </PageWrapper>
)

export default Page

/*
 * getStaticProps() is used to fetch data at build-time.
 * To learn more, see: https://nextjs.org/docs/basic-features/data-fetching
 */
export async function getStaticProps({ locale, params }) {
  /*
   * Load mdx from disk and keep it out of the webpack bundle or your computer will melt
   * not to mention builds will be slow and often run into the resource limits set by Vercel
   */
  const mdx = await mdxLoader(locale, 'org', `docs/${params.slug.join('/')}`, {})

  /*
   * Pull frontmatter out of mdx content
   */
  const { frontmatter } = await runSync(mdx, runtime)

  return {
    props: {
      ...(await serverSideTranslations('en', ns)),
      slug: params.slug.join('/'),
      mdxSlug: params.slug,
      locale,
      mdx,
      frontmatter,
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
  const somePaths = Object.keys(pages).filter((path) => path !== 'docs')
  //.filter((path) => path.split('/').length < 5)

  return {
    paths: [
      ...somePaths.map((key) => `/${key}`),
      ...somePaths.map((key) => `/es/${key}`),
      ...somePaths.map((key) => `/de/${key}`),
      ...somePaths.map((key) => `/fr/${key}`),
      ...somePaths.map((key) => `/nl/${key}`),
      ...somePaths.map((key) => `/uk/${key}`),
    ],
    fallback: false,
  }
}
