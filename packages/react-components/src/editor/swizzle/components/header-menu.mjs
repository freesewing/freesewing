import { useState } from 'react'

export const HeaderMenu = ({ state, Swizzled, update, Design, pattern }) => {
  const [open, setOpen] = useState()

  /*
   * Guard views that require measurements agains missing measurements
   * and make sure there's a view-specific header menu
   */
  const ViewMenu =
    !Swizzled.methods.missingMeasurements(state) &&
    Swizzled.components[`HeaderMenu${Swizzled.config.viewComponents[state.view]}`]
      ? Swizzled.components[`HeaderMenu${Swizzled.config.viewComponents[state.view]}`]
      : Swizzled.components.Null

  return (
    <div
      className={`flex sticky top-0 ${
        state.ui.kiosk ? 'z-50' : 'z-20'
      } transition-[top] duration-300 ease-in-out`}
    >
      <div
        className={`flex flex-row flex-wrap gap-1 md:gap-4 w-full items-start justify-center border-b border-base-300 py-1 md:py-1.5`}
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

  return (
    <>
      <div className="flex flex-row gap-1">
        <Swizzled.components.HeaderMenuDraftViewDesignOptions {...props} />
        <Swizzled.components.HeaderMenuDraftViewCoreSettings {...props} />
        <Swizzled.components.HeaderMenuDraftViewUiPreferences {...props} />
        {flags ? <Swizzled.components.HeaderMenuDraftViewFlags {...props} flags={flags} /> : null}
      </div>
      <Swizzled.components.HeaderMenuDraftViewIcons {...props} />
      <Swizzled.components.HeaderMenuUndoIcons {...props} />
      <Swizzled.components.HeaderMenuSaveIcons {...props} />
    </>
  )
}

export const HeaderMenuDropdown = (props) => {
  const { Swizzled, tooltip, toggle, open, setOpen, id } = props
  /*
   * We need to use both !fixed and md:!absolute here to override DaisyUI's
   * classes on dropdown-content to force the dropdown to use the available
   * screen space on mobile, rather than be positioned under its toggle button
   */

  return props.disabled ? (
    <Swizzled.components.Tooltip tip={tooltip}>
      <button
        disabled
        tabIndex={0}
        role="button"
        className="btn btn-ghost hover:bg-secondary hover:bg-opacity-20 hover:border-solid hover:boder-2 hover:border-secondary border border-secondary border-2 border-dotted btn-sm px-2 z-20 relative"
      >
        {toggle}
      </button>
    </Swizzled.components.Tooltip>
  ) : (
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
          <span className="hidden lg:inline">{Swizzled.methods.t('pe:designOptions.t')}</span>
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
          <span className="hidden lg:inline">{Swizzled.methods.t('pe:coreSettings.t')}</span>
        </>
      }
    >
      <Swizzled.components.CoreSettingsMenu {...props} />
    </Swizzled.components.HeaderMenuDropdown>
  )
}

