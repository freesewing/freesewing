import { nsMerge } from 'shared/utils.mjs'
// Used in static paths
import { pages } from 'site/prebuild/docs.en.mjs'
// Dependencies
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
// Hooks
import { useCallback } from 'react'
import { useDynamicMdx } from 'shared/hooks/use-dynamic-mdx.mjs'
// Components
import { PageWrapper, ns as pageNs } from 'shared/components/wrappers/page.mjs'
import { MdxWrapper } from 'shared/components/wrappers/mdx.mjs'
import { DocsLayout, ns as layoutNs } from 'site/components/layouts/docs.mjs'
import { loaders } from 'shared/components/dynamic-docs/org.mjs'

export const ns = nsMerge(pageNs, layoutNs)

/**
 * a page to display documentation markdown
 * Each page MUST be wrapped in the PageWrapper component.
 * You also MUST spread props.page into this wrapper component
 * when path and locale come from static props (as here)
 * or set them manually.
 */
export const Page = ({ page, locale, frontmatter, MDX }) => (
  <PageWrapper
    {...page}
    locale={locale}
    title={frontmatter.title}
    layout={(props) => <DocsLayout {...props} {...{ slug: page.path.join('/'), frontmatter }} />}
  >
    <MdxWrapper>{MDX}</MdxWrapper>
  </PageWrapper>
)

const DocsPage = ({ page, locale, slug }) => {
  // get the appropriate loader for the locale, and load the mdx for this page
  const loader = useCallback(() => loaders[locale](slug), [locale, slug])
  // State
  const { frontmatter, MDX } = useDynamicMdx(loader)

  return <Page {...{ page, slug, frontmatter, MDX, locale }} />
}

export default DocsPage

/*
 * getStaticProps() is used to fetch data at build-time.
 * To learn more, see: https://nextjs.org/docs/basic-features/data-fetching
 */
export async function getStaticProps({ locale, params }) {
  return {
    props: {
      ...(await serverSideTranslations('en', ns)),
      slug: params.slug.join('/'),
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
