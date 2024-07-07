import { useState } from 'react'

export const HeaderMenu = ({ state, Swizzled, update, Design, pattern }) => {
  const [open, setOpen] = useState()

  const ViewMenu =
    Swizzled.components[`HeaderMenu${Swizzled.config.viewComponents[state.view]}`] ||
    Swizzled.components.Null
  return (
    <div
      className={`hidden lg:flex sticky top-0 ${
        state.ui.kiosk ? 'z-50' : 'z-20'
      } transition-[top] duration-300 ease-in-out`}
    >
      <div
        className={`hidden lg:flex flex-row flex-wrap gap-4 w-full items-start justify-center border-b border-base-300 py-1.5`}
      >
        <Swizzled.components.HeaderMenuAllViews {...{ state, Swizzled, update, open, setOpen }} />
        <ViewMenu {...{ state, Swizzled, update, Design, pattern, open, setOpen }} />
      </div>
    </div>
  )
}

export const HeaderMenuAllViews = ({ state, Swizzled, update, open, setOpen }) => (
  <Swizzled.components.HeaderMenuViewMenu {...{ state, Swizzled, update, open, setOpen }} />
)

export const HeaderMenuDraftView = (props) => {
  const { Swizzled } = props
  const flags = props.pattern?.setStores?.[0]?.plugins?.['plugin-annotations']?.flags
  const Button = Swizzled.components.HeaderMenuButton

  return (
    <div className="flex flex-col">
      <div className="flex flex-row gap-1">
        <Swizzled.components.HeaderMenuDraftViewDesignOptions {...props} />
        <Swizzled.components.HeaderMenuDraftViewCoreSettings {...props} />
        <Swizzled.components.HeaderMenuDraftViewUiPreferences {...props} />
        {flags ? <Swizzled.components.HeaderMenuDraftViewFlags {...props} flags={flags} /> : null}
      </div>
      <div>
        <Swizzled.components.HeaderMenuDraftViewIcons {...props} />
      </div>
    </div>
  )
}

export const HeaderMenuDropdown = (props) => {
  const { Swizzled, tooltip, toggle, width = '400px', open, setOpen, id } = props

  return (
    <Swizzled.components.Tooltip tip={tooltip}>
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
          className="dropdown-content bg-base-100 bg-opacity-90 z-20 shadow"
          style={{ width }}
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
    </Swizzled.components.Tooltip>
  )
}

export const HeaderMenuDraftViewDesignOptions = (props) => {
  const { Swizzled } = props

  return (
    <Swizzled.components.HeaderMenuDropdown
      {...props}
      id="designOptions"
      tooltip={Swizzled.methods.t('pe:designOptions.d')}
      toggle={
        <>
          <Swizzled.components.HeaderMenuIcon name="options" extraClasses="text-secondary" />
          {Swizzled.methods.t('pe:designOptions.t')}
        </>
      }
    >
      <Swizzled.components.DesignOptionsMenu {...props} />
    </Swizzled.components.HeaderMenuDropdown>
  )
}

export const HeaderMenuDraftViewCoreSettings = (props) => {
  const { Swizzled } = props

  return (
    <Swizzled.components.HeaderMenuDropdown
      {...props}
      tooltip={Swizzled.methods.t('pe:coreSettings.d')}
      id="coreSettings"
      toggle={
        <>
          <Swizzled.components.HeaderMenuIcon name="settings" extraClasses="text-secondary" />
          {Swizzled.methods.t('pe:coreSettings.t')}
        </>
      }
    >
      <Swizzled.components.CoreSettingsMenu {...props} />
    </Swizzled.components.HeaderMenuDropdown>
  )
}

export const HeaderMenuDraftViewUiPreferences = (props) => {
  const { Swizzled, open, setOpen } = props

  return (
    <Swizzled.components.HeaderMenuDropdown
      {...props}
      tooltip={Swizzled.methods.t('pe:uiPreferences.d')}
      id="uiPreferences"
      toggle={
        <>
          <Swizzled.components.HeaderMenuIcon name="ui" extraClasses="text-secondary" />
          {Swizzled.methods.t('pe:uiPreferences.t')}
        </>
      }
    >
      <Swizzled.components.UiPreferencesMenu {...props} />
    </Swizzled.components.HeaderMenuDropdown>
  )
}

