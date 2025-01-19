// Dependencies
import { missingMeasurements, flattenFlags } from '../lib/index.mjs'
// Hooks
import React, { useState } from 'react'
// Components
import { Null } from './Null.mjs'
import { AsideViewMenuSpacer } from './AsideViewMenu.mjs'
import { ViewIcon, viewLabels } from './views/index.mjs'
import { Tooltip } from './Tooltip.mjs'
import {
  CircleIcon,
  DetailIcon,
  ErrorIcon,
  ExpandIcon,
  ExportIcon,
  KioskIcon,
  MenuIcon,
  PaperlessIcon,
  ResetAllIcon,
  RocketIcon,
  RotateIcon,
  SaIcon,
  SaveAsIcon,
  SaveIcon,
  TrashIcon,
  UndoIcon,
  UnitsIcon,
} from '@freesewing/react/components/Icon'
import { DesignOptionsMenu } from './menus/DesignOptionsMenu.mjs'
import { CoreSettingsMenu } from './menus/CoreSettingsMenu.mjs'
import { UiPreferencesMenu } from './menus/UiPreferencesMenu.mjs'
import { FlagsAccordionEntries } from './Flag.mjs'

export const HeaderMenuAllViews = ({ config, state, update, open, setOpen }) => (
  <HeaderMenuViewMenu {...{ config, state, update, open, setOpen }} />
)

export const HeaderMenuDraftView = (props) => {
  const flags = props.pattern?.setStores?.[0]?.plugins?.['plugin-annotations']?.flags

  return (
    <>
      <div className="tw-flex tw-flex-row tw-gap-1">
        <HeaderMenuDraftViewDesignOptions {...props} />
        <HeaderMenuDraftViewCoreSettings {...props} />
        <HeaderMenuDraftViewUiPreferences {...props} />
        {flags ? <HeaderMenuDraftViewFlags {...props} flags={flags} /> : null}
      </div>
      <HeaderMenuDraftViewIcons {...props} />
      <HeaderMenuUndoIcons {...props} />
      <HeaderMenuSaveIcons {...props} />
    </>
  )
}

export const HeaderMenuDropdown = (props) => {
  const { tooltip, toggle, open, setOpen, id } = props
  /*
   * We need to use both !fixed and md:!absolute here to override DaisyUI's
   * classes on dropdown-content to force the dropdown to use the available
   * screen space on mobile, rather than be positioned under its toggle button
   */

  return props.disabled ? (
    <Tooltip tip={tooltip}>
      <button
        disabled
        tabIndex={0}
        role="button"
        className="tw-daisy-btn tw-daisy-btn-ghost hover:tw-bg-secondary hover:tw-bg-opacity-20 hover:tw-border-solid hover:tw-border-2 hover:tw-border-secondary tw-border tw-border-secondary tw-border-2 tw-border-dotted tw-daisy-btn-sm tw-px-2 tw-z-20 tw-relative"
      >
        {toggle}
      </button>
    </Tooltip>
  ) : (
    <Tooltip tip={tooltip}>
      <div className={`tw-daisy-dropdown ${open === id ? 'tw-daisy-dropdown-open tw-z-20' : ''}`}>
        <div
          tabIndex={0}
          role="button"
          className="tw-daisy-btn tw-daisy-btn-ghost hover:tw-bg-secondary hover:tw-bg-opacity-20 hover:tw-border-solid hover:tw-boder-2 hover:tw-border-secondary tw-border tw-border-secondary tw-border-2 tw-border-dotted tw-daisy-btn-sm tw-px-2 tw-z-20 tw-relative"
          onClick={() => setOpen(open === id ? false : id)}
        >
          {toggle}
        </div>
        <div
          tabIndex={0}
          className="tw-daisy-dropdown-content tw-bg-base-100 tw-bg-opacity-90 tw-z-20 tw-shadow tw-left-0 !tw-fixed md:!tw-absolute tw-top-12 tw-w-screen md:tw-w-96"
        >
          {props.children}
        </div>
        {open === id && (
          <div
            className="tw-w-screen tw-h-screen tw-absolute tw-top-10 tw-left-0 tw-opacity-0"
            style={{ width: '200vw', transform: 'translateX(-100vw)' }}
            onClick={() => setOpen(false)}
          ></div>
        )}
      </div>
    </Tooltip>
  )
}

