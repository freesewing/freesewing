import { CopyToClipboard } from 'shared/components/copy-to-clipboard.mjs'
import { HttpStatusCode } from './http.mjs'
import { Mermaid } from './mermaid.mjs'

const names = {
  js: 'Javascript',
  bash: 'Bash prompt',
  sh: 'Shell prompt',
  json: 'JSON',
  yaml: 'file.yaml',
}

export const Highlight = (props) => {
  let language = 'txt'
  let status = false
  if (props.language) language = props.language
  if (props.children?.props?.className) {
    language = props.children.props.className.split('-').pop()
    if (language.indexOf('.') !== -1) {
      [status, language] = language.split('.')
    }
  }

  // Mermaid should not be highlighted, but rendered
  if (language === 'mermaid') return <Mermaid>{props.children}</Mermaid>

  const preProps = {
    className: `language-${language} hljs text-base lg:text-lg whitespace-pre overflow-scroll pr-4`,
  }
  if (props.raw) preProps.dangerouslySetInnerHTML = { __html: props.raw }

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
        <span>{names[language] ? names[language] : language}</span>
        {status ? <HttpStatusCode status={status} /> : <CopyToClipboard content={props.children} />}
      </div>
      <pre {...preProps}>{props.children}</pre>
    </div>
  )
}
