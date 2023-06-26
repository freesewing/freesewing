// Dependencies
import dynamic from 'next/dynamic'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
// Components
import { PageWrapper, ns as pageNs } from 'shared/components/wrappers/page.mjs'

// Translation namespaces used on this page (errors comes from the dynamic import)
const ns = [...pageNs, 'errors']

/*
 * Some things should never generated as SSR
 * So for these, we run a dynamic import and disable SSR rendering
 */
const DynamicPattern = dynamic(
  () => import('shared/components/pattern/manage.mjs').then((mod) => mod.ManagePattern),
  { ssr: false }
)

/*
 * Each page MUST be wrapped in the PageWrapper component.
 * You also MUST spread props.page into this wrapper component
 * when path and locale come from static props (as here)
 * or set them manually.
 */
const ViewPatternPage = ({ page, id }) => (
  <PageWrapper {...page}>
    <DynamicPattern id={id} />
  </PageWrapper>
)

export default ViewPatternPage

export async function getStaticProps({ locale, params }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ns)),
      id: params.id,
      page: {
        locale,
        path: ['patterns', params.id],
      },
    },
  }
}

/*
 * getStaticPaths() is used to specify for which routes (think URLs)
 * this page should be used to generate the result.
 *
 * On this page, it is not returning a list, but rather sets fallback to true.
 * This will cause the page to be generated the first time it's requested.
 */
export async function getStaticPaths() {
  return {
    paths: [],
    fallback: true,
  }
}
