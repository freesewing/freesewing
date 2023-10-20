//  __SDEFILE__ - This file is a dependency for the stand-alone environment
import { WorkbenchMenu } from 'shared/components/workbench/menus/shared/index.mjs'
import { MeasieIcon } from 'shared/components/icons.mjs'
import { SampleItem } from './options.mjs'

export const ns = ['measurements', 'test-view', 'workbench']

export const TestMeasurements = ({ patternConfig, settings, update, language, account }) => {
  const menuStructure = {}
  patternConfig.measurements.forEach((m) => (menuStructure[m] = m))

  return (
    <WorkbenchMenu
      {...{
        config: menuStructure,
        control: account.control,
        Icon: MeasieIcon,
        Item: SampleItem,
        name: 'measurements',
        language,
        ns,
        passProps: { settings, type: 'measurement' },
        updateFunc: (path, value) => {
          if (value) update.settings(['sample'], { type: 'measurement', measurement: path[0] })
          else update.settings(['sample'])
        },
      }}
    />
  )
}
