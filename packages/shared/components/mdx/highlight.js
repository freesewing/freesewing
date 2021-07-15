import Prism from 'prismjs'

const names = {
  js: 'javascript'
}

const Highlight = ({
  tag='code',
  className='',
  children=null,
  noLabel=false,
  preClasses='',
  lang=false,
  dense=false
}) => {

  // Highlighted code blocks are a code tag wrapped in a pre.
  // If that's the case, just return the children for the wrapping pre tag
  if (tag === 'pre' && typeof children === 'object' && children?.props?.mdxType === 'code')
    return children

  const language = lang
    ? lang
    : (className === '') ? 'js' : className.split('-').pop()
  const file = Prism.languages[language] ? Prism.languages[language] : Prism.languages.markup

  return (
    <div className="my-4">
      <pre className={preClasses}>
        {!noLabel && !dense && (
          <div className={`text-xs uppercase font-bold text-info -mt-2 text-center border-b border-info border-opacity-20 py-1 mb-2`}>
            {names[language] ? names[language] : language}
          </div>
        )}
        <code
          className={className + 'bg-accent my-2'}
          dangerouslySetInnerHTML={{
            __html: Prism.highlight(children, file, language),
          }}
        />
        {!noLabel && !dense && (
          <div className={`text-xs uppercase font-bold text-info text-center`}>
          </div>
        )}
      </pre>
    </div>
  )
}

export default Highlight

