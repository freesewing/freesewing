import { DocsPage, ns as pageNs } from 'shared/components/docs/docs-page.mjs'
import { mdxLoader } from 'shared/mdx/v3loader.mjs'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

export default DocsPage

/*
 * getStaticProps() is used to fetch data at build-time.
 * To learn more, see: https://nextjs.org/docs/basic-features/data-fetching
 */
export async function getStaticProps({ locale }) {
  const slug = `docs`
  return {
    props: {
      ...(await serverSideTranslations('en', ['docs', ...pageNs])),
      ...(await mdxLoader(locale, 'org', slug)),
      slug,
      locale,
      page: {
        locale,
        path: ['docs'],
      },
    },
  }
}
