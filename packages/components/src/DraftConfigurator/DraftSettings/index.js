import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { FormattedMessage } from 'react-intl'
import DraftSettingSa from '../DraftSettingSa'
import DraftSettingMargin from '../DraftSettingMargin'
import DraftSettingComplete from '../DraftSettingComplete'
import DraftSettingPaperless from '../DraftSettingPaperless'
import DraftSettingAdvanced from '../DraftSettingAdvanced'
import DraftSettingUnits from '../DraftSettingUnits'
import DraftSettingLanguage from '../DraftSettingLanguage'
import DraftSettingOnly from '../DraftSettingOnly'
import RightIcon from '@material-ui/icons/KeyboardArrowRight'

const DraftSettings = props => {
  const [expanded, setExpanded] = useState([])
  const toggleGroup = group => {
    let shown = expanded.slice(0)
    let index = shown.indexOf(group)
    if (index === -1) shown.push(group)
    else shown.splice(index, 1)
    setExpanded(shown)
  }
  const getDefault = setting => {
    if (props.recipe && typeof props.recipe.settings[setting] !== 'undefined')
      return props.recipe.settings[setting]
    switch (setting) {
      case 'sa':
        return 10
      case 'only':
        return 'dflt'
      case 'complete':
        return true
      case 'margin':
        return 2
      case 'units':
        return props.units
      default:
        return false
    }
  }

  let noyes = [<FormattedMessage id="app.no" />, <FormattedMessage id="app.yes" />]
  let hideshow = [<FormattedMessage id="app.hide" />, <FormattedMessage id="app.show" />]
  let units = {
    metric: <FormattedMessage id="app.metricUnits" />,
    imperial: <FormattedMessage id="app.imperialUnits" />
  }
  const addProps = setting => {
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
      complete: hideshow
    }
    let childProps = {
      raiseEvent: props.raiseEvent,
      updateValue: props.updateValue,
      units: props.units,
      key: setting,
      name: setting,
      labels: labels[setting],
      noDocs: props.noDocs,
      dflt: getDefault(setting)
    }
    childProps.title = <FormattedMessage id={'settings.' + setting + '.title'} />
    childProps.desc = <FormattedMessage id={'settings.' + setting + '.description'} />
    if (setting === 'only') {
      childProps.customDflt = []
      childProps.parts = {}
      if (props.config.draftOrder) {
        for (let part of props.config.draftOrder)
          childProps.parts[part] = <FormattedMessage id={'parts.' + part} />
      }
    }
    if (
      typeof props.gist !== 'undefined' &&
      typeof props.gist.settings !== 'undefined' &&
      typeof props.gist.settings[setting] !== 'undefined'
    )
      childProps.value = props.gist.settings[setting]
    else childProps.value = null

    return childProps
  }

  let groups = {
    advanced: [
      <DraftSettingLanguage {...addProps('locale')} />,
      <DraftSettingUnits {...addProps('units')} list={units} />,
      <DraftSettingComplete {...addProps('complete')} />,
      <DraftSettingMargin {...addProps('margin')} />,
      <DraftSettingOnly {...addProps('only')} />
    ]
  }

  return (
    <React.Fragment>
      <ul className="config l2 nogroups">
        <DraftSettingSa {...addProps('sa')} />
        <DraftSettingPaperless {...addProps('paperless')} />
        <DraftSettingAdvanced {...addProps('advanced')} />
      </ul>
      {props.gist.settings.advanced ? (
        <ul className="config l2">
          {Object.keys(groups).map(group => {
            let open = true
            if (expanded.indexOf(group) === -1) open = false
            let children = null
            if (open) children = groups[group].map(component => component)
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
      ) : null}
    </React.Fragment>
  )
}

DraftSettings.propTypes = {
  config: PropTypes.object.isRequired
}

DraftSettings.defaultProps = {}

export default DraftSettings
