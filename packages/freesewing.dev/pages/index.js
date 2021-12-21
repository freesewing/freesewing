import Page from 'shared/components/wrappers/page.js'
import useApp from 'site/hooks/useApp.js'
import ThemePicker from 'shared/components/theme-picker.js'
import Popout from 'shared/components/popout'
import Logo from 'shared/components/logos/freesewing.js'

export default (props) => {
  const app = useApp()
  return (
    <Page app={app} title='This is not a homepage'>
      <Logo size={400} theme={app.theme} />
    <Popout {...props} fixme>test</Popout>
    <Popout {...props} link>test</Popout>
    <Popout {...props} note>test</Popout>
    <Popout {...props} related>test</Popout>
    <Popout {...props} tip>test</Popout>
    <Popout {...props} warning>test</Popout>
      <pre>{JSON.stringify(Object.keys(app.navigation.reference), null, 2)}</pre>
      <p className='px-8'>
        <button
          className='btn btn-primary'
          onClick={() => app.theme === 'dark' ? app.setTheme('light') : app.setTheme('dark')}
        >Toggle</button>
      </p>
      <ThemePicker app={app} />

    </Page>
  )
}