export const HeaderMenuDraftViewDesignOptions = (props) => {
  return (
    <HeaderMenuDropdown
      {...props}
      id="designOptions"
      tooltip="fixme: 'pe:designOptions.d'"
      toggle={
        <>
          <HeaderMenuIcon name="options" extraClasses="tw-text-secondary" />
          <span className="tw-hidden lg:tw-inline">fixme: pe:designOptions.t</span>
        </>
      }
    >
      <DesignOptionsMenu {...props} />
    </HeaderMenuDropdown>
  )
}

export const HeaderMenuDraftViewCoreSettings = (props) => {
  return (
    <HeaderMenuDropdown
      {...props}
      tooltip="fixme: pe:coreSettings.d"
      id="coreSettings"
      toggle={
        <>
          <HeaderMenuIcon name="settings" extraClasses="tw-text-secondary" />
          <span className="tw-hidden lg:tw-inline">fixme: pe:coreSettings.t</span>
        </>
      }
    >
      <CoreSettingsMenu {...props} />
    </HeaderMenuDropdown>
  )
}

export const HeaderMenuDraftViewUiPreferences = (props) => {
  return (
    <HeaderMenuDropdown
      {...props}
      tooltip="fixme: pe:uiPreferences.d"
      id="uiPreferences"
      toggle={
        <>
          <HeaderMenuIcon name="ui" extraClasses="tw-text-secondary" />
          <span className="tw-hidden lg:tw-inline">fixme: pe:uiPreferences.t</span>
        </>
      }
    >
      <UiPreferencesMenu {...props} />
    </HeaderMenuDropdown>
  )
}

export const HeaderMenuDraftViewFlags = (props) => {
  const count = Object.keys(flattenFlags(props.flags)).length

  return (
    <HeaderMenuDropdown
      {...props}
      tooltip="fixme: pe:flagMenuMany.d"
      id="flags"
      toggle={
        <>
          <HeaderMenuIcon name="flag" extraClasses="tw-text-secondary" />
          <span className="tw-hidden lg:tw-inline">
            Flags
            <span>({count})</span>
          </span>
        </>
      }
    >
      <FlagsAccordionEntries {...props} />
    </HeaderMenuDropdown>
  )
}

