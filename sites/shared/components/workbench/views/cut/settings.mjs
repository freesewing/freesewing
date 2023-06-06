import { CutIcon } from 'shared/components/icons.mjs'
import { measurementAsMm, measurementAsUnits } from 'shared/utils.mjs'
import { ConstantInput, ListInput } from 'shared/components/workbench/menus/shared/inputs.mjs'
import { MmValue, ListValue } from 'shared/components/workbench/menus/shared/values.mjs'
import { WorkbenchMenu } from 'shared/components/workbench/menus/shared/index.mjs'
import { materialSettingsPath } from './hooks.mjs'

export const ns = ['cut']

const FabricSizeInput = (props) => {
  const mmCurrent = measurementAsUnits(props.current, props.units)

  const mmUpdateFunc = (path, newVal) =>
    props.updateFunc(path, measurementAsMm(newVal, props.units))

  return <ConstantInput {...props} current={mmCurrent} updateFunc={mmUpdateFunc} />
}

const loadConfig = (units) => ({
  sheetWidth: {
    dflt: units === 'imperial' ? 54 : 120,
  },
  grainDirection: {
    list: [0, 90],
    dflt: 90,
    choiceTitles: {
      0: 'horizontal',
      90: 'vertical',
    },
    valueTitles: {
      0: 'horizontal',
      90: 'vertical',
    },
  },
})

const inputs = {
  sheetWidth: FabricSizeInput,
  grainDirection: ListInput,
}

const values = {
  sheetWidth: MmValue,
  grainDirection: ListValue,
}

export const CutSettings = ({ update, settings, account, materialSettings }) => {
  const { activeMaterial } = materialSettings
  const config = loadConfig(settings.units)
  const passProps = { units: settings.units }
  const updateFunc = (path, newVal) =>
    update.ui([...materialSettingsPath, activeMaterial, ...path], newVal)

  return (
    <WorkbenchMenu
      {...{
        config,
        control: account.control,
        currentValues: materialSettings,
        Icon: CutIcon,
        inputs,
        values,
        name: 'cutSettings',
        ns,
        passProps,
        updateFunc,
      }}
    />
  )
}
