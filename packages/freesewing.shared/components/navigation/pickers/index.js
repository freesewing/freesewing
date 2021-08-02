import Link from 'next/link'
import Icon from '@/shared/components/icon'

const setLanguage = lang => {
  if (!document) return
  document.cookie = `NEXT_LOCALE=${lang};path=/`
}

const mapMethods = {
  theme: (theme, props, t) => (
    <li key={theme}>
      <button
        className='p-2 px-4 text-left hover:bg-base-200 text-primary'
        data-set-theme={theme}
      >
        <span className="px-2">{props.themes[theme].icon}</span>
        <span className='capitalize'>{t(`theme.${theme}`)}</span>
      </button>
    </li>
  ),
  language: (lang, props, t) => (
    <li key={lang}>
      <Link href={props.path || '/'} locale={lang}>
        <button
          className='p-2 px-4 text-left hover:bg-base-200 text-primary'
          onClick={() => setLanguage(lang)}
        >
          <span className='font-bold'>{lang.toUpperCase()}</span>: {props.languages[lang]}
        </button>
      </Link>
    </li>
  ),
}

const icons = {
  theme: 'colors',
  language: 'language',
}


const Picker = props => {
  const t = props.t
    ? props.t
    : (x) => x
  const { mode } = props

  const entries = (mode === 'theme') ? props.themes : props.languages
  const ul = (
    <ul className="shadow menu dropdown-content bg-base-100 rounded-box w-52 border-base-200 border-2">
      {Object.keys(entries).map(theme => mapMethods[mode](theme, props, t))}
    </ul>
  )

  return  props.mobile
  ? (
    <div className={`dropdown dropdown-start w-full cursor-pointer`}>
      <div tabIndex="0" className="flex flex-row w-full">
        <Icon icon={icons[mode]} size={24}/>
        <span className="px-4 text-xl font-semibold opacity-70 capitalize">
          {t(mode)}
        </span>
      </div>
      {ul}
    </div>
  ) : (
    <div className={`dropdown dropdown-end ${props.classes.btn} cursor-pointer`}>
      <div tabIndex="0">
        <div className={props.classes.btnWrap || ''}>
          <Icon icon={icons[mode]} size={props.iconSize || 32}/>
          <span className={props.classes.btnSpan || ''}>
            {t(mode)}
            {props.mini}
          </span>
        </div>
      </div>
      {ul}
    </div>
  )
}

export default Picker
