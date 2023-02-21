import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { PatternListPageTemplate } from 'site/page-templates/design-list.mjs'

const Page = () => <PatternListPageTemplate section="garments" />

export default Page

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale)),
    },
  }
}
