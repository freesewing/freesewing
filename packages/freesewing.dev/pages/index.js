import Page from 'shared/components/wrappers/page.js'
import useApp from 'site/hooks/useApp.js'
import Logo from 'shared/components/logos/freesewing.js'

export default (props) => {
  const app = useApp()
  return (
    <Page app={app} title='FIXME: Create homepage content'>
      <Logo size={200} theme={app.theme}/>
      <button className="btn btn-primary" onClick={app.togglePrimaryMenu}>toggle menu</button>
      <div className="theme-gradient loading">test</div>
    </Page>
  )
}

