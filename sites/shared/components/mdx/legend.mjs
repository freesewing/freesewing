import { Legend as LegendDesign } from '@freesewing/legend'
import { TabbedExample as Example } from './tabbed-example.mjs'

export const Legend = ({ caption = false, part = '', children = null }) => {
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

  if (caption)
    console.log(
      'Passing the caption prop to @freesewing/components/Legend is deprecated. See: https://github.com/freesewing/freesewing/issues/1043'
    )

  return (
    <figure>
      <div className="shadow">
        <Example {...{ patternProps, settings }} />
      </div>
      <figcaption className="text-center italic -mt-1">{caption || children}</figcaption>
    </figure>
  )
}
