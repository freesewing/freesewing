import React from 'react'
import Icon from '../Icon'

const Blockquote = (props) => {
  const attr = Object.assign({}, props)
  delete attr.type
  delete attr.children
  return (
    <blockquote className={props.type || 'note'} {...attr}>
      {props.children || null}
      {props.type !== 'fixme' && <Icon icon={props.type} className={'icon ' + props.type} />}
    </blockquote>
  )
}

export default Blockquote
