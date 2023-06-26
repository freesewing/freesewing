import { useTranslation } from 'next-i18next'
import { PanZoomPattern } from 'shared/components/workbench/pan-zoom-pattern.mjs'
import { TestMenu, ns as menuNs } from './menu.mjs'
import { ViewHeader } from '../view-header.mjs'
import { PanZoomContextProvider } from 'shared/components/workbench/pattern/pan-zoom-context.mjs'

export const ns = menuNs

export const TestView = ({
  design,
  pattern,
  settings,
  setSettings,
  ui,
  update,
  language,
  account,
  DynamicDocs,
}) => {
  const { t } = useTranslation(ns)
  if (!pattern) return null
  if (settings.sample) pattern.sample()
  else pattern.draft()

  const renderProps = pattern.getRenderProps()
  const patternConfig = pattern.getConfig()

  const title = t('testThing', { design, thing: t(settings.sample?.[settings.sample.type]) })
  return (
    <PanZoomContextProvider>
      <div className="flex flex-col">
        <ViewHeader
          {...{
            settings,
            setSettings,
            ui,
            update,
            control: account.control,
          }}
        />
        <div className="flex flex-row ml-0 lg:ml-10">
          <div className="w-2/3 shrink-0 grow lg:p-4 sticky top-0">
            <h2 className="capitalize">{title}</h2>
            <PanZoomPattern {...{ renderProps }} />
          </div>
          <div className="w-1/3 shrink grow-0 lg:p-4 max-w-2xl h-screen overflow-scroll">
            <TestMenu
              {...{
                design,
                pattern,
                patternConfig,
                settings,
                setSettings,
                ui,
                update,
                language,
                account,
                DynamicDocs,
                renderProps,
              }}
            />
          </div>
        </div>
      </div>
    </PanZoomContextProvider>
  )
}
