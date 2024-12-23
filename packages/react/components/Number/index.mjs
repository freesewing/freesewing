import React from 'react'

export const NumberCircle = ({ nr, color = 'secondary' }) => (
  <span
    className={`p-2 w-8 h-8 flex flex-col items-center justify-center shrink-0 rounded-full text-center p-0 py-2 bg-${
      color
    } text-${color}-content border-2 border-base-100`}
  >
    {nr}
  </span>
)
