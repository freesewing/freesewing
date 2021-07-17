import Icon from '@/shared/components/icon'
import themes from '@/shared/themes'

const ThemeChooser = props => (
  <div className={`dropdown dropdown-end ${props.block ? 'w-full' : ''}`}>
    <div tabIndex="0" className={`btn btn-ghost ${props.block ? 'btn-block' : ''}`}>
      <Icon icon='colors' size={32}/>
      <span className='px-2'>Theme</span>
    </div>
    <ul className="shadow menu dropdown-content bg-base-100 rounded-box w-52 border-base-200 border-2">
      {Object.keys(themes).map(theme => <li key={theme}><button className='p-2 px-4 text-left hover:bg-base-200' data-set-theme={theme}>{themes[theme].displayName}</button></li>)}
    </ul>
  </div>
)

export default ThemeChooser
