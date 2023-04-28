// Dependencies
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
// Components
import { PageWrapper, ns as pageNs } from 'shared/components/wrappers/page.mjs'
import { Popout } from 'shared/components/popout.mjs'

// Translation namespaces used on this page
// Note that we include the account namespace here for the 'new' keyword
const namespaces = [...pageNs, 'account']

/*
 * Each page MUST be wrapped in the PageWrapper component.
 * You also MUST spread props.page into this wrapper component
 * when path and locale come from static props (as here)
 * or set them manually.
 */
const NewIndexPage = ({ page }) => (
  <PageWrapper {...page}>
    <div className="max-w-lg">
      <Popout fixme>
        <h5>This needs an umbrella page</h5>
        <p>
          We need to create content here linking to all the <em>new something</em> pages
        </p>
      </Popout>
    </div>
  </PageWrapper>
)

export default NewIndexPage

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, namespaces)),
      page: {
        locale,
        path: ['new'],
      },
    },
  }
}
