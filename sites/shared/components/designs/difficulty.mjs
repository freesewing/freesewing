import { CircleIcon as Icon } from 'shared/components/icons.mjs'

export const Circle = ({ off = false, color = 'warning' }) => (
  <Icon fill={!off} className={`w-4 h-4 text-${color}`} />
)

const colors = ['violet', 'green-500', 'yellow-300', 'amber-500', 'orange-500', 'red-500']

const five = [0, 1, 2, 3, 4]

export const Difficulty = ({ score = 0 }) => (
  <div className="flex flex-row">
    {five.map((i) => (
      <Circle key={i} color={colors[score]} off={i < score ? false : true} />
    ))}
  </div>
)
