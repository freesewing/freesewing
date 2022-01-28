import TextOnPath from '../text-on-path'
import { getProps } from '../utils'

const Path = props => {
  const { path, part, name } = props
  if (!path.render) return null
  const output = []
  const pathId = 'path-' + part + '-' + name
  output.push(
    <path id={pathId} key={pathId} d={path.asPathstring()} {...getProps(path)} />
  )
  if (path.attributes.get('data-text'))
    output.push(<TextOnPath key={'text-on-path-' + name} pathId={pathId} {...props} />)

  return output
}

export default Path
