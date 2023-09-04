// Dependencies
import yaml from 'js-yaml'
import { validateSettings } from './settings-validator.mjs'
import { capitalize } from 'shared/utils.mjs'
// Context
import { LoadingStatusContext } from 'shared/context/loading-status-context.mjs'
// Hooks
import { useEffect, useState, useRef, useMemo, useContext } from 'react'
import { useTranslation } from 'next-i18next'
// Components
import { CloseIcon } from 'shared/components/icons.mjs'
import { V3Wip } from 'shared/components/v3-wip.mjs'

export const ns = []

/** a view for editing the gist as yaml */
export const EditView = ({ settings, setSettings, design, Design }) => {
  const inputRef = useRef(null)
  const { setLoadingStatus } = useContext(LoadingStatusContext)
  const [error, setError] = useState(false)
  const [success, setSuccess] = useState(false)
  const { t } = useTranslation(ns)
  const patternConfig = useMemo(() => new Design().getConfig(), [Design])

  // parse the settings to yaml and set them as the value on the textArea
  useEffect(() => {
    inputRef.current.value = yaml.dump(settings)
  }, [settings])

  /** user-initiated save */
  const onSave = () => {
    setError(false)
    setSuccess(false)

    try {
      setLoadingStatus([true, 'status:contactingBackend'])
      // parse back to json
      const editedAsJson = yaml.load(inputRef.current.value)

      // validate it
      const validation = validateSettings(editedAsJson, patternConfig)
      // if it's not valid, show a warning about errors
      if (!validation.valid) {
        const newError = JSON.stringify(validation.errors, null, 2)
        setError(newError)
      }

      // save regardless
      setSettings(editedAsJson)
      setSuccess(true)
      if (validation.valid) setLoadingStatus([true, 'status:settingsSaved', true, true])
    } catch (e) {
      console.log(e)
      setError(e.message)
    }
  }

  return (
    <div className="max-w-screen-xl m-auto h-screen form-control mt-4 flex flex-col">
      <h2>{t('yamlEditViewTitleThing', { thing: capitalize(design) })}</h2>
      <V3Wip />
      <div id="editor" className="h-2/3 my-2 overflow-auto flex flex-col">
        {error && (
          <div className={`w-full shadow bg-base-100 p-0 my-4`}>
            <div className={`w-full m-0 bg-error p-4 border bg-opacity-30 rounded-lg`}>
              <button
                className="float-right btn btn-circle btn-outline btn-sm"
                onClick={() => setError(false)}
              >
                <CloseIcon />
              </button>
              <h3> {t('yamlEditViewError')} </h3>
              {success && <p>{t('yamlEditViewErrorDesc')}: </p>}
              <pre
                className="language-json hljs text-base lg:text-lg whitespace-pre overflow-scroll pr-4"
                dangerouslySetInnerHTML={{ __html: error }}
              />
            </div>
          </div>
        )}
        <textarea
          className="textarea textarea-primary w-full p-4 leading-7 text-lg grow"
          name="gistAsYaml"
          aria-label="Configuration in YAML format"
          ref={inputRef}
        />
      </div>
      <button className="btn btn-primary" onClick={onSave}>
        {t('save')}
      </button>
    </div>
  )
}
