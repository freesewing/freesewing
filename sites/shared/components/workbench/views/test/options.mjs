//  __SDEFILE__ - This file is a dependency for the stand-alone environment
import { useRef } from 'react'
import { WorkbenchMenu } from 'shared/components/workbench/menus/shared/index.mjs'
import {
  emojis,
  ns as designMenuNs,
} from 'shared/components/workbench/menus/design-options/index.mjs'
import { OptionsIcon } from 'shared/components/icons.mjs'
import { optionsMenuStructure } from 'shared/utils.mjs'

export const ns = ['test-view', ...designMenuNs]

const closedClasses = `border-r-0 border-t-0 border-b-0 hover:cursor-pointer hover:bg-secondary border-secondary hover:bg-opacity-20`
const openClasses = `border-l-0 border-r-0 border-b-2 lg:border lg:rounded-lg border-primary`

export const SampleItem = ({ name, passProps, t, updateFunc }) => {
  const input = useRef(null)
  const checked = passProps.settings.sample?.[passProps.type] === name
  const onChange = (evt) => {
    if (evt.target.checked) updateFunc([name], true)
  }

  return (
    <div
      className={`collapse my-2 shadow border-solid border-l-[6px] min-h-10 rounded-none w-full
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
        className={`collapse-title flex items-center p-2 h-auto min-h-0 ${
          checked ? 'bg-primary text-primary-content' : ''
        }`}
      >
        <input
          ref={input}
          type="radio"
          checked={checked}
          className="radio radio-primary mr-2 radio-sm"
          readOnly
        />
        <span className="ml-2">{t([name + '.t', name])}</span>
      </div>
      {t(name + '.d', '') && (
        <div className="collapse-content h-auto pb-0">
          <p>{t(name + '.d', '')}</p>
        </div>
      )}
    </div>
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
}) => {
  const menuNs = [`o_${design}`, ...ns]
  const optionsMenu = optionsMenuStructure(patternConfig.options)

  return (
    <WorkbenchMenu
      {...{
        config: optionsMenu,
        control: account.control,
        emojis,
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
