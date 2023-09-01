import { PrintIcon } from 'shared/components/icons.mjs'
import { WorkbenchMenu } from 'shared/components/workbench/menus/shared/index.mjs'
import { ListInput, BoolInput, MmInput } from 'shared/components/workbench/menus/shared/inputs.mjs'
import {
  BoolValue,
  MmValue,
  HighlightedValue,
} from 'shared/components/workbench/menus/shared/values.mjs'
import { loadPrintConfig, printSettingsPath } from './config.mjs'
import { capitalize } from 'shared/utils.mjs'
import get from 'lodash.get'
import { PatternIcon } from 'shared/components/icons.mjs'

const inputs = {
  size: ListInput,
  orientation: ListInput,
  margin: MmInput,
  coverPage: BoolInput,
  cutlist: BoolInput,
}

const values = {
  size: ({ current, changed, config }) => (
    <HighlightedValue changed={changed}>
      {capitalize(current ? current : config.dflt)}
    </HighlightedValue>
  ),
  orientation: ({ current, changed }) => (
    <HighlightedValue changed={changed}>
      <PatternIcon
        className={`w-6 h-6 text-inherit ${current === 'landscape' ? '-rotate-90' : ''}`}
      />
    </HighlightedValue>
  ),
  margin: MmValue,
  coverPage: BoolValue,
  cutlist: BoolValue,
}

export const ns = ['print']

export const PrintSettings = ({ update, settings, ui, account }) => {
  const config = loadPrintConfig(settings.units)
  const passProps = { units: settings.units }
  const updateFunc = (path, newVal) => update.ui([...printSettingsPath, ...path], newVal)

  return (
    <WorkbenchMenu
      {...{
        config,
        control: account.control,
        currentValues: get(ui, printSettingsPath, {}),
        Icon: PrintIcon,
        inputs,
        values,
        name: 'printSettings',
        ns,
        passProps,
        updateFunc,
        isFirst: true,
      }}
    />
  )
}
