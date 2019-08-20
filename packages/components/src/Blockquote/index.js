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
      <Icon icon={props.type} className={'icon ' + props.type} />
    </blockquote>
  )
}

Blockquote.propTypes = {
  type: PropTypes.string.isRequired,
  children: PropTypes.node,
  style: PropTypes.object
}

Blockquote.defaultProps = {
  type: 'note',
  children: null,
  style: {}
}
export default Blockquote
