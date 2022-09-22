import React, { useState } from 'react'
import { Examples } from '@freesewing/examples'
import { Rendertest } from '@freesewing/rendertest'
import { Tutorial } from '@freesewing/tutorial'
import Svg from '../../workbench/draft/svg'
import Defs from '../../workbench/draft/defs'
import Stack from '../../workbench/draft/stack'

export const examplePatterns = {
  examples: Examples,
  //rendertest: Rendertest,
  //tutorial: Tutorial,
}

const Example = ({
  app,
  pattern='examples',
  part,
  gist={
    settings: {
      options: {},
      measurements: { head: 390 },
    },
    _state: { xray: { enabled: false } }
  },
  updateGist,
  unsetGist,
  showInfo,
  feedback,
  xray=false,
  measurements = { head: 390 },
  hasRequiredMeasurements=true,
}) => {
  const Pattern = examplePatterns[pattern]
  if (xray) {
    gist._state.xray.enabled = xray
    gist.settings.margin = 20
  }
  if (part !== '') gist.settings.only = [ "examples."+part]
  const draft = new Pattern(gist.settings)
  const patternProps = draft.draft().getRenderProps()

  return (
    <Svg {...patternProps} embed={true}>
      <Defs {...patternProps} />
      <style>{`:root { --pattern-scale: 1} ${patternProps.svg.style}`}</style>
      <g>
        {Object.keys(patternProps.stacks).map((stackName) => (
          <Stack {...{ app, gist, updateGist, unsetGist, showInfo, patternProps }}
            key={stackName}
            stackName={stackName}
            stack={patternProps.stacks[stackName]}
          />
        ))}
      </g>
    </Svg>
  )
}

export default Example
