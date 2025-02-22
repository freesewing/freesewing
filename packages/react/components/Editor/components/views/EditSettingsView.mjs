// Dependencies
import { linkClasses, horFlexClasses, patternUrlFromState } from '@freesewing/utils'
import { exportTypes, handleExport } from '../../lib/export/index.mjs'
// Hooks
import React, { useState } from 'react'
// Components
import { H1, H2, H3, H5 } from '@freesewing/react/components/Heading'
import { Popout } from '@freesewing/react/components/Popout'
import { HeaderMenu } from '../HeaderMenu.mjs'
import { EditIcon, CodeIcon, TipIcon, PrintIcon } from '@freesewing/react/components/Icon'
import CodeMirror from '@uiw/react-codemirror'

/**
 * This is the editSettings view
 *
 * @param {Object} props - All the props
 * @param {Function} props.config - The editor configuration
 * @param {Object} props.state - The editor state object
 * @param {Object} props.update - Helper object for updating the editor state
 */
export const EditSettingsView = (props) => {
  const [settings, setSettings] = useState(props.state.settings)

  return (
    <>
      <HeaderMenu state={state} {...{ config, update }} />
      <div className="tw-m-auto tw-mt-8 tw-max-w-2xl tw-px-4 tw-mb-8">
        <H1>Documenation</H1>
        <PrimedSettingsEditor {...props} {...{ runningSettings, dconf }} />
      </div>
    </>
  )
}

/**
 * This is the React component for the settings editor itself
 */
export const PrimedSettingsEditor = (props) => {
  /*
   * Destructure props
   */
  const { runningSettings } = props

  /*
   * React state
   */
  /* eslint-disable-next-line no-unused-vars */
  const [mSettings, update, setMSettings] = useStateObject(runningSettings) // Holds the settings
  const [validationReport, setValidationReport] = useState(false) // Holds the validatino report
  const [showDelta, setShowDelta] = useState(false)
  const [deployOngoing, setDeployOngoing] = useState(false)
  const [doValidate, setDoValidate] = useState(false)
  const [kiosk, setKiosk] = useState(false)
  const [localJson, setLocalJson] = useState(JSON.stringify(runningSettings, null, 2)) // Holds the settings as JSON
  const [localYaml, setLocalYaml] = useState(yaml.stringify(runningSettings)) // Holds the settings as YAML

  /*
   * Method to revert to running settings
   */
  const revert = () => setMSettings(cloneAsPojo(runningSettings))

  /*
   * API client
   */
  const { api } = useApi()

  /*
   * Loading context
   */
  const { setLoadingStatus } = useContext(LoadingStatusContext)

  /*
   * Helper method to deploy the settings
   */
  const deploy = async () => {
    setLoadingStatus([true, 'Uploading settings'])
    setDeployOngoing(true)
    const result = await api.deploy(mSettings)
    return result[1] === 204
      ? setLoadingStatus([true, 'Settings updated', true, true])
      : setLoadingStatus([true, `Unable to deploy the settings`, true, false])
  }

  if (!mSettings.cluster) return null

  /*
   * Handle settings delta
   */
  const delta =
    diffCheck(yaml.stringify(runningSettings), yaml.stringify(mSettings)).length > 1 ? true : false

  if (deployOngoing)
    return (
      <>
        <Box color="success">
          <div className="flex flex-row items-center gap-2 text-success-content">
            <div className="w-6 h-6">
              <OkIcon className="w-6 h-6 text-success-content" stroke={4} />
            </div>
            Settings are being deployed
          </div>
        </Box>
        <p>Please wait as Morio applies the new settings.</p>
      </>
    )

  const onChangeYaml = (input) => {
    let newSettings
    try {
      newSettings = yaml.parse(input)
      if (newSettings) {
        setLocalYaml(input)
        setMSettings(newSettings)
      }
    } catch (err) {
      // This is fine
    }
  }
  const onChangeJson = (input) => {
    let newSettings
    try {
      newSettings = JSON.parse(input)
      if (newSettings) {
        setLocalJson(input)
        setMSettings(newSettings)
      }
    } catch (err) {
      console.log(err)
      // This is fine
    }
  }

  return (
    <>
      {mSettings.preseed?.base ? (
        <Popout warning>
          <h5>These settings are preseeded</h5>
          <p>
            This Morio deployment uses preseeded settings. This means the settings are loaded from a
            remote system, typically a version control system like GitLab or GitHub.
          </p>
          <p>
            While you <b>can</b> update the settings here, those settings will be lost next time
            Morio is reseeded.
            <br />
            You probably should <b>update the preseeded setting instead</b>.
          </p>
        </Popout>
      ) : null}
      {doValidate ? (
        <>
          <ShowSettingsValidation
            {...{
              api,
              deploy,
              mSettings,
              setLoadingStatus,
              setValidationReport,
              validationReport,
            }}
          />
          <p className="text-right w-full">
            <button
              className="btn btn-primary btn-outline btn-s btn-sm"
              onClick={() => setDoValidate(false)}
            >
              <NoteIcon /> Back to editor
            </button>
          </p>
        </>
      ) : (
        <div className={kiosk ? 'absolute top-12 left-0 w-screen h-screen z-50 bg-base-100' : ''}>
          <Tabs tabs="YAML, JSON">
            <Tab id="json" name="test" label="As YAML">
              <CodeMirror
                value={localYaml}
                height={kiosk ? '90vh' : '70vh'}
                onChange={onChangeYaml}
              />
            </Tab>
            <Tab id="yaml" label="As JSON">
              <CodeMirror
                value={localJson}
                height={kiosk ? '90vh' : '70vh'}
                extensions={[jsonLang()]}
                onChange={onChangeJson}
              />
            </Tab>
          </Tabs>
          <div className="my-2 w-full flex flex-row flex-wrap items-center gap-2 justify-center">
            <button
              className="btn btn-primary btn-outline flex flex-row items-center gap-2"
              onClick={() => setKiosk(!kiosk)}
            >
              <ExpandIcon /> {kiosk ? 'Collapse' : 'Expand'}
            </button>
            <button className="btn btn-primary" onClick={() => setDoValidate(true)}>
              Validate Settings
            </button>
          </div>
        </div>
      )}
      {!doValidate && delta ? (
        <Popout note>
          <h4>You have made changes that are yet to be deployed</h4>
          <p>The settings have been edited, and are now different from the deployed settings.</p>
          {showDelta ? (
            <div className="my-4 w-full overflow-scroll">
              <DiffViewer
                from={yaml.stringify(runningSettings)}
                to={yaml.stringify(mSettings)}
                fromTitle="Currently deployed settings"
                toTitle="Your edits"
              />
            </div>
          ) : null}
          <div className="flex flex-row flex-wrap gap-2 justify-end w-full">
            <button className="btn btn-warning btn-ghost" onClick={revert}>
              Revert to Running Settings
            </button>
            <button
              className="btn btn-primary btn-outline"
              onClick={() => setShowDelta(!showDelta)}
            >
              {showDelta ? 'Hide' : 'Show'} Settings Delta
            </button>
          </div>
        </Popout>
      ) : null}
    </>
  )
}
