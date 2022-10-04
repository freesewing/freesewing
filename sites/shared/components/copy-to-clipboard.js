import ReactDOMServer from 'react-dom/server'
import { useState } from 'react'
import CopyIcon from 'shared/components/icons/copy.js'
import { CopyToClipboard } from 'react-copy-to-clipboard'

const strip = (html) =>
  typeof DOMParser === 'undefined'
    ? html
    : new DOMParser().parseFromString(html, 'text/html').body.textContent || ''

const handleCopied = (setCopied) => {
  setCopied(true)
  setTimeout(() => setCopied(false), 1000)
}

const CopyToClipboardIcon = ({ content }) => {
  const [copied, setCopied] = useState(false)

  const text =
    typeof content === 'string' ? content : strip(ReactDOMServer.renderToStaticMarkup(content))

  return (
    <CopyToClipboard text={text} onCopy={() => handleCopied(setCopied)}>
      <button className={copied ? 'text-success' : ''}>
        <CopyIcon className="w-5 h-5" />
      </button>
    </CopyToClipboard>
  )
}

export default CopyToClipboardIcon
