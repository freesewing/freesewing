//  __SDEFILE__ - This file is a dependency for the stand-alone environment
// Dependencies
import { capitalize, shortDate } from 'shared/utils.mjs'
import { controlLevels } from 'shared/config/freesewing.config.mjs'
// Hooks
import { useContext, useMemo } from 'react'
import { useMobileAction } from 'shared/context/mobile-menubar-context.mjs'
import { useTranslation } from 'next-i18next'
import { useBackend } from 'shared/hooks/use-backend.mjs'
import { useTheme } from 'shared/hooks/use-theme.mjs'
// Context
import { LoadingStatusContext } from 'shared/context/loading-status-context.mjs'
// Components
import { PanZoomContext } from 'shared/components/workbench/pattern/pan-zoom-context.mjs'
import {
  PaperlessIcon,
  SaIcon,
  RocketIcon,
  BulletIcon,
  UnitsIcon,
  DetailIcon,
  ResetIcon,
  UploadIcon,
  BookmarkIcon,
  ZoomInIcon,
  ZoomOutIcon,
  ExpandIcon,
  KioskIcon,
} from 'shared/components/icons.mjs'

export const ns = ['common', 'core-settings', 'ui-settings']

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

const Spacer = () => <span className="opacity-50">|</span>

export const DraftHeader = ({
  update,
  settings,
  ui,
  control,
  account,
  design,
  setSettings,
  saveAs = false,
}) => {
  const { t, i18n } = useTranslation(ns)
  const { zoomFunctions, zoomed } = useContext(PanZoomContext)
  const backend = useBackend()
  const { setLoadingStatus } = useContext(LoadingStatusContext)
  const { theme } = useTheme()

  // Override button colors for monochrome theme.
  const ueButtonColor = theme !== 'monochrome' ? 'text-primary' : 'text-primary-content'
  const resetOptionsButtonColor = theme !== 'monochrome' ? 'text-accent' : 'text-warning'

  // make the zoom buttons so we can pass them to the mobile menubar
  const headerZoomButtons = useMemo(
    () => <ZoomButtons {...{ t, zoomFunctions, zoomed }} />,
    [zoomed, t, zoomFunctions]
  )
  // add the zoom buttons as an action on the mobile menubar
  useMobileAction('zoom', { order: 0, actionContent: headerZoomButtons })

  const savePattern = async () => {
    setLoadingStatus([true, 'savingPattern'])
    const result = await backend.updatePattern(saveAs.pattern, { settings })
    if (result.success)
      setLoadingStatus([
        true,
        <>
          {t('status:patternSaved')} <small>[#{saveAs.pattern}]</small>
        </>,
        true,
        true,
      ])
    else setLoadingStatus([true, 'backendError', true, false])
  }

  const bookmarkPattern = async () => {
    setLoadingStatus([true, 'creatingBookmark'])
    const result = await backend.createBookmark({
      type: 'pattern',
      title: `${capitalize(design)} / ${shortDate(i18n.language)}`,
      url: window.location.pathname + window.location.search + window.location.hash,
    })
    if (result.success) {
      const id = result.data.bookmark.id
      setLoadingStatus([
        true,
        <>
          {t('status:bookmarkCreated')} <small>[#{id}]</small>
        </>,
        true,
        true,
      ])
    } else setLoadingStatus([true, 'backendError', true, false])
  }

  return (
    <div
      className={`hidden lg:flex sticky top-0 ${
        ui.kiosk ? 'z-50' : 'z-20'
      }} transition-[top] duration-300 ease-in-out z-10`}
    >
      <div
        className={`hidden lg:flex flex-row flex-wrap gap-4 py-2 w-full bg-neutral text-neutral-content items-center justify-center`}
      >
        {headerZoomButtons}
        <Spacer />
        <div className="flex flex-row items-center gap-4">
          {control < controlLevels.core.sa ? null : (
            <IconButton
              Icon={SaIcon}
              dflt={settings.sabool ? false : true}
              onClick={() => update.toggleSa()}
              title={t('core-settings:sabool.t')}
            />
          )}
          {control < controlLevels.core.paperless ? null : (
            <IconButton
              Icon={PaperlessIcon}
              dflt={settings.paperless ? false : true}
              onClick={() => update.settings(['paperless'], !settings.paperless)}
              title={t('core-settings:paperless.t')}
            />
          )}
          {control < controlLevels.core.complete ? null : (
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
          )}
          {control < controlLevels.core.expand ? null : (
            <IconButton
              Icon={ExpandIcon}
              dflt={settings.expand || typeof settings.expand === 'undefined' ? true : false}
              onClick={() =>
                update.settings(
                  ['expand'],
                  typeof settings.expand === 'undefined' ? 1 : settings.expand ? 0 : 1
                )
              }
              title={t('core-settings:expand.t')}
            />
          )}
          {control < controlLevels.core.units ? null : (
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
          )}
        </div>
        <Spacer />
        <div
          className="tooltip tooltip-primary tooltip-bottom flex flex-row items-center"
          data-tip={t('ui-settings:control.t')}
        >
          {[1, 2, 3, 4, 5].map((score) => (
            <button onClick={() => update.setControl(score)} className={ueButtonColor} key={score}>
              <BulletIcon fill={control >= score ? true : false} />
            </button>
          ))}
        </div>
        {control < controlLevels.ui.kiosk ? null : (
          <div className="flex flex-row items-center gap-4">
            <IconButton
              Icon={KioskIcon}
              dflt={ui.kiosk ? false : true}
              onClick={() => update.ui(['kiosk'], ui.kiosk ? 0 : 1)}
              title={t('ui-settings:kiosk.t')}
            />
            {control < controlLevels.ui.renderer ? null : (
              <IconButton
                Icon={RocketIcon}
                dflt={ui.renderer !== 'svg'}
                onClick={() => update.ui(['renderer'], ui.renderer === 'react' ? 'svg' : 'react')}
                title={t('ui-settings:renderer.t')}
              />
            )}
          </div>
        )}
        <Spacer />
        <div className="flex flex-row items-center gap-4">
          <button
            onClick={() => setSettings({ measurements: settings.measurements })}
            className={`tooltip tooltip-primary tooltip-bottom flex flex-row items-center`}
            data-tip={t('core-settings:clearSettingsNotMeasurements')}
            disabled={typeof settings.options === 'undefined'}
          >
            <ResetIcon
              stroke={3.5}
              className={`w-6 h-6 ${
                typeof settings.options === 'undefined'
                  ? 'text-base-100 opacity-30'
                  : resetOptionsButtonColor
              }`}
            />
          </button>
          <button
            onClick={() => setSettings({})}
            className="tooltip tooltip-primary tooltip-bottom flex flex-row items-center text-warning"
            data-tip={t('core-settings:clearSettingsAndMeasurements')}
            disabled={!(settings.measurements && Object.keys(settings.measurements).length > 0)}
          >
            <ResetIcon
              stroke={3.5}
              className={`w-6 h-6 ${
                !(settings.measurements && Object.keys(settings.measurements).length > 0)
                  ? 'text-base-100 opacity-30'
                  : 'text-warning'
              }`}
            />
          </button>
        </div>
        <Spacer />
        <div className="flex flex-row items-center gap-4">
          {saveAs.pattern ? (
            <button
              onClick={savePattern}
              className={`tooltip tooltip-primary tooltip-bottom flex flex-row items-center disabled:opacity-50`}
              data-tip={t('workbench:savePattern')}
              disabled={typeof account?.username === 'undefined'}
            >
              <UploadIcon />
            </button>
          ) : null}
          <button
            onClick={() => bookmarkPattern()}
            className={`tooltip tooltip-primary tooltip-bottom flex flex-row items-center disabled:opacity-50`}
            data-tip={t('workbench:bookmarkPattern')}
            disabled={typeof account?.username === 'undefined'}
          >
            <BookmarkIcon />
          </button>
        </div>
      </div>
    </div>
  )
}
