import Link from 'next/link'
import { useTheme } from 'shared/hooks/use-theme.mjs'

export const colors = [
  'red',
  'orange',
  'yellow',
  'lime',
  'green',
  'cyan',
  'blue',
  'indigo',
  'violet',
  'purple',
]

export const InnerWordMark = () => {
  const { spectrum } = useTheme()

  return (
    <span style={{ letterSpacing: '-0.1rem' }}>
      <span className={`text-${spectrum[0]} hover:text-${spectrum[9]}`}>F</span>
      <span className={`text-${spectrum[1]} hover:text-${spectrum[8]}`}>r</span>
      <span className={`text-${spectrum[2]} hover:text-${spectrum[7]}`}>e</span>
      <span className={`text-${spectrum[3]} hover:text-${spectrum[6]}`}>e</span>
      <span className={`text-${spectrum[4]} hover:text-${spectrum[5]}`}>S</span>
      <span className={`text-${spectrum[5]} hover:text-${spectrum[4]}`}>e</span>
      <span className={`text-${spectrum[6]} hover:text-${spectrum[3]}`}>w</span>
      <span className={`text-${spectrum[7]} hover:text-${spectrum[2]}`}>i</span>
      <span className={`text-${spectrum[8]} hover:text-${spectrum[1]}`}>n</span>
      <span className={`text-${spectrum[9]} hover:text-${spectrum[0]}`}>g</span>
    </span>
  )
}

export const WordMark = () => (
  <Link
    href="/"
    role="button"
    className="btn btn-ghost btn-sm normal-case text-2xl hover:bg-transparent font-bold px-0 -mt-1"
  >
    <InnerWordMark />
  </Link>
)
