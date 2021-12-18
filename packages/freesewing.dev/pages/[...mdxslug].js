/*
 * This page will be used to generate all markdown content
 * which, on freesewing.dev, is pretty much the entire website
 * apart from the home page.
 *
 * It uses a dynamic route and data fetching to do that.
 * More info is available at the bottom of this page, or check
 * https://nextjs.org/docs/basic-features/data-fetching
 */

/*
 * Page wrapper - a MUST for all pages
 */
import Page from 'shared/components/wrappers/page.js'

/*
 * useApp hook - also a MUST for all pages
 */
import useApp from 'site/hooks/useApp.js'

/*
 * mdxMeta is generated in the prebuild step and contains
 * meta-data about markdown content (titles, slugs, intro)
 */
import mdxMeta from 'site/prebuild/mdx.en.js'

/*
 * This loads MDX (markdown) from disk
 */
import mdxLoader from 'shared/mdx/loader'

/*
 * This wraps MDX making sure to include all components
 * like Tip, Note, Example, and so on
 */
import MdxWrapper from 'shared/components/wrappers/mdx'

import ThemePicker from 'shared/components/theme-picker.js'

/*
 * The NextJS page object
 */
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
      <ThemePicker app={app} />
      <MdxWrapper mdx={props.mdx} />
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

  const mdx = await mdxLoader('en', 'dev', params.mdxslug.join('/'))

  return {
    props: {
      mdx,
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
