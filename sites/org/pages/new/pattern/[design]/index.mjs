// Dependencies
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { collection } from 'shared/hooks/use-design.mjs'
// Components
import { PageWrapper, ns as pageNs } from 'shared/components/wrappers/page.mjs'
import { ns as authNs } from 'shared/components/wrappers/auth/index.mjs'
import { SetPicker, ns as setsNs } from 'shared/components/sets/set-picker.mjs'

// Translation namespaces used on this page
const namespaces = [...new Set(['account', ...setsNs, ...authNs, ...pageNs])]

/*
 * Each page MUST be wrapped in the PageWrapper component.
 * You also MUST spread props.page into this wrapper component
 * when path and locale come from static props (as here)
 * or set them manually.
 */
const NewAaronPatternPickSetPage = ({ page, design }) => (
  <PageWrapper {...page}>
    <SetPicker design={design} />
  </PageWrapper>
)

export default NewAaronPatternPickSetPage

export async function getStaticProps({ locale, params }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, namespaces)),
      design: params.design,
      page: {
        locale,
        path: ['new', 'pattern', params.design],
      },
    },
  }
}

/*
 * getStaticPaths() is used to specify for which routes (think URLs)
 * this page should be used to generate the result.
 */
export async function getStaticPaths() {
  return {
    paths: [
      ...collection.map((design) => `/new/pattern/${design}`),
      ...collection.map((design) => `/es/new/pattern/${design}`),
      ...collection.map((design) => `/de/new/pattern/${design}`),
      ...collection.map((design) => `/fr/new/pattern/${design}`),
      ...collection.map((design) => `/nl/new/pattern/${design}`),
    ],
    fallback: 'blocking',
  }
}
