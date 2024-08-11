import { useState } from 'react'
import orderBy from 'lodash.orderby'

/**
 * The undos view shows the undo history, and allows restoring any undo state
 *
 * @param (object) props - All the props
 * @param {object} props.swizzled - An object with swizzled components, hooks, methods, config, and defaults
 * @param {object} designs - Object holding all designs
 * @param {object} update - ViewWrapper state update object
 */
export const UndosView = ({ designs, design, Design, Swizzled, update, state }) => {
  const [showDev, setShowDev] = useState(false)

  const steps = orderBy(state._.undos, 'time', 'desc')

  return (
    <>
      <Swizzled.components.HeaderMenu state={state} {...{ Swizzled, update }} />
      <div className="text-left mt-8 mb-24 px-4 max-w-xl mx-auto">
        <h2>{Swizzled.methods.t('pe:view.undos.t')}</h2>
        <p>{Swizzled.methods.t('pe:view.undos.d')}</p>
        <small>
          <b>Tip:</b> Click on any change to undo all changes up to, and including, that change.
        </small>
        {steps.length < 1 ? (
          <Swizzled.components.Popout note>
            <h4>Your undo history is currently empty</h4>
            <p>When you make changes to your pattern, they will show up here.</p>
            <p>For example, you can click the button below to change the pattern rotation:</p>
            <button
              className="btn btn-primary capitalize"
              onClick={() => update.settings('ui.rotate', state.settings?.ui?.rotate ? 0 : 1)}
            >
              {Swizzled.methods.t('pe:example')}: {Swizzled.methods.t('pe:rotate.t')}
            </button>
            <p>As soon as you do, the change will show up here, and you can undo it.</p>
          </Swizzled.components.Popout>
        ) : (
          <div className="flex flex-col gap-2 mt-4">
            {steps.map((step) => (
              <Swizzled.components.UndoStep key={step.time} {...{ step, update, state, Design }} />
            ))}
          </div>
        )}
      </div>
    </>
  )
}

