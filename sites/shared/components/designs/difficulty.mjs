import { CircleIcon as Icon } from 'shared/components/icons.mjs'
import { useTheme } from 'shared/hooks/use-theme.mjs'

export const Circle = ({ off = false, color = 'warning' }) => (
  <Icon fill={!off} className={`w-4 h-4 text-${color}`} />
)

const five = [0, 1, 2, 3, 4]

export const Difficulty = ({ score = 0, color = false }) => {
  const { rating } = useTheme()
  // Skip 0
  const colors = ['violet', ...rating]

  return (
    <div className="flex flex-row">
      {five.map((i) => (
        <Circle key={i} color={color ? color : colors[score]} off={i < score ? false : true} />
      ))}
    </div>
  )
}
