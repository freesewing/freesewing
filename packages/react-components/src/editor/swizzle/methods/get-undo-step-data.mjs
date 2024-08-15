import { useCallback } from 'react'

export const getUiPreferenceUndoStepData = (Swizzled, { step }) => {
  /*
   * We'll need these
   */
  const field = step.name === 'ui' ? step.path[1] : step.path[2]
  const structure = Swizzled.methods.menuUiPreferencesStructure()[field]

  /*
   * This we'll end up returning
   */
  const data = {
    icon: <Swizzled.components.UiIcon />,
    field,
    optCode: `${field}.t`,
    titleCode: 'uiPreferences.t',
    structure: Swizzled.methods.menuUiPreferencesStructure()[field],
  }

  /*
   * Add oldval and newVal if they exist, or fall back to default
   */
  for (const key of ['old', 'new'])
    data[key + 'Val'] = Swizzled.methods.t(
      structure.choiceTitles[
        structure.choiceTitles[String(step[key])] ? String(step[key]) : String(structure.dflt)
      ] + '.t'
    )

  return data
}

export const getCoreSettingUndoStepData = (Swizzled, { step, state, Design, imperial }) => {
  const field = step.path[1]

  const data = {
    field,
    titleCode: 'coreSettings.t',
    optCode: `${field}.t`,
    icon: <Swizzled.components.SettingsIcon />,
    structure: Swizzled.methods.menuCoreSettingsStructure({
      language: state.language,
      units: state.settings.units,
      sabool: state.settings.sabool,
      parts: Design.patternConfig.draftOrder,
    })[field],
  }
  const FieldIcon = data.structure.icon
  data.fieldIcon = <FieldIcon />

  /*
   * Save us some typing
   */
  const cord = Swizzled.methods.settingsValueCustomOrDefault
  const formatMm = useCallback((val) => Swizzled.methods.formatMm(val, imperial))
  const Html = Swizzled.components.HtmlSpan

  /*
   * Need to allow HTML in some of these in case this is
   * formated as imperial which uses <sub> and <sup>
   */
  switch (data.field) {
    case 'margin':
    case 'sa':
    case 'samm':
      if (data.field !== 'margin') {
        data.optCode = `samm.t`
      }
      data.oldVal = <Html html={formatMm(cord(step.old, data.structure.dflt))} />
      data.newVal = <Html html={formatMm(cord(step.new, data.structure.dflt))} />
      return data
    case 'scale':
      data.oldVal = cord(step.old, data.structure.dflt)
      data.newVal = cord(step.new, data.structure.dflt)
      return data
    case 'units':
      data.oldVal = Swizzled.methods.t(
        step.new === 'imperial' ? 'pe:metricUnits' : 'pe:imperialUnits'
      )
      data.newVal = Swizzled.methods.t(
        step.new === 'imperial' ? 'pe:imperialUnits' : 'pe:metricUnits'
      )
      return data
    case 'only':
      data.oldVal = cord(step.old, data.structure.dflt) || Swizzled.methods.t('pe:includeAllParts')
      data.newVal = cord(step.new, data.structure.dflt) || Swizzled.methods.t('pe:includeAllParts')
      return data
    default:
      const choices = data.structure.choiceTitles
      data.oldVal = Swizzled.methods.t(
        (choices[String(step.old)]
          ? choices[String(step.old)]
          : choices[String(data.structure.dflt)]) + '.t'
      )
      data.newVal = Swizzled.methods.t(
        (choices[String(step.new)]
          ? choices[String(step.new)]
          : choices[String(data.structure.dflt)]) + '.t'
      )
      return data
  }

  return false
}

export const getDesignOptionUndoStepData = (Swizzled, { step, state, Design }) => {
  return false
}

export const getUndoStepData = (Swizzled, props) => {
  /*
   * UI Preferences
   */
  if ((props.step.name === 'settings' && props.step.path[1] === 'ui') || props.step.name === 'ui')
    return Swizzled.methods.getUiPreferenceUndoStepData(props)

  /*
   * Design options
   */
  if (props.step.name === 'settings' && props.step.path[1] === 'options')
    return Swizzled.methods.getDesignOptionUndoStepData(props)

  /*
   * Core Settings
   */
  if (
    props.step.name === 'settings' &&
    [
      'sa',
      'margin',
      'scale',
      'only',
      'complete',
      'paperless',
      'sabool',
      'units',
      'expand',
    ].includes(props.step.path[1])
  )
    return Swizzled.methods.getCoreSettingUndoStepData(props)

  /*
   * Bail out of the step fell throug
   */
  return false
}
