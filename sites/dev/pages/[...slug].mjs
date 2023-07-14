import { DocsPage, ns as pageNs } from 'shared/components/docs/docs-page.mjs'
import { mdxLoader } from 'shared/mdx/v3loader.mjs'
import { mdxPaths } from 'site/prebuild/mdx-paths.en.mjs'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

export default DocsPage

/*
 * getStaticProps() is used to fetch data at build-time.
 * To learn more, see: https://nextjs.org/docs/basic-features/data-fetching
 */
export async function getStaticProps({ params }) {
  const slug = params.slug.join('/')
  return {
    props: {
      ...(await serverSideTranslations('en', ['docs', ...pageNs])),
      ...(await mdxLoader('en', 'dev', slug)),
      slug,
      site: 'dev',
      page: {
        locale: 'en',
        path: params.slug,
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
 *
 * To learn more, see: https://nextjs.org/docs/basic-features/data-fetching
 */
export async function getStaticPaths() {
  return {
    paths: mdxPaths.map((slug) => '/' + slug),
    fallback: false,
  }
}