export const HeaderMenuDraftViewIcons = (props) => {
  const { update } = props
  const Button = HeaderMenuButton
  const size = 'tw-w-5 tw-h-5'
  const muted = 'tw-text-current tw-opacity-50'
  const ux = props.state.ui.ux
  const levels = {
    ...props.config.uxLevels.core,
    ...props.config.uxLevels.ui,
  }

  return (
    <div className="tw-flex tw-flex-row tw-flex-wrap tw-items-center tw-justify-center tw-px-2">
      {ux >= levels.sa ? (
        <Button
          updateHandler={update.toggleSa}
          tooltip="Turns Seam Allowance on or off (see Core Settings)"
        >
          <SaIcon
            className={`${size} ${props.state.settings.sabool ? 'tw-text-secondary' : muted}`}
          />
        </Button>
      ) : null}
      {ux >= levels.paperless ? (
        <Button
          updateHandler={() => update.settings('paperless', props.state.settings.paperless ? 0 : 1)}
          tooltip="Turns Paperless on or off (see Core Settings)"
        >
          <PaperlessIcon
            className={`${size} ${props.state.settings.paperless ? 'tw-text-secondary' : muted}`}
          />
        </Button>
      ) : null}
      {ux >= levels.complete ? (
        <Button
          updateHandler={() => update.settings('complete', props.state.settings.complete ? 0 : 1)}
          tooltip="Turns Details on or off (see Core Settings)"
        >
          <DetailIcon
            className={`${size} ${!props.state.settings.complete ? 'tw-text-secondary' : muted}`}
          />
        </Button>
      ) : null}
      {ux >= levels.expand ? (
        <Button
          updateHandler={() => update.settings('expand', props.state.settings.expand ? 0 : 1)}
          tooltip="Turns Expand on or off (see Core Settings)"
        >
          <ExpandIcon
            className={`${size} ${props.state.settings.expand ? 'tw-text-secondary' : muted}`}
          />
        </Button>
      ) : null}
      {ux >= levels.units ? (
        <Button
          updateHandler={() =>
            update.settings(
              'units',
              props.state.settings.units === 'imperial' ? 'metric' : 'imperial'
            )
          }
          tooltip="Switches Units between metric and imperial (see Core Settings)"
        >
          <UnitsIcon
            className={`${size} ${
              props.state.settings.units === 'imperial' ? 'tw-text-secondary' : muted
            }`}
          />
        </Button>
      ) : null}
      <HeaderMenuIconSpacer />
      {ux >= levels.ux ? (
        <div className="tw-flex tw-flex-row tw-px-1">
          <Tooltip tip="Changes your UX setting (see UI Preferences)">
            {[0, 1, 2, 3, 4].map((i) => (
              <button
                key={i}
                className="tw-daisy-btn tw-daisy-btn-ghost tw-daisy-btn-sm tw-px-0 tw--mx-0.5"
                onClick={() => update.ui('ux', i + 1)}
              >
                <CircleIcon
                  key={i}
                  fill={i < props.state.ui.ux ? true : false}
                  className={`${size} ${
                    i < props.state.ui.ux
                      ? 'tw-stroke-secondary tw-fill-secondary'
                      : 'tw-stroke-current'
                  }`}
                  fillOpacity={0.3}
                />
              </button>
            ))}
          </Tooltip>
        </div>
      ) : null}
      {ux >= levels.aside ? (
        <Button
          updateHandler={() => update.ui('aside', props.state.ui.aside ? 0 : 1)}
          tooltip="Turn the Aside Menu on or off (see UI Preferences)"
        >
          <MenuIcon className={`${size} ${!props.state.ui.aside ? 'tw-text-secondary' : muted}`} />
        </Button>
      ) : null}
      {ux >= levels.kiosk ? (
        <Button
          updateHandler={() => update.ui('kiosk', props.state.ui.kiosk ? 0 : 1)}
          tooltip="Turns Kiosk Mode on or off (see UI Preferences)"
        >
          <KioskIcon className={`${size} ${props.state.ui.kiosk ? 'tw-text-secondary' : muted}`} />
        </Button>
      ) : null}
      {ux >= levels.rotate ? (
        <Button
          updateHandler={() => update.ui('rotate', props.state.ui.rotate ? 0 : 1)}
          tooltip="Turns Rotate Pattern on or off (see UI Preferences)"
        >
          <RotateIcon
            className={`${size} ${props.state.ui.rotate ? 'tw-text-secondary' : muted}`}
          />
        </Button>
      ) : null}
      {ux >= levels.renderer ? (
        <Button
          updateHandler={() =>
            update.ui('renderer', props.state.ui.renderer === 'react' ? 'svg' : 'react')
          }
          tooltip="Switches the Render Engine between React and SVG (see UI Preferences)"
        >
          <RocketIcon
            className={`${size} ${props.state.ui.renderer === 'svg' ? 'tw-text-secondary' : muted}`}
          />
        </Button>
      ) : null}
    </div>
  )
}

