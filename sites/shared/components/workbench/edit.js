import yaml from 'js-yaml'
import hljs from 'highlight.js/lib/common'
import defaultSettings from './default-settings'
import validateGist from './gist-validator'
import { useEffect, useState, useRef } from 'react'
import Json from 'shared/components/json-highlight.js'
import Popout from 'shared/components/popout.js'

const countLines = (txt) => txt.split('\n').length
const Edit = (props) => {
  let { gist, setGist, design } = props

  const inputRef = useRef(null)
  const [gistAsYaml, setGistAsYaml] = useState(null)
  const [numLines, setNumLines] = useState(0)
  const [error, setError] = useState(null)

  useEffect(() => {
    setGistAsYaml(yaml.dump(gist))
  }, [gist])
  useEffect(() => {
    if (gistAsYaml) setNumLines(countLines(gistAsYaml))
  }, [gistAsYaml])

  const onSave = () => {
    setError(null)
    const editedAsJson = yaml.load(inputRef.current.value)
    const validation = validateGist(editedAsJson, design)
    if (validation.valid) {
      setGist({ ...defaultSettings, ...editedAsJson, design: gist.design })
    } else {
      const newError = JSON.stringify(validation.errors, null, 2)
      const newErrorHighlight = hljs.highlight(newError, { language: 'json' })
      setError(newError)
    }
  }

  const onKeyUp = (e) => {
    setNumLines(countLines(e.target.value))
  }

  return (
    <div className="max-w-screen-xl m-auto h-screen form-control">
      <h2>Edit Pattern Configuration</h2>

      {error ? (
        <Popout warning>
          <h3> Issues with input </h3>
          <p> Your input wasn't saved due to the following errors: </p>
          <pre
            className="language-json hljs text-base lg:text-lg whitespace-pre overflow-scroll pr-4"
            dangerouslySetInnerHTML={{ __html: error }}
          ></pre>
        </Popout>
      ) : null}
      <div
        id="editor"
        className="h-3/5 mb-8 overflow-auto p-1 outline-1 outline-primary outline focus-within:outline-primary-focus focus-within:outline-2 rounded"
      >
        <div className="font-mono flex gap-4 leading-7 text-lg items-stretch">
          <div id="line-numbers" className="text-right p-4 pr-0 text-primary" aria-hidden>
            {Array.from({ length: numLines }, (_, i) => (
              <span className="block" key={i}>
                {' '}
                {i + 1}{' '}
              </span>
            ))}
          </div>
          <textarea
            className="textarea focus:outline-none w-full p-4 leading-7 overflow-y-hidden resize-none text-lg"
            name="gistAsYaml"
            aria-label="Configuration in YAML format"
            ref={inputRef}
            defaultValue={gistAsYaml}
            onKeyUp={onKeyUp}
          />
        </div>
      </div>
      <button className="btn btn-primary" onClick={onSave}>
        {' '}
        Save{' '}
      </button>
    </div>
  )
}

export default Edit
