// Dependencies
import Head from 'next/head'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { mdxLoader } from 'shared/mdx/loader.mjs'
import { jargon } from 'site/jargon.mjs'
import mdxMeta from 'site/prebuild/mdx.js'
// Components
import { MdxWrapper } from 'shared/components/wrappers/mdx.mjs'
import { TocWrapper } from 'shared/components/wrappers/toc.mjs'
import { PageWrapper, ns as pageNs } from 'shared/components/wrappers/page.mjs'
import { components } from 'site/components/mdx/index.mjs'

// Translation namespaces used on this page
const namespaces = [...new Set(['docs', ...pageNs])]

/*
 * Each page MUST be wrapped in the PageWrapper component.
 * You also MUST spread props.page into this wrapper component
 * when path and locale come from static props (as here)
 * or set them manually.
 */
const DocsIndexPage = ({ page, mdx, toc, intro }) => (
  <PageWrapper {...page}>
    <Head>
      <meta property="og:title" content={page.t} key="title" />
      <meta property="og:type" content="article" key="type" />
      <meta property="og:description" content={intro} key="type" />
      <meta property="og:article:author" content="Joost De Cock" key="author" />
      <meta
        property="og:image"
        content={`https://canary.backend.freesewing.org/og-img/en/dev/${page.slug}`}
        key="image"
      />
      <meta property="og:image:type" content="image/png" />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:url" content={`https://freesewing.dev/${page.slug}`} key="url" />
      <meta property="og:locale" content="en_US" key="locale" />
      <meta property="og:site_name" content="freesewing.dev" key="site" />
      <title>{typeof page.t === 'string' ? page.t : ''} - FreeSewing.org</title>
    </Head>
    <div className="flex flex-row-reverse flex-wrap xl:flex-nowrap justify-end">
      {toc && (
        <div className="mb-8 w-full xl:w-80 2xl:w-96 xl:pl-8 2xl:pl-16">
          <TocWrapper toc={toc} />
        </div>
      )}
      <div className="max-w-prose">
        <MdxWrapper mdx={mdx} components={components} />
      </div>
    </div>
  </PageWrapper>
)

/*
 * Default export is the NextJS page object
 */
export default DocsIndexPage

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
  const { mdx, intro, toc } = await mdxLoader(locale, 'org', 'docs', jargon[locale])

  return {
    props: {
      mdx,
      toc,
      intro: intro.join(' '),
      page: {
        path: ['docs'],
        locale,
        ...mdxMeta[locale]['docs'],
      },
      ...(await serverSideTranslations(locale, namespaces)),
    },
  }
}
