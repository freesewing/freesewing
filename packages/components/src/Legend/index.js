import React from 'react'
import LegendPattern from '@freesewing/legend'
import Draft from '../Draft'

const Legend = ({ caption = false, part = '', children=null }) => {
  const patternProps = new LegendPattern({
    only: part,
    measurements: {
      head: 370
    }
  })
    .draft()
    .getRenderProps()

  if (caption) console.log('Passing the caption prop to @freesewing/components/Legend is deprecated. See: https://github.com/freesewing/freesewing/issues/1043')

  return (
    <figure>
      <div className="shadow">
        <Draft {...patternProps} />
      </div>
      <figcaption>{caption || children}</figcaption>
    </figure>
  )
}

export default Legend
