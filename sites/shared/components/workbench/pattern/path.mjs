// Dependencies
import { getProps } from './utils.mjs'
import { round, formatMm, getId } from 'shared/utils.mjs'
// Hooks
import { useTranslation } from 'next-i18next'
// Components
import { TextOnPath } from './text.mjs'
import { RawSpan } from 'shared/components/raw-span.mjs'

export const pointCoords = (point) =>
  point ? `[ ${round(point.x, 2)}, ${round(point.y, 2)} ]` : null

export const Tr = ({ children }) => <tr className="border border-base-300">{children}</tr>
export const KeyTd = ({ children }) => <td className="p-3 text-right">{children}:</td>
export const ValTd = ({ children }) => <td className="p-3">{children}</td>

export const TextAlongPath = ({ id, size, txt }) => (
  <text>
    <textPath xlinkHref={`#${id}`} startOffset="50%">
      <tspan
        style={{ textAnchor: 'middle', fontSize: size }}
        className="fill-neutral-content fill-opacity-50"
        dy={size * -0.4}
      >
        {txt}
      </tspan>
    </textPath>
  </text>
)
export const PointCircle = ({ point, size, className = 'stroke-neutral-content' }) => (
  <circle
    cx={point.x}
    cy={point.y}
    r={size / 50}
    className={className}
    fill="none"
    strokeWidth={size / 150}
    strokeOpacity="0.5"
  />
)

const CpCircle = ({ point, className = 'fill-lining no-stroke' }) => (
  <circle cx={point.x} cy={point.y} r={1.5} className={className} />
)

const EpCircle = ({ point, className = 'fill-note no-stroke' }) => (
  <circle cx={point.x} cy={point.y} r={1.5} className={className} />
)

const pathDimensions = (from, to, cp1 = false, cp2 = false, path = false) => {
  const topLeft = {
    x: to.x < from.x ? to.x : from.x,
    y: to.y < from.y ? to.y : from.y,
  }
  const bottomRight = {
    x: to.x > from.x ? to.x : from.x,
    y: to.y > from.y ? to.y : from.y,
  }
  let bbox = false
  // Deal with curves
  if (cp1 && cp2) {
    if (cp1.x < topLeft.x) topLeft.x = cp1.x
    if (cp2.x < topLeft.x) topLeft.x = cp2.x
    if (cp1.x > bottomRight.x) bottomRight.x = cp1.x
    if (cp2.x > bottomRight.x) bottomRight.x = cp2.x
    if (cp1.y < topLeft.y) topLeft.y = cp1.y
    if (cp2.y < topLeft.y) topLeft.y = cp2.y
    if (cp1.y > bottomRight.y) bottomRight.y = cp1.y
    if (cp2.y > bottomRight.y) bottomRight.y = cp2.y
    // This undocumented core methods returns the curve's bounding box
    bbox = path.bbox()
  }
  const w = bottomRight.x - topLeft.x
  const h = bottomRight.y - topLeft.y
  const size = w > h ? w : h

  return {
    topLeft,
    bottomRight,
    w,
    h,
    size,
    bbox,
  }
}

export const Defs = () => (
  <defs>
    <marker orient="auto" refY="0.0" refX="0.0" id="arrowTo" style={{ overflow: 'visible' }}>
      <path
        className="fill-neutral-content"
        d="M 0,0 L -12,-4 C -10,-2 -10,2  -12, 4 z"
        fillOpacity="0.5"
      ></path>
    </marker>
    <marker orient="auto" refY="0.0" refX="0.0" id="arrowFrom" style={{ overflow: 'visible' }}>
      <path
        className="fill-neutral-content"
        d="M 0,0 L 12,-4 C 10,-2 10,2  12, 4 z"
        fillOpacity="0.5"
      ></path>
    </marker>
  </defs>
)

export const svgProps = {
  xmlns: 'http://www.w3.org/2000/svg',
  xmlnsSvg: 'http://www.w3.org/2000/svg',
  xmlnsXlink: 'http://www.w3.org/1999/xlink',
  style: { maxHeight: 'inherit', strokeLinecap: 'round', strokeLinejoin: 'round' },
}

