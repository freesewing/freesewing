import React from 'react'
import PropTypes from 'prop-types'
import Icon from '../Icon'

const Blockquote = props => {
  const attr = Object.assign({}, props)
  delete attr.type
  delete attr.children
  return (
    <blockquote className={props.type} {...attr}>
      {props.children}
      {props.type === 'fixme' ? null : <Icon icon={props.type} className={'icon ' + props.type} />}
    </blockquote>
  )
}

Blockquote.propTypes = {
  type: PropTypes.string.isRequired,
  children: PropTypes.node
}

Blockquote.defaultProps = {
  type: 'note',
  children: null
}
export default Blockquote
