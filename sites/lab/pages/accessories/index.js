import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import PageTemplate from 'site/page-templates/design-list.js'

const Page = () => <PageTemplate section="accessories" />

export default Page

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale)),
    },
  }
}
