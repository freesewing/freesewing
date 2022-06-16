import React from 'react'
import VersionsIcon from 'shared/components/icons/versions.js'
import Link from 'next/link'
import { useTranslation } from 'next-i18next'
import versions from 'site/versions.json'
import useVersion from 'site/hooks/useVersion.js'

export const defaultVersion = 'next'

export const formatVersionTitle = version => (!version || version === defaultVersion)
  ? `${defaultVersion} version`
  : `Version ${version}`

export const formatVersionUri = (version=false, design=false) => {
  if (!version && !design) return '/'
  if (!version && design) return `/${design}`
  if (version && !design) return `/v/${version}`

  return `/v/${version}/${design}`
}

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
          <VersionsIcon />
          <span>{formatVersionTitle(version)}</span>
        </div>
        <ul tabIndex="0" className="p-2 shadow menu dropdown-content bg-base-100 rounded-box w-52 overflow-y-scroll navdrop">
          {[defaultVersion, ...versions].map(v => (
            <li key={v}>
              <Link href={formatVersionUri(v)}>
                <button className="btn btn-ghost">
                  <span className="text-base-content captialize">
                    {formatVersionTitle(v)}
                  </span>
                </button>
              </Link>
            </li>
          ))}
        </ul>
      </div>
  )
}

export default PatternPicker
