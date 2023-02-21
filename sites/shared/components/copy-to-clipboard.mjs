import ReactDOMServer from 'react-dom/server'
import { useState } from 'react'
import { CopyIcon } from 'shared/components/icons.mjs'
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
        <CopyIcon className="w-5 h-5" />
      </button>
    </Copy>
  )
}
