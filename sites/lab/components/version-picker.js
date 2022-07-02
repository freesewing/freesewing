import React from 'react'
import VersionsIcon from 'shared/components/icons/versions.js'
import { useTranslation } from 'next-i18next'
import versions from 'site/versions.json'
import useVersion from 'site/hooks/useVersion.js'
import {Picker, PickerLink} from 'shared/components/picker'

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

  const pickerProps = {
    title: formatVersionTitle(version),
    Icon: VersionsIcon,
    ariaLabel: t('versionPicker')
  }

  return (<Picker {...pickerProps}>
    {[defaultVersion, ...versions].map(v => (
      <PickerLink key={v} href={formatVersionUri(v)}>{formatVersionTitle(v)}</PickerLink>
    ))}
  </Picker>)
}

export default PatternPicker
