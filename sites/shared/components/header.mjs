import Link from 'next/link'

export const colors = [
  'red',
  'orange',
  'yellow',
  'lime',
  'green',
  'teal',
  'cyan',
  'blue',
  'indigo',
  'violet',
  'purple',
]

const hoverColors = {
  red: 'hover:bg-rainbow-red',
  orange: 'hover:bg-rainbow-orange',
  yellow: 'hover:bg-rainbow-yellow',
  lime: 'hover:bg-rainbow-lime',
  green: 'hover:bg-rainbow-green',
  teal: 'hover:bg-rainbow-teal',
  cyan: 'hover:bg-rainbow-cyan',
  blue: 'hover:bg-rainbow-blue',
  indigo: 'hover:bg-rainbow-indigo',
  violet: 'hover:bg-rainbow-violet',
  purple: 'hover:bg-rainbow-purple',
}

const textColors = {
  red: 'text-rainbow-red',
  orange: 'text-rainbow-orange',
  yellow: 'text-rainbow-yellow',
  lime: 'text-rainbow-lime',
  green: 'text-rainbow-green',
  teal: 'text-rainbow-teal',
  cyan: 'text-rainbow-cyan',
  blue: 'text-rainbow-blue',
  indigo: 'text-rainbow-indigo',
  violet: 'text-rainbow-violet',
  purple: 'text-rainbow-purple',
}

export const iconSize = 'h-10 w-10 lg:h-12 lg:w-12'

export const NavButton = ({
  href,
  label,
  color,
  children,
  onClick = false,
  extraClasses = '',
  active = false,
}) => {
  const className =
    'border-0 px-1 lg:px-3 xl:px-4 text-base py-3 md:py-4 text-center flex flex-col items-center 2xl:w-36 ' +
    `${hoverColors[color]} ${
      textColors[color]
    } hover:text-neutral grow xl:grow-0 relative ${extraClasses} ${active ? 'font-heavy' : ''}`
  const span = <span className="font-bold text-lg hidden md:block md:pt-1 lg:pt-0">{label}</span>

  return onClick ? (
    <button {...{ onClick, className }} title={label}>
      {children}
      {span}
    </button>
  ) : (
    <Link {...{ href, className }} title={label}>
      {children}
      {span}
    </Link>
  )
}

export const NavSpacer = () => (
  <div className="hidden xl:block text-base lg:text-4xl font-thin opacity-30 px-0.5 lg:px-2">|</div>
)
