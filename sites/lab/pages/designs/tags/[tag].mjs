// Dependencies
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
// Components
import { PageWrapper, ns as pageNs } from 'shared/components/wrappers/page.mjs'
import { DesignList, ns as designNs } from 'shared/components/designs/design-list.mjs'
import { tags } from 'shared/config/designs.mjs'
import { siteConfig } from 'site/site.config.mjs'

// Translation namespaces used on this page
const namespaces = [...new Set([...designNs, ...pageNs])]

/*
 * Each page MUST be wrapped in the PageWrapper component.
 * You also MUST spread props.page into this wrapper component
 * when path and locale come from static props (as here)
 * or set them manually.
 */
const DesignsPage = ({ page }) => {
  return (
    <PageWrapper {...page}>
      <DesignList tag={page.tag} />
    </PageWrapper>
  )
}

export default DesignsPage

export async function getStaticProps({ locale, params }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, namespaces)),
      page: {
        locale,
        path: ['designs', 'tags', params.tag],
        tag: params.tag,
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
 *
 * To learn more, see: https://nextjs.org/docs/basic-features/data-fetching
 */
export async function getStaticPaths() {
  const enPaths = [...tags].map((tag) => `/designs/tags/${tag}`)
  const paths = [...enPaths]
  for (const lang of siteConfig.languages.filter((lang) => lang !== 'en')) {
    paths.push(...enPaths.map((path) => `/${lang}${path}`))
  }

  return {
    paths,
    fallback: 'blocking',
  }
}
