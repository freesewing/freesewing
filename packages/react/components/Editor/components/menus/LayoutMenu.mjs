// Dependencies
import React from 'react'
import { capitalize } from '@freesewing/utils'
import { menuLayoutSettingsStructure } from '../../lib/index.mjs'
// Components
import { PatternIcon } from '@freesewing/react/components/Icon'
import { MenuBoolInput, MenuMmInput, MenuListInput, MenuPctInput } from '../menus/Input.mjs'
import { MenuBoolValue, MenuMmValue, MenuPctOptionValue } from '../menus/Value.mjs'
import { MenuItemGroup } from './Container.mjs'
import { MenuHighlightValue } from './Value.mjs'

export const LayoutSettingsMenu = ({ update, state, Design }) => {
  const structure = menuLayoutSettingsStructure()

  const drillProps = { Design, state, update }
  const inputs = {
    size: (props) => <MenuListInput {...drillProps} {...props} />,
    orientation: (props) => <MenuListInput {...drillProps} {...props} />,
    margin: (props) => <MenuMmInput {...drillProps} {...props} />,
    coverPage: (props) => <MenuBoolInput {...drillProps} {...props} />,
    iconSize: (props) => <MenuPctInput {...drillProps} {...props} />,
  }
  const values = {
    size: ({ current, changed, config }) => (
      <MenuHighlightValue changed={changed}>
        {capitalize(current ? current : config.dflt)}
      </MenuHighlightValue>
    ),
    orientation: ({ current, changed }) => (
      <MenuHighlightValue changed={changed}>
        <PatternIcon
          className={`tw-w-6 tw-h-6 tw-text-inherit ${current === 'landscape' ? 'tw--rotate-90' : ''}`}
        />
      </MenuHighlightValue>
    ),
    margin: MenuMmValue,
    coverPage: MenuBoolValue,
    iconSize: MenuPctOptionValue,
  }

  return (
    <MenuItemGroup
      {...{
        structure,
        ux: state.ui?.ux,
        currentValues: state.ui.layout || {},
        isFirst: true,
        name: 'UI Preferences',
        passProps: {
          ux: state.ui?.ux,
          settings: state.settings,
          patternConfig: Design.patternConfig,
        },
        updateHandler: (key, val) => update.ui(['layout', key], val),
        isDesignOptionsGroup: false,
        state,
        Design,
        inputs,
        values,
      }}
    />
  )
}

/*
const PrintActions = ({ state, update }) => (
  <SubAccordion
    items={[
      [
        <div className="tw-w-full tw-flex tw-flex-row tw-gap2 tw-justify-between" key={1}>
          <div className="tw-flex tw-flex-row tw-items-center tw-gap-2">
            <LeftRightIcon />
            <span>{'workbench:partTransfo'}</span>
          </div>
          {state.ui.hideMovableButtons ? <BoolNoIcon /> : <BoolYesIcon />}
        </div>,
        <ListInput
          key={2}
          update={() => update.state.ui('hideMovableButtons', state.ui.hideMovableButtons ? false : true)}
          label={
            <span className="tw-text-base tw-font-normal">{'workbench:partTransfoDesc'}</span>
          }
          list={[
            {
              val: true,
              label: 'workbench:partTransfoNo',
              desc: 'workbench:partTransfoNoDesc',
            },
            {
              val: false,
              label: 'workbench:partTransfoYes',
              desc: 'workbench:partTransfoYesDesc',
            },
          ]}
          current={state.ui.hideMovableButtons ? true : false}
        />,
        'partTransfo',
      ],
      [
        <div className="tw-w-full tw-flex tw-flex-row tw-gap2 tw-justify-between" key={1}>
          <div className="tw-flex tw-flex-row tw-items-center tw-gap-2">
            <ResetIcon />
            <span>{'workbench:resetPrintLayout'}</span>
          </div>
          <WarningIcon />
        </div>,

        <Fragment key={2}>
          <p>{'workbench:resetPrintLayoutDesc'}</p>
          <button
            className={`${horFlexClasses} tw-btn tw-btn-warning tw-btn-outline tw-w-full`}
            onClick={() => update.ui(['layouts', 'print'])}
          >
            <ResetIcon />
            <span>{'workbench:resetPrintLayout'}</span>
          </button>
        </Fragment>,
        'reset',
      ],
    ]}
  />
)
*/
