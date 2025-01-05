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
      <div className="flex flex-col h-full">
        <HeaderMenu state={props.state} {...{ update, Design, pattern, config }} />
        <div className="flex lg:flex-row grow lg:max-h-[90vh] max-h-[calc(100vh-3rem)] h-full py-4 lg:mt-6">
          <div className="lg:w-2/3 flex flex-col h-full grow px-4">{props.output}</div>
          {menu ? (
            <div
              className={`hidden xl:block w-1/3 shrink grow-0 lg:p-4 max-w-2xl h-full overflow-scroll`}
            >
              {menu}
            </div>
          ) : null}
        </div>
      </div>
    </ZoomContextProvider>
  )
}
