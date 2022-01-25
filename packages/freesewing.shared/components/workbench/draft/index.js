import React, { useState } from 'react'
import Svg from './svg'
import Defs from './defs'
import Part from './part'

const LabDraft = ({ app, pattern, gist, updateGist }) => {

  const patternInstance = new pattern(gist)
  patternInstance.draft()
  const patternProps = patternInstance.getRenderProps()



  return (
    <Svg {...patternProps}>
      <Defs {...patternProps} />
      <style>{`:root { --pattern-scale: ${gist.settings.scale || 1}}`}</style>
      <g>
        {Object.keys(patternProps.parts).map((name) => (
          <Part
            key={name}
            part={patternProps.parts[name]}
            language={gist.settings.locale}
            paperless={gist.settings.paperless}
            units={gist.settings.units}
            name={name}
            app={app}
          />
        ))}
      </g>
    </Svg>
  )
}

export default LabDraft
