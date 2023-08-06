import { useContext, useMemo } from 'react'
import { PanZoomContext } from 'shared/components/workbench/pattern/pan-zoom-context.mjs'
import { useMobileAction } from 'shared/context/mobile-menubar-context.mjs'
import { useTranslation } from 'next-i18next'
import {
  PaperlessIcon,
  SaIcon,
  RocketIcon,
  BulletIcon,
  UnitsIcon,
  DetailIcon,
  IconWrapper,
  ClearIcon,
} from 'shared/components/icons.mjs'
import { ClearAllButton } from 'shared/components/workbench/menus/core-settings/index.mjs'

export const ns = ['common', 'core-settings', 'ui-settings']

const ZoomInIcon = (props) => (
  <IconWrapper {...props}>
    <path d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607zM10.5 7.5v6m3-3h-6" />
  </IconWrapper>
)

const ZoomOutIcon = (props) => (
  <IconWrapper {...props}>
    <path d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607zM13.5 10.5h-6" />
  </IconWrapper>
)

const IconButton = ({ Icon, onClick, dflt = true, title, hide = false, extraClasses = '' }) => (
  <div className={`${!hide && 'tooltip'} tooltip-bottom tooltip-accent`} data-tip={title}>
    <button
      onClick={onClick}
      className={`${
        dflt ? 'text-base-content bg-transparent' : 'bg-accent text-accent-content'
      } p-2 hover:bg-accent hover:text-accent-content ${hide ? 'invisible' : ''} ${extraClasses}`}
      title={title}
    >
      <Icon className="w-6 h-6" />
    </button>
  </div>
)

const smZoomClasses =
  '[.mobile-menubar_&]:btn [.mobile-menubar_&]:btn-secondary [.mobile-menubar_&]:btn-circle [.mobile-menubar_&]:my-2'
const ZoomButtons = ({ t, zoomFunctions, zoomed }) => {
  if (!zoomFunctions) return null
  return (
    <div className="flex flex-col lg:flex-row items-center lg:content-center lg:gap-2">
      <IconButton
        Icon={ClearIcon}
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

const Spacer = () => <span className="opacity-50">|</span>

export const ViewHeader = ({ update, settings, ui, control, setSettings }) => {
  const { t } = useTranslation(ns)
  const { zoomFunctions, zoomed } = useContext(PanZoomContext)

  // make the zoom buttons so we can pass them to the mobile menubar
  const headerZoomButtons = useMemo(
    () => <ZoomButtons {...{ t, zoomFunctions, zoomed }} />,
    [zoomed, t, zoomFunctions]
  )
  // add the zoom buttons as an action on the mobile menubar
  useMobileAction('zoom', { order: 0, actionContent: headerZoomButtons })

  return (
    <div className={`hidden lg:flex sticky top-0 z-20 transition-[top] duration-300 ease-in-out`}>
      <div className="hidden lg:flex flex-row flex-wrap gap-2 w-full bg-base-200 text-base-content items-center justify-center">
        {headerZoomButtons}
        <Spacer />
        <div className="flex flex-row items-center gap-2">
          <IconButton
            Icon={SaIcon}
            dflt={settings.sabool ? false : true}
            onClick={() => update.toggleSa()}
            title={t('core-settings:sabool.t')}
          />
          <IconButton
            Icon={PaperlessIcon}
            dflt={settings.paperless ? false : true}
            onClick={() => update.settings(['paperless'], !settings.paperless)}
            title={t('core-settings:paperless.t')}
          />
          <IconButton
            Icon={DetailIcon}
            dflt={settings.complete}
            onClick={() =>
              update.settings(
                ['complete'],
                typeof settings.complete === 'undefined' ? 0 : settings.complete ? 0 : 1
              )
            }
            title={t('core-settings:complete.t')}
          />
          <IconButton
            Icon={
              settings.units !== 'imperial'
                ? UnitsIcon
                : ({ className }) => <UnitsIcon className={`${className} rotate-180 w-6 h-6`} />
            }
            dflt={settings.units !== 'imperial'}
            onClick={() =>
              update.settings(['units'], settings.units === 'imperial' ? 'metric' : 'imperial')
            }
            title={t('core-settings:units.t')}
          />
        </div>
        <Spacer />
        <div
          className="tooltip tooltip-accent tooltip-bottom flex flex-row items-center"
          data-tip={t('ui-settings:control.t')}
        >
          {[1, 2, 3, 4, 5].map((score) => (
            <button onClick={() => update.setControl(score)} className="text-accent" key={score}>
              <BulletIcon fill={control >= score ? true : false} />
            </button>
          ))}
        </div>
        <Spacer />
        <div className="flex flex-row items-center gap-2">
          <IconButton
            Icon={RocketIcon}
            dflt={ui.renderer !== 'svg'}
            onClick={() => update.ui(['renderer'], ui.renderer === 'react' ? 'svg' : 'react')}
            title={t('ui-settings:renderer.t')}
          />
        </div>
        <Spacer />
        <div className="flex flex-row items-center gap-2">
          <ClearAllButton
            setSettings={setSettings}
            compact
            className="text-primary hover:bg-primary hover:text-primary-content p-2"
          />
        </div>
      </div>
    </div>
  )
}
