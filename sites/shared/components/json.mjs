import React from 'react'
import { Highlight } from 'shared/components/mdx/highlight.mjs'
import hljs from 'highlight.js/lib/common'

export const Json = (props) => {
  const code = props.js ? JSON.stringify(props.js, null, 2) : props.children

  return <Highlight language="json" raw={hljs.highlight(code, { language: 'json' }).value} />
}
