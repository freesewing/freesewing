import Link from 'next/link'

export const Tag = ({
  className = '',
  color = 'primary',
  hoverColor = 'secondary',
  children = [],
  href = false,
  onClick = null,
}) => {
  const badge = (
    <span
      className={`badge badge-${color} uppercase font-medium mr-1 hover:cursor-pointer hover:badge-${hoverColor} ${className}`}
      onClick={onClick}
    >
      {children}
    </span>
  )

  return href ? <Link href={href}>{badge}</Link> : badge
}
