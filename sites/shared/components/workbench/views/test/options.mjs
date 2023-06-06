import { MenuItem } from 'shared/components/workbench/menus/shared/menu-item.mjs'
import { WorkbenchMenu } from 'shared/components/workbench/menus/shared/index.mjs'
import {
  emojis,
  ns as designMenuNs,
} from 'shared/components/workbench/menus/design-options/index.mjs'
import { OptionsIcon } from 'shared/components/icons.mjs'
import { optionsMenuStructure, optionType } from 'shared/utils.mjs'

const TestOptionInput = ({ config, changed, name, t, updateFunc }) => {
  return (
    <>
      <p>{t(`${name}.d`)}</p>
      <div className="text-center">
        <button
          className={`btn btn-primary`}
          disabled={changed}
          onClick={() => updateFunc([name], true)}
        >
          {' '}
          {t('testThisOption')}
        </button>
      </div>
    </>
  )
}
const TestOption = ({ name, passProps, ...rest }) => {
  return (
    <MenuItem
      {...{
        ...rest,
        name,
        passProps,
        changed: passProps.settings.sample?.option === name,
        Input: TestOptionInput,
      }}
    />
  )
}

export const ns = [...designMenuNs]
export const TestOptions = ({
  design,
  patternConfig,
  settings,
  update,
  language,
  account,
  isFirst = true,
  DynamicDocs = false,
}) => {
  const menuNs = [`o_${design}`, ...ns]
  const optionsMenu = optionsMenuStructure(patternConfig.options)
  const getDocsPath = (option) =>
    `patterns/${design}/options${option ? '/' + option.toLowerCase() : ''}`
  return (
    <WorkbenchMenu
      {...{
        config: optionsMenu,
        control: account.control,
        DynamicDocs,
        emojis,
        getDocsPath,
        Icon: OptionsIcon,
        Item: TestOption,
        isFirst,
        name: 'design-options:designOptions',
        language,
        ns: menuNs,
        passProps: { settings },
        updateFunc: (path, value) => {
          if (value) update.settings(['sample'], { type: 'option', option: path[0] })
          else update.settings(['sample'])
        },
      }}
    />
  )
}
