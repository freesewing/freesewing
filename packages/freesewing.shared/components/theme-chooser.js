import Icon from '@/shared/components/icon'
import themes from '@/shared/themes'

const ThemeChooser = props => (
  <div className={`dropdown dropdown-end ${props.block ? 'w-full' : props.classes.btn}`}>
    <div tabIndex="0" className={`${props.block ? 'btn btn-ghost btn-block' : ''}`}>
      <div className={`${props.block ? '' : props.classes.btnWrap}`}>
        <Icon icon='colors' size={props.iconSize || 32}/>
        <span className={`${props.block ? 'px-2' : props.classes.btnSpan}`}>
          Theme
          {!props.block && props.mini}
        </span>
      </div>
    </div>
    <ul className="shadow menu dropdown-content bg-base-100 rounded-box w-52 border-base-200 border-2">
      {Object.keys(themes).map(theme => <li key={theme}><button className='p-2 px-4 text-left hover:bg-base-200 text-primary' data-set-theme={theme}>{themes[theme].displayName}</button></li>)}
    </ul>
  </div>
)

export default ThemeChooser
