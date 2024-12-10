//  __SDEFILE__ - This file is a dependency for the stand-alone environment
// eslint-disable-next-line no-unused-vars
import React, { forwardRef } from 'react'

export const Group = forwardRef((props, ref) => (
  <g {...props} ref={ref}>
    {props.children}
  </g>
))

Group.displayName = 'Group'
