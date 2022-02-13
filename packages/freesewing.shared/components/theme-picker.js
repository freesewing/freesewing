import themes from 'shared/themes/index.js'
import ThemeIcon from 'shared/components/icons/theme.js'
import { useTranslation } from 'next-i18next'

const ThemePicker = ({ app, className }) => {
  const { t } = useTranslation(['themes'])

  return (
      <div className={`dropdown ${className}`}>
        <div tabIndex="0" className={`
          m-0 btn btn-neutral flex flex-row gap-2
          sm:btn-ghost
          hover:bg-neutral hover:border-neutral-content
        `}>
          <ThemeIcon />
          <span>{t(`${app.theme}Theme`)}</span>
        </div>
        <ul
          tabIndex="0"
          className="p-2 shadow menu dropdown-content bg-base-100 rounded-box w-52"
        >
          {Object.keys(themes).map(theme => (
            <li key={theme}>
              <button
                onClick={() => app.setTheme(theme)}
                className="btn btn-ghost hover:bg-base-200"
              >
                <span className="text-base-content">
                  {t(`${theme}Theme`)}
                </span>
              </button>
            </li>
          ))}
        </ul>
      </div>
  )
}

export default ThemePicker
