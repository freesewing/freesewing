import Page from 'shared/components/wrappers/page.js'
import useApp from 'site/hooks/useApp.js'
import Logo from 'shared/components/logos/freesewing.js'

export default (props) => {
  const app = useApp()
  return (
    <Page app={app} title='FIXME: Create homepage content'>
    </Page>
  )
}

