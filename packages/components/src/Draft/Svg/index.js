import React from 'react'
import PropTypes from 'prop-types'

const Svg = (props) => {
  let attributes = {
    xmlns: 'http://www.w3.org/2000/svg',
    'xmlns:svg': 'http://www.w3.org/2000/svg',
    xmlnsXlink: 'http://www.w3.org/1999/xlink',
    xmlLang: props.language,
    viewBox: props.viewBox || `0 0 ${props.width} ${props.height}`,
    className: props.className,
    style: props.style
  }

  if (!props.embed) {
    attributes.width = props.width + 'mm'
    attributes.height = props.height + 'mm'
  }
  if (props.design) attributes.className += ' design'

  return <svg {...attributes}>{props.children}</svg>
}

Svg.propTypes = {
  embed: PropTypes.bool,
  className: PropTypes.string,
  language: PropTypes.string,
  design: PropTypes.bool
}

Svg.defaultProps = {
  embed: true,
  design: false,
  language: 'en',
  className: 'freesewing draft',
  style: {},
  viewBox: false
}

export default Svg
