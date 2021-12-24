import React from 'react'

const Svg = ({
  embed = true,
  design = false,
  language = 'en',
  className = 'freesewing pattern',
  style = {},
  viewBox = false,
  width,
  height,
  children
}) => {
  let attributes = {
    xmlns: 'http://www.w3.org/2000/svg',
    'xmlns:svg': 'http://www.w3.org/2000/svg',
    xmlnsXlink: 'http://www.w3.org/1999/xlink',
    xmlLang: language,
    viewBox: viewBox || `0 0 ${width} ${height}`,
    className,
    style
  }

  if (!embed) {
    attributes.width = width + 'mm'
    attributes.height = height + 'mm'
  }
  if (design) attributes.className += ' design'

  return <svg {...attributes}>{children}</svg>
}

export default Svg
