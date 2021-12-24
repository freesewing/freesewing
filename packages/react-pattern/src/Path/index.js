import React from 'react'
import TextOnPath from '../TextOnPath'
import DesignPath from '../DesignPath'
import { getProps } from '../utils'

const Path = (props) => {
  if (!props.path.render) return null
  const output = []
  const pathId = 'path-' + props.part + '-' + props.name
  if (props.design) output.push(<DesignPath {...props} key={'dpa-' + props.name} />)
  output.push(
    <path id={pathId} key={pathId} d={props.path.asPathstring()} {...getProps(props.path)} />
  )
  if (props.path.attributes.get('data-text'))
    output.push(<TextOnPath key={'text-on-path-' + props.name} pathId={pathId} {...props} />)

  return output
}

export default Path
