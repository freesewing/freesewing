import React, { useContext, useState } from 'react'
import ReactDOMServer from 'react-dom/server'
import { horFlexClasses } from '@freesewing/utils'
import { CopyIcon, OkIcon } from '@freesewing/react/components/Icon'
import { CopyToClipboard as Copy } from 'react-copy-to-clipboard'

const strip = (html) =>
  typeof DOMParser === 'undefined'
    ? html
    : new DOMParser().parseFromString(html, 'text/html').body.textContent || ''

const handleCopied = (setCopied, label, update) => {
  setCopied(true)
  update.notifySuccess(label ? `${label} c` : 'C' + 'opied to clipboard')
  setTimeout(() => setCopied(false), 1000)
}

export const CopyToClipboard = ({ content, label = false, sup = false, update }) => {
  const [copied, setCopied] = useState(false)

  const text =
    typeof content === 'string' ? content : strip(ReactDOMServer.renderToStaticMarkup(content))

  const style = sup ? 'tw-w-4 tw-h-4 tw--mt-4' : 'tw-w-5 tw-h-5'

  return (
    <Copy text={text} onCopy={() => handleCopied(setCopied, label, update)}>
      <button className={copied ? 'tw-text-success' : ''}>
        {copied ? (
          <OkIcon
            className={`${style} tw-text-success-content tw-bg-success tw-rounded-full tw-p-1`}
            stroke={4}
          />
        ) : (
          <CopyIcon className={`${style} tw-text-inherit`} />
        )}
      </button>
    </Copy>
  )
}

export const CopyToClipboardButton = ({ content, label = false, update, children }) => {
  const [copied, setCopied] = useState(false)

  const text =
    typeof content === 'string' ? content : strip(ReactDOMServer.renderToStaticMarkup(content))

  const style = 'tw-w-6 tw-h-6'

  return (
    <Copy text={text} onCopy={() => handleCopied(setCopied, label, update)}>
      <button
        className={`${horFlexClasses} tw-daisy-btn ${copied ? 'tw-daisy-btn-success' : 'tw-daisy-btn-primary'}`}
      >
        {copied ? (
          <OkIcon
            className={`${style} tw-text-success-content tw-bg-success tw-rounded-full tw-p-1`}
            stroke={4}
          />
        ) : (
          <CopyIcon className={`${style} tw-text-inherit`} />
        )}
        <div>{children}</div>
      </button>
    </Copy>
  )
}
