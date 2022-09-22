import React, { useState } from 'react'
import { Examples } from '@freesewing/examples'
import { Rendertest } from '@freesewing/rendertest'
import { Tutorial } from '@freesewing/tutorial'
import Svg from '../../workbench/draft/svg'
import Defs from '../../workbench/draft/defs'
import Stack from '../../workbench/draft/stack'
import { useGist } from 'shared/hooks/useGist'

export const examplePatterns = {
  examples: Examples,
  //rendertest: Rendertest,
  //tutorial: Tutorial,
}

const Example = ({ app, part, pattern='examples', xray=false }) => {
  const Pattern = examplePatterns[pattern]
  // State for gist
  const { gist, setGist, unsetGist, updateGist, gistReady, undoGist, resetGist } = useGist(
    'example-mdx',
    app
  )

  if (xray) {
    gist._state.xray = { enabled: true }
    gist.margin = 20
  }
  if (part !== '') gist.only = [ "examples."+part]
  const draft = new Pattern(gist)
  const patternProps = draft.draft().getRenderProps()

  return (
    <Svg {...patternProps} embed={true}>
      <Defs {...patternProps} />
      <style>{`:root { --pattern-scale: 1} ${patternProps.svg.style}`}</style>
      <g>
        {Object.keys(patternProps.stacks).map((stackName) => (
          <Stack {...{ app, gist, updateGist, unsetGist, patternProps }}
            showInfo={app.setPopup}
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
