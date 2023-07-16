import { DocsPage, ns as pageNs } from 'shared/components/docs/docs-page.mjs'
import { mdxLoader } from 'shared/mdx/v3loader.mjs'
import { mdxPaths } from 'site/prebuild/docs/mdx-paths.en.mjs'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

export default DocsPage

/*
 * getStaticProps() is used to fetch data at build-time.
 * To learn more, see: https://nextjs.org/docs/basic-features/data-fetching
 */
export async function getStaticProps({ locale, params }) {
  const slug = 'docs/' + params.slug.join('/')

  return {
    props: {
      ...(await serverSideTranslations(locale, ['docs', ...pageNs])),
      ...(await mdxLoader(locale, 'org', slug)),
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
