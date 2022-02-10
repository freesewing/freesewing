import React from 'react'
import DesignIcon from 'shared/components/icons/design.js'
import Link from 'next/link'
import { useTranslation } from 'next-i18next'

const PatternPicker = ({ app }) => {
  const { t } = useTranslation(['app'])

  return (
      <div className="dropdown">
        <div tabIndex="0" className={`
          m-0 btn btn-neutral flex flex-row gap-2
          sm:btn-ghost
          hover:bg-neutral hover:border-neutral-content
        `}>
          <DesignIcon />
          <span>{t('designs')}</span>
        </div>
        <ul tabIndex="0" className="p-2 shadow menu dropdown-content bg-base-100 rounded-box w-52 overflow-y-scroll navdrop">
          {Object.keys(app.patterns).map(section => (
            <React.Fragment key={section}>
              <li className={`
                capitalize font-bold text-base-content text-center
                opacity-50 border-b2 my-2 border-base-content
              `}>
                  {t(app.navigation[section].__title)}
              </li>
              {app.patterns[section].map(pattern => (
                <li key={pattern}>
                  <Link href={`/${section}/${pattern}`}>
                    <button className="btn btn-ghost">
                      <span className="text-base-content">
                        {pattern}
                      </span>
                    </button>
                  </Link>
                </li>
              ))}
            </React.Fragment>
          ))}
        </ul>
      </div>
  )
}

export default PatternPicker
