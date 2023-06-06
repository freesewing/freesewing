import { TestOptions, ns as optionsNs } from './options.mjs'

export const ns = [...optionsNs]

const TestOption = ({ config, settings, control, name, ...rest }) => {
  return (
    <MenuItem
      {...{
        ...rest,
        changed: settings.sample === name,
      }}
    />
  )
}

export const TestMenu = ({
  design,
  patternConfig,
  settings,
  ui,
  update,
  language,
  account,
  DynamicDocs,
  inspector = false,
  renderProps,
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
    <nav className="grow mb-12">
      <TestOptions {...menuProps} />
    </nav>
  )
}
