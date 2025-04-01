// Dependencies
import { draft } from '../../lib/index.mjs'
// Hooks
import React from 'react'
// Components
import Markdown from 'react-markdown'
import { H1, H3 } from '@freesewing/react/components/Heading'
import { HeaderMenu } from '../HeaderMenu.mjs'
import { Tabs, Tab } from '@freesewing/react/components/Tab'

// The log levels
const levels = ['error', 'warn', 'info', 'debug']

/**
 * This is the log view, it shows the pattern logs
 *
 * @param {Object} props - All the props
 * @param {Function} props.config - The editor configuration
 * @param {Object} props.state - The editor state object
 * @param {Object} props.update - Helper object for updating the editor state
 */
export const LogView = (props) => {
  const { state, config, update } = props
  const { pattern } = draft(props.Design, state.settings)

  return (
    <>
      <HeaderMenu state={state} {...{ config, update }} />
      <div className="tw-m-auto tw-mt-8 tw-max-w-2xl tw-px-4 tw-mb-8">
        <H1>Pattern Logs</H1>
        <Tabs tabs="Set 0 Logs, Pattern Logs">
          <Tab tabId="Set 0 Logs">
            {levels.map((level) => (
              <div key={level}>
                {pattern.setStores[0].logs[level].length > 0 ? (
                  <>
                    <H3>{level}</H3>
                    {pattern.setStores[0].logs[level].map((line, i) => (
                      <Markdown key={i}>{line}</Markdown>
                    ))}
                  </>
                ) : null}
              </div>
            ))}
          </Tab>
          <Tab tabId="Pattern Logs">
            {levels.map((level) => (
              <div key={level}>
                {pattern.store.logs[level].length > 0 ? (
                  <>
                    <H3>{level}</H3>
                    {pattern.store.logs[level].map((line, i) => (
                      <Markdown key={i}>{line}</Markdown>
                    ))}
                  </>
                ) : null}
              </div>
            ))}
          </Tab>
        </Tabs>
      </div>
    </>
  )
}
