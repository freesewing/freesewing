// Used in static paths
import { pages } from 'site/prebuild/docs.mjs'
// Dependencies
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { loader } from 'shared/components/dynamic-docs/org.mjs'
// Hooks
import { useDynamicMdx } from 'shared/hooks/use-dynamic-mdx.mjs'
// Components
import { PageWrapper, ns as pageNs } from 'shared/components/wrappers/page.mjs'
import { MdxWrapper } from 'shared/components/wrappers/mdx.mjs'
import { DocsLayout, ns as layoutNs } from 'site/components/layouts/docs.mjs'

export const ns = [...pageNs, layoutNs]

/**
 * A page to display documentation markdown
 * Each page MUST be wrapped in the PageWrapper component.
 */
export const Page = ({ page, frontmatter, MDX }) => (
  <PageWrapper
    {...page}
    title={frontmatter.title}
    layout={(props) => <DocsLayout {...props} {...{ slug: page.path.join('/'), frontmatter }} />}
  >
    <MdxWrapper>{MDX}</MdxWrapper>
  </PageWrapper>
)

const DocsPage = ({ page, slug }) => {
  // State
  const { frontmatter, MDX } = useDynamicMdx(loader, slug)

  return <Page {...{ page, slug, frontmatter, MDX }} />
}

export default DocsPage

/*
 * getStaticProps() is used to fetch data at build-time.
 * To learn more, see: https://nextjs.org/docs/basic-features/data-fetching
 */
export async function getStaticProps({ locale, params }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['docs', ...ns])),
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
  const somePaths = Object.keys(pages)
    .filter((path) => path.split('/').length < 5)
    .filter((path) => path !== 'docs')

  return {
    paths: somePaths.map((key) => `/${key}`),
    fallback: false,
  }
}
