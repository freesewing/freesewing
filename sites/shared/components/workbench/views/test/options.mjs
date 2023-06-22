import { useRef } from 'react'
import { MenuItem } from 'shared/components/workbench/menus/shared/menu-item.mjs'
import { WorkbenchMenu } from 'shared/components/workbench/menus/shared/index.mjs'
import {
  emojis,
  ns as designMenuNs,
} from 'shared/components/workbench/menus/design-options/index.mjs'
import { OptionsIcon, BeakerIcon } from 'shared/components/icons.mjs'
import { optionsMenuStructure } from 'shared/utils.mjs'

export const ns = ['test-view', ...designMenuNs]

const SampleInput = ({ changed, name, t, updateFunc, type }) => {
  return (
    <>
      <p>{t([`${name}.d`, ''])}</p>
      <div className="text-center">
        <button
          className={`btn btn-primary`}
          disabled={changed}
          onClick={() => updateFunc([name], true)}
        >
          {t(`testThis.${type}`)}
        </button>
      </div>
    </>
  )
}

const closedClasses = `border-r-0 border-t-0 border-b-0 hover:cursor-pointer hover:bg-secondary border-secondary hover:bg-opacity-20`
const openClasses = `border-l-0 border-r-0 border-b-2 lg:border lg:rounded-lg border-primary`
export const SampleItem = ({ name, passProps, t, updateFunc, ...rest }) => {
  const input = useRef(null)
  const checked = passProps.settings.sample?.[passProps.type] === name
  const onChange = (evt) => {
    if (evt.target.checked) updateFunc([name], true)
  }

  return (
    <div
      className={`collapse my-2 shadow border-solid border-l-[6px] min-h-10 rounded-none
         ${checked ? openClasses : closedClasses}`}
    >
      <input
        ref={input}
        type="radio"
        name="test-item"
        onChange={onChange}
        checked={checked}
        className="min-h-0"
      />
      <div
        className={`collapse-title flex item-center p-2 h-auto min-h-0 ${
          checked ? 'bg-primary' : ''
        }`}
      >
        {checked && <BeakerIcon />}
        <span className="ml-2">{t([name + '.t', name])}</span>
      </div>
      {t(name + '.d', '') && (
        <div className="collapse-content bg-neutral h-auto pb-0">
          <p>{t(name + '.d', '')}</p>
        </div>
      )}
    </div>
    // <MenuItem
    //   {...{
    //     ...rest,
    //     name,
    //     passProps,
    //     changed: passProps.settings.sample?.[passProps.type] === name,
    //     Input: SampleInput,
    //   }}
    // />
  )
}

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
    `designs/${design}/options${option ? '/' + option.toLowerCase() : ''}`
  return (
    <WorkbenchMenu
      {...{
        config: optionsMenu,
        control: account.control,
        DynamicDocs,
        emojis,
        getDocsPath,
        Icon: OptionsIcon,
        Item: SampleItem,
        isFirst,
        name: 'designOptions',
        language,
        ns: menuNs,
        passProps: { settings, type: 'option' },
        updateFunc: (path, value) => {
          if (value) update.settings(['sample'], { type: 'option', option: path[0] })
          else update.settings(['sample'])
        },
      }}
    />
  )
}
