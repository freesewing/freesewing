import themes from 'shared/themes/index.js'
import ThemeIcon from 'shared/components/icons/theme.js'

const ThemePicker = ({ app, className='' }) => {
  return (
      <div className="dropdown">
        <div tabIndex="0" className="m-0 btn flex flex-row gap-2 hover:bg-neutral hover:border-neutral-content">
          <ThemeIcon />
          <span>{app.theme}</span>
          <span>Theme</span>
        </div>
        <ul tabIndex="0" className="p-2 shadow menu dropdown-content bg-base-100 rounded-box w-52">
          {Object.keys(themes).map(theme => (
            <li key={theme}>
              <button onClick={() => app.setTheme(theme)} className="btn btn-ghost text-base-content hover:bg-base-200">
                {theme}
                <span>&nbsp;Theme</span>
              </button>
            </li>
          ))}
        </ul>
      </div>
  )
}

export default ThemePicker
