import * as echarts from 'echarts'
import ReactECharts from 'echarts-for-react'
import { Popout } from 'shared/components/popout/index.mjs'

echarts.registerTheme('light', {
  backgroundColor: 'transparent',
})
echarts.registerTheme('dark', {
  backgroundColor: 'transparent',
})

export const ChartWrapper = ({ option = false, theme = 'light', h = 400 }) => {
  return option ? (
    <ReactECharts option={option} className="class_2" theme={theme} style={{ height: h }} />
  ) : (
    <Popout loading>Loading chart...</Popout>
  )
}
