import TextOnPath from '../text-on-path'
import { getProps } from '../utils'

const XrayPath = props => (
  <g>
    <path
      d={props.path.asPathstring()}
      {...getProps(props.path)}
      className="opacity-0 stroke-4xl stroke-contrast hover:opacity-25 hover:cursor-pointer"
      onClick={() => props.updateGist(
        ['xray', 'parts', props.partName, 'paths', props.pathName],
        props.path
      )}
    />
  </g>
)


const Path = props => {
  const { path, partName, pathName } = props
  if (!path.render) return null
  const output = []
  const pathId = 'path-' + partName + '-' + pathName
  output.push(
    <path id={pathId} key={pathId} d={path.asPathstring()} {...getProps(path)} />
  )
  if (path.attributes.get('data-text'))
    output.push(<TextOnPath key={'text-on-path-' + name} pathId={pathId} {...props} />)
  if (props.gist.xray) output.push(<XrayPath {...props} key={'xpath'+pathId} />)

  return output
}

export default Path
