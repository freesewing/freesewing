import { Legend as LegendDesign } from '@freesewing/legend'
import { ShowPattern } from './tabbed-example.mjs'

export const Legend = ({ part = '' }) => {
  const settings = {
    only: [`legend.${part}`],
    measurements: {
      head: 370,
    },
  }
  const pattern = new LegendDesign(settings).draft()

  const patternProps = {
    renderProps: pattern.getRenderProps(),
    logs: pattern.getLogs(),
  }

  return (
    <figure className="shadow p-2">
      <ShowPattern {...patternProps} />
    </figure>
  )
}
