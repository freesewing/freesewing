import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import Page from 'site/page-templates/pattern-list.js'

export default Page

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale)),
    }
  }
}


