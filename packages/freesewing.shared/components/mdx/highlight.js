const names = {
  js: 'javascript'
}

const Highlight = ({
  children=[],
  className='language-js',
  lang='js'
}) => {

  const language = lang
    ? lang
    : (className === '') ? 'js' : className.split('-').pop()

  return (
    <div className="hljs my-4 not-prose">
      <div className={`text-xs uppercase font-bold text-info mt-1 text-center border-b border-info border-opacity-20 py-1 mb-2 lg:text-sm`}>
        {names[language] ? names[language] : language}
      </div>
      <pre className="language-js hljs text-base lg:text-lg">{children}</pre>
    </div>
  )
}

export default Highlight

