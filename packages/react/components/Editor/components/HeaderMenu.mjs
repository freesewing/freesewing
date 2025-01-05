// Dependencies
import { missingMeasurements } from '../lib/index.mjs'
// Hooks
import React, { useState } from 'react'
// Components
import { Null } from './Null.mjs'
import { AsideViewMenuSpacer } from './AsideViewMenu.mjs'
import { ViewIcon, viewLabels } from './views/index.mjs'
import { Tooltip } from './Tooltip.mjs'
import { ErrorIcon } from '@freesewing/react/components/Icon'

export const HeaderMenu = ({ config, Design, pattern, state, update }) => {
  const [open, setOpen] = useState()

  /*
   * Guard views that require measurements agains missing measurements
   * and make sure there's a view-specific header menu
   */
  const ViewMenu =
    !missingMeasurements(state, config) &&
    Swizzled.components[`HeaderMenu${config.viewComponents[state.view]}`]
      ? Swizzled.components[`HeaderMenu${config.viewComponents[state.view]}`]
      : Null

  return (
    <div
      className={`flex sticky top-0 ${
        state.ui.kiosk ? 'z-50' : 'z-20'
      } transition-[top] duration-300 ease-in-out`}
    >
      <div
        className={`flex flex-row flex-wrap gap-1 md:gap-4 w-full items-start justify-center border-b border-base-300 py-1 md:py-1.5`}
      >
        <HeaderMenuAllViews {...{ config, state, update, open, setOpen }} />
        <ViewMenu {...{ config, state, update, Design, pattern, open, setOpen }} />
      </div>
    </div>
  )
}

export const HeaderMenuAllViews = ({ config, state, update, open, setOpen }) => (
  <HeaderMenuViewMenu {...{ config, state, update, open, setOpen }} />
)

