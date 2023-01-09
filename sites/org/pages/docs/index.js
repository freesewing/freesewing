import Page from 'site/components/wrappers/page.js'
import useApp from 'site/hooks/useApp.js'
import mdxLoader from 'shared/mdx/loader'
import MdxWrapper from 'shared/components/wrappers/mdx'
import ReadMore from 'shared/components/mdx/read-more.js'
import { jargon } from 'site/jargon.mjs'
import Head from 'next/head'

const DocsPage = ({ title, mdx, bugsnag }) => {
  const app = useApp({ bugsnag })
  const fullTitle = title + ' - FreeSewing.org'

  // We don't need all MDX components here, just ReadMore
  const components = {
    ReadMore: (props) => <ReadMore {...props} app={app} slug="docs" recurse />,
  }

  return (
    <Page app={app} title={title}>
      <Head>
        <title>{fullTitle}</title>
      </Head>
      <div className="w-full">
        <MdxWrapper mdx={mdx} app={app} components={components} />
      </div>
    </Page>
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
  const { mdx, frontmatter } = await mdxLoader(locale, 'org', ['docs'], jargon[locale])
  const { title = 'FIXME: Please give this page a title' } = frontmatter

  return {
    props: {
      mdx,
      title,
    },
  }
}
