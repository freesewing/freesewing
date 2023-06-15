import { useState } from 'react'
import { PanZoomPattern as ShowPattern } from 'shared/components/workbench/pan-zoom-pattern.mjs'
import { DraftMenu, ns as menuNs } from './menu.mjs'
import { objUpdate } from 'shared/utils.mjs'
import {
  SettingsIcon,
  PaperlessIcon,
  SaIcon,
  DesktopIcon,
  RocketIcon,
  BulletIcon,
  MeasureIcon,
  DetailIcon,
} from 'shared/components/icons.mjs'

export const ns = menuNs

const IconButton = ({ Icon, onClick, dflt = true }) => (
  <button
    onClick={onClick}
    className={`text-${dflt ? 'neutral-content' : 'accent'} hover:text-secondary-focus`}
  >
    <Icon />
  </button>
)

const Spacer = () => <span className="opacity-50">|</span>

export const DraftViewHeader = ({ update, settings, ui, control }) => {
  return (
    <div className="flex flex-row gap-4 py-2 w-full bg-neutral text-neutral-content items-center justify-center">
      <div className="flex flex-row items-center gap-4">
        <IconButton
          Icon={SaIcon}
          dflt={settings.sabool ? false : true}
          onClick={() => update.toggleSa()}
        />
        <IconButton
          Icon={PaperlessIcon}
          dflt={settings.paperless ? false : true}
          onClick={() => update.settings(['paperless'], !settings.paperless)}
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
        />
        <IconButton
          Icon={
            settings.units !== 'imperial'
              ? MeasureIcon
              : ({ className }) => <MeasureIcon className={`${className} rotate-180 w-6 h-6`} />
          }
          dflt={settings.units !== 'imperial'}
          onClick={() =>
            update.settings(['units'], settings.units === 'imperial' ? 'metric' : 'imperial')
          }
        />
      </div>
      <Spacer />
      <div className="flex flex-row items-center">
        {[1, 2, 3, 4, 5].map((score) => (
          <button onClick={() => update.setControl(score)} className="text-primary">
            <BulletIcon fill={control >= score ? true : false} />
          </button>
        ))}
      </div>
      <Spacer />
      <div className="flex flex-row items-center gap-4">
        <IconButton
          Icon={RocketIcon}
          dflt={ui.renderer !== 'svg'}
          onClick={() => update.ui(['renderer'], ui.renderer === 'react' ? 'svg' : 'react')}
        />
      </div>
    </div>
  )
}

export const DraftView = ({
  design,
  pattern,
  patternConfig,
  settings,
  ui,
  update,
  language,
  account,
  DynamicDocs,
  setView,
  view,
}) => {
  let output = null
  let renderProps = false
  if (ui.renderer === 'svg') {
    try {
      const __html = pattern.render()
      output = <div dangerouslySetInnerHTML={{ __html }} />
    } catch (err) {
      console.log(err)
    }
  } else {
    renderProps = pattern.getRenderProps()
    output = <ShowPattern {...{ renderProps }} />
  }

  return (
    <div className="flex flex-col">
      <DraftViewHeader
        {...{
          settings,
          ui,
          update,
          control: account.control,
        }}
      />
      <div className="flex flex-row">
        <div className="w-2/3 shrink-0 grow lg:p-4 sticky top-0">{output}</div>
        <div className="w-1/3 shrink grow-0 lg:p-4 max-w-2xl h-screen overflow-scroll">
          <DraftMenu
            {...{
              design,
              pattern,
              patternConfig,
              settings,
              ui,
              update,
              language,
              account,
              DynamicDocs,
              renderProps,
              view,
              setView,
            }}
          />
        </div>
      </div>
    </div>
  )
}
