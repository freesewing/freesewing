import TextOnPath from '../text-on-path'
import { getProps } from '../utils'

const Path = (props) => {
  if (!props.path.render) return null
  const output = []
  const pathId = 'path-' + props.part + '-' + props.name
  output.push(
    <path id={pathId} key={pathId} d={props.path.asPathstring()} {...getProps(props.path)} />
  )
  if (props.path.attributes.get('data-text'))
    output.push(<TextOnPath key={'text-on-path-' + props.name} pathId={pathId} {...props} />)

  return output
}

export default Path
