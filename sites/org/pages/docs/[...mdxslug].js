import Page from 'site/components/wrappers/page.js'
import useApp from 'site/hooks/useApp.js'
import mdxLoader from 'shared/mdx/loader'
import MdxWrapper from 'shared/components/wrappers/mdx'
import TocWrapper from 'shared/components/wrappers/toc'
import Head from 'next/head'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import components from 'site/components/mdx/index.js'
// MDX paths
import mdxPaths from 'site/prebuild/mdx.paths.js'

const MdxPage = props => {

  // This hook is used for shared code and global state
  const app = useApp()

  /*
   * Each page should be wrapped in the Page wrapper component
   * You MUST pass it the result of useApp() as the `app` prop
   * and for MDX pages you can spread the props.page props to it
   * to automatically set the title and navigation
   *
   * Like breadcrumbs and updating the primary navigation with
   * active state
   */
  return (
    <Page app={app} {...props.page}>
      <Head>
        <meta property="og:title" content={props.page.title} key="title" />
        <meta property="og:type" content="article" key='type' />
        <meta property="og:description" content={props.intro} key='type' />
        <meta property="og:article:author" content='Joost De Cock' key='author' />
        <meta property="og:image" content={`https://canary.backend.freesewing.org/og-img/en/dev/${props.page.slug}`} key='image' />
        <meta property="og:image:type" content="image/png" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:url" content={`https://freesewing.dev/${props.page.slug}`} key='url' />
        <meta property="og:locale" content="en_US" key='locale' />
        <meta property="og:site_name" content="freesewing.dev" key='site' />
      </Head>
      <div className="flex flex-row-reverse flex-wrap xl:flex-nowrap justify-end">
        {props.toc && (
          <div className="mb-8 w-full xl:w-80 2xl:w-96 xl:pl-8 2xl:pl-16">
            <TocWrapper toc={props.toc} app={app}/>
          </div>
        )}
        <MdxWrapper mdx={props.mdx} app={app} components={components} />
      </div>
    </Page>
  )
}

/*
 * Default export is the NextJS page object
 */
export default MdxPage


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

  const { mdx, intro, toc, frontmatter } = await mdxLoader(
    locale,
    'org',
    ['docs', ...params.mdxslug].join('/')
  )
  const { title='FIXME: Please give this page a title' } = frontmatter

  return {
    props: {
      mdx,
      toc,
      intro: intro.join(' '),
      page: {
        slug: params.mdxslug.join('/'),
        path: '/' + params.mdxslug.join('/'),
        slugArray: params.mdxslug,
        title,
        order: frontmatter.order
          ? frontmatter.order+title
          : title
      },
      params,
      ...(await serverSideTranslations(locale)),
    }
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

  const somePaths = mdxPaths
    .filter(path => (path.split('/').length < 5))
    .filter(path => (path !== 'docs'))

  return {
    paths: [
      ...somePaths.map(key => `/${key}`),
      ...somePaths.map(key => `/es/${key}`),
      ...somePaths.map(key => `/de/${key}`),
      ...somePaths.map(key => `/fr/${key}`),
      ...somePaths.map(key => `/nl/${key}`),
    ],
    fallback: 'blocking'
  }
}

