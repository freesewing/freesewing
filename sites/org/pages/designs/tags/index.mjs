// Dependencies
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
// Components
import { PageWrapper, ns as pageNs } from 'shared/components/wrappers/page.mjs'
import { tags } from 'shared/config/designs.mjs'
import { useTranslation } from 'next-i18next'
import { DesignTag } from 'shared/components/designs/tag.mjs'

// Translation namespaces used on this page
const namespaces = [...new Set(['tags', 'design', 'designs', ...pageNs])]

/*
 * Each page MUST be wrapped in the PageWrapper component.
 * You also MUST spread props.page into this wrapper component
 * when path and locale come from static props (as here)
 * or set them manually.
 */
const DesignsPage = ({ page }) => (
  <PageWrapper {...page}>
    <div className="flex flex-row flex-wrap gap-2">
      {tags.sort().map((tag) => (
        <DesignTag tag={tag} key={tag} />
      ))}
    </div>
  </PageWrapper>
)

export default DesignsPage

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, namespaces)),
      page: {
        locale,
        path: ['designs', 'tags'],
      },
    },
  }
}
