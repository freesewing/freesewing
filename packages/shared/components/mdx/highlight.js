import Prism from 'prismjs'

const Highlight = ({ tag='code', className='', children=null }) => {

  // Highlighted code blocks are a code tag wrapped in a pre.
  // If that's the case, just return the children for the wrapping pre tag
  if (tag === 'pre' && typeof children === 'object' && children?.props?.mdxType === 'code')
    return children

  const lang = (className === '') ? 'js' : className.split('-').pop()
  const file = Prism.languages[lang] ? Prism.languages[lang] : Prism.languages.markup

  return (
    <pre>
      <code
        className={`${className} static`}
        dangerouslySetInnerHTML={{
          __html: Prism.highlight(children, file, lang),
        }}
      />
      <div className={`absolute block px-4 py-1 mt-5 text-neutral-content uppercase font-bold text-base rounded-b-lg bg-neutral`}>
        {lang}
      </div>
    </pre>
  )
}

export default Highlight

