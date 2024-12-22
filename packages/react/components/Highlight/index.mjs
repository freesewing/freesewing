import React from 'react'
import { CopyToClipboard } from '@freesewing/react/components/CopyToClipboard'

const defaultTitles = {
  js: 'Javascript',
  bash: 'Bash commands',
  sh: 'Shell commands',
  json: 'JSON',
  yaml: 'YAML',
}

/**
 * A React component to highlight code
 *
 * @params {object} props - All React props
 * @params  {string} language - The language to highlight
 * @params {object} children - The React children
 * @params {bool} raw - Set this to true to not escape tags
 * @params {string} title - Title for the highlight
 * @params {string} copy - Content to copy to clipboard
 */
export const Highlight = ({
  language = 'txt',
  children,
  raw = false,
  title = false,
  copy = false,
}) => {
  if (children?.props?.className) {
    language = children.props.className.split('-').pop()
  }

  const preProps = {
    className: `language-${language} hljs text-base lg:text-lg whitespace-break-spaces overflow-scroll pr-4`,
  }
  if (raw) preProps.dangerouslySetInnerHTML = { __html: raw }

  const label = title ? title : defaultTitles[language] ? defaultTitles[language] : language

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
        <span>{label}</span>
        <CopyToClipboard content={copy ? copy : children} label={label} />
      </div>
      <pre {...preProps}>{children}</pre>
    </div>
  )
}
