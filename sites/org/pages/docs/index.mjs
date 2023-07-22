// Dependencies
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
// Hooks
import { useCallback } from 'react'
import { useDynamicMdx } from 'shared/hooks/use-dynamic-mdx.mjs'
// Components
import { Page, ns } from './[...slug].mjs'

const DocsHomePage = ({ page, slug, locale }) => {
  const loader = useCallback(
    () =>
      import(/* webpackInclude: /docs\/\w+\.md/ */ `../../../../markdown/org/docs/${locale}.md`),
    [locale]
  )
  const { frontmatter, MDX } = useDynamicMdx(loader)

  return <Page {...{ page, slug, frontmatter, MDX, locale }} />
}

export default DocsHomePage

/*
 * getStaticProps() is used to fetch data at build-time.
 * To learn more, see: https://nextjs.org/docs/basic-features/data-fetching
 */
export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations('en', ['docs', ...ns])),
      slug: 'docs',
      locale,
      page: {
        locale,
        path: ['docs'],
      },
    },
  }
}
