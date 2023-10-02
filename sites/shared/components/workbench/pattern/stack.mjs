import { Part } from './part.mjs'
import { getProps } from './utils.mjs'

export const Stack = ({ stackName, stack, settings, showInfo, ui, update }) => (
  <g {...getProps(stack)}>
    {[...stack.parts].map((part) => (
      <Part
        {...{ settings, showInfo, ui, update }}
        key={part.name}
        partName={part.name}
        part={part}
      />
    ))}
  </g>
)
