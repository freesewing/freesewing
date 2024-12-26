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
    className: `language-${language} hljs tw-text-base lg:tw-text-lg tw-whitespace-break-spaces tw-overflow-scroll tw-pr-4`,
  }
  if (raw) preProps.dangerouslySetInnerHTML = { __html: raw }

  const label = title ? title : defaultTitles[language] ? defaultTitles[language] : language

  return (
    <div className="hljs tw-my-4">
      <div
        className={`
        tw-flex tw-flex-row tw-justify-between tw-items-center tw-text-xs tw-font-medium tw-text-warning
        tw-mt-1 tw-border-b tw-border-neutral-content tw-border-opacity-25 tw-px-4 tw-py-1 tw-mb-2 lg:tw-text-sm
      `}
      >
        <span>{label}</span>
        <CopyToClipboard content={copy ? copy : children} label={label} />
      </div>
      <pre {...preProps}>{children}</pre>
    </div>
  )
}
