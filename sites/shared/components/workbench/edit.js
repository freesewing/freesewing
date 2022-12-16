import yaml from 'js-yaml'
import hljs from 'highlight.js/lib/common'
import defaultSettings from './default-settings'
import validateGist from './gist-validator'
import { useEffect, useState, useRef } from 'react'
import Json from 'shared/components/json-highlight.js'
import Popout from 'shared/components/popout.js'
import { useTranslation } from 'next-i18next'
import { capitalize } from '@freesewing/core'

/** count the number of lines in some text */
const countLines = (txt) => txt.split('\n').length

/** a view for editing the gist as yaml */
const Edit = (props) => {
  let { gist, setGist, gistReady } = props

  const inputRef = useRef(null)
  // the gist parsed to yaml
  const [gistAsYaml, setGistAsYaml] = useState(null)
  // the number of lines in the yaml
  const [numLines, setNumLines] = useState(0)
  // any errors, parsed by hljs
  const [error, setError] = useState(null)
  // success notifier
  const [success, setSuccess] = useState(null)

  const { t } = useTranslation(['app'])

  // parse the current gist to yaml. this will also run when the gist gets set by input
  useEffect(() => {
    if (gistReady) {
      // get everything but the design because it's a function and can't be serialized
      const { design, ...gistRest } = gist
      setGistAsYaml(yaml.dump(gistRest))
    }
  }, [gist, gistReady])

  // set the line numbers when the yaml changes
  useEffect(() => {
    if (gistAsYaml) {
      setNumLines(countLines(gistAsYaml))
      // update the input value to reflect what's been saved
      inputRef.current.value = gistAsYaml
    }
  }, [gistAsYaml])

  /** user-initiated save */
  const onSave = () => {
    // clear the errors
    setError(null)
    try {
      // parse back to json
      const editedAsJson = yaml.load(inputRef.current.value)
      // make it backwards compatible so that people can paste in the yaml export from org
      // the yaml export from org is missing some of the settings that are needed in the gist, and what it does have is under 'settings', so we merge that stuff with the existing gist view state and the default settings to make sure all necessary keys are accounted for, but we're not keeping stuff that was supposed to be cleared
      const gistFromDefaults = { _state: gist._state }
      for (const d in defaultSettings) {
        gistFromDefaults[d] = gist[d] === undefined ? defaultSettings[d] : gist[d]
      }

      // merge it all up
      const gistToCheck = {
        ...gistFromDefaults,
        ...(editedAsJson.settings ? editedAsJson.settings : editedAsJson),
      }

      // validate it
      const validation = validateGist(gistToCheck, props.design)
      // if it's not valid, show a warning about errors
      if (!validation.valid) {
        const newError = JSON.stringify(validation.errors, null, 2)
        const newErrorHighlight = hljs.highlight(newError, { language: 'json' })
        setError(newError)
      }

      // save regardless
      setGist(gistToCheck)
      setSuccess(true)
    } catch (e) {
      setError(e)
    }
  }

  /** count lines and reset the success alert */
  const onKeyUp = (e) => {
    setNumLines(countLines(e.target.value))
    setSuccess(false)
  }

  const designName = capitalize(props.design.designConfig.data.name.replace('@freesewing/', ''))
  return (
    <div className="max-w-screen-xl m-auto h-screen form-control">
      <h2>{t('workbench:editThingTitle', { thing: designName })}</h2>

      {error ? (
        <Popout warning className="mb-4">
          <h3> {t('editError')} </h3>
          <p> {t('editErrorDesc')}: </p>
          <pre
            className="language-json hljs text-base lg:text-lg whitespace-pre overflow-scroll pr-4"
            dangerouslySetInnerHTML={{ __html: error }}
          ></pre>
        </Popout>
      ) : null}
      {success ? (
        <div className="alert alert-success my-4">
          <div>
            <span>{t('success')}</span>
          </div>
        </div>
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
            onChange={onKeyUp}
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
