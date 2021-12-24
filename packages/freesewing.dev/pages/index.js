import Page from 'shared/components/wrappers/page.js'
import useApp from 'site/hooks/useApp.js'
import Logo from 'shared/components/logos/freesewing.js'

export default (props) => {
  const app = useApp()
  return (
    <Page app={app} title='FIXME: Create homepage content'>
      <Logo size={200} theme={app.theme}/>
    <p className="bg-secondary hover:bold mr-4 hover:bg-base-100">test</p>
    <p className="cursor-pointer label justify-start gap-4 font-lg lg:font-xl font-bold border rounded mb-2">saef</p>

                <label className="cursor-pointer label justify-start gap-4 font-lg lg:font-xl font-bold">
                  <input
                    type="checkbox"
                    checked={develop}
                    className="toggle toggle-secondary"
                    onChange={() => setDevelop(!develop)}
                  />
                  <span className="ml-4 label-text text-secondary">{develop ? 'Disable' : 'Enable'} Developer View</span>
                </label>
    </Page>
  )
}

