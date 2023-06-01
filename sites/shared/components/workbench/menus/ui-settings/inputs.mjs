import { useState } from 'react'
import { ChoiceButton } from 'shared/components/choice-button.mjs'
import { ControlSettings } from 'shared/components/account/control.mjs'

// Shared input for list inputs
export const ListSetting = ({ name, config, current, update, t }) => {
  if (typeof current === 'undefined') current = config.dflt

  const [value, setValue] = useState(current)

  const handleChange = (newCurrent) => {
    if (newCurrent === config.dflt) reset()
    else {
      update.ui([name], newCurrent)
      setValue(newCurrent)
    }
  }

  const reset = () => {
    update.ui([name])
    setValue(config.dflt)
  }

  return (
    <>
      <p>{t(`ui-settings:${name}.d`)}</p>
      {config.list.map((entry) => (
        <ChoiceButton
          key={entry}
          title={t(`ui-settings:${config.choiceTitles[entry]}.t`)}
          color={entry === config.dflt ? 'primary' : 'accent'}
          active={current === entry}
          onClick={() => handleChange(entry)}
        >
          {t(`ui-settings:${config.choiceTitles[entry]}.d`)}
        </ChoiceButton>
      ))}
    </>
  )
}

export const ControlSettingInput = ({ t, name }) => (
  <>
    <p>{t(`ui-settings:${name}.d`)}</p>
    <ControlSettings noBack />
  </>
)

export const RendererSettingInput = ({ name, config, current, update, t }) => (
  <ListSetting
    {...{ name, config, current, update, t }}
    list={config.list.map((key) => ({
      key,
      title: key,
    }))}
  />
)

export const XRaySettingInput = (props) => <ListSetting {...props} />
