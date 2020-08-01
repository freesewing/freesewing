import React from 'react'
import LegendPattern from '@freesewing/legend'
import Draft from '../Draft'

const Legend = ({ caption = '', part = '' }) => {
  const patternProps = new LegendPattern({
    only: part,
    measurements: {
      head: 370
    }
  })
    .draft()
    .getRenderProps()

  return (
    <figure>
      <div className="shadow">
        <Draft {...patternProps} />
      </div>
      <figcaption>{caption}</figcaption>
    </figure>
  )
}

export default Legend
