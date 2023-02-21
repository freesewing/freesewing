// Hooks
import { useApp } from 'site/hooks/useApp.mjs'
import { useRouter } from 'next/router'
// Dependencies
import { capitalize } from 'shared/utils.mjs'
// Components
import Head from 'next/head'
import { PageWrapper } from 'site/components/wrappers/page.mjs'
import { WorkbenchWrapper } from 'shared/components/wrappers/workbench.mjs'
import { LabLayout } from 'site/components/layouts/lab.mjs'

export const WorkbenchPage = ({ design }) => {
  const app = useApp()
  const router = useRouter()
  const { preload, from } = router.query
  const name = design.designConfig?.data.name
  const shortName = name ? name.substring(name.indexOf('/') + 1) : 'Lab'
  const title = capitalize(shortName)
  const fullTitle = title + ' - FreeSewing Lab'

  return (
    <PageWrapper app={app}>
      <Head>
        <title>{fullTitle}</title>
      </Head>
      <WorkbenchWrapper {...{ app, design, preload, from }} layout={LabLayout} />
    </PageWrapper>
  )
}
