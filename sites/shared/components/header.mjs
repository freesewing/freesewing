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
    `hover:bg-${color}-400 text-${color}-400 hover:text-neutral grow xl:grow-0 relative ${extraClasses} ${
      active ? 'font-heavy' : ''
    }`
  const span = <span className="font-medium text-md hidden md:block md:pt-1 lg:pt-0">{label}</span>

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
