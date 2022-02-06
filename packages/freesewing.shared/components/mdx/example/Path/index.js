import React from 'react'
import TextOnPath from '../TextOnPath'
import DevelopPath from '../DevelopPath'
import { getProps } from '../utils'

const Path = (props) => {
  if (!props.path.render) return null
  const output = []
  const pathId = 'path-' + props.part + '-' + props.name
  if (props.develop) output.push(<DevelopPath {...props} key={'dpa-' + props.name} />)
  output.push(
    <path id={pathId} key={pathId} d={props.path.asPathstring()} {...getProps(props.path)} />
  )
  if (props.path.attributes.get('data-text'))
    output.push(<TextOnPath key={'text-on-path-' + props.name} pathId={pathId} {...props} />)

  return output
}

export default Path