const Line = ({ path, pathName, partName, i, units }) => {
  const ops = path.ops
  const from = ops[0].to
  const to = ops[1].to
  const { topLeft, bottomRight, w, h, size } = pathDimensions(from, to)
  const id = `${partName}_${pathName}_${i}`

  const xyProps = {
    className: 'stroke-neutral-content',
    strokeOpacity: '0.5',
    fill: 'none',
    strokeWidth: size / 300,
  }

  return (
    <svg
      {...svgProps}
      viewBox={`${topLeft.x - size / 10} ${topLeft.y - size / 10} ${w + size / 5} ${h + size / 5}`}
    >
      <path
        id={`${id}_x`}
        {...xyProps}
        d={`M ${topLeft.x},${bottomRight.y} L ${bottomRight.x},${bottomRight.y}`}
      />
      <TextAlongPath
        id={`${id}_x`}
        size={size / 18}
        txt={formatMm(bottomRight.x - topLeft.x, units, 'notags')}
      />
      <path
        id={`${id}_y`}
        {...xyProps}
        d={`M ${topLeft.x},${bottomRight.y} L ${topLeft.x},${topLeft.y}`}
      />
      <TextAlongPath
        id={`${id}_y`}
        size={size / 18}
        txt={formatMm(bottomRight.y - topLeft.y, units, 'notags')}
      />
      <path
        id={id}
        d={`M ${from.x},${from.y} L ${to.x},${to.y}`}
        className="stroke-neutral-content"
        strokeLinecap="round"
        strokeWidth={size / 100}
      />
      <TextAlongPath id={id} size={size / 18} txt={formatMm(path.length(), units, 'notags')} />
      <PointCircle point={from} size={size} />
      <PointCircle point={to} size={size} />
    </svg>
  )
}

const Curve = ({ path, pathName, partName, i }) => {
  const ops = path.ops
  const from = ops[0].to
  const { to, cp1, cp2 } = ops[1]
  const { topLeft, w, h, size, bbox } = pathDimensions(from, to, cp1, cp2, path)
  const id = `${partName}_${pathName}_${i}`

  const cpProps = {
    className: 'stroke-success',
    strokeOpacity: '0.85',
    fill: 'none',
    strokeWidth: size / 300,
  }
  const xyProps = {
    ...cpProps,
    strokeOpacity: '0.5',
    className: 'stroke-neutral-content',
    markerEnd: 'url(#arrowTo)',
    markerStart: 'url(#arrowFrom)',
  }

  return (
    <svg
      {...svgProps}
      viewBox={`${topLeft.x - size / 10} ${topLeft.y - size / 10} ${w + size / 5} ${h + size / 5}`}
    >
      <Defs />
      <path
        id={`${id}_x`}
        {...xyProps}
        d={`M ${bbox.topLeft.x},${bbox.bottomRight.y} L ${bbox.bottomRight.x},${bbox.bottomRight.y}`}
      />
      <TextAlongPath
        id={`${id}_x`}
        size={size / 18}
        txt={formatMm(bbox.bottomRight.x - bbox.topLeft.x, units, 'notags')}
      />
      <path
        id={`${id}_y`}
        {...xyProps}
        d={`M ${bbox.topLeft.x},${bbox.bottomRight.y} L ${bbox.topLeft.x},${bbox.topLeft.y}`}
      />
      <TextAlongPath
        id={`${id}_y`}
        size={size / 18}
        txt={formatMm(bbox.bottomRight.y - bbox.topLeft.y, units, 'notags')}
      />
      <path id={`${id}_cp1`} {...cpProps} d={`M ${from.x},${from.y} L ${cp1.x},${cp1.y}`} />
      <PointCircle point={cp1} size={size} className="stroke-success" />
      <path id={`${id}_cp2`} {...cpProps} d={`M ${to.x},${to.y} L ${cp2.x},${cp2.y}`} />
      <PointCircle point={cp2} size={size} className="stroke-success" />
      <path
        id={id}
        d={`M ${from.x},${from.y} C ${cp1.x},${cp1.y} ${cp2.x},${cp2.y} ${to.x},${to.y}`}
        className="stroke-neutral-content"
        fill="none"
        strokeLinecap="round"
        strokeWidth={size / 100}
      />
      <TextAlongPath id={id} size={size / 18} txt={formatMm(path.length(), units, 'notags')} />
      <PointCircle point={from} size={size} />
      <PointCircle point={to} size={size} />
    </svg>
  )
}

