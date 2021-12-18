import Page from 'shared/components/wrappers/page.js'
import useApp from 'site/hooks/useApp.js'
import ThemePicker from 'shared/components/theme-picker.js'

export default (props) => {
  const app = useApp()
  return (
    <Page app={app} title='This is not a homepage'>
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

