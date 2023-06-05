import { forwardRef } from 'react'

export const Group = forwardRef((props, ref) => (
  <g {...props} ref={ref}>
    {props.children}
  </g>
))
