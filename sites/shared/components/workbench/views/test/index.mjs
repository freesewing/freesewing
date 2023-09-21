import { useTranslation } from 'next-i18next'
import { PanZoomPattern } from 'shared/components/workbench/pan-zoom-pattern.mjs'
import { TestMenu, ns as menuNs } from './menu.mjs'
import { PatternWithMenu, ns as wrapperNs } from '../pattern-with-menu.mjs'
import { Popout } from 'shared/components/popout/index.mjs'

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
  let placeholder = false

  /*
   * Translation of the title needs some work
   */
  let title = t('workbench:chooseATest')
  if (settings.sample?.type === 'measurement')
    title = t('workbench:testDesignMeasurement', {
      design,
      measurement: t(`measurements:${settings.sample?.measurement}`),
    })
  else if (settings.sample?.type === 'option')
    title = t('workbench:testDesignOption', {
      design,
      option: t(`${design}:${settings.sample?.option}.t`),
    })
  else if (settings.sample?.type === 'sets')
    title = t('workbench:testDesignSets', {
      design,
      thing: 'fixme views/test/index.mjs',
    })
  else
    placeholder = (
      <Popout tip>
        <p>{t('workbench:chooseATestDesc')}</p>
        <p className="hidden md:block">{t('workbench:chooseATestMenuMsg')}</p>
        <p className="block md:hidden">{t('workbench:chooseATestMenuMobileMsg')}</p>
      </Popout>
    )

  return (
    <PatternWithMenu
      {...{
        settings,
        ui,
        update,
        control: account.control,
        account,
        design,
        setSettings,
        title: <h2>{title}</h2>,
        pattern: placeholder ? placeholder : <PanZoomPattern {...{ renderProps }} />,
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
