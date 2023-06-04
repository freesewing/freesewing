import { PrintIcon } from 'shared/components/icons.mjs'
import { WorkbenchMenu } from 'shared/components/workbench/menus/shared/index.mjs'
import { ListInput, BoolInput, MmInput } from 'shared/components/workbench/menus/shared/inputs.mjs'
import { ListValue, BoolValue, MmValue } from 'shared/components/workbench/menus/shared/values.mjs'
import { loadPrintConfig } from './config.mjs'
import get from 'lodash.get'

const inputs = {
  size: ListInput,
  orientation: ListInput,
  margin: MmInput,
  coverPage: BoolInput,
  cutlist: BoolInput,
}

const values = {
  size: ListValue,
  orientation: ListValue,
  margin: MmValue,
  coverPage: BoolValue,
  cutlist: BoolValue,
}

export const ns = ['print']

export const settingsPath = ['layout', 'print', 'page']
export const PrintSettings = ({ update, settings, ui, account }) => {
  const config = loadPrintConfig(settings.units)
  const passProps = { units: settings.units }
  const updateFunc = (name, newVal) => update.ui([...settingsPath, name], newVal)

  return (
    <WorkbenchMenu
      {...{
        config,
        control: account.control,
        currentValues: get(ui, settingsPath, {}),
        Icon: PrintIcon,
        inputs,
        values,
        name: 'printSettings',
        ns,
        passProps,
        updateFunc,
      }}
    />
  )
}
