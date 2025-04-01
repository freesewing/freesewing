// Dependencies
import React, { useState, useEffect } from 'react'
import * as echarts from 'echarts'
import { timingPlugin } from '@freesewing/plugin-timing'
// Components
import { ChartWrapper } from '@freesewing/react/components/Echart'
import { DraftView } from './DraftView.mjs'

/**
 * The timing view is the draft view with an extra timing header
 *
 * @param (object) props - All the props
 * @return {React.component} TimingView - React component
 */
export const TimingView = (props) => (
  <DraftView {...props} plugins={[timingPlugin]} PluginOutput={PluginOutput} />
)

const PluginOutput = (props) => (
  <TimingHeader
    timing={props.pattern.setStores[0].timing}
    parts={props.pattern.config.draftOrder}
  />
)

const TimingHeader = ({ timing, parts }) => {
  const [data, setData] = useState([])

  useEffect(() => setData([...data, timing]), [timing])
  const opt = option(parts, data, timing.draft.took, setData)

  return data.length > 0 ? (
    <div className="max-w-full p-4">
      <ChartWrapper option={opt} />
    </div>
  ) : null
}

const resolveColor = (color) => {
  const [c, i] = color.split('-')

  return tailwindColors[c][i]
}

const getColor = (i, colors) =>
  new echarts.graphic.LinearGradient(0, 0, 0, 1, [
    { offset: 0, color: resolveColor(colors[i % colors.length]) + 'dd' },
    { offset: 1, color: resolveColor(colors[i % colors.length]) },
  ])

const timeScore = (took) => {
  if (took < 25) return 'Very Fast'
  if (took < 50) return 'Fast'
  if (took < 75) return 'OK'
  if (took < 100) return 'Slow'

  return 'Too Slow'
}

const option = (parts, data, took, setData) => ({
  //color: colors.map((color) => resolveColor(color)),
  title: {
    text: `Timing of most recent draft: ${timeScore(took)}`,
    left: 'center',
  },
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'cross',
      label: {
        backgroundColor: 'transparent',
      },
    },
  },
  toolbox: {
    feature: {
      saveAsImage: {},
      dataView: {
        backgroundColor: 'var(--pattern-bg)',
        textareaColor: 'transparent',
        textColor: 'currentColor',
        buttonColor: 'transparent',
        buttonTextColor: 'currentColor',
      },
      magicType: {
        type: ['line', 'bar', 'stack'],
      },
      myClearData: {
        show: true,
        title: 'Clear timing data',
        icon: 'path://M12 9.75 14.25 12m0 0 2.25 2.25M14.25 12l2.25-2.25M14.25 12 12 14.25m-2.58 4.92-6.374-6.375a1.125 1.125 0 0 1 0-1.59L9.42 4.83c.21-.211.497-.33.795-.33H19.5a2.25 2.25 0 0 1 2.25 2.25v10.5a2.25 2.25 0 0 1-2.25 2.25h-9.284c-.298 0-.585-.119-.795-.33Z',
        onclick: function () {
          setData([])
        },
      },
    },
  },
  graphic: [
    {
      type: 'image',
      right: 35,
      top: 72,
      z: 1,
      style: {
        image: '/img/logo.svg',
        width: 75,
        height: 75,
        opacity: 0.25,
      },
    },
  ],
  legend: {
    data: parts,
    bottom: '0',
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
      //color: 'red',
    },
    emphasis: {
      focus: 'series',
    },
    data: data.map((render) => (render.parts[name].took ? render.parts[name].took : 0)),
  })),
})
