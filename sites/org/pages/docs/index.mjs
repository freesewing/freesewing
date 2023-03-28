// Hooks
import { useApp } from 'shared/hooks/use-app.mjs'
// Dependencies
import { mdxLoader } from 'shared/mdx/loader.mjs'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
// Components
import { PageWrapper, ns as pageNs } from 'shared/components/wrappers/page.mjs'
import { MdxWrapper } from 'shared/components/wrappers/mdx.mjs'
import { ReadMore } from 'shared/components/mdx/read-more.mjs'
import { jargon } from 'site/jargon.mjs'

// Translation namespaces used on this page
const namespaces = [...new Set(['docs', ...pageNs])]

const DocsPage = (props) => {
  const app = useApp(props)

  // We don't need all MDX components here, just ReadMore
  const components = {
    //ReadMore: (props) => <ReadMore {...props} app={app} slug="docs" recurse />,
  }

  return (
    <PageWrapper app={app}>
      <div className="w-full"></div>
    </PageWrapper>
  )
}

export default DocsPage

/*
 * getStaticProps() is used to fetch data at build-time.
 *
 * On this page, it is loading the mdx (markdown) content
 * from the markdown file on disk.
 *
 * This, in combination with getStaticPaths() below means this
 * page will be used to render/generate all markdown/mdx content.
 *
 * To learn more, see: https://nextjs.org/docs/basic-features/data-fetching
 */
export async function getStaticProps({ locale }) {
  const { mdx } = await mdxLoader(locale, 'org', ['docs'], jargon[locale])

  return {
    props: {
      ...(await serverSideTranslations(locale, namespaces)),
      mdx,
      page: {
        path: ['docs'],
      },
    },
  }
}
