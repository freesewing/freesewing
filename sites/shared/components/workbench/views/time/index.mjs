//  __SDEFILE__ - This file is a dependency for the stand-alone environment
import { PanZoomPattern as ShowPattern } from 'shared/components/workbench/pan-zoom-pattern.mjs'
import { DraftMenu, ns as menuNs } from '../draft/menu.mjs'
import { PatternWithMenu } from '../pattern-with-menu.mjs'
import { DraftHeader, ns as headerNs } from '../draft/header.mjs'
import { timingPlugin } from '@freesewing/plugin-timing'
import { ChartWrapper } from 'shared/components/wrappers/chart.mjs'
import * as echarts from 'echarts'
import { useState, useEffect } from 'react'
import { useTheme } from 'shared/hooks/use-theme.mjs'
import tailwindColors from 'tailwindcss/colors'
import { useTranslation } from 'next-i18next'

export const ns = [...menuNs, ...headerNs]

const resolveColor = (color) => {
  const [c, i] = color.split('-')

  return tailwindColors[c][i]
}

const getColor = (i, colors) =>
  new echarts.graphic.LinearGradient(0, 0, 0, 1, [
    { offset: 0, color: resolveColor(colors[i % colors.length]) + 'dd' },
    { offset: 1, color: resolveColor(colors[i % colors.length]) },
  ])

const TimeScore = ({ took, setData }) => {
  const { t } = useTranslation('workbench')
  let msg = t('workbench:tooSlow')
  let color = 'error'
  if (took < 25) {
    msg = t('workbench:veryFast')
    color = 'success'
  } else if (took < 50) {
    msg = t('workbench:fast')
    color = 'success'
  } else if (took < 75) {
    msg = t('workbench:ok')
    color = 'info'
  } else if (took < 100) {
    msg = t('workbench:slow')
    color = 'warning'
  }

  return (
    <button className={`btn btn-${color}`} onClick={() => setData([])}>
      {took}ms : {msg}
    </button>
  )
}

const option = (parts, data, colors) => ({
  color: colors.map((color) => resolveColor(color)),
  title: { text: 'FreeSewing Timing Plugin' },
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'cross',
      label: {
        backgroundColor: 'transparent',
      },
    },
  },
  legend: {
    data: parts,
    bottom: '0',
  },
  toolbox: {
    feature: {
      saveAsImage: {},
    },
  },
  grid: {
    left: '1%',
    right: '1%',
    bottom: '12%',
    containLabel: true,
  },
  xAxis: [
    {
      type: 'category',
      boundaryGap: false,
      data: data.map((d, i) => i + 1),
    },
  ],
  yAxis: [{ type: 'value' }],
  series: parts.map((name, i) => ({
    name,
    type: 'line',
    stack: 'Total',
    smooth: true,
    lineStyle: {
      width: 0,
    },
    showSymbol: false,
    areaStyle: {
      opacity: 0.8,
      color: getColor(i, colors),
    },
    emphasis: {
      focus: 'series',
    },
    data: data.map((render) => (render.parts[name].took ? render.parts[name].took : 0)),
  })),
})

const TimingHeader = ({ timing, parts }) => {
  const { t } = useTranslation('workbench')
  const [data, setData] = useState([])
  const { graph } = useTheme()

  useEffect(() => setData([...data, timing]), [timing])

  return data.length > 0 ? (
    <div className="max-w-full p-4">
      <ChartWrapper option={option(parts, data, graph)} />
      <div className="flex flex-row gap-4 flex-wrap w-full items-center justify-center">
        <button className="btn btn-secondary" onClick={() => setData([])}>
          {t('workbench:clearTimingData')}
        </button>
        <TimeScore took={timing.draft.took} setData={setData} />
      </div>
    </div>
  ) : null
}

export const TimeView = ({
  design,
  pattern,
  patternConfig,
  settings,
  setSettings,
  ui,
  update,
  language,
  account,
  setView,
  view,
  saveAs,
}) => {
  if (!pattern) return null
  else pattern.use(timingPlugin).draft()
  let output = null
  let renderProps = false
  if (ui.renderer === 'svg') {
    try {
      const __html = pattern.render()
      output = (
        <ShowPattern>
          <div className="w-full h-full" dangerouslySetInnerHTML={{ __html }} />
        </ShowPattern>
      )
    } catch (err) {
      console.log(err)
    }
  } else {
    renderProps = pattern.getRenderProps()
    output = <ShowPattern {...{ renderProps }} />
  }

  return (
    <>
      <DraftHeader
        {...{
          settings,
          ui,
          update,
          control: account.control,
          account,
          design,
          setSettings,
          saveAs,
        }}
      />
      <TimingHeader timing={pattern.setStores[0].timing} parts={pattern.config.draftOrder} />
      <PatternWithMenu
        {...{
          settings,
          ui,
          update,
          control: account.control,
          account,
          design,
          pattern: output,
          setSettings,
          saveAs,
          menu: (
            <DraftMenu
              {...{
                design,
                pattern,
                patternConfig,
                setSettings,
                settings,
                ui,
                update,
                language,
                account,
                renderProps,
                view,
                setView,
                flags: pattern.setStores[0]?.plugins?.['plugin-annotations']?.flags,
              }}
            />
          ),
        }}
      />
    </>
  )
}