export const HeaderMenuUndoIcons = (props) => {
  const { update, state, Design } = props
  const Button = HeaderMenuButton
  const size = 'w-5 h-5'
  const undos = props.state._?.undos && props.state._.undos.length > 0 ? props.state._.undos : false

  return (
    <div className="tw-flex tw-flex-row tw-flex-wrap tw-items-center tw-justify-center tw-px-2">
      <Button
        updateHandler={() => update.restore(0, state._)}
        tooltip="Undo the most recent change"
        disabled={undos ? false : true}
      >
        <UndoIcon className={`${size} ${undos ? 'tw-text-secondary' : ''}`} text="1" />
      </Button>
      <Button
        updateHandler={() => update.restore(undos.length - 1, state._)}
        tooltip="Undo all changes since the last save point"
        disabled={undos ? false : true}
      >
        <UndoIcon className={`${size} ${undos ? 'tw-text-secondary' : ''}`} text="A" />
      </Button>
      <HeaderMenuDropdown
        {...props}
        tooltip={viewLabels.undo.t}
        id="undos"
        disabled={undos ? false : true}
        toggle={
          <>
            <UndoIcon className="tw-w-4 tw-h-4" stroke={3} />
            <span className="tw-hidden lg:tw-inline">Undo</span>
          </>
        }
      >
        {undos ? (
          <ul className="tw-daisy-dropdown-content tw-bg-base-100 tw-bg-opacity-90 tw-z-20 tw-shadow tw-left-0 !tw-fixed md:!tw-absolute tw-w-screen md:tw-w-96 tw-px-4 md:tw-p-2 md:tw-pt-0">
            {undos.slice(0, 9).map((step, index) => (
              <li key={index}>
                <UndoStep {...{ step, update, state, Design, index }} compact />
              </li>
            ))}
            <li key="view">
              <ButtonFrame
                dense
                onClick={() => {
                  return null /*update.state(index, state._) */
                }}
              >
                <div className="tw-flex tw-flex-row tw-items-center tw-align-center tw-justify-between tw-gap-2 tw-w-full">
                  <div className="tw-flex tw-flex-row tw-items-center tw-align-start tw-gap-2 tw-grow">
                    <UndoIcon className="tw-w-5 tw-h-5 tw-text-secondary" />
                    {viewLabels.undo.t}
                  </div>
                  {undos.length}
                </div>
              </ButtonFrame>
            </li>
          </ul>
        ) : null}
      </HeaderMenuDropdown>
      <Button
        updateHandler={update.clearAll}
        tooltip="Reset all settings, but keep the design and measurements"
      >
        <TrashIcon className={`${size} tw-text-secondary`} />
      </Button>
      <Button updateHandler={update.clearAll} tooltip="Reset the editor completely">
        <ResetAllIcon className={`${size} tw-text-secondary`} />
      </Button>
    </div>
  )
}

export const HeaderMenuSaveIcons = (props) => {
  const { update } = props
  const Button = HeaderMenuButton
  const size = 'tw-w-5 tw-h-5'
  const saveable = props.state._?.undos && props.state._.undos.length > 0

  return (
    <div className="tw-flex tw-flex-row tw-flex-wrap tw-items-center tw-justify-center tw-px-2">
      <Button
        updateHandler={update.clearPattern}
        tooltip="Save pattern"
        disabled={saveable ? false : true}
      >
        <SaveIcon className={`${size} ${saveable ? 'tw-text-success' : ''}`} />
      </Button>
      <Button updateHandler={() => update.view('save')} tooltip="Save pattern as...">
        <SaveAsIcon className={`${size} tw-text-secondary`} />
      </Button>
      <Button updateHandler={update.clearPattern} tooltip="Export pattern">
        <ExportIcon className={`${size} tw-text-secondary`} />
      </Button>
    </div>
  )
}

export const HeaderMenuIcon = (props) => {
  const { name, extraClasses = '' } = props
  //const Icon = Swizzled.components[`${Swizzled.methods.capitalize(name)}Icon`] || Swizzled.components.Noop
  return <ErrorIcon {...props} className={`tw-h-5 tw-w-5 ${extraClasses}`} />
}
export const HeaderMenuIconSpacer = () => (
  <span className="tw-px-1 tw-font-bold tw-opacity-30">|</span>
)

export const HeaderMenuButton = ({ updateHandler, children, tooltip, disabled = false }) => (
  <Tooltip tip={tooltip}>
    <button
      className="tw-daisy-btn tw-daisy-btn-ghost tw-daisy-btn-sm tw-px-1 disabled:tw-bg-transparent"
      onClick={updateHandler}
      disabled={disabled}
    >
      {children}
    </button>
  </Tooltip>
)

