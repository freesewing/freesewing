import pattern from 'pkgs/aaron/src/index.js'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import PageTemplate from 'site/page-templates/workbench.js'

const Page = () => <PageTemplate pattern={pattern} />
export default Page

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale)),
    }
  }
}

