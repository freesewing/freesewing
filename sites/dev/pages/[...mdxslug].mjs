// Hooks
import { useApp } from 'shared/hooks/use-app.mjs'
// Dependencies
import mdxMeta from 'site/prebuild/mdx.en.js'
import { mdxLoader } from 'shared/mdx/loader.mjs'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
// Components
import Head from 'next/head'
import { PageWrapper } from 'shared/components/wrappers/page.mjs'
import { MdxWrapper } from 'shared/components/wrappers/mdx.mjs'
import { TocWrapper } from 'shared/components/wrappers/toc.mjs'
import { HelpUs } from 'site/components/help-us.mjs'
import { jargon } from 'site/jargon.mjs'

const MdxPage = (props) => {
  // This hook is used for shared code and global state
  const app = useApp(props)

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
    <PageWrapper app={app} title={app.state.title}>
      <Head>
        <meta property="og:type" content="article" key="type" />
        <meta property="og:description" content={props.intro} key="type" />
        <meta property="og:article:author" content="Joost De Cock" key="author" />
        <meta
          property="og:image"
          content={`https://freesewing.dev/og/${props.page.slug}/og.png`}
          key="image"
        />
        <meta property="og:image:type" content="image/png" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:url" content={`https://freesewing.dev/${props.page.slug}`} key="url" />
        <meta property="og:locale" content="en_US" key="locale" />
        <meta property="og:site_name" content="freesewing.dev" key="site" />
      </Head>
      <div className="grid grid-cols-3 lg:gap-4">
        {props.toc && (
          <div className="mb-8 w-full col-span-3 row-start-1 col-start-1 xl:col-span-1 xl:col-start-3">
            <TocWrapper toc={props.toc} app={app} />
          </div>
        )}
        <div className="col-span-3 col-start-1 xl:col-span-2 xl:row-start-1 row-start-2 xl:pl-4">
          <MdxWrapper mdx={props.mdx} app={app} />
          <HelpUs mdx slug={`/${props.page.slug}`} />
        </div>
      </div>
    </PageWrapper>
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
export async function getStaticProps({ params }) {
  const { mdx, intro, toc } = await mdxLoader('en', 'dev', params.mdxslug.join('/'), jargon)

  return {
    props: {
      mdx,
      toc,
      intro: intro.join(' '),
      page: {
        path: params.mdxslug, // path to page as array
        ...mdxMeta[params.mdxslug.join('/')],
      },
      params,
      ...(await serverSideTranslations('en')),
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
  return {
    paths: Object.keys(mdxMeta).map((slug) => '/' + slug),
    fallback: false,
  }
}
