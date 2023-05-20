// Used in static paths
import mdxPaths from 'site/prebuild/mdx.paths.js'
// Dependencies
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
// Hooks
import { useState, useEffect } from 'react'
// Components
import Head from 'next/head'
import { PageWrapper, ns } from 'shared/components/wrappers/page.mjs'
import { Spinner } from 'shared/components/spinner.mjs'
import { components } from 'shared/components/mdx/index.mjs'
import { MdxWrapper } from 'shared/components/wrappers/mdx.mjs'
//import { TocWrapper } from 'shared/components/wrappers/toc.mjs'

/*
 * PLEASE READ THIS BEFORE YOU TRY TO REFACTOR THIS PAGE
 *
 * You will notice that this page has a page component for each language
 * and that those components are 95% identical. So you may be thinking:
 *
 *   This is not DRY, let me refactor this real quick
 *
 * Before you do so, please reflect on these topics:
 *
 *   - Do you know the pitfalls of dynamic imports in Webpack?
 *   - Do you know how much documentation we have?
 *   - Do you know we support 5 languages?
 *
 * If you do know all of these thigns, and you think you can improve this page. Go ahead.
 *
 * If you are not sure, then I would recommend you find something else to work on, unless
 * you consider this a learning opportunity.
 *
 * joost
 *
 */

export const Loading = () => (
  <Spinner className="w-24 h-24 color-primary animate-spin m-auto mt-8" />
)

const HeadInfo = ({ frontmatter, locale, slug }) => (
  <Head>
    <meta property="og:title" content={frontmatter.title} key="title" />
    <meta property="og:type" content="article" key="type" />
    <meta property="og:description" content={``} key="type" />
    <meta property="og:article:author" content="Joost De Cock" key="author" />
    <meta
      property="og:image"
      content={`https://canary.backend.freesewing.org/og-img/en/org/${slug}}`}
      key="image"
    />
    <meta property="og:image:type" content="image/png" />
    <meta property="og:image:width" content="1200" />
    <meta property="og:image:height" content="630" />
    <meta property="og:url" content={`https://freesewing.org/${slug}`} key="url" />
    <meta property="og:locale" content={locale} key="locale" />
    <meta property="og:site_name" content="freesewing.org" key="site" />
    <title>{frontmatter.title} - FreeSewing.org</title>
  </Head>
)

export const Page = ({ page, frontmatter, slug, locale, MDX }) => (
  <PageWrapper {...page} title={frontmatter.title}>
    <HeadInfo {...{ frontmatter, locale, slug }} />
    <div className="flex flex-row-reverse flex-wrap xl:flex-nowrap justify-end">
      {false && frontmatter.toc && (
        <div className="mb-8 w-full xl:w-80 2xl:w-96 xl:pl-8 2xl:pl-16">
          {/* FIXME: Implement toc plugin to add it to the frontmatter */}
          {/* <TocWrapper toc={frontmatter.toc} /> */}
        </div>
      )}
      <MdxWrapper>{MDX}</MdxWrapper>
    </div>
  </PageWrapper>
)

const EnDocsPage = ({ page, slug }) => {
  // State
  const [frontmatter, setFrontmatter] = useState({ title: 'FreeSewing.org' })
  const [MDX, setMDX] = useState(<Loading />)

  /* Load MDX dynamically */
  useEffect(() => {
    const loadMDX = async () => {
      import(`../../../../markdown/org/${slug}/en.md`).then((mod) => {
        setFrontmatter(mod.frontmatter)
        const Component = mod.default
        setMDX(<Component components={components} />)
      })
    }
    loadMDX()
  }, [slug])

  return <Page {...{ page, slug, frontmatter, MDX }} locale="en" />
}

const FrDocsPage = ({ page, slug }) => {
  // State
  const [frontmatter, setFrontmatter] = useState({ title: 'FreeSewing.org' })
  const [MDX, setMDX] = useState(<Loading />)

  /* Load MDX dynamically */
  useEffect(() => {
    const loadMDX = async () => {
      import(`../../../../markdown/org/${slug}/fr.md`).then((mod) => {
        setFrontmatter(mod.frontmatter)
        const Component = mod.default
        setMDX(<Component components={components} />)
      })
    }
    loadMDX()
  }, [slug])

  return <Page {...{ page, slug, frontmatter, MDX }} locale="fr" />
}

const EsDocsPage = ({ page, slug }) => {
  // State
  const [frontmatter, setFrontmatter] = useState({ title: 'FreeSewing.org' })
  const [MDX, setMDX] = useState(<Loading />)

  /* Load MDX dynamically */
  useEffect(() => {
    const loadMDX = async () => {
      import(`../../../../markdown/org/${slug}/es.md`).then((mod) => {
        setFrontmatter(mod.frontmatter)
        const Component = mod.default
        setMDX(<Component components={components} />)
      })
    }
    loadMDX()
  }, [slug])

  return <Page {...{ page, slug, frontmatter, MDX }} locale="es" />
}

const DeDocsPage = ({ page, slug }) => {
  // State
  const [frontmatter, setFrontmatter] = useState({ title: 'FreeSewing.org' })
  const [MDX, setMDX] = useState(<Loading />)

  /* Load MDX dynamically */
  useEffect(() => {
    const loadMDX = async () => {
      import(`../../../../markdown/org/${slug}/de.md`).then((mod) => {
        setFrontmatter(mod.frontmatter)
        const Component = mod.default
        setMDX(<Component components={components} />)
      })
    }
    loadMDX()
  }, [slug])

  return <Page {...{ page, slug, frontmatter, MDX }} locale="de" />
}

const NlDocsPage = ({ page, slug }) => {
  // State
  const [frontmatter, setFrontmatter] = useState({ title: 'FreeSewing.org' })
  const [MDX, setMDX] = useState(<Loading />)

  /* Load MDX dynamically */
  useEffect(() => {
    const loadMDX = async () => {
      import(`../../../../markdown/org/${slug}/nl.md`).then((mod) => {
        setFrontmatter(mod.frontmatter)
        const Component = mod.default
        setMDX(<Component components={components} />)
      })
    }
    loadMDX()
  }, [slug])

  return <Page {...{ page, slug, frontmatter, MDX }} locale="nl" />
}

const DocsPage = (props) => {
  if (props.locale === 'en') return <EnDocsPage {...props} />
  if (props.locale === 'fr') return <FrDocsPage {...props} />
  if (props.locale === 'es') return <EsDocsPage {...props} />
  if (props.locale === 'de') return <DeDocsPage {...props} />
  if (props.locale === 'nl') return <NlDocsPage {...props} />
}

export default DocsPage

/*
 * getStaticProps() is used to fetch data at build-time.
 * To learn more, see: https://nextjs.org/docs/basic-features/data-fetching
 */
export async function getStaticProps({ locale, params }) {
  return {
    props: {
      ...(await serverSideTranslations('en', ['docs', ...ns])),
      slug: 'docs/' + params.slug.join('/'),
      locale,
      page: {
        locale,
        path: ['docs', ...params.slug],
      },
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
  const somePaths = mdxPaths
    .filter((path) => path.split('/').length < 5)
    .filter((path) => path !== 'docs')

  return {
    paths: [
      ...somePaths.map((key) => `/${key}`),
      ...somePaths.map((key) => `/es/${key}`),
      ...somePaths.map((key) => `/de/${key}`),
      ...somePaths.map((key) => `/fr/${key}`),
      ...somePaths.map((key) => `/nl/${key}`),
    ],
    fallback: 'blocking',
  }
}
