import ReactDOMServer from 'react-dom/server'
import { useState } from 'react'
import { CopyIcon, OkIcon } from 'shared/components/icons.mjs'
import { CopyToClipboard as Copy } from 'react-copy-to-clipboard'

const strip = (html) =>
  typeof DOMParser === 'undefined'
    ? html
    : new DOMParser().parseFromString(html, 'text/html').body.textContent || ''

const handleCopied = (setCopied) => {
  setCopied(true)
  setTimeout(() => setCopied(false), 1000)
}

export const CopyToClipboard = ({ content }) => {
  const [copied, setCopied] = useState(false)

  const text =
    typeof content === 'string' ? content : strip(ReactDOMServer.renderToStaticMarkup(content))

  return (
    <Copy text={text} onCopy={() => handleCopied(setCopied)}>
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
