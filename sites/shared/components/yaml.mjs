import React from 'react'
import { Highlight } from 'shared/components/mdx/highlight.mjs'
import hljs from 'highlight.js/lib/common'
import yaml from 'js-yaml'

export const Yaml = (props) => {
  let code
  if (props.json) code = yaml.dump(JSON.parse(props.json))
  else if (props.js) code = yaml.dump(props.js)
  else code = props.children

  return (
    <Highlight {...props} language="yaml" raw={hljs.highlight(code, { language: 'yaml' }).value} />
  )
}
