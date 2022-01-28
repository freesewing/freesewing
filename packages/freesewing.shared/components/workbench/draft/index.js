import React, { useState } from 'react'
import Svg from './svg'
import Defs from './defs'
import Part from './part'
import theme from 'pkgs/plugin-theme/src/index.js'

const LabDraft = ({ app, pattern, gist, updateGist }) => {

  const patternInstance = new pattern(gist)
  if (gist?.renderer === 'svg') return <div
    dangerouslySetInnerHTML={{ __html: patternInstance.use(theme).draft().render()}} />

  const patternProps = patternInstance.draft().getRenderProps()
  console.log(patternProps)


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
