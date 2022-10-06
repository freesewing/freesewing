import { Pattern } from 'design/src/index.mjs'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

import Page from 'site/components/wrappers/page.js'
import useApp from 'site/hooks/useApp.js'
import WorkbenchWrapper from 'shared/components/wrappers/workbench.js'
import Layout from 'site/components/layouts/lab'

const WorkbenchPage = (props) => {
  const app = useApp()

  return (
    <Page app={app}>
      <WorkbenchWrapper {...{ app, design: Pattern, layout: Layout }} />
    </Page>
  )
}

export default WorkbenchPage

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale)),
    },
  }
}
