import Page from 'site/components/wrappers/page.js'
import useApp from 'site/hooks/useApp.js'
import WorkbenchWrapper from 'shared/components/wrappers/workbench.js'
import { useRouter } from 'next/router'
import Layout from 'site/components/layouts/lab'
import Head from 'next/head'
import { capitalize } from 'shared/utils.mjs'

const WorkbenchPage = ({ design }) => {
  const app = useApp()
  const router = useRouter()
  const { preload, from } = router.query
  const name = design.designConfig?.data.name
  const shortName = name ? name.substring(name.indexOf('/') + 1) : 'Lab'
  const title = capitalize(shortName)
  const fullTitle = title + ' - FreeSewing Lab'

  return (
    <Page app={app}>
      <Head>
        <title>{fullTitle}</title>
      </Head>
      <WorkbenchWrapper {...{ app, design, preload, from }} layout={Layout} />
    </Page>
  )
}

export default WorkbenchPage
