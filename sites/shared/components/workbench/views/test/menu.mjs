import { TestOptions, ns as optionsNs } from './options.mjs'
import { TestMeasurements, ns as measieNs } from './measurements.mjs'
export const ns = [...optionsNs, ...measieNs]

export const TestMenu = ({
  design,
  patternConfig,
  settings,
  update,
  language,
  account,
  DynamicDocs,
}) => {
  const control = account.control
  const menuProps = {
    design,
    patternConfig,
    settings,
    update,
    language,
    account,
    DynamicDocs,
    control,
  }

  return (
    <nav>
      <TestOptions {...menuProps} />
      <TestMeasurements {...menuProps} />
    </nav>
  )
}
