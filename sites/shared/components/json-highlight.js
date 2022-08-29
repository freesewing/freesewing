import React from 'react'
import Highlight from 'shared/components/mdx/highlight.js'
import hljs from 'highlight.js/lib/common'

const Json = props => {
  const code = props.js
    ? JSON.stringify(props.js, null, 2)
    : props.children

  return <Highlight
    language='json'
    raw={hljs.highlight(code, { language: 'json' }).value}
  />
}

export default Json

