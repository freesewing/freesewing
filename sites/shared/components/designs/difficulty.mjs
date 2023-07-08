import { CircleIcon as Icon } from 'shared/components/icons.mjs'
import { primary } from '../../themes/light'

export const Circle = ({ off = false, color = 'warning' }) => (
  <Icon fill={!off} className={`w-4 h-4 text-${color}`} />
)

//const colors = ['fuchsia-700', 'fuchsia-700', 'fuchsia-700', 'fuchsia-700', 'fuchsia-700', 'fuchsia-700']

const five = [0, 1, 2, 3, 4]

export const Difficulty = ({ score = 0, color = false }) => (
  <div className="flex flex-row">
    {five.map((i) => (
      <Circle key={i} color={'primary'} off={i < score ? false : true} />
    ))}
  </div>
)
