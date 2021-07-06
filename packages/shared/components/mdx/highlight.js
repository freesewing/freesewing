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
    <pre className={`${preClasses} static`}>
      <code
        className={className}
        dangerouslySetInnerHTML={{
          __html: Prism.highlight(children, file, language),
        }}
      />
      {!noLabel && !dense && (
        <div className={`absolute block px-4 py-0.5 pt-3 lg:pt-5 text-neutral uppercase font-bold text-base rounded-b-lg bg-warning -z-10`}>
          {language}
        </div>
      )}
    </pre>
  )
}

export default Highlight

