// Dependencies
import { linkClasses, horFlexClasses, patternUrlFromState } from '@freesewing/utils'
import { exportTypes, handleExport } from '../../lib/export/index.mjs'
// Hooks
import React, { useState } from 'react'
// Components
import { H1, H2, H3, H5 } from '@freesewing/react/components/Heading'
import { Popout } from '@freesewing/react/components/Popout'
import { HeaderMenu } from '../HeaderMenu.mjs'
import { CopyToClipboardButton } from '../CopyToClipboard.mjs'
import { Highlight } from '@freesewing/react/components/Highlight'
import { EditIcon, CodeIcon, TipIcon, PrintIcon } from '@freesewing/react/components/Icon'

/**
 * This is the export view, it allows you to export your pattern in a variety of formats
 *
 * @param {Object} props - All the props
 * @param {Function} props.config - The editor configuration
 * @param {Object} props.state - The editor state object
 * @param {Object} props.update - Helper object for updating the editor state
 */
export const ExportView = (props) => {
  const { config, state, update } = props
  const [link, setLink] = useState(false)
  const [format, setFormat] = useState(false)

  const { protocol, hostname, port } = window.location
  const site =
    (protocol === 'https:' && port === 443) || (protocol === 'http:' && port === 80)
      ? `${window.location.protocol}//${window.location.hostname}`
      : `${window.location.protocol}//${window.location.hostname}:${window.location.port}`
  const urls = {
    a: `${site}${patternUrlFromState(state, true)}`,
    b: `${site}${patternUrlFromState(state, false)}`,
  }

  const exportProps = {
    design: props.design,
    Design: props.Design,
    ui: props.state.ui,
    settings: props.state.settings,
    setLink,
    setFormat,
    startLoading: update.startLoading,
    stopLoading: update.stopLoading,
  }

  return (
    <>
      <HeaderMenu state={state} {...{ config, update }} />
      <div className="tw-m-auto tw-mt-8 tw-max-w-2xl tw-px-4 tw-mb-8">
        <H1>Export Pattern</H1>
        <H2>Share your pattern</H2>
        <p>If you merely want to share your pattern with others, you can copy these URLs:</p>
        <div className="tw-grid tw-grid-cols-1 lg:tw-grid-cols-2 tw-gap-2 tw-mt-2 ">
          <CopyToClipboardButton content={urls.a} update={update}>
            Pattern and Measurements
          </CopyToClipboardButton>
          <CopyToClipboardButton content={urls.b} update={update}>
            Pattern only
          </CopyToClipboardButton>
        </div>
        <details className="tw-pt-2">
          <summary>
            <span className={linkClasses}>Explain these buttons</span>
          </summary>
          <div className="tw-ml-4 tw-border-l-2 tw-pl-4">
            <H5>Pattern and Measurements</H5>
            <p>
              Use the <b>Pattern and Measurements</b> URL to share this pattern exactly as-is,
              including the measurements used to generate it:
            </p>
            <Highlight noCopy title="URL" language="URL">
              {urls.a}
            </Highlight>
            <div className="tw-text-sm tw--mt-3 tw-flex tw-flex-row tw-gap-2 tw-items-center tw-pl-4 tw-mb-4">
              <TipIcon className="tw-w-5 tw-h-5 tw-text-success" />
              Use this to allow others to troubleshoot your pattern.
            </div>
            <H5>Pattern only</H5>
            <p>
              Use the <b>Pattern only</b> to share this pattern as-is, but without measurements:
            </p>
            <Highlight noCopy title="URL" language="URL">
              {urls.b}
            </Highlight>
            <div className="tw-text-sm tw--mt-3 tw-flex tw-flex-row tw-gap-2 tw-items-center tw-pl-4">
              <TipIcon className="tw-w-5 tw-h-5 tw-text-success" />
              Use this to allow others to recreate this pattern for themselves.
            </div>
          </div>
        </details>
        <H2>Export for printing</H2>
        <p>You can export your pattern in a variety of page formats for printing:</p>
        <div className="tw-grid tw-grid-cols-1 lg:tw-grid-cols-2 tw-gap-2">
          <div className="tw-flex tw-flex-col tw-gap-2 tw-max-w-md">
            <H3>ISO paper sizes</H3>
            {['a4', 'a3', 'a2', 'a1', 'a0'].map((format) => (
              <button
                className={`${horFlexClasses} tw-daisy-btn tw-daisy-btn-primary tw-uppercase`}
                onClick={() => exportPattern({ ...exportProps, format })}
              >
                <PrintIcon />
                {format} PDF
              </button>
            ))}
          </div>
          <div className="tw-flex tw-flex-col tw-gap-2 tw-max-w-md">
            <H3>Other paper sizes</H3>
            {['letter', 'legal', 'tabloid'].map((format) => (
              <button
                className={`${horFlexClasses} tw-daisy-btn tw-daisy-btn-primary tw-uppercase`}
                onClick={() => exportPattern({ ...exportProps, format })}
              >
                <PrintIcon />
                {format} PDF
              </button>
            ))}
          </div>
        </div>
        <H2>Export for editing</H2>
        <p>
          We recommend SVG for editing, but we also provide a full-sized PDF if you prefer that.
        </p>
        <div className="tw-grid tw-grid-cols-1 lg:tw-grid-cols-2 tw-gap-2 tw-mt-2">
          {['svg', 'pdf'].map((format) => (
            <button
              className={`${horFlexClasses} tw-daisy-btn tw-daisy-btn-primary tw-uppercase`}
              onClick={() => exportPattern({ ...exportProps, format })}
            >
              <EditIcon />
              {format}
            </button>
          ))}
        </div>
        <H2>Export as code</H2>
        <p>This is all you need to reconstruct this pattern using FreeSewing&apos; software:</p>
        <div className="tw-grid tw-grid-cols-1 lg:tw-grid-cols-2 tw-gap-2 tw-mt-2">
          {['json', 'yaml'].map((format) => (
            <button
              className={`${horFlexClasses} tw-daisy-btn tw-daisy-btn-primary tw-uppercase`}
              onClick={() => exportPattern({ ...exportProps, format })}
            >
              <CodeIcon />
              {format}
            </button>
          ))}
        </div>
      </div>
    </>
  )
}

export function exportPattern(props) {
  if (props.setLink) props.setLink(false)
  if (props.setFormat) props.setFormat(props.format)

  handleExport({
    ...props,
    onComplete: (e) => (e.data?.link ? props.setLink(e.data.link) : null),
    onError: (e) => (e.data?.error ? props.stopLoading('export', e.data.error.message) : null),
  })
}
