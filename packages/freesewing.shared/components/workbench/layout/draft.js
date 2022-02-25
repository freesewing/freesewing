import { useEffect, useRef, useState } from 'react'
import Svg from '../draft/svg'
import Defs from '../draft/defs'
import Path from '../draft/path'
import Point from '../draft/point'
import Snippet from '../draft/snippet'
import { getProps } from '../draft/utils'
import { drag } from 'd3-drag'
import { select } from 'd3-selection'
import { event } from 'd3-dispatch'

const Part = props => {
  if (typeof props.autoLayout?.move?.x === 'undefined') return null

  const groupRef = useRef(null)
  const [layout, setLayout] = useState({
    move: {
      x: props.autoLayout.move.x,
      y: props.autoLayout.move.y,
    },
    rotate: 0,
    flipX: false,
    flipY: false,
  })

  useEffect(() => {
    handleDrag(select(groupRef.current))
  }, [])

  let translateX = 0;
  let translateY = 0;
  const handleDrag = drag()
    .subject(function() {
      const me = select(this);
      return { x: translateX, y: translateY }
    })
    .on('drag', function(event) {
      const me = select(this);
      const transform = `translate(${event.x}, ${event.y})`;
      translateX = event.x;
      translateY = event.y;
      me.attr('transform', transform);
    });

  const { partName, part, app, gist, updateGist } = props

  const grid = gist.paperless ? (
    <rect
      x={part.topLeft.x}
      y={part.topLeft.y}
      width={part.width}
      height={part.height}
      className="grid"
      fill={'url(#grid-' + partName + ')'}
    />
  ) : null

  return (
    <g {...getProps(part)} id={`part-${partName}`} ref={groupRef}>
      {grid}
      {
        props.gist?._state?.xray?.enabled &&
        props.gist?._state?.xray?.reveal?.[partName]
        && <XrayPart {...props} />
      }
      {Object.keys(part.paths).map((pathName) => (
        <Path
          key={pathName}
          pathName={pathName}
          path={part.paths[pathName]}
          topLeft={props.part.topLeft}
          bottomRight={props.part.bottomRight}
          {...props}
        />
      ))}
      {Object.keys(props.part.points).map((pointName) => (
        <Point
          key={pointName}
          pointName={pointName}
          point={props.part.points[pointName]}
          topLeft={props.part.topLeft}
          bottomRight={props.part.bottomRight}
          {...props}
        />
      ))}
      {Object.keys(props.part.snippets).map((snippetName) => (
        <Snippet
          key={snippetName}
          snippetName={snippetName}
          snippet={props.part.snippets[snippetName]}
          {...props}
        />
      ))}
      <rect
        x={part.topLeft.x}
        y={part.topLeft.y}
        width={part.width}
        height={part.height}
        className="fill-accent"
        style={{fillOpacity: 0.1}}
      />
    </g>
  )
}


const Draft = props => {
  const { patternProps, gist, app, updateGist, unsetGist, bgProps={} } = props

  //useEffect(() => {
  //  if (!props.gist.layout) {
  //    //updateGist(['layout'], patternProps.autoLayout)
  //    console.log(patternProps.autoLayout)
  //  }
  //}, [])

  console.log(gist)
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
              autoLayout={patternProps.autoLayout[name]}
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

