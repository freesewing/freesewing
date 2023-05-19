// Dependencies
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
// Components
import { PageWrapper, ns as pageNs } from 'shared/components/wrappers/page.mjs'
import { DesignPicker, ns as designNs } from 'shared/components/designs/design-picker.mjs'

// Translation namespaces used on this page
const namespaces = [...new Set([...designNs, ...pageNs])]

/*
 * Each page MUST be wrapped in the PageWrapper component.
 * You also MUST spread props.page into this wrapper component
 * when path and locale come from static props (as here)
 * or set them manually.
 */
const DesignsPage = ({ page }) => (
  <PageWrapper {...page}>
    <DesignPicker />
  </PageWrapper>
)

export default DesignsPage

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, namespaces)),
      page: {
        locale,
        path: ['designs'],
      },
    },
  }
}
