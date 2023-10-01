// Dependencies
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { nsMerge } from 'shared/utils.mjs'
import { collection } from 'site/hooks/use-design.mjs'
import { siteConfig } from 'site/site.config.mjs'
// Hooks
import { useTranslation } from 'next-i18next'
// Components
import { PageWrapper, ns as pageNs } from 'shared/components/wrappers/page.mjs'
import { DesignInfo, ns as infoNs } from 'shared/components/designs/info.mjs'

// Translation namespaces used on this page
const ns = nsMerge(pageNs, infoNs)

/*
 * Each page MUST be wrapped in the PageWrapper component.
 * You also MUST spread props.page into this wrapper component
 * when path and locale come from static props (as here)
 * or set them manually.
 */
const DesignsPage = ({ page, design }) => {
  const { t } = useTranslation([...ns, design])

  return (
    <PageWrapper {...page} title={t(`designs:${design}.t`)}>
      <DesignInfo design={design} />
    </PageWrapper>
  )
}

export default DesignsPage

export async function getStaticProps({ locale, params }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, [...ns, params.design])),
      design: params.design,
      page: {
        locale,
        path: ['designs', params.design],
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
  const enPaths = [...collection].map((design) => `/designs/${design}`)
  const paths = [...enPaths]
  for (const lang of siteConfig.languages.filter((lang) => lang !== 'en')) {
    paths.push(...enPaths.map((path) => `/${lang}${path}`))
  }

  return {
    paths,
    fallback: 'blocking',
  }
}
