// Dependencies
import React from 'react'
import { defaultPrintSettings, handleExport } from '../../lib/export/index.mjs'
import { tilerPlugin } from '../../lib/export/plugin-tiler.mjs'
import { capitalize, get } from '@freesewing/utils'
import { draft } from '../../lib/index.mjs'
// Components
import { ZoomablePattern } from '../ZoomablePattern.mjs'
import { PatternLayout } from '../PatternLayout.mjs'
import { MovablePattern } from '../MovablePattern.mjs'
import { Accordion } from '../Accordion.mjs'
import { CompareIcon, PrintIcon } from '@freesewing/react/components/Icon'
import { MenuBoolInput, MenuMmInput, MenuListInput } from '../menus/Input.mjs'
import { MenuBoolValue, MenuMmValue, MenuListValue } from '../menus/Value.mjs'

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
