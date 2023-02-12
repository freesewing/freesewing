import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { Pattern } from 'design/src/index.mjs'
import { useApp } from 'site/hooks/useApp.mjs'
import { PageWrapper } from 'site/components/wrappers/page.mjs'
import { LabLayout } from 'site/components/layouts/lab.mjs'
import { WorkbenchWrapper } from 'shared/components/wrappers/workbench.mjs'

const WorkbenchPage = () => {
  const app = useApp()

  return (
    <PageWrapper app={app}>
      <WorkbenchWrapper {...{ app, design: Pattern, layout: LabLayout }} />
    </PageWrapper>
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
