import themes from 'shared/themes/index.js'
import LocaleIcon from 'shared/components/icons/i18n.js'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'
import Link from 'next/link'

const LocalePicker = ({ app }) => {
  const { t } = useTranslation(['locales'])
  const router = useRouter()
  console.log(router)
  return (
    <div className="dropdown">
      <div tabIndex="0" className={`
        m-0 btn btn-neutral flex flex-row gap-2
        sm:btn-ghost
        hover:bg-neutral hover:border-neutral-content
      `}>
        <LocaleIcon />
        <span>{t(router.locale)}</span>
      </div>
      <ul tabIndex="0" className="p-2 shadow menu dropdown-content bg-base-100 rounded-box w-52">
        {router.locales.map(locale => (
          <li key={locale}>
            <Link href={router.asPath} locale={locale}>
              <a className="btn btn-ghost text-base-content hover:bg-base-200">
                <span className="text-base-content">
                  {t(locale)}
                </span>
              </a>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default LocalePicker
