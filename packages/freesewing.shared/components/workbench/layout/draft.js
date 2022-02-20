import Svg from '../draft/svg'
import Defs from '../draft/defs'
import Part from '../draft/part'

const Draft = props => {
  const { patternProps, gist, app, updateGist, unsetGist, bgProps={} } = props

  return (
    <div className="my-8 w-11/12 m-auto">
      <Svg {...patternProps} embed={gist.embed}>
        <Defs {...patternProps} />
        <style>{`:root { --pattern-scale: ${gist.scale || 1}}`}</style>
        <g>
          <rect x="0" y="0" width={patternProps.width} height={patternProps.height} {...bgProps} />
          {Object.keys(patternProps.parts).map((name) => (
            <Part
              key={name}
              partName={name}
              part={patternProps.parts[name]}
              app={app}
              gist={gist}
              updateGist={updateGist}
              unsetGist={unsetGist}
            />
          ))}
        </g>
      </Svg>
    </div>
  )
}

export default Draft

