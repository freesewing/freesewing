// Components
import { Path } from '../pattern/path.mjs'
import { getProps } from '../pattern/utils.mjs'

const coords = (point) => `${point.x},${point.y}`

const Cp = ({ at }) => (
  <circle cx={at.x} cy={at.y} r={0.75} className="stroke-md opacity-50  text-warning" />
)

const Xray = ({ path }) => {
  const output = []
  let prev
  let i = 0
  for (const op of path.ops) {
    if (op.type === 'curve') {
      output.push(
        <Cp at={op.cp1} key={`${i}-cp1`} />,
        <Cp at={op.cp2} key={`${i}-cp2`} />,
        <path
          key={i}
          d={`M ${coords(prev.to)} L ${coords(op.cp1)} M ${coords(op.to)} L ${coords(op.cp2)}`}
          className={`text-warning stroke-sm dashed opacity-50`}
          markerStart="none"
          markerEnd="none"
        />
      )
    }
    prev = op
    i++
  }
  output.push(
    <path key="path" d={path.d} {...getProps(path)} markerStart="none" markerEnd="none" />
  )

  return output
}

export const PathXray = ({ stackName, pathName, part, path, settings, components, t }) => (
  <>
    <Xray path={path} />
    <Path {...{ stackName, pathName, path, part, settings, components, t }} />
  </>
)
