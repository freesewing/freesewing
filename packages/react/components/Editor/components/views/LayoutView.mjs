// Dependencies
import React from 'react'
import { defaultPrintSettings } from '../../lib/export/index.mjs'
import { tilerPlugin } from '../../lib/export/plugin-tiler.mjs'
import { get } from '@freesewing/utils'
import { draft } from '../../lib/index.mjs'
// Components
import { PatternLayout } from '../PatternLayout.mjs'
import { MovablePattern } from '../MovablePattern.mjs'

export const LayoutView = (props) => {
  const { config, state, update, Design } = props
  const { ui, settings } = state
  const defaultSettings = defaultPrintSettings(settings?.units)

  // Settings for the tiler plugin
  const pageSettings = {
    ...defaultSettings,
    ...get(state.ui, 'layout', {}),
  }

  /*
   * Now draft the pattern
   */
  const { pattern, failure, errors } = draft(Design, settings, [tilerPlugin(pageSettings)])
  if (failure) return <p>Draft failed. FIXME: Handle this gracefully.</p>

  const output = (
    <MovablePattern
      {...{
        update,
        renderProps: pattern.getRenderProps(),
        immovable: ['pages'],
        state,
      }}
    />
  )

  return <PatternLayout {...{ update, Design, output, state, pattern, config }} />
}
