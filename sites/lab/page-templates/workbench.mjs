import Page from 'site/components/wrappers/page.js'
import useApp from 'site/hooks/useApp.js'
import WorkbenchWrapper from 'shared/components/wrappers/workbench.js'
import { useRouter } from 'next/router'
import Layout from 'site/components/layouts/lab'

const WorkbenchPage = ({ design }) => {
  const app = useApp()
  const router = useRouter()
  const { preload, from } = router.query

  return (
    <Page app={app}>
      <WorkbenchWrapper {...{ app, design, preload, from }} layout={Layout} />
    </Page>
  )
}

export default WorkbenchPage

