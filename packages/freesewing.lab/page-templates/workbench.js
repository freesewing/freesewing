import Page from 'shared/components/wrappers/page.js'
import useApp from 'site/hooks/useApp.js'
import WorkbenchWrapper from 'shared/components/wrappers/workbench.js'
import { useRouter } from 'next/router'

const WorkbenchPage = ({ pattern }) => {
  const app = useApp()
  const router = useRouter()
  const { preload, from } = router.query

  return (
    <Page app={app} noLayout>
      <WorkbenchWrapper {...{ app, pattern, preload, from }} />
    </Page>
  )
}

export default WorkbenchPage

