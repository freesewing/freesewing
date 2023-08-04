import Link from 'next/link'

// can't use interpolation or these won't be compiled
const bgColors = [
  'bg-spectrum-0',
  'bg-spectrum-1',
  'bg-spectrum-2',
  'bg-spectrum-3',
  'bg-spectrum-4',
  'bg-spectrum-5',
  'bg-spectrum-6',
  'bg-spectrum-7',
  'bg-spectrum-8',
  'bg-spectrum-9',
  'bg-spectrum-10',
]
const textColors = [
  'text-spectrum-0',
  'text-spectrum-1',
  'text-spectrum-2',
  'text-spectrum-3',
  'text-spectrum-4',
  'text-spectrum-5',
  'text-spectrum-6',
  'text-spectrum-7',
  'text-spectrum-8',
  'text-spectrum-9',
  'text-spectrum-10',
]

const hoverColors = [
  'hover:bg-spectrum-0',
  'hover:bg-spectrum-1',
  'hover:bg-spectrum-2',
  'hover:bg-spectrum-3',
  'hover:bg-spectrum-4',
  'hover:bg-spectrum-5',
  'hover:bg-spectrum-6',
  'hover:bg-spectrum-7',
  'hover:bg-spectrum-8',
  'hover:bg-spectrum-9',
  'hover:bg-spectrum-10',
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
    `${hoverColors[color]} ${
      textColors[color]
    } hover:text-neutral grow xl:grow-0 relative ${extraClasses} 
    ${active ? `font-heavy ${bgColors[color]}` : ''}`
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
