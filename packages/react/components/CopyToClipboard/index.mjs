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

export const CopyToClipboard = ({ content, label = false, sup = false }) => {
  const [copied, setCopied] = useState(false)
  const { setLoadingStatus } = useContext(LoadingStatusContext)

  const text =
    typeof content === 'string' ? content : strip(ReactDOMServer.renderToStaticMarkup(content))

  const style = sup ? 'tw-w-4 tw-h-4 tw--mt-4' : 'tw-w-5 tw-h-5'

  return (
    <Copy text={text} onCopy={() => handleCopied(setCopied, setLoadingStatus, label)}>
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
