import { CircleIcon as Icon } from 'shared/components/icons.mjs'

export const Circle = ({ off = false, color = 'warning' }) => (
  <Icon fill={!off} className={`w-4 h-4 text-${color}`} />
)

const five = [0, 1, 2, 3, 4]
/** force tailwind: text-rating-0 text-rating-1 text-rating-2 text-rating-3 text-rating-4 */
export const Difficulty = ({ score = 0, color = 'rating' }) => {
  const colors = five.map((i) => (color === 'rating' ? `rating-${i}` : color))

  return (
    <div className="flex flex-row">
      {five.map((i) => (
        <Circle key={i} color={colors[i]} score={score} off={i < score ? false : true} />
      ))}
    </div>
  )
}