const MiniPath = ({ path, pathName, partName, units }) => {
  const bbox = path.bbox()
  const id = `${partName}_${pathName}_mini}`
  const w = bbox.bottomRight.x - bbox.topLeft.x
  const h = bbox.bottomRight.y - bbox.topLeft.y
  const size = w > h ? w : h

  const xyProps = {
    fill: 'none',
    strokeWidth: size / 300,
    strokeOpacity: '0.5',
    className: 'stroke-neutral-content',
    markerEnd: 'url(#arrowTo)',
    markerStart: 'url(#arrowFrom)',
  }

  return (
    <svg
      {...svgProps}
      viewBox={`${bbox.topLeft.x - size / 10} ${bbox.topLeft.y - size / 10} ${w + size / 5} ${
        h + size / 5
      }`}
      className="freesewing pattern z-50"
    >
      <Defs />
      <path
        id={`${id}_x`}
        {...xyProps}
        d={`M ${bbox.topLeft.x},${bbox.bottomRight.y} L ${bbox.bottomRight.x},${bbox.bottomRight.y}`}
      />
      <TextAlongPath
        id={`${id}_x`}
        size={size / 18}
        txt={formatMm(bbox.bottomRight.x - bbox.topLeft.x, units, 'notags')}
      />
      <path
        id={`${id}_y`}
        {...xyProps}
        d={`M ${bbox.topLeft.x},${bbox.bottomRight.y} L ${bbox.topLeft.x},${bbox.topLeft.y}`}
      />
      <TextAlongPath
        id={`${id}_y`}
        size={size / 18}
        txt={formatMm(bbox.bottomRight.y - bbox.topLeft.y, units, 'notags')}
      />
      <path
        id={id}
        d={path.asPathstring()}
        className="stroke-neutral-content"
        fill="none"
        strokeLinecap="round"
        strokeWidth={size / 100}
      />
      <TextAlongPath id={id} size={size / 18} txt={formatMm(path.length(), units, 'notags')} />
      <XrayPath {...props} />)
    </svg>
  )
}

const lineInfo = ({ path, partName, units, i }) => (
  <div className="p-4 border bg-neutral bg-opacity-60 shadow rounded-lg">
    <h5 className="text-neutral-content text-center pb-4">Line info</h5>
    <div className="flex flex-row flex-wrap">
      <table className="border-collapse h-fit">
        <tbody>
          <Tr>
            <KeyTd>From</KeyTd>
            <ValTd>{pointCoords(path.ops[0].to)}</ValTd>
          </Tr>
          <Tr>
            <KeyTd>To</KeyTd>
            <ValTd>{pointCoords(path.ops[1].to)}</ValTd>
          </Tr>
          <Tr>
            <KeyTd>Length</KeyTd>
            <ValTd>{formatMm(path.length(), units, 'notags')}</ValTd>
          </Tr>
          <Tr>
            <KeyTd>Width</KeyTd>
            <ValTd>
              <RawSpan html={formatMm(Math.abs(path.ops[0].to.dx(path.ops[1].to)), units)} />
            </ValTd>
          </Tr>
          <Tr>
            <KeyTd>Height</KeyTd>
            <ValTd>
              <RawSpan html={formatMm(Math.abs(path.ops[0].to.dy(path.ops[1].to)), units)} />
            </ValTd>
          </Tr>
          <Tr>
            <KeyTd>Part</KeyTd>
            <ValTd>{partName}</ValTd>
          </Tr>
          <Tr>
            <KeyTd>Draw Op</KeyTd>
            <ValTd>
              {i}/{ops.length}
            </ValTd>
          </Tr>
        </tbody>
      </table>
      <div className="max-w-md" style={{ maxHeight: '80vh' }}>
        <Line {...props} />
      </div>
    </div>
  </div>
)

const XrayLine = ({ i, path, partName, units, showInfo }) => (
  <>
    <path
      d={path.asPathstring()}
      {...getProps(path)}
      className="opacity-0 stroke-4xl stroke-note hover:opacity-25 hover:cursor-pointer"
      onClick={(evt) => showInfo(evt, lineInfo({ path, partName, units, i }))}
    />
    <EpCircle point={path.ops[0].to} />
    <EpCircle point={path.ops[1].to} />
  </>
)