export const HeaderMenuDraftView = (props) => {
  const flags = props.pattern?.setStores?.[0]?.plugins?.['plugin-annotations']?.flags

  return (
    <>
      <div className="flex flex-row gap-1">
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
        className="btn btn-ghost hover:bg-secondary hover:bg-opacity-20 hover:border-solid hover:boder-2 hover:border-secondary border border-secondary border-2 border-dotted btn-sm px-2 z-20 relative"
      >
        {toggle}
      </button>
    </Tooltip>
  ) : (
    <Tooltip tip={tooltip}>
      <div className={`dropdown ${open === id ? 'dropdown-open z-20' : ''}`}>
        <div
          tabIndex={0}
          role="button"
          className="btn btn-ghost hover:bg-secondary hover:bg-opacity-20 hover:border-solid hover:boder-2 hover:border-secondary border border-secondary border-2 border-dotted btn-sm px-2 z-20 relative"
          onClick={() => setOpen(open === id ? false : id)}
        >
          {toggle}
        </div>
        <div
          tabIndex={0}
          className="dropdown-content bg-base-100 bg-opacity-90 z-20 shadow left-0 !fixed md:!absolute top-12 w-screen md:w-96"
        >
          {props.children}
        </div>
        {open === id && (
          <div
            className="w-screen h-screen absolute top-10 left-0 opacity-0"
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
          <HeaderMenuIcon name="options" extraClasses="text-secondary" />
          <span className="hidden lg:inline">fixme: pe:designOptions.t</span>
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
          <HeaderMenuIcon name="settings" extraClasses="text-secondary" />
          <span className="hidden lg:inline">fixme: pe:coreSettings.t</span>
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
          <HeaderMenuIcon name="ui" extraClasses="text-secondary" />
          <span className="hidden lg:inline">fixme: pe:uiPreferences.t</span>
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
          <HeaderMenuIcon name="flag" extraClasses="text-secondary" />
          <span className="hidden lg:inline">
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
  const size = 'w-5 h-5'
  const muted = 'text-current opacity-50'
  const ux = props.state.ui.ux
  const levels = {
    ...props.config.uxLevels.core,
    ...props.config.uxLevels.ui,
  }

  return (
    <div className="flex flex-row flex-wrap items-center justify-center px-2">
      {ux >= levels.sa ? (
        <Button
          updateHandler={update.toggleSa}
          tooltip="Turns Seam Allowance on or off (see Core Settings)"
        >
          <SaIcon className={`${size} ${props.state.settings.sabool ? 'text-secondary' : muted}`} />
        </Button>
      ) : null}
      {ux >= levels.paperless ? (
        <Button
          updateHandler={() => update.settings('paperless', props.state.settings.paperless ? 0 : 1)}
          tooltip="Turns Paperless on or off (see Core Settings)"
        >
          <PaperlessIcon
            className={`${size} ${props.state.settings.paperless ? 'text-secondary' : muted}`}
          />
        </Button>
      ) : null}
      {ux >= levels.complete ? (
        <Button
          updateHandler={() => update.settings('complete', props.state.settings.complete ? 0 : 1)}
          tooltip="Turns Details on or off (see Core Settings)"
        >
          <DetailIcon
            className={`${size} ${!props.state.settings.complete ? 'text-secondary' : muted}`}
          />
        </Button>
      ) : null}
      {ux >= levels.expand ? (
        <Button
          updateHandler={() => update.settings('expand', props.state.settings.expand ? 0 : 1)}
          tooltip="Turns Expand on or off (see Core Settings)"
        >
          <ExpandIcon
            className={`${size} ${props.state.settings.expand ? 'text-secondary' : muted}`}
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
              props.state.settings.units === 'imperial' ? 'text-secondary' : muted
            }`}
          />
        </Button>
      ) : null}
      <HeaderMenuIconSpacer />
      {ux >= levels.ux ? (
        <div className="flex flex-row px-1">
          <Tooltip tip="Changes your UX setting (see UI Preferences)">
            {[0, 1, 2, 3, 4].map((i) => (
              <button
                key={i}
                className="btn btn-ghost btn-sm px-0 -mx-0.5"
                onClick={() => update.ui('ux', i + 1)}
              >
                <CircleIcon
                  key={i}
                  fill={i < props.state.ui.ux ? true : false}
                  className={`${size} ${
                    i < props.state.ui.ux ? 'stroke-secondary fill-secondary' : 'stroke-current'
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
          <MenuIcon className={`${size} ${!props.state.ui.aside ? 'text-secondary' : muted}`} />
        </Button>
      ) : null}
      {ux >= levels.kiosk ? (
        <Button
          updateHandler={() => update.ui('kiosk', props.state.ui.kiosk ? 0 : 1)}
          tooltip="Turns Kiosk Mode on or off (see UI Preferences)"
        >
          <KioskIcon className={`${size} ${props.state.ui.kiosk ? 'text-secondary' : muted}`} />
        </Button>
      ) : null}
      {ux >= levels.rotate ? (
        <Button
          updateHandler={() => update.ui('rotate', props.state.ui.rotate ? 0 : 1)}
          tooltip="Turns Rotate Pattern on or off (see UI Preferences)"
        >
          <RotateIcon className={`${size} ${props.state.ui.rotate ? 'text-secondary' : muted}`} />
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
            className={`${size} ${props.state.ui.renderer === 'svg' ? 'text-secondary' : muted}`}
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
    <div className="flex flex-row flex-wrap items-center justify-center px-2">
      <Button
        updateHandler={() => update.restore(0, state._)}
        tooltip="Undo the most recent change"
        disabled={undos ? false : true}
      >
        <UndoIcon className={`${size} ${undos ? 'text-secondary' : ''}`} text="1" />
      </Button>
      <Button
        updateHandler={() => update.restore(undos.length - 1, state._)}
        tooltip="Undo all changes since the last save point"
        disabled={undos ? false : true}
      >
        <UndoIcon className={`${size} ${undos ? 'text-secondary' : ''}`} text="A" />
      </Button>
      <HeaderMenuDropdown
        {...props}
        tooltip={viewLabels.undo.t}
        id="undos"
        disabled={undos ? false : true}
        toggle={
          <>
            <UndoIcon className="w-4 h-4" stroke={3} />
            <span className="hidden lg:inline">Undo</span>
          </>
        }
      >
        {undos ? (
          <ul className="dropdown-content bg-base-100 bg-opacity-90 z-20 shadow left-0 !fixed md:!absolute w-screen md:w-96 px-4 md:p-2 md:pt-0">
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
                <div className="flex flex-row items-center align-center justify-between gap-2 w-full">
                  <div className="flex flex-row items-center align-start gap-2 grow">
                    <UndoIcon className="w-5 h-5 text-secondary" />
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
        <TrashIcon className={`${size} text-secondary`} />
      </Button>
      <Button updateHandler={update.clearAll} tooltip="Reset the editor completely">
        <ResetAllIcon className={`${size} text-secondary`} />
      </Button>
    </div>
  )
}

export const HeaderMenuSaveIcons = (props) => {
  const { update } = props
  const Button = HeaderMenuButton
  const size = 'w-5 h-5'
  const saveable = props.state._?.undos && props.state._.undos.length > 0

  return (
    <div className="flex flex-row flex-wrap items-center justify-center px-2">
      <Button
        updateHandler={update.clearPattern}
        tooltip="Save pattern"
        disabled={saveable ? false : true}
      >
        <SaveIcon className={`${size} ${saveable ? 'text-success' : ''}`} />
      </Button>
      <Button updateHandler={() => update.view('save')} tooltip="Save pattern as...">
        <SaveAsIcon className={`${size} text-secondary`} />
      </Button>
      <Button updateHandler={update.clearPattern} tooltip="Export pattern">
        <ExportIcon className={`${size} text-secondary`} />
      </Button>
    </div>
  )
}

export const HeaderMenuIcon = (props) => {
  const { name, extraClasses = '' } = props
  //const Icon = Swizzled.components[`${Swizzled.methods.capitalize(name)}Icon`] || Swizzled.components.Noop
  return <ErrorIcon {...props} className={`h-5 w-5 ${extraClasses}`} />
}
export const HeaderMenuIconSpacer = () => <span className="px-1 font-bold opacity-30">|</span>

export const HeaderMenuButton = ({ updateHandler, children, tooltip, disabled = false }) => (
  <Tooltip tip={tooltip}>
    <button
      className="btn btn-ghost btn-sm px-1 disabled:bg-transparent"
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
        <li key={i} className="mb-1 flex flex-row items-center justify-between w-full">
          <a
            className={`w-full rounded-lg border-2 border-secondary text-base-content
            flex flex-row items-center gap-2 md:gap-4 p-2
            hover:cursor-pointer
            hover:bg-secondary hover:bg-opacity-20 hover:border-solid ${
              viewName === state.view ? 'bg-secondary border-solid bg-opacity-20' : 'border-dotted'
            }`}
            onClick={() => update.view(viewName)}
          >
            <ViewIcon view={viewName} className="w-6 h-6 grow-0" />
            <b className="text-left grow">{viewLabels[viewName].t}</b>
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
          <HeaderMenuIcon name="right" stroke={3} extraClasses="text-secondary rotate-90" />
          <span className="hidden lg:inline">Views</span>
        </>
      }
    >
      <ul
        tabIndex={i}
        className="dropdown-content bg-base-100 bg-opacity-90 z-20 shadow left-0 !fixed md:!absolute w-screen md:w-96 px-4 md:p-2 md:pt-0"
      >
        {output}
      </ul>
    </HeaderMenuDropdown>
  )
}
