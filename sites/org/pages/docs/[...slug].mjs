import { nsMerge, localePath } from 'shared/utils.mjs'
import { siteConfig } from 'site/site.config.mjs'
// Used in static paths
import { pages } from 'site/prebuild/docs.en.mjs'
// Hooks
import { useState } from 'react'
// Dependencies
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { loadMdxAsStaticProps } from 'shared/mdx/load.mjs'
// Components
import { PageWrapper, ns as pageNs } from 'shared/components/wrappers/page.mjs'
import { MdxWrapper } from 'shared/components/wrappers/mdx.mjs'
import { DocsLayout, ns as layoutNs } from 'site/components/layouts/docs.mjs'
import { ns as designNs } from 'shared/components/designs/info.mjs'

export const ns = nsMerge(pageNs, layoutNs, designNs, 'popout')

/**
 * A page to display documentation markdown
 * Each page MUST be wrapped in the PageWrapper component.
 * You also MUST spread props.page into this wrapper component
 * when path and locale come from static props (as here)
 * or set them manually.
 */
const Page = ({ page, locale, frontmatter, mdx, mdxSlug }) => {
  const [wide, setWide] = useState(false)

  return (
    <PageWrapper
      {...page}
      locale={locale}
      title={frontmatter.title}
      intro={frontmatter.intro || frontmatter.lead}
      layout={(props) => (
        <DocsLayout {...props} {...{ slug: page.path.join('/'), frontmatter, wide, setWide }} />
      )}
    >
      <MdxWrapper mdx={mdx} site="org" slug={mdxSlug} wide={wide} />
    </PageWrapper>
  )
}

export default Page

/*
 * getStaticProps() is used to fetch data at build-time.
 * To learn more, see: https://nextjs.org/docs/basic-features/data-fetching
 */
export async function getStaticProps({ locale, params }) {
  return {
    props: {
      ...(await serverSideTranslations('en', ns)),
      ...(await loadMdxAsStaticProps({
        language: locale,
        site: 'org',
        slug: `docs/${params.slug.join('/')}`,
      })),
      slug: params.slug.join('/'),
      mdxSlug: params.slug,
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
  const allSlugs = Object.keys(pages).filter((path) => path !== 'docs')
  const paths = []
  for (const lang of siteConfig.languages) {
    paths.push(...allSlugs.map((slug) => localePath(lang, slug)))
  }

  return { paths, fallback: false }
}
