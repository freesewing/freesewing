import React from 'react'
import TextOnPath from '../text-on-path'
import { getProps } from '../utils'

const XrayPath = props => (
  <g>
    <path
      d={props.path.asPathstring()}
      {...getProps(props.path)}
      className="opacity-0 stroke-3xl stroke-contrast hover:opacity-25 hover:cursor-pointer"
      onClick={() => props.updateGist(
        ['_state', 'xray', 'parts', props.partName, 'paths', props.pathName],
        1
      )}
    />
  </g>
)


const Path = props => {
  const { path, partName, pathName } = props
  if (!path.render) return null
  const output = []
  const pathId = 'path-' + partName + '-' + pathName
  let d = ''
  try { d = path.asPathstring() }
  catch (err) {
    // Bail out
    console.log(`Failed to generate pathstring for path ${pathId} in part ${partName}`, err)
    return null
  }

  output.push(<path id={pathId} key={pathId} d={d} {...getProps(path)} />)
  if (path.attributes.get('data-text'))
    output.push(<TextOnPath key={'text-on-path-' + name} pathId={pathId} {...props} />)
  if (props.gist._state?.xray?.enabled) output.push(<XrayPath {...props} key={'xpath'+pathId} />)

  return output
}

export default Path
