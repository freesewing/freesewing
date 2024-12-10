import React from 'react'
import { Legend as LegendDesign } from '@freesewing/legend'
import { Pattern } from '@freesewing/react/pattern'

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
      <Pattern {...patternProps} />
    </figure>
  )
}