const curveInfo = ({ i, path, partName, units }) => (
  <div className="p-4 border bg-neutral bg-opacity-40 shadow rounded-lg">
    <h5 className="text-neutral-content text-center pb-4">Curve info</h5>
    <div className="flex flex-row flex-wrap">
      <table className="border-collapse h-fit">
        <tbody>
          <Tr>
            <KeyTd>From</KeyTd>
            <ValTd>{pointCoords(path.ops[0].to)}</ValTd>
          </Tr>
          <Tr>
            <KeyTd>Cp1</KeyTd>
            <ValTd>{pointCoords(path.ops[1].cp1)}</ValTd>
          </Tr>
          <Tr>
            <KeyTd>Cp2</KeyTd>
            <ValTd>{pointCoords(path.ops[1].cp2)}</ValTd>
          </Tr>
          <Tr>
            <KeyTd>To</KeyTd>
            <ValTd>{pointCoords(path.ops[1].to)}</ValTd>
          </Tr>
          <Tr>
            <KeyTd>Length</KeyTd>
            <ValTd>
              <RawSpan html={formatMm(path.length(), units)} />
            </ValTd>
          </Tr>
          <Tr>
            <KeyTd>Width</KeyTd>
            <ValTd>
              <RawSpan html={formatMm(Math.abs(path.ops[0].to.dx(path.ops[1].to)), units)} />
            </ValTd>
          </Tr>
          <Tr>
            <KeyTd>Height</KeyTd>
            <ValTd>
              <RawSpan html={formatMm(Math.abs(path.ops[0].to.dy(path.ops[1].to)), units)} />
            </ValTd>
          </Tr>
          <Tr>
            <KeyTd>Part</KeyTd>
            <ValTd>{partName}</ValTd>
          </Tr>
          <Tr>
            <KeyTd>Draw Op</KeyTd>
            <ValTd>
              {i}/{ops.length}
            </ValTd>
          </Tr>
        </tbody>
      </table>
      <div className="max-w-md" style={{ maxHeight: '80vh' }}>
        <Curve {...props} />
      </div>
    </div>
  </div>
)

export const Attributes = ({ list }) =>
  list ? (
    <ul>
      {Object.keys(list).map((key) => (
        <li key={key}>
          <strong>{key}</strong>: {list[key]}
        </li>
      ))}
    </ul>
  ) : null

export const pathInfo = ({ pathName, path, partName, units, showInfo }) => {
  const { t } = useTranslation(['workbench'])
  const bbox = path.bbox()

  return (
    <div className="p-4 border bg-neutral bg-opacity-40 shadow rounded-lg">
      <h5 className="text-neutral-content text-center pb-4">{t('pathInfo')}</h5>
      <div className="flex flex-row flex-wrap overflow-scroll" style={{ maxHeight: '80vh' }}>
        <div>
          <table className="border-collapse h-fit">
            <tbody>
              <Tr>
                <KeyTd>{t('name')}</KeyTd>
                <ValTd>{pathName}</ValTd>
              </Tr>
              <Tr>
                <KeyTd>{t('length')}</KeyTd>
                <ValTd>
                  <RawSpan html={formatMm(path.length(), units)} />
                </ValTd>
              </Tr>
              <Tr>
                <KeyTd>{t('width')}</KeyTd>
                <ValTd>
                  <RawSpan html={formatMm(Math.abs(bbox.bottomRight.x - bbox.topLeft.x), units)} />
                </ValTd>
              </Tr>
              <Tr>
                <KeyTd>{t('height')}</KeyTd>
                <ValTd>
                  <RawSpan html={formatMm(Math.abs(bbox.bottomRight.y - bbox.topLeft.y), units)} />
                </ValTd>
              </Tr>
              <Tr>
                <KeyTd>{t('topLeft')}</KeyTd>
                <ValTd>{pointCoords(bbox.topLeft)}</ValTd>
              </Tr>
              <Tr>
                <KeyTd>{t('bottomRight')}</KeyTd>
                <ValTd>{pointCoords(bbox.bottomRight)}</ValTd>
              </Tr>
              <Tr>
                <KeyTd>{t('part')}</KeyTd>
                <ValTd>{partName}</ValTd>
              </Tr>
              <Tr>
                <KeyTd>{t('attributes')}</KeyTd>
                <ValTd>
                  <Attributes list={path.attributes.list} />
                </ValTd>
              </Tr>
            </tbody>
          </table>
          <div className="flex flex-row flex-wrap gap-2 mt-4">
            <button className="btn btn-success" onClick={() => console.log(path)}>
              console.log(path)
            </button>
            <button className="btn btn-success" onClick={() => console.table(path)}>
              console.table(path)
            </button>
          </div>
        </div>
        <table className="border-collapse h-fit">
          <tbody>
            {path.ops.map((op, i) => (
              <Tr key={i}>
                <KeyTd>{i}</KeyTd>
                <ValTd>
                  <PathOp op={op} />
                </ValTd>
              </Tr>
            ))}
          </tbody>
        </table>
        <div className="max-w-md">
          <MiniPath {...{ pathName, path, partName, units, showInfo }} />
        </div>
      </div>
    </div>
  )
}

