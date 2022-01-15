import React, { useState } from 'react'
import { FormattedMessage } from 'react-intl'
import DraftSettingSa from '../DraftSettingSa'
import DraftSettingScale from '../DraftSettingScale'
import DraftSettingMargin from '../DraftSettingMargin'
import DraftSettingComplete from '../DraftSettingComplete'
import DraftSettingPaperless from '../DraftSettingPaperless'
import DraftSettingAdvanced from '../DraftSettingAdvanced'
import DraftSettingDebug from '../DraftSettingDebug'
import DraftSettingUnits from '../DraftSettingUnits'
import DraftSettingLanguage from '../DraftSettingLanguage'
import DraftSettingOnly from '../DraftSettingOnly'
import RightIcon from '@material-ui/icons/KeyboardArrowRight'

const DraftSettings = ({
  units = 'metric',
  raiseEvent,
  updateValue,
  noDocs,
  pattern,
  config,
  data = { settings: {} }
}) => {
  // State
  const [expanded, setExpanded] = useState([])

  // Building blocks
  const noyes = [<FormattedMessage id="app.no" />, <FormattedMessage id="app.yes" />]
  const hideshow = [<FormattedMessage id="app.hide" />, <FormattedMessage id="app.show" />]
  const metricimperial = {
    metric: <FormattedMessage id="app.metricUnits" />,
    imperial: <FormattedMessage id="app.imperialUnits" />
  }
  const labels = {
    sa: {
      none: <FormattedMessage id="app.noSeamAllowance" />,
      dflt: <FormattedMessage id="app.standardSeamAllowance" />,
      custom: <FormattedMessage id="app.customSeamAllowance" />
    },
    only: {
      dflt: <FormattedMessage id="app.default" />,
      custom: <FormattedMessage id="app.custom" />
    },
    paperless: noyes,
    advanced: hideshow,
    complete: hideshow,
    debug: noyes
  }
  // Methods
  const toggleGroup = (group) => {
    let shown = expanded.slice(0)
    let index = shown.indexOf(group)
    if (index === -1) shown.push(group)
    else shown.splice(index, 1)
    setExpanded(shown)
  }
  const getDefault = (setting, pattern = false) => {
    if (pattern && typeof pattern.settings[setting] !== 'undefined')
      return pattern.settings[setting]
    switch (setting) {
      case 'sa':
        return 10
      case 'scale':
        return 1
      case 'only':
        return 'dflt'
      case 'complete':
        return true
      case 'margin':
        return 2
      case 'units':
        return units
      case 'debug':
        return false
      default:
        return false
    }
  }
  const addProps = (setting) => {
    let childProps = {
      raiseEvent,
      updateValue,
      units,
      key: setting,
      name: setting,
      labels: labels[setting],
      noDocs,
      dflt: getDefault(setting, pattern),
      designDflt: getDefault(setting)
    }
    childProps.title = <FormattedMessage id={'settings.' + setting + '.title'} />
    childProps.desc = <FormattedMessage id={'settings.' + setting + '.description'} />
    if (setting === 'only') {
      childProps.customDflt = []
      childProps.parts = {}
      if (config.draftOrder) {
        for (let part of config.draftOrder)
          childProps.parts[part] = <FormattedMessage id={'parts.' + part} />
      }
    }
    if (typeof data.settings[setting] !== 'undefined') childProps.value = data.settings[setting]
    else childProps.value = null

    return childProps
  }

  const groups = {
    advanced: [
      <DraftSettingLanguage {...addProps('locale')} />,
      <DraftSettingUnits {...addProps('units')} list={metricimperial} />,
      <DraftSettingComplete {...addProps('complete')} />,
      <DraftSettingScale {...addProps('scale')} />,
      <DraftSettingMargin {...addProps('margin')} />,
      <DraftSettingOnly {...addProps('only')} />,
      <DraftSettingDebug {...addProps('debug')} />
    ]
  }

  return (
    <>
      <ul className="config level-1 nogroups">
        <DraftSettingSa {...addProps('sa')} />
        <DraftSettingPaperless {...addProps('paperless')} />
        <DraftSettingAdvanced {...addProps('advanced')} />
      </ul>
      {data.settings.advanced && (
        <ul className="config level-1">
          {Object.keys(groups).map((group) => {
            let open = true
            if (expanded.indexOf(group) === -1) open = false
            let children = null
            if (open) children = groups[group].map((component) => component)
            return (
              <React.Fragment key={group}>
                <li className={open ? 'expanded' : 'collapsed'} key={group + '-ghead'}>
                  <span onClick={() => toggleGroup(group)}>
                    <RightIcon className={'icon-col-exp ' + (open ? 'expanded' : 'collapsed')} />
                    <FormattedMessage id={'optiongroups.' + group} />
                  </span>
                </li>
                {children}
              </React.Fragment>
            )
          })}
        </ul>
      )}
    </>
  )
}

export default DraftSettings
