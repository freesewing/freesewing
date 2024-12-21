import React from 'react'
import { CopyToClipboard } from '@freesewing/react/components/CopyToClipboard'

const names = {
  js: 'Javascript',
  bash: 'Bash prompt',
  sh: 'Shell prompt',
  json: 'JSON',
  yaml: 'file.yaml',
}

export const Highlight = (props) => {
  let language = 'txt'
  if (props.language) language = props.language
  if (props.children?.props?.className) {
    language = props.children.props.className.split('-').pop()
  }

  const preProps = {
    className: `language-${language} hljs text-base lg:text-lg whitespace-break-spaces overflow-scroll pr-4`,
  }
  if (props.raw) preProps.dangerouslySetInnerHTML = { __html: props.raw }

  return (
    <div className="hljs my-4">
      <div
        className={`
        flex flex-row justify-between items-center
        text-xs font-medium text-warning
        mt-1 border-b border-neutral-content border-opacity-25
        px-4 py-1 mb-2 lg:text-sm
      `}
      >
        <span>{props.title ? props.title : names[language] ? names[language] : language}</span>
        <CopyToClipboard content={props.children} />
      </div>
      <pre {...preProps}>{props.children}</pre>
    </div>
  )
}