export const HeaderMenuDraftViewFlags = (props) => {
  const { Swizzled } = props
  const count = Object.keys(Swizzled.methods.flattenFlags(props.flags)).length

  return (
    <Swizzled.components.HeaderMenuDropdown
      {...props}
      tooltip={Swizzled.methods.t('pe:flagMenuMany.d')}
      id="flags"
      toggle={
        <>
          <Swizzled.components.HeaderMenuIcon name="flag" extraClasses="text-secondary" />
          {Swizzled.methods.t('pe:flags')}
          <span>({count})</span>
        </>
      }
    >
      <Swizzled.components.FlagsAccordionEntries {...props} />
    </Swizzled.components.HeaderMenuDropdown>
  )
}

export const HeaderMenuDraftViewIcons = (props) => {
  const { Swizzled, update } = props
  const Button = Swizzled.components.HeaderMenuButton
  const size = 'w-5 h-5'
  const muted = 'text-current opacity-50'
  const ux = props.state.ui.ux
  const levels = {
    ...props.Swizzled.config.uxLevels.core,
    ...props.Swizzled.config.uxLevels.ui,
  }

  return (
    <div className="flex flex-row flex-wrap items-center">
      {ux >= levels.sa ? (
        <Button updateHandler={update.toggleSa} tooltip={Swizzled.methods.t('pe:tt.toggleSa')}>
          <Swizzled.components.SaIcon
            className={`${size} ${props.state.settings.sa ? 'txt-secondary' : muted}`}
          />
        </Button>
      ) : null}
      {ux >= levels.paperless ? (
        <Button
          updateHandler={() => update.settings('paperless', props.state.settings.paperless ? 0 : 1)}
          tooltip={Swizzled.methods.t('pe:tt.togglePaperless')}
        >
          <Swizzled.components.PaperlessIcon
            className={`${size} ${props.state.settings.paperless ? 'text-secondary' : muted}`}
          />
        </Button>
      ) : null}
      {ux >= levels.complete ? (
        <Button
          updateHandler={() => update.settings('complete', props.state.settings.complete ? 0 : 1)}
          tooltip={Swizzled.methods.t('pe:tt.toggleComplete')}
        >
          <Swizzled.components.DetailIcon
            className={`${size} ${!props.state.settings.complete ? 'text-secondary' : muted}`}
          />
        </Button>
      ) : null}
      {ux >= levels.expand ? (
        <Button
          updateHandler={() => update.settings('expand', props.state.settings.expand ? 0 : 1)}
          tooltip={Swizzled.methods.t('pe:tt.toggleExpand')}
        >
          <Swizzled.components.ExpandIcon
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
          tooltip={Swizzled.methods.t('pe:tt.toggleUnits')}
        >
          <Swizzled.components.UnitsIcon
            className={`${size} ${
              props.state.settings.units === 'imperial' ? 'text-secondary' : muted
            }`}
          />
        </Button>
      ) : null}
      <Swizzled.components.HeaderMenuIconSpacer />
      {ux >= levels.ux ? (
        <div className="flex flex-row px-1">
          <Swizzled.components.Tooltip tip={Swizzled.methods.t('pe:tt.changeUx')}>
            {[0, 1, 2, 3, 4].map((i) => (
              <button
                className="btn btn-ghost btn-sm px-0 -mx-0.5"
                onClick={() => update.ui('ux', i + 1)}
              >
                <Swizzled.components.CircleIcon
                  key={i}
                  fill={i < props.state.ui.ux ? true : false}
                  className={`${size} ${
                    i < props.state.ui.ux ? 'stroke-secondary fill-secondary' : 'stroke-current'
                  }`}
                  fillOpacity={0.3}
                />
              </button>
            ))}
          </Swizzled.components.Tooltip>
        </div>
      ) : null}
      {ux >= levels.aside ? (
        <Button
          updateHandler={() => update.ui('aside', props.state.ui.aside ? 0 : 1)}
          tooltip={Swizzled.methods.t('pe:tt.toggleAside')}
        >
          <Swizzled.components.MenuIcon
            className={`${size} ${!props.state.ui.aside ? 'text-secondary' : muted}`}
          />
        </Button>
      ) : null}
      {ux >= levels.kiosk ? (
        <Button
          updateHandler={() => update.ui('kiosk', props.state.ui.kiosk ? 0 : 1)}
          tooltip={Swizzled.methods.t('pe:tt.toggleKiosk')}
        >
          <Swizzled.components.KioskIcon
            className={`${size} ${props.state.ui.kiosk ? 'text-secondary' : muted}`}
          />
        </Button>
      ) : null}
      {ux >= levels.rotate ? (
        <Button
          updateHandler={() => update.ui('rotate', props.state.ui.rotate ? 0 : 1)}
          tooltip={Swizzled.methods.t('pe:tt.toggleRotate')}
        >
          <Swizzled.components.RotateIcon
            className={`${size} ${props.state.ui.rotate ? 'text-secondary' : muted}`}
          />
        </Button>
      ) : null}
      {ux >= levels.renderer ? (
        <Button
          updateHandler={() =>
            update.ui('renderer', props.state.ui.renderer === 'react' ? 'svg' : 'react')
          }
          tooltip={Swizzled.methods.t('pe:tt.toggleKiosk')}
        >
          <Swizzled.components.RocketIcon
            className={`${size} ${props.state.ui.renderer === 'svg' ? 'text-secondary' : muted}`}
          />
        </Button>
      ) : null}
      <Swizzled.components.HeaderMenuIconSpacer />
      <Button
        updateHandler={update.clearPattern}
        tooltip={Swizzled.methods.t('pe:tt.resetPatternState')}
      >
        <Swizzled.components.ResetIcon className={`${size} text-warning`} />
      </Button>
      <Button updateHandler={update.clearAll} tooltip={Swizzled.methods.t('pe:tt.resetAllState')}>
        <Swizzled.components.TrashIcon className={`${size} text-error`} />
      </Button>
    </div>
  )
}

