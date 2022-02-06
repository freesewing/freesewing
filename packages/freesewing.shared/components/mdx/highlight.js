import CopyToClipboard from 'shared/components/copy-to-clipboard'

const names = {
  js: 'javascript',
  bash: 'bash',
  sh: 'shell',
  json: 'JSON',
  yaml: 'YAML',
}

const Highlight = (props) => {

  const language = props.language
    ? props.language
    : props.children
    ? props.children.props.className.split('-').pop()
    : 'txt'

  const preProps = {
    className: `language-${language} hljs text-base lg:text-lg whitespace-pre-wrap break-words`
  }
  if (props.raw) preProps.dangerouslySetInnerHTML = { __html: props.raw }

  return (
    <div className="hljs my-4">
      <div className={`
        flex flex-row justify-between
        text-xs uppercase font-bold text-neutral-content
        mt-1 border-b border-neutral-content border-opacity-25
        py-1 mb-2 lg:text-sm
      `}>
        <span>&nbsp;</span>
        <span>{names[language] ? names[language] : language}</span>
        <CopyToClipboard content={props.children} />
      </div>
      <pre {...preProps}>
        {props.children}
      </pre>
    </div>
  )
}

export default Highlight

