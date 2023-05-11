import { Part } from './part.mjs'
import { getProps } from './utils.mjs'

export const Stack = (props) => {
  const { stack, gist, updateGist, unsetGist, showInfo } = props

  return (
    <g {...getProps(stack)}>
      {[...stack.parts].map((part) => (
        <Part
          {...{ gist, updateGist, unsetGist, showInfo }}
          key={part.name}
          partName={part.name}
          part={part}
        />
      ))}
    </g>
  )
}
