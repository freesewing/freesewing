import React from 'react'
import { CircleIcon } from '@freesewing/react/components/Icon'

export const Ux = ({ ux = 0 }) => (
  <div className="flex flex-row">
    {[0, 1, 2, 3, 4].map((i) => (
      <CircleIcon
        key={i}
        fill={i < ux ? true : false}
        className={`tw-w-6 tw-h-6 ${i < ux ? 'tw-stroke-secondary tw-fill-secondary' : 'tw-stroke-current'}`}
        fillOpacity={0.3}
      />
    ))}
  </div>
)
