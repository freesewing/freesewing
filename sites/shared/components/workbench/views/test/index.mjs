import { useTranslation } from 'next-i18next'
import { PanZoomPattern } from 'shared/components/workbench/pan-zoom-pattern.mjs'
import { TestMenu, ns as menuNs } from './menu.mjs'
import { PatternWithMenu, ns as wrapperNs } from '../pattern-with-menu.mjs'

export const ns = [...menuNs, wrapperNs]

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
    <PatternWithMenu
      {...{
        settings,
        ui,
        update,
        control: account.control,
        setSettings,
        title: <h2 className="px-2 capitalize">{title}</h2>,
        pattern: <PanZoomPattern {...{ renderProps }} />,
        menu: (
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
        ),
      }}
    />
  )
}
