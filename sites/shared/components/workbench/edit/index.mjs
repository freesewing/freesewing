import yaml from 'js-yaml'
import { defaultGist } from 'shared/components/workbench/gist.mjs'
import { validateGist } from './gist-validator.mjs'
import { useEffect, useState, useRef } from 'react'
import { Popout } from 'shared/components/popout.mjs'
import { useTranslation } from 'next-i18next'
import { capitalize } from '@freesewing/core'

/** a view for editing the gist as yaml */
export const EditYaml = (props) => {
  let { gist, setGist, gistReady } = props

  const inputRef = useRef(null)
  // the gist parsed to yaml
  const [gistAsYaml, setGistAsYaml] = useState(null)
  // any errors as a json string
  const [error, setError] = useState(null)
  // success notifier
  const [success, setSuccess] = useState(null)

  const { t } = useTranslation(['workbench'])

  // parse the current gist to yaml. this will also run when the gist gets set by input
  useEffect(() => {
    if (gistReady) {
      // get everything but the design because it's a function and can't be serialized
      // eslint-disable-next-line no-unused-vars
      const { design, ...gistRest } = gist
      setGistAsYaml(yaml.dump(gistRest))
    }
  }, [gist, gistReady])

  // set the line numbers when the yaml changes
  useEffect(() => {
    if (gistAsYaml) {
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
      // the yaml export from org is missing some of the settings that are needed in the gist,
      // and what it does have is under 'settings',  so we merge that stuff with the existing gist view state
      // and the default settings to make sure all necessary keys are accounted for,
      // but we're not keeping stuff that was supposed to be cleared
      const gistFromDefaults = { _state: gist._state }
      for (const d in defaultGist) {
        gistFromDefaults[d] = gist[d] === undefined ? defaultGist[d] : gist[d]
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
        setError(newError)
      }

      // save regardless
      setGist(gistToCheck)
      setSuccess(true)
    } catch (e) {
      setError(e)
    }
  }

  const designName = capitalize(props.design.designConfig.data.name.replace('@freesewing/', ''))
  return (
    <div className="max-w-screen-xl m-auto h-screen form-control">
      <h2>{t('yamlEditViewTitleThing', { thing: designName })}</h2>

      {error ? (
        <Popout warning className="mb-4">
          <h3> {t('yamlEditViewError')} </h3>
          {success ? <p> {t('yamlEditViewErrorDesc')}: </p> : null}
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
      <div id="editor" className="h-3/5 my-8">
        <textarea
          className="textarea textarea-primary w-full p-4 leading-7 text-lg h-full"
          name="gistAsYaml"
          aria-label="Configuration in YAML format"
          ref={inputRef}
          defaultValue={gistAsYaml}
        />
      </div>
      <button className="btn btn-primary" onClick={onSave}>
        {' '}
        Save{' '}
      </button>
    </div>
  )
}
