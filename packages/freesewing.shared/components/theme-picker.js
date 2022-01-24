import themes from 'shared/themes/index.js'
import ThemeIcon from 'shared/components/icons/theme.js'

const ThemePicker = ({ app, className }) => {
  return (
      <div className={`dropdown ${className}`}>
        <div tabIndex="0" className={`
          m-0 btn btn-neutral flex flex-row gap-2
          sm:btn-ghost
          hover:bg-neutral hover:border-neutral-content
        `}>
          <ThemeIcon />
          <span>{app.i18n
            ? app.t(`${app.theme}Theme`)
            : `${app.theme} Theme`
          }</span>
        </div>
        <ul
          tabIndex="0"
          className="p-2 shadow menu dropdown-content bg-base-100 rounded-box w-52"
        >
          {Object.keys(themes).map(theme => (
            <li key={theme}>
              <button
                onClick={() => app.setTheme(theme)}
                className="btn btn-ghost text-base-content hover:bg-base-200"
              >
                {app.i18n
                  ? app.t(`${theme}Theme`)
                  : `${theme} Theme`
                }
              </button>
            </li>
          ))}
        </ul>
      </div>
  )
}

export default ThemePicker