export const HeaderMenuViewMenu = (props) => {
  const { config, update, state } = props
  const output = []
  let i = 1
  for (const viewName of [
    'spacer',
    ...config.mainViews,
    'spacer',
    ...config.extraViews,
    'spacerOver3',
    ...config.devViews,
    'spacer',
    'picker',
  ]) {
    if (viewName === 'spacer') output.push(<AsideViewMenuSpacer key={i} />)
    else if (viewName === 'spacerOver3')
      output.push(state.ui.ux > 3 ? <AsideViewMenuSpacer key={i} /> : null)
    else if (
      state.ui.ux >= config.uxLevels.views[viewName] &&
      (config.measurementsFreeViews.includes(viewName) || state._.missingMeasurements.length < 1)
    )
      output.push(
        <li
          key={i}
          className="tw-mb-1 tw-flex tw-flex-row tw-items-center tw-justify-between tw-w-full"
        >
          <a
            className={`tw-w-full tw-rounded-lg tw-border-2 tw-border-secondary tw-text-base-content
            tw-flex tw-flex-row tw-items-center tw-gap-2 md:tw-gap-4 tw-p-2
            hover:tw-cursor-pointer
            hover:tw-bg-secondary hover:tw-bg-opacity-20 hover:tw-border-solid ${
              viewName === state.view
                ? 'tw-bg-secondary tw-border-solid tw-bg-opacity-20'
                : 'tw-border-dotted'
            }`}
            onClick={() => update.view(viewName)}
          >
            <ViewIcon view={viewName} className="tw-w-6 tw-h-6 tw-grow-0" />
            <b className="tw-text-left tw-grow">{viewLabels[viewName]?.t || viewName}</b>
          </a>
        </li>
      )
    i++
  }

  return (
    <HeaderMenuDropdown
      {...props}
      tooltip="Choose between the main views of the pattern editor"
      id="views"
      toggle={
        <>
          <HeaderMenuIcon name="right" stroke={3} extraClasses="tw-text-secondary tw-rotate-90" />
          <span className="tw-hidden lg:tw-inline">Views</span>
        </>
      }
    >
      <ul
        tabIndex={i}
        className="tw-dropdown-content tw-bg-base-100 tw-bg-opacity-90 tw-z-20 tw-shadow tw-left-0 !tw-fixed md:!tw-absolute tw-w-screen md:tw-w-96 tw-px-4 md:tw-p-2 md:tw-pt-0"
      >
        {output}
      </ul>
    </HeaderMenuDropdown>
  )
}

const headerMenus = {
  draft: HeaderMenuDraftView,
  //HeaderMenuDraftViewDesignOptions,
  //HeaderMenuDraftViewCoreSettings,
  //HeaderMenuDraftViewUiPreferences,
  //HeaderMenuDraftViewFlags,
  //HeaderMenuDraftViewIcons,
}

export const HeaderMenu = ({ config, Design, pattern, state, update }) => {
  const [open, setOpen] = useState()

  /*
   * Guard views that require measurements agains missing measurements
   * and make sure there's a view-specific header menu
   */
  const ViewMenu =
    !missingMeasurements(state) && headerMenus[state.view] ? headerMenus[state.view] : Null

  return (
    <div
      className={`tw-flex tw-sticky tw-top-0 ${
        state.ui.kiosk ? 'tw-z-50' : 'tw-z-20'
      } tw-transition-[top] tw-duration-300 tw-ease-in-out`}
    >
      <div
        className={`tw-flex tw-flex-row tw-flex-wrap tw-gap-1 md:tw-gap-4 tw-w-full tw-items-start tw-justify-center tw-border-b tw-border-base-300 tw-py-1 md:tw-py-1.5`}
      >
        <HeaderMenuAllViews {...{ config, state, update, open, setOpen }} />
        <ViewMenu {...{ config, state, update, Design, pattern, open, setOpen }} />
      </div>
    </div>
  )
}
