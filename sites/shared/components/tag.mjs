export const Tag = ({
  className = '',
  color = 'primary',
  hoverColor = 'secondary',
  children = [],
  href = false,
  onClick = null,
}) => {
  const badge = (
    <badge
      className={`badge badge-${color} uppercase font-medium mr-1 hover:cursor-pointer hover:badge-${hoverColor} ${className}`}
      onClick={onClick}
    >
      {children}
    </badge>
  )

  return href ? <Link href={href}>{badge}</Link> : badge
}
