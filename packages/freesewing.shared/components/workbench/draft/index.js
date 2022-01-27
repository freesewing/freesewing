import React, { useState } from 'react'
import Svg from './svg'
import Defs from './defs'
import Part from './part'

const LabDraft = ({ app, pattern, gist, updateGist }) => {

  const patternInstance = new pattern(gist).draft()
  const patternProps = patternInstance.getRenderProps()

  return (
    <Svg {...patternProps}>
      <Defs {...patternProps} />
      <style>{`:root { --pattern-scale: ${gist.scale || 1}}`}</style>
      <g>
        {Object.keys(patternProps.parts).map((name) => (
          <Part
            key={name}
            part={patternProps.parts[name]}
            locale={gist.locale}
            paperless={gist.paperless}
            units={gist.units}
            name={name}
            app={app}
          />
        ))}
      </g>
    </Svg>
  )
}

export default LabDraft
