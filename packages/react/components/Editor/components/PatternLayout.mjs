import React from 'react'
import { ZoomContextProvider } from './ZoomablePattern.mjs'
import { HeaderMenu } from './HeaderMenu.mjs'

/**
 * A layout for views that include a drafted pattern
 *
 * @param {object} config - The editor configuration
 * @param {object} settings - The pattern settings/state
 * @param {object} ui - The UI settings/state
 * @param {object} update - Object holding methods to manipulate state
 * @param {function} Design - The Design contructor
 * @param {object] pattern - The drafted pattern
 */
export const PatternLayout = (props) => {
  const { menu = null, Design, pattern, update, config } = props

  return (
    <ZoomContextProvider>
      <div className="tw-flex tw-flex-col tw-h-full">
        <HeaderMenu state={props.state} {...{ update, Design, pattern, config }} />
        <div className="tw-flex lg:tw-flex-row tw-grow lg:tw-max-h-[90vh] tw-max-h-[calc(100vh-3rem)] tw-h-full tw-py-4 lg:tw-mt-6">
          <div className="lg:tw-w-2/3 tw-flex tw-flex-col tw-h-full tw-grow px-4">
            {props.output}
          </div>
          {menu ? (
            <div
              className={`tw-hidden xl:tw-block tw-w-1/3 tw-shrink tw-grow-0 lg:tw-p-4 tw-max-w-2xl tw-h-full tw-overflow-scroll`}
            >
              {menu}
            </div>
          ) : null}
        </div>
      </div>
    </ZoomContextProvider>
  )
}
