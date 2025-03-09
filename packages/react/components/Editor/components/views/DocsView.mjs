// Dependencies
import { linkClasses } from '@freesewing/utils'
// Hooks
import React from 'react'
// Components
import { H1, H5 } from '@freesewing/react/components/Heading'
import { Popout } from '@freesewing/react/components/Popout'
import { HeaderMenu } from '../HeaderMenu.mjs'

/**
 * This is the docs view, it just shows content
 *
 * @param {Object} props - All the props
 * @param {Function} props.config - The editor configuration
 * @param {Object} props.state - The editor state object
 * @param {Object} props.update - Helper object for updating the editor state
 */
export const DocsView = ({ state, config, update }) => {
  return (
    <>
      <HeaderMenu state={state} {...{ config, update }} />
      <div className="tw-m-auto tw-mt-8 tw-max-w-2xl tw-px-4 tw-mb-8">
        <H1>Documenation</H1>
        <Popout link>
          <H5>Understanding the FreeSewing Pattern Editor</H5>
          <p className="tw-text-lg">
            Please refer to the pattern editor documentation at:
            <br />
            <b>
              <a
                className={linkClasses}
                href="https://freesewing.org/docs/about/site/editor"
              >{`FreeSewing.org/docs/about/editor`}</a>
            </b>
          </p>
        </Popout>
        <Popout tip>
          <H5>
            Looking for info on how it <em>really</em> works?
          </H5>
          <p>
            Documentation for developers and contributors is available at{' '}
            <b>
              <a className={linkClasses} href="https://freesewing.dev/">{`FreeSewing.dev`}</a>
            </b>
          </p>
        </Popout>
      </div>
    </>
  )
}
