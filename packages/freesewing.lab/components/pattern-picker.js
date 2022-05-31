import React from 'react'
import DesignIcon from 'shared/components/icons/design.js'
import Link from 'next/link'
import { useTranslation } from 'next-i18next'
import useVersion from 'site/hooks/useVersion.js'
import { formatVersionUri } from './version-picker.js'

const PatternPicker = ({ app }) => {
  const { t } = useTranslation(['common'])
  const version = useVersion()

  return (
      <div className="dropdown w-full md:w-auto">
        <div tabIndex="0" className={`
          m-0 btn btn-neutral flex flex-row gap-2 btn-outline
          md:btn-ghost
          hover:bg-neutral hover:border-neutral-content
        `}>
          <DesignIcon />
          <span>{t('designs')}</span>
        </div>
        <ul tabIndex="0" className="p-2 shadow menu dropdown-content bg-base-100 rounded-box w-52 overflow-y-scroll navdrop">
          {Object.keys(app.navigation).map(section => (
            <React.Fragment key={section}>
              <li className={`
                capitalize font-bold text-base-content text-center
                opacity-50 border-b2 my-2 border-base-content
              `}>
                  {t(app.navigation[section].__title)}
              </li>
              {Object.keys(app.navigation[section]).filter((p)=>!p.startsWith('__')).map(pattern => {
                return (
                <li key={pattern}>
                  <Link href={app.navigation[section][pattern].__slug}>
                    <button className="btn btn-ghost">
                      <span className="text-base-content">
                        {app.navigation[section][pattern].__title}
                      </span>
                    </button>
                  </Link>
                </li>
              )})}
            </React.Fragment>
          ))}
        </ul>
      </div>
  )
}

export default PatternPicker
