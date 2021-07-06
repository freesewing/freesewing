import Prism from 'prismjs'

const Highlight = ({ tag='code', className='', children=null, noLabel=false, preClasses='', lang=false, dense=false }) => {

  // Highlighted code blocks are a code tag wrapped in a pre.
  // If that's the case, just return the children for the wrapping pre tag
  if (tag === 'pre' && typeof children === 'object' && children?.props?.mdxType === 'code')
    return children

  const language = lang
    ? lang
    : (className === '') ? 'js' : className.split('-').pop()
  const file = Prism.languages[language] ? Prism.languages[language] : Prism.languages.markup

  return (
    <div className="relative">
      {!noLabel && !dense && (
        <div className={`absolute left-4 -top-6 block px-4 py-1 text-xs uppercase font-bold text-base-content rounded-t-lg bg-info`}>
          {language}
        </div>
      )}
      <pre className={preClasses}>
        <code
          className={className + 'bg-accent'}
          dangerouslySetInnerHTML={{
            __html: Prism.highlight(children, file, language),
          }}
        />
      </pre>
    </div>
  )
}

export default Highlight

