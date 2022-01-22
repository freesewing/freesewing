import themes from 'shared/themes/index.js'
import LanguageIcon from 'shared/components/icons/i18n.js'
import { languages } from 'pkgs/i18n'

const LanguagePicker = ({ app }) => {
  return (
      <div className="dropdown">
        <div tabIndex="0" className={`
          m-0 btn btn-neutral flex flex-row gap-2
          sm:btn-ghost
          hover:bg-neutral hover:border-neutral-content
        `}>
          <LanguageIcon />
          <span>{languages[app.language]}</span>
        </div>
        <ul tabIndex="0" className="p-2 shadow menu dropdown-content bg-base-100 rounded-box w-52">
          {Object.keys(languages).map(language => (
            <li key={language}>
              <button onClick={() => app.changeLanguage(language)} className="btn btn-ghost text-base-content hover:bg-base-200">
                {languages[language]}
              </button>
            </li>
          ))}
        </ul>
      </div>
  )
}

export default LanguagePicker