const PathOp = ({ op }) => {
  if (op.type === 'move')
    return (
      <span>
        <strong>Move</strong> to {pointCoords(op.to)}
      </span>
    )
  else if (op.type === 'line')
    return (
      <span>
        <strong>Line</strong> to {pointCoords(op.to)}
      </span>
    )
  else if (op.type === 'curve')
    return (
      <span>
        <strong>Curve</strong> to {pointCoords(op.to)}
        <br />
        Cp1: {pointCoords(op.cp1)}
        <br />
        Cp2: {pointCoords(op.cp2)}
      </span>
    )
  else if (op.type === 'noop') return <strong>NOOP</strong>
  else if (op.type === 'close') return <strong>Close</strong>
  else return <strong>FIXME: unknown path operation type: {op.type}</strong>
}

const XrayCurve = ({ i, path, ops, units, showInfo }) => {
  const from = path.ops[0].to
  const { cp1, cp2, to } = path.ops[1]

  return (
    <>
      <path
        d={path.asPathstring()}
        {...getProps(path)}
        className="opacity-0 stroke-4xl stroke-lining hover:opacity-25 hover:cursor-pointer"
        onClick={(evt) => showInfo(evt, curveInfo({ i, path, partName, units }))}
      />
      <path d={`M ${from.x},${from.y} L ${cp1.x},${cp1.y}`} className="lining dotted" />
      <path d={`M ${to.x},${to.y} L ${cp2.x},${cp2.y}`} className="lining dotted" />
      <CpCircle point={cp1} />
      <CpCircle point={cp2} />
      <EpCircle point={from} />
      <EpCircle point={to} />
    </>
  )
}

const XrayPath = ({ path, pathName, partName, units, showInfo }) => {
  const classes = path.attributes.get('class')
  if (typeof classes === 'string' && classes.includes('noxray')) return null
  const ops = path.divide()

  return (
    <g>
      <path
        d={path.asPathstring()}
        {...getProps(path)}
        className="opacity-0 stroke-7xl stroke-contrast hover:opacity-25 hover:cursor-pointer"
        onClick={(evt) => showInfo(evt, pathInfo({ pathName, path, partName, units }))}
        markerStart="none"
        markerEnd="none"
      />
      {ops.length > 0
        ? ops.map((op, i) =>
            op.ops[1].type === 'curve' ? (
              <XrayCurve path={op} ops={ops} i={i} pathName={`${pathName}_test`} key={i} />
            ) : (
              <XrayLine path={op} ops={ops} i={i} pathName={`${pathName}_test`} key={i} />
            )
          )
        : null}
    </g>
  )
}

export const Path = ({ pathName, path, partName, part, units, showInfo, ui, update }) => {
  if (path.hidden) return null
  const output = []
  const pathId = 'path-' + partName + '-' + pathName
  let d = ''
  try {
    d = path.asPathstring()
  } catch (err) {
    // Bail out
    console.log(`Failed to generate pathstring for path ${pathId} in part ${partName}`, err)
    return null
  }

  output.push(<path id={pathId} key={pathId} d={d} {...getProps(path)} />)
  if (path.attributes.get('data-text'))
    output.push(
      <TextOnPath
        key={'text-on-path-' + getId(pathId)}
        pathId={pathId}
        {...{ path, ui, showInfo }}
      />
    )
  if (ui.xray?.enabled) output.push(<XrayPath key={'xpath' + pathId} />)

  return output
}
