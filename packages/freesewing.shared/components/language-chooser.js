import Icon from '@/shared/components/icon'
import themes from '@/shared/themes'
import { languages } from '@freesewing/i18n'
import Link from 'next/link'

const setLanguage = lang => {
  if (!document) return
  document.cookie = `NEXT_LOCALE=${lang};path=/`
}

const LanguageChooser = props => {
  const t = props.t
    ? props.t
    : (x) => x
  return (
    <div className={`dropdown dropdown-end ${props.block ? 'w-full' : props.classes.btn} cursor-pointer`}>
      <div tabIndex="0" className={`${props.block ? 'btn btn-ghost btn-block' : ''}`}>
        <div className={`${props.block ? '' : props.classes.btnWrap}`}>
          <Icon icon='language' size={props.iconSize || 32}/>
          <span className={`${props.block ? 'px-2' : props.classes.btnSpan}`}>
            {t('language')}
            {!props.block && props.mini}
          </span>
        </div>
      </div>
      <ul className="shadow menu dropdown-content bg-base-100 rounded-box w-52 border-base-200 border-2">
        {props.languages.map(lang => (
          <li key={lang}>
            <Link href={props.path || '/'} locale={lang}>
              <button
                className='p-2 px-4 text-left hover:bg-base-200 text-primary'
                onClick={() => setLanguage(lang)}
              >
                <span className='font-bold'>{lang.toUpperCase()}</span>: {languages[lang]}
              </button>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default LanguageChooser
