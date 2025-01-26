import React from 'react'

export const Tooltip = (props) => {
  const { children, tip, ...rest } = props

  return (
    <div
      {...rest}
      className={`tw-daisy-tooltip tw-daisy-tooltip-bottom before:tw-bg-base-200 before:tw-shadow before:tw-text-base-content`}
      data-tip={tip}
    >
      {children}
    </div>
  )
}
