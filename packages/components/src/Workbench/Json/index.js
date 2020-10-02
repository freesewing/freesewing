import React from 'react'
import Prism from 'prismjs'

const PatternJson = (props) => {
  let gist = Prism.highlight(
    JSON.stringify(props.gist, null, 2),
    Prism.languages.javascript,
    'javascript'
  )

  return (
    <div style={{ padding: '1rem' }}>
      <div className="gatsby-highlight">
        <pre className="language-json" dangerouslySetInnerHTML={{ __html: gist }} />
      </div>
    </div>
  )
}

export default PatternJson
