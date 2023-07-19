// Used in static paths
import { mdxPaths } from 'site/prebuild/mdx-paths.en.mjs'
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

const ns = [...pageNs, layoutNs]
/*
 * PLEASE READ THIS BEFORE YOU TRY TO REFACTOR THIS PAGE
 *
 * You will notice that this page has a page component for each language
 * and that those components are 95% identical. So you may be thinking:
 *
 *   This is not DRY, let me refactor this real quick
 *
 * Before you do so, please reflect on these topics:
 *
 *   - Do you know the pitfalls of dynamic imports in Webpack?
 *   - Do you know how much documentation we have?
 *   - Do you know we support 5 languages?
 *
 * If you do know all of these thigns, and you think you can improve this page. Go ahead.
 *
 * If you are not sure, then I would recommend you find something else to work on, unless
 * you consider this a learning opportunity.
 *
 * joost
 *
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
      ...(await serverSideTranslations('en', ['docs', ...ns])),
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
  const somePaths = mdxPaths
    .filter((path) => path.split('/').length < 5)
    .filter((path) => path !== 'docs')

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
