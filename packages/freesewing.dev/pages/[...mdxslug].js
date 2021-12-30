import Page from 'shared/components/wrappers/page.js'
import useApp from 'site/hooks/useApp.js'
import mdxMeta from 'site/prebuild/mdx.en.js'
import mdxLoader from 'shared/mdx/loader'
import MdxWrapper from 'shared/components/wrappers/mdx'
import Head from 'next/head'
import Popout from 'shared/components/popout.js'

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
        <meta property="og:image" content={`https://canary.backend.freesewing.org/en/dev/${props.page.slug}`} key='image' />
        <meta property="og:image:type" content="image/png" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:url" content={`https://canary.freesewing.dev/${props.page.slug}`} key='url' />
        <meta property="og:locale" content="en_US" key='locale' />
        <meta property="og:site_name" content="freesewing.dev" key='site' />
      </Head>
      <MdxWrapper mdx={props.mdx} app={app}/>
      <details className="mt-4">
        <summary>Click here to learn how you can help us improve this page</summary>
        <Popout tip className='max-w-prose'>
          <h6>Found a mistake?</h6>
          You can <a
            href={`https://github.com/freesewing/freesewing/edit/develop/markdown/dev/${props.page.slug}/en.md`}
            className="text-secondary font-bold"
          >edit this page on Github</a> and help us improve our documentation.
        </Popout>
        <Popout comment by="joost" className='max-w-prose'>
          <h6>Does this look ok?</h6>
          <img className="my-4 rounded" src={`https://canary.backend.freesewing.org/og-img/en/dev/${props.page.slug}`} />
          <p>
            I recently added a backend endpoint to auto-generate pretty (I hope) Open Graph images.
            They are those little preview images you see when you paste a link in Discord (for example).
          </p>
          <p>
            This idea is that it will auto-generate an image, but I am certain there are some edge cases
            where that will not work.
            There are hundreds of pages on this website and checking them all one by one is not something
            I see myself doing. But since you are here on this page, perhaps you could see if the image
            above looks ok.
          </p>
          <p>If it does look ok, then Yay! that is great and no need to do anything.</p>
          <p>
            If it is not ok, please let me know about it.
            Either by <a href="https://discord.freesewing.org/" className="text-secondary">
              reaching out on Discord
            </a> or feel free to <a
              href="https://github.com/freesewing/freesewing/issues/new/choose"
              className="text-secondary"
            >create
            an issue on Github</a>.
          </p>
          <p>Thank you, I really appreciate your help with this.</p>
        </Popout>
      </details>
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
export async function getStaticProps({ params }) {

  const { mdx, intro } = await mdxLoader('en', 'dev', params.mdxslug.join('/'))

  return {
    props: {
      mdx,
      intro: intro.join(' '),
      page: {
        slug: params.mdxslug.join('/'),
        path: '/' + params.mdxslug.join('/'),
        slugArray: params.mdxslug,
        ...mdxMeta[params.mdxslug.join('/')],
      },
      params
    }
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
    paths: Object.keys(mdxMeta).map(slug => '/'+slug),
    fallback: false
  }
}
