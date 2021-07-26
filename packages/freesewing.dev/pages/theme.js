import AppWrapper from '@/shared/components/wrappers/app'
import config from '@/site/freesewing.config'

import themes from '@/shared/themes'
import Button from '@/shared/components/elements/button'
import Highlight from '@/shared/components/mdx/highlight'
import ThemeChooser from '@/shared/components/theme-chooser'
import Popout from '@/shared/components/popout'



const list = Object.keys(themes)
const heading = <tr><th>Key</th><th>Value</th><th>Sample</th></tr>

const Sample = ({color}) => {
  if (!color) return null

  return (color.slice(0,1) === '#')
  ? <div style={{background: color}} className="rounded-full py-3 px-6 drop-shadow"></div>
  : null
}

const Page = props => (
  <AppWrapper {...props} title='Theme overview' noCrumbs>
    <div className="prose lg:prose-lg">
      <h2>Elements</h2>
      <h3>Buttons</h3>
      <div className="flex flex-row flex-wrap gap-2">
        <Button primary>Primary button</Button>
        <Button secondary>Secondary button</Button>
        <Button danger>Danger button</Button>
        <Button link>Link button</Button>
        <Button>Unstyled button</Button>
      </div>
      <h3>Components</h3>
      <h4>Note</h4>
      <Popout note>
        <h4>Hi there</h4>
        <p>I am a note.</p>
      </Popout>
      <h4>Tip</h4>
      <Popout tip>
        <h4>Hi there</h4>
        <p>I am a tip.</p>
      </Popout>
      <h4>Warning</h4>
      <Popout warning>
        <h4>Hi there</h4>
        <p>I am a warning.</p>
      </Popout>
      <h4>Fixme</h4>
      <Popout fixme>
        <h4>Hi there</h4>
        <p>I am a fixme.</p>
      </Popout>
      <h3>Code samples</h3>
      <h4>Default</h4>
      <Highlight lang="js">
        {`const myMethod = (param, more) => {\n  if (param) return more\n\n  return false\n}`}
      </Highlight>
      <h4>Dense</h4>
      <Highlight lang="bash" dense>
        npx create-freesewing-pattern
      </Highlight>
      <h3>Dropdown</h3>
    </div>
    <ThemeChooser classes={{btn:''}}/>
    <div className="prose lg:prose-lg mt-8">
      <h2>Themes</h2>
      <table>
        <tbody>
          {list.map( theme => (
            <>
              <tr><td colSpan="3"><h3>{theme}</h3></td></tr>
              {heading}
              {Object.keys(themes[theme].config).map(key => (
                <tr key={`${theme}-${key}`}>
                  <td className="w-1/3">{key}</td>
                  <td className="w-1/3">
                    {
                      typeof themes[theme].config[key] === 'object'
                        ? JSON.stringify(themes[theme].config[key], null, 2)
                        : themes[theme].config[key]
                    }
                  </td>
                  <td className="w-1/3">
                    {typeof themes[theme].config[key] !== 'object' &&  <Sample color={themes[theme].config[key]}/>}
                  </td>
                </tr>
              ))}
            </>
          ))}
        </tbody>
      </table>
        <h2>These are here to prevent them from getting pruned</h2>
        {['warning', 'info', 'error', 'success', 'primary', 'secondary', 'accent', 'base', 'neutral'].map(color => (
          <p
            key={color}
            className={`bg-${color} border-l-8 p-2 border-${color} bg-opacity-10 capitalize`}
          >
            {color}
          </p>
        ))}
      </div>
    </AppWrapper>
)

export default Page