export const UndoStep = ({ Swizzled, update, state, step, Design }) => {
  const { t } = Swizzled.methods
  const secondsAgo = Math.floor((Date.now() - step.time) / 100) / 10
  const minutesAgo = Math.floor(secondsAgo / 60)
  const hoursAgo = Math.floor(minutesAgo / 60)

  const timeAgo = hoursAgo ? (
    <span>
      {hoursAgo} {t('pe:hoursAgo')}
    </span>
  ) : minutesAgo ? (
    <span>
      {minutesAgo} {t('pe:minutesAgo')}
    </span>
  ) : (
    <span>
      {secondsAgo} {t('pe:secondsAgo')}
    </span>
  )

  // Ensure path is always an array
  if (!Array.isArray(step.path)) step.path = step.path.split('.')

  // Get that title translation code
  let titleCode = 'undos.unknown.t'
  let optCode = 'undos.unknown.t'
  let oldVal = step.old
  let newVal = step.new
  let structure = {}
  let field
  let icon = null
  const imperial = state.settings?.units === 'imperial' ? true : false
  /*
   * Metadata can be ignored
   */
  if (step.name === 'settings' && step.path[1] === 'metadata') return null
  /*
   * UI Preferences
   */ else if ((step.name === 'settings' && step.path[1] === 'ui') || step.name === 'ui') {
    icon = <Swizzled.components.UiIcon />
    field = step.name === 'ui' ? step.path[1] : step.path[2]
    titleCode = 'uiPreferences.t'
    optCode = `${field}.t`
    structure = Swizzled.methods.menuUiPreferencesStructure()[field]
    oldVal = structure.choiceTitles[String(step.old)]
      ? t(`${structure.choiceTitles[String(step.old)]}.t`)
      : t(`${structure.choiceTitles[String(structure.dflt)]}.t`)
    newVal = structure.choiceTitles[String(step.new)]
      ? t(`${structure.choiceTitles[String(step.new)]}.t`)
      : t(`${structure.choiceTitles[String(structure.dflt)]}.t`)
  } else if (step.name === 'settings' && step.path[1] === 'units') {
  /*
   * Units
   */
    field = step.path[1]
    titleCode = 'coreSettings.t'
    icon = <Swizzled.components.SettingsIcon />
    optCode = `${field}.t`
    oldVal = step.old === 'imperial' ? 'metric' : 'imperial'
    newVal = step.new === 'imperial' ? 'metric' : 'imperial'
  }
  // SA needs a bit of TLC as we need to handle sabool and samm
  else if (step.name === 'settings' && step.path[1] === 'samm') {
    titleCode = 'coreSettings.t'
    optCode = `samm.t`
    icon = <Swizzled.components.SettingsIcon />
    // Need to allow HTML here in case this is formated at imperial which uses <sub> and <sup>
    oldVal = (
      <span dangerouslySetInnerHTML={{ __html: Swizzled.methods.formatMm(step.old, imperial) }} />
    )
    newVal = (
      <span dangerouslySetInnerHTML={{ __html: Swizzled.methods.formatMm(step.new, imperial) }} />
    )
  } else if (
  /*
   * Core Settings
   */
    step.name === 'settings' &&
    ['sa', 'margin', 'scale', 'only', 'complete', 'paperless', 'sabool'].includes(step.path[1])
  ) {
    field = step.path[1]
    titleCode = 'coreSettings.t'
    optCode = `${field}.t`
    icon = <Swizzled.components.SettingsIcon />
    structure = Swizzled.methods.menuCoreSettingsStructure({
      language: state.language,
      units: state.settings.units,
      sabool: state.settings.sabool,
      parts: Design.patternConfig.draftOrder,
    })
    // Distance Core settings
    if (['margin'].includes(field)) {
      // Need to allow HTML here in case this is formated at imperial which uses <sub> and <sup>
      oldVal = (
        <span dangerouslySetInnerHTML={{ __html: Swizzled.methods.formatMm(step.old, imperial) }} />
      )
      newVal = (
        <span dangerouslySetInnerHTML={{ __html: Swizzled.methods.formatMm(step.new, imperial) }} />
      )
    }
    // Number Core settings
    else if (['scale'].includes(field)) {
      oldVal = step.old ? step.old : structure[field].dflt
      newVal = step.new
    }
    // Boolean Core settings
    else if (['complete', 'paperless', 'sabool'].includes(field)) {
      oldVal = structure[field].choiceTitles[String(step.old)]
        ? t(`${structure[field].choiceTitles[String(step.old)]}.t`)
        : t(`${structure[field].choiceTitles[String(structure[field].dflt)]}.t`)
      newVal = structure[field].choiceTitles[String(step.new)]
        ? t(`${structure[field].choiceTitles[String(step.new)]}.t`)
        : t(`${structure[field].choiceTitles[String(structure[field].dflt)]}.t`)
    }
    // SA needs a bit of TLC as we need to handle sabool and samm
    else if (field === 'sa') {
      optCode = `samm.t`
      // Need to allow HTML here in case this is formated at imperial which uses <sub> and <sup>
      oldVal = (
        <span dangerouslySetInnerHTML={{ __html: Swizzled.methods.formatMm(step.old, imperial) }} />
      )
      newVal = (
        <span dangerouslySetInnerHTML={{ __html: Swizzled.methods.formatMm(step.new, imperial) }} />
      )
    } else if (field === 'samm') {
      optCode = `samm.t`
      // Need to allow HTML here in case this is formated at imperial which uses <sub> and <sup>
      oldVal = (
        <span dangerouslySetInnerHTML={{ __html: Swizzled.methods.formatMm(step.old, imperial) }} />
      )
      newVal = (
        <span dangerouslySetInnerHTML={{ __html: Swizzled.methods.formatMm(step.new, imperial) }} />
      )
    } else {
      return <p>FIXME: Field {field} is not supported yet</p>
    }
  } else if (step.name === 'settings' && step.path[1] === 'options') {
  /*
   * Design Options
   */
    icon = <Swizzled.components.OptionsIcon />
    field = step.path[2]
    titleCode = 'designOptions.t'
    optCode = `${field}.t`
    structure = Swizzled.methods.getOptionStructure(field, Design, state)
    return <pre>{JSON.stringify({ step, field, structure }, null, 2)}</pre>
    oldVal = structure.choiceTitles[String(step.old)]
      ? t(`${structure.choiceTitles[String(step.old)]}.t`)
      : t(`${structure.choiceTitles[String(structure.dflt)]}.t`)
    newVal = structure.choiceTitles[String(step.new)]
      ? t(`${structure.choiceTitles[String(step.new)]}.t`)
      : t(`${structure.choiceTitles[String(structure.dflt)]}.t`)
  } else return <p>FIXME: Field {field} is not supported yet</p>

  return (
    <div>
      <p className="text-sm italic font-medium opacity-70 text-right p-0 m-0 -mb-2 pr-2">
        {timeAgo}
      </p>
      <Swizzled.components.ButtonFrame>
        <div className="flex flex-row items-center justify-between gap-2 w-full m-0 p-0 -mt-2 text-lg">
          <span>{t(`pe:${optCode}`)}</span>
          <span className="opacity-70 flex flex-row gap-1 items-center text-base">
            {icon} {t(`pe:${titleCode}`)}
          </span>
        </div>
        <div className="flex flex-row gap-1 items-center align-start w-full">
          <span className="">{newVal}</span>
          <Swizzled.components.LeftIcon className="w-4 h-4 text-secondary shrink-0" stroke={4} />
          <span className="line-through decoration-1 opacity-70">{oldVal}</span>
        </div>
      </Swizzled.components.ButtonFrame>
    </div>
  )
}
