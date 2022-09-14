import Part from './part'
import { getProps } from './utils'

const Stack = props => {
  const { stackName, stack, gist, app, updateGist, unsetGist, showInfo } = props

  return (
    <g {...getProps(stack)} id={`stack-${stackName}`}>
      {[...stack.parts].map((part) => (
        <Part {...{ app, gist, updateGist, unsetGist, showInfo }}
          key={part.name}
          partName={part.name}
          part={part}
        />
      ))}
    </g>
  )
}

export default Stack
