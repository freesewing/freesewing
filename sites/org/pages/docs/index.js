import Page from 'site/components/wrappers/page.js'
import useApp from 'site/hooks/useApp.js'
import mdxLoader from 'shared/mdx/loader'
import MdxWrapper from 'shared/components/wrappers/mdx'
import ReadMore from 'shared/components/mdx/read-more.js'

const DocsPage = ({ title, mdx }) => {
  const app = useApp()

  // We don't need all MDX components here, just ReadMore
  const components = {
    ReadMore: props => <ReadMore {...props} app={app} slug="docs" recurse />,
  }

  return (
    <Page app={app} title={title}>
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
export async function getStaticProps({ params, locale }) {

  const { mdx, frontmatter } = await mdxLoader(
    locale,
    'org',
    ['docs']
  )
  const { title='FIXME: Please give this page a title' } = frontmatter

  return {
    props: {
      mdx,
      title,
    }
  }
}

