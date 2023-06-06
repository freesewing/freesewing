import { WorkbenchMenu } from 'shared/components/workbench/menus/shared/index.mjs'
import { MeasureIcon } from 'shared/components/icons.mjs'
import { SampleItem } from './options.mjs'

export const ns = ['measurements', 'test-view', 'workbench']

export const TestMeasurements = ({
  design,
  patternConfig,
  settings,
  update,
  language,
  account,
  DynamicDocs = false,
}) => {
  const menuStructure = {}
  patternConfig.measurements.forEach((m) => (menuStructure[m] = m))
  const getDocsPath = (measie) => `measurements/${measie}`
  return (
    <WorkbenchMenu
      {...{
        config: menuStructure,
        control: account.control,
        DynamicDocs,
        getDocsPath,
        Icon: MeasureIcon,
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
