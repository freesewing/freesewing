import {
  SanityPageWrapper,
  getSanityStaticPaths,
  ns as sanityNs,
} from 'site/components/sanity/page-wrapper.mjs'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useDynamicMdx } from 'shared/hooks/use-dynamic-mdx.mjs'
import { useCallback } from 'react'

const namespaces = [...sanityNs]

const ShowcasePage = ({ locale, slug, page }) => {
  const loader = useCallback(
    () => import(`orgmarkdown/showcase/${slug}/${locale}.md`),
    [slug, locale]
  )

  const { frontmatter, MDX } = useDynamicMdx(loader)
  if (!MDX) return null
  return (
    <SanityPageWrapper
      {...{
        frontmatter,
        MDX,
        namespaces,
        page,
        slug,
      }}
    />
  )
}

/*
 * getStaticProps() is used to fetch data at build-time.
 *
 * On this page, it is loading the showcase content from strapi.
 *
 * This, in combination with getStaticPaths() below means this
 * page will be used to render/generate all showcase content.
 *
 * To learn more, see: https://nextjs.org/docs/basic-features/data-fetching
 */
export async function getStaticProps({ params, locale }) {
  const { slug } = params

  return {
    props: {
      slug,
      locale,
      ...(await serverSideTranslations(locale, namespaces)),
      page: {
        locale,
        path: ['showcase', slug],
      },
    },
  }
}

export const getStaticPaths = getSanityStaticPaths('showcase')

export default ShowcasePage