export const HeaderMenuIcon = (props) => {
  const { Swizzled, name, extraClasses = '' } = props
  const Icon =
    Swizzled.components[`${Swizzled.methods.capitalize(name)}Icon`] || Swizzled.components.Noop
  return <Icon {...props} className={`h-5 w-5 ${extraClasses}`} />
}
export const HeaderMenuIconSpacer = () => <span className="px-1 font-bold opacity-30">|</span>

export const HeaderMenuButton = ({ Swizzled, updateHandler, children, tooltip }) => (
  <Swizzled.components.Tooltip tip={tooltip}>
    <button className="btn btn-ghost btn-sm px-1" onClick={updateHandler}>
      {children}
    </button>
  </Swizzled.components.Tooltip>
)

export const HeaderMenuViewMenu = (props) => {
  const { Swizzled, update, saveAs = false, state } = props
  const output = []

  let i = 1
  for (const viewName of [
    'spacer',
    ...Swizzled.config.mainViews,
    'spacer',
    ...Swizzled.config.extraViews,
    'spacerOver3',
    ...Swizzled.config.devViews,
    'spacer',
    'viewPicker',
  ]) {
    if (viewName === 'spacer') output.push(<Swizzled.components.ViewMenuSpacer key={i} />)
    else if (viewName === 'spacerOver3')
      output.push(state.ui.ux > 3 ? <Swizzled.components.ViewMenuSpacer key={i} /> : null)
    else if (state.ui.ux >= Swizzled.config.uxLevels.views[viewName])
      output.push(
        <li key={i} className="mb-1 flex flex-row items-center justify-between w-full">
          <a
            className={`w-full rounded-lg border-2 border-secondary text-base-content flex flex-row items-center gap-4
          hover:bg-secondary hover:bg-opacity-20 hover:border-solid ${
            viewName === state.view ? 'bg-secondary border-solid bg-opacity-20' : 'border-dotted'
          }`}
            onClick={() => update.view(viewName)}
          >
            <Swizzled.components.ViewTypeIcon
              view={viewName}
              className="w-6 h-6 grow-0"
              Swizzled={Swizzled}
            />
            <b className="ext-right grow">{Swizzled.methods.t(`pe:view.${viewName}.t`)}</b>
          </a>
        </li>
      )
    i++
  }

  return (
    <Swizzled.components.HeaderMenuDropdown
      {...props}
      tooltip={Swizzled.methods.t('pe:views.d')}
      id="views"
      toggle={
        <>
          <Swizzled.components.HeaderMenuIcon
            name="right"
            stroke={3}
            extraClasses="text-secondary rotate-90"
          />
          {Swizzled.methods.t('pe:views.t')}
        </>
      }
    >
      <ul
        tabIndex={i}
        className="dropdown-content menu bg-base-100 rounded-box w-52 p-2 shadow z-20"
        style={{ width: '300px' }}
      >
        {output}
      </ul>
    </Swizzled.components.HeaderMenuDropdown>
  )
}

