import Icon from './icon'
import { themes } from './config'

const ThemeChooser = props => (
  <div className="dropdown dropdown-end">
    <div tabIndex="0" className="btn btn-ghost">
      <Icon icon='colors' size={32}/>
      <span className='px-2'>Theme</span>
    </div>
    <ul className="shadow menu dropdown-content bg-base-100 rounded-box w-52 border-base-200 border-2">
      {themes.map(theme => <li key={theme}><button className='btn btn-ghost' data-set-theme={theme}>{theme}</button></li>)}
    </ul>
  </div>
)

export default ThemeChooser
