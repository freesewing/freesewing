import Part from './Part'
import { getProps } from './utils'

const Stack = props => {

  return (
    <g {...getProps(props.stack)}>
      {[...props.stack.parts].map((part) => (
        <Part {...props }
          key={part.name}
          partName={part.name}
          part={part}
        />
      ))}
    </g>
  )
}

export default Stack
