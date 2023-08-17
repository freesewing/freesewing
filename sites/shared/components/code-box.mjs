import { CopyToClipboard } from 'shared/components/copy-to-clipboard.mjs'

export const CodeBox = ({ code, title }) => (
  <div className="hljs my-4">
    <div
      className={`
      flex flex-row justify-between items-center
      text-xs font-medium text-success-content
      mt-1 border-b border-neutral-content border-opacity-25
      px-4 py-1 mb-2 lg:text-sm
    `}
    >
      <span>{title}</span>
      <CopyToClipboard text={code} />
    </div>
    <pre className="language-md hljs text-base lg:text-lg whitespace-break-spaces overflow-scroll pr-4">
      {code}
    </pre>
  </div>
)
