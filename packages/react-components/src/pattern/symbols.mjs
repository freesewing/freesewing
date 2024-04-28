//  __SDEFILE__ - This file is a dependency for the stand-alone environment
// eslint-disable-next-line no-unused-vars
import React from 'react'
import sanitize from 'html-react-parser'

export const Symbols = (props) =>
  props.svg ? (
    <>{props.svg.symbols.list ? sanitize(Object.values(props.svg.symbols.list).join('')) : null}</>
  ) : null
