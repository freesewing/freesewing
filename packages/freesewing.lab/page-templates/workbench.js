import Page from 'shared/components/wrappers/page.js'
import useApp from 'site/hooks/useApp.js'
import WorkbenchWrapper from 'shared/components/wrappers/workbench.js'

const WorkbenchPage = ({ pattern }) => {
  const app = useApp()

  return (
    <Page app={app} noLayout>
      <WorkbenchWrapper app={app} pattern={pattern} />
    </Page>
  )
}

export default WorkbenchPage

