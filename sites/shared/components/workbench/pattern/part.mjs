import { forwardRef } from 'react'
import { Point } from './point.mjs'
import { Snippet } from './snippet.mjs'
import { getProps } from './utils.mjs'
import { round } from 'shared/utils.mjs'
import { Path, Tr, KeyTd, ValTd, Attributes, pointCoords } from './path.mjs'

const partInfo = (props) => (
  <div className="p-4 border bg-neutral bg-opacity-40 shadow rounded-lg">
    <h5 className="text-neutral-content text-center pb-4">Part info</h5>
    <table className="border-collapse h-fit">
      <tbody>
        <Tr>
          <KeyTd>Name</KeyTd>
          <ValTd>{props.partName}</ValTd>
        </Tr>
        <Tr>
          <KeyTd>Width</KeyTd>
          <ValTd>{round(props.part.width, 2)}mm</ValTd>
        </Tr>
        <Tr>
          <KeyTd>Height</KeyTd>
          <ValTd>{round(props.part.height, 2)}mm</ValTd>
        </Tr>
        <Tr>
          <KeyTd>Top Left</KeyTd>
          <ValTd>{pointCoords(props.part.topLeft)}</ValTd>
        </Tr>
        <Tr>
          <KeyTd>Bottom Right</KeyTd>
          <ValTd>{pointCoords(props.part.bottomRight)}</ValTd>
        </Tr>
        <Tr>
          <KeyTd>Attributes</KeyTd>
          <ValTd>
            <Attributes list={props.part.attributes.list} />
          </ValTd>
        </Tr>
      </tbody>
    </table>
    <div className="flex flex-row flex-wrap gap-2 mt-4">
      {props.gist?.only && props.gist.only.length > 0 ? (
        <button className="btn btn-primary" onClick={() => props.unsetGist(['only'])}>
          Show all parts
        </button>
      ) : (
        <button
          className="btn btn-primary"
          onClick={() => props.updateGist(['only'], [props.partName])}
        >
          Show only this part
        </button>
      )}
      <button className="btn btn-success" onClick={() => console.log(props.part)}>
        console.log(part)
      </button>
      <button className="btn btn-success" onClick={() => console.table(props.part.points)}>
        console.table(part.points)
      </button>
      <button className="btn btn-success" onClick={() => console.table(props.part.paths)}>
        console.table(part.paths)
      </button>
    </div>
  </div>
)

const XrayPart = (props) => {
  const { topLeft, bottomRight } = props.part

  return (
    <g>
      <path
        d={`
        M ${topLeft.x} ${topLeft.y}
        L ${topLeft.x} ${bottomRight.y}
        L ${bottomRight.x} ${bottomRight.y}
        L ${bottomRight.x} ${topLeft.y}
        z
        `}
        className={`peer stroke-note lashed opacity-30 hover:opacity-90 fill-fabric hover:cursor-pointer hover:stroke-mark`}
        style={{ fillOpacity: 0 }}
        onClick={(evt) => {
          evt.stopPropagation()
          props.showInfo(partInfo(props))
        }}
      />
    </g>
  )
}

export const PartInner = forwardRef((props, ref) => {
  const { partName, part, gist, skipGrid } = props

  const Grid =
    gist.paperless && !skipGrid ? (
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
    <g ref={ref}>
      {Grid}
      {gist._state?.xray?.enabled && <XrayPart {...props} />}
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
    </g>
  )
})

PartInner.displayName = 'PartInner'

export const Part = (props) => {
  const { partName, part } = props

  return (
    <g
      {...getProps(part)}
      id={`${part.context.settings.idPrefix || ''}part-${partName}`}
      className={part.context.settings.idPrefix || ''}
    >
      <PartInner {...props} />
    </g>
  )
}