export const HeaderMenuDraftViewUiPreferences = (props) => {
  const { Swizzled } = props

  return (
    <Swizzled.components.HeaderMenuDropdown
      {...props}
      tooltip={Swizzled.methods.t('pe:uiPreferences.d')}
      id="uiPreferences"
      toggle={
        <>
          <Swizzled.components.HeaderMenuIcon name="ui" extraClasses="text-secondary" />
          <span className="hidden lg:inline">{Swizzled.methods.t('pe:uiPreferences.t')}</span>
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
          <span className="hidden lg:inline">
            {Swizzled.methods.t('pe:flags')}
            <span>({count})</span>
          </span>
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
    <div className="flex flex-row flex-wrap items-center justify-center px-2">
      {ux >= levels.sa ? (
        <Button updateHandler={update.toggleSa} tooltip={Swizzled.methods.t('pe:tt.toggleSa')}>
          <Swizzled.components.SaIcon
            className={`${size} ${props.state.settings.sabool ? 'text-secondary' : muted}`}
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
                key={i}
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
          tooltip={Swizzled.methods.t('pe:tt.toggleRenderer')}
        >
          <Swizzled.components.RocketIcon
            className={`${size} ${props.state.ui.renderer === 'svg' ? 'text-secondary' : muted}`}
          />
        </Button>
      ) : null}
    </div>
  )
}

export const HeaderMenuUndoIcons = (props) => {
  const { Swizzled, update, state, Design } = props
  const Button = Swizzled.components.HeaderMenuButton
  const size = 'w-5 h-5'
  const undos = props.state._?.undos && props.state._.undos.length > 0 ? props.state._.undos : false

  return (
    <div className="flex flex-row flex-wrap items-center justify-center px-2">
      <Button
        updateHandler={() => update.restore(0, state._)}
        tooltip={Swizzled.methods.t('pe:tt.undo')}
        disabled={undos ? false : true}
      >
        <Swizzled.components.UndoIcon
          className={`${size} ${undos ? 'text-secondary' : ''}`}
          text="1"
        />
      </Button>
      <Button
        updateHandler={() => update.restore(undos.length - 1, state._)}
        tooltip={Swizzled.methods.t('pe:tt.undoAll')}
        disabled={undos ? false : true}
      >
        <Swizzled.components.UndoIcon
          className={`${size} ${undos ? 'text-secondary' : ''}`}
          text={Swizzled.methods.t('pe:allFirstLetter')}
        />
      </Button>
      <Swizzled.components.HeaderMenuDropdown
        {...props}
        tooltip={Swizzled.methods.t('pe:view.undos.t')}
        id="undos"
        disabled={undos ? false : true}
        toggle={
          <>
            <Swizzled.components.UndoIcon className="w-4 h-4" stroke={3} />
            <span className="hidden lg:inline">{Swizzled.methods.t('pe:undo')}</span>
          </>
        }
      >
        {undos ? (
          <ul className="dropdown-content bg-base-100 bg-opacity-90 z-20 shadow left-0 !fixed md:!absolute w-screen md:w-96 px-4 md:p-2 md:pt-0">
            {undos.slice(0, 9).map((step, index) => (
              <li key={index}>
                <Swizzled.components.UndoStep {...{ step, update, state, Design, index }} compact />
              </li>
            ))}
            <li key="view">
              <Swizzled.components.ButtonFrame
                dense
                ative
                onClick={() => update.state(index, state._)}
              >
                <div className="flex flex-row items-center align-center justify-between gap-2 w-full">
                  <div className="flex flex-row items-center align-start gap-2 grow">
                    <Swizzled.components.UndoIcon className="w-5 h-5 text-secondary" />
                    {Swizzled.methods.t(`pe:view.undos.t`)}...
                  </div>
                  {undos.length}
                </div>
              </Swizzled.components.ButtonFrame>
            </li>
          </ul>
        ) : null}
      </Swizzled.components.HeaderMenuDropdown>
      <Button updateHandler={update.clearAll} tooltip={Swizzled.methods.t('pe:tt.resetDesign')}>
        <Swizzled.components.TrashIcon className={`${size} text-secondary`} />
      </Button>
      <Button updateHandler={update.clearAll} tooltip={Swizzled.methods.t('pe:tt.resetAll')}>
        <Swizzled.components.ResetAllIcon className={`${size} text-secondary`} />
      </Button>
    </div>
  )
}

export const HeaderMenuSaveIcons = (props) => {
  const { Swizzled, update } = props
  const Button = Swizzled.components.HeaderMenuButton
  const size = 'w-5 h-5'
  const saveable = props.state._?.undos && props.state._.undos.length > 0

  return (
    <div className="flex flex-row flex-wrap items-center justify-center px-2">
      <Button
        updateHandler={update.clearPattern}
        tooltip={Swizzled.methods.t('pe:tt.savePattern')}
        disabled={saveable ? false : true}
      >
        <Swizzled.components.SaveIcon className={`${size} ${saveable ? 'text-success' : ''}`} />
      </Button>
      <Button
        updateHandler={() => update.view('save')}
        tooltip={Swizzled.methods.t('pe:tt.savePatternAs')}
      >
        <Swizzled.components.SaveAsIcon className={`${size} text-secondary`} />
      </Button>
      <Button
        updateHandler={update.clearPattern}
        tooltip={Swizzled.methods.t('pe:tt.exportPattern')}
      >
        <Swizzled.components.ExportIcon className={`${size} text-secondary`} />
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

export const HeaderMenuButton = ({
  Swizzled,
  updateHandler,
  children,
  tooltip,
  disabled = false,
}) => (
  <Swizzled.components.Tooltip tip={tooltip}>
    <button
      className="btn btn-ghost btn-sm px-1 disabled:bg-transparent"
      onClick={updateHandler}
      disabled={disabled}
    >
      {children}
    </button>
  </Swizzled.components.Tooltip>
)

export const HeaderMenuViewMenu = (props) => {
  const { Swizzled, update, state } = props
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
    'picker',
  ]) {
    if (viewName === 'spacer') output.push(<Swizzled.components.AsideViewMenuSpacer key={i} />)
    else if (viewName === 'spacerOver3')
      output.push(state.ui.ux > 3 ? <Swizzled.components.AsideViewMenuSpacer key={i} /> : null)
    else if (
      state.ui.ux >= Swizzled.config.uxLevels.views[viewName] &&
      (Swizzled.config.measurementsFreeViews.includes(viewName) ||
        state._.missingMeasurements.length < 1)
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
            <Swizzled.components.ViewTypeIcon
              view={viewName}
              className="w-6 h-6 grow-0"
              Swizzled={Swizzled}
            />
            <b className="text-left grow">{Swizzled.methods.t(`pe:view.${viewName}.t`)}</b>
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
          <span className="hidden lg:inline">{Swizzled.methods.t('pe:views.t')}</span>
        </>
      }
    >
      <ul
        tabIndex={i}
        className="dropdown-content bg-base-100 bg-opacity-90 z-20 shadow left-0 !fixed md:!absolute w-screen md:w-96 px-4 md:p-2 md:pt-0"
      >
        {output}
      </ul>
    </Swizzled.components.HeaderMenuDropdown>
  )
}