//<div className="tooltip tooltip-bottom" data-tip={Swizzled.methods.t('pe:tt.changeEditorView')}>
//  <div className={`dropdown z-20 ${open ? 'dropedown-open' : ''}`}>
//    <div tabIndex={i} role="button" className="btn btn-ghost btn-sm border-current border-2 px-2" onClick={() => setOpen(!open)}>
//      <Swizzled.components.ViewTypeIcon view={state.view} />
//      Editor View
//    </div>
//    {open && <div className="w-screen h-screen fixed z-10 top-0 left-0 opacity-0" onClick={() => setOpen(!open)}></div>}
//  </div>
//</div>

//  __SDEFILE__ - This file is a dependency for the stand-alone environment
// Dependencies
//import { capitalize, shortDate } from 'shared/utils.mjs'
//import { controlLevels } from 'shared/config/freesewing.config.mjs'
//// Hooks
//import { useContext, useMemo } from 'react'
//import { useMobileAction } from 'shared/context/mobile-menubar-context.mjs'
//import { useTranslation } from 'next-i18next'
//import { useBackend } from 'shared/hooks/use-backend.mjs'
//import { useTheme } from 'shared/hooks/use-theme.mjs'
//// Context
//import { LoadingStatusContext } from 'shared/context/loading-status-context.mjs'
//// Components
//import { PanZoomContext } from 'shared/components/workbench/pattern/pan-zoom-context.mjs'
//import {
//  PaperlessIcon,
//  SaIcon,
//  RocketIcon,
//  BulletIcon,
//  UnitsIcon,
//  DetailIcon,
//  ResetIcon,
//  UploadIcon,
//  BookmarkIcon,
//  ZoomInIcon,
//  ZoomOutIcon,
//  ExpandIcon,
//  KioskIcon,
//} from 'shared/components/icons.mjs'
//
//export const ns = ['common', 'core-settings', 'ui-settings']
//
const IconButton = ({ Icon, onClick, dflt = true, title, hide = false, extraClasses = '' }) => (
  <div className="tooltip tooltip-bottom tooltip-primary flex items-center" data-tip={title}>
    <button
      onClick={onClick}
      className={`text-${dflt ? 'neutral-content' : 'accent'} hover:text-secondary-focus ${
        hide ? 'invisible' : ''
      } ${extraClasses}`}
      title={title}
    >
      <Icon />
    </button>
  </div>
)

const smZoomClasses =
  '[.mobile-menubar_&]:btn [.mobile-menubar_&]:btn-secondary [.mobile-menubar_&]:btn-circle [.mobile-menubar_&]:my-1'
const ZoomButtons = ({ t, zoomFunctions, zoomed }) => {
  if (!zoomFunctions) return null

  return (
    <div className="flex flex-col lg:flex-row items-center lg:content-center lg:gap-4">
      <IconButton
        Icon={ResetIcon}
        onClick={zoomFunctions.reset}
        title={t('resetZoom')}
        hide={!zoomed}
        extraClasses={smZoomClasses}
      />
      <IconButton
        Icon={ZoomOutIcon}
        onClick={() => zoomFunctions.zoomOut()}
        title={t('zoomOut')}
        dflt
        extraClasses={smZoomClasses}
      />
      <IconButton
        Icon={ZoomInIcon}
        onClick={() => zoomFunctions.zoomIn()}
        title={t('zoomIn')}
        dflt
        extraClasses={smZoomClasses}
      />
    </div>
  )
}
