import ReactDOMServer from 'react-dom/server'
import { useState } from 'react'
import CopyIcon from 'shared/components/icons/copy.js'
import {CopyToClipboard} from 'react-copy-to-clipboard'

const strip = html => new DOMParser()
  .parseFromString(html, 'text/html')
  .body.textContent || ""


const CopyToClipboardIcon = ({ content }) => {

  const [copied, setCopied] = useState(false)

  const text = (typeof content === 'string')
    ? content
    : strip(ReactDOMServer.renderToStaticMarkup(content))

  return (
    <CopyToClipboard text={text} onCopy={() => setCopied(true)}>
      <button className={copied ? 'text-success' : ''}><CopyIcon /></button>
    </CopyToClipboard>
  )
}

export default CopyToClipboardIcon

