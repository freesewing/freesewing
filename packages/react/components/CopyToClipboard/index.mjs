import React, { useContext, useState } from 'react'
import ReactDOMServer from 'react-dom/server'
import { CopyIcon, OkIcon } from '@freesewing/react/components/Icon'
import { CopyToClipboard as Copy } from 'react-copy-to-clipboard'
import { LoadingStatusContext } from '@freesewing/react/context/LoadingStatus'

const strip = (html) =>
  typeof DOMParser === 'undefined'
    ? html
    : new DOMParser().parseFromString(html, 'text/html').body.textContent || ''

const handleCopied = (setCopied, setLoadingStatus, label) => {
  setCopied(true)
  setLoadingStatus([
    true,
    label ? `${label} copied to clipboard` : 'Copied to clipboard',
    true,
    true,
  ])
  setTimeout(() => setCopied(false), 1000)
}

export const CopyToClipboard = ({ content, label = false }) => {
  const [copied, setCopied] = useState(false)
  const { setLoadingStatus } = useContext(LoadingStatusContext)

  const text =
    typeof content === 'string' ? content : strip(ReactDOMServer.renderToStaticMarkup(content))

  return (
    <Copy text={text} onCopy={() => handleCopied(setCopied, setLoadingStatus, label)}>
      <button className={copied ? 'text-success' : ''}>
        {copied ? (
          <OkIcon className="w-5 h-5 text-success-content bg-success rounded-full p-1" stroke={4} />
        ) : (
          <CopyIcon className="w-5 h-5 text-inherit" />
        )}
      </button>
    </Copy>
  )
}
