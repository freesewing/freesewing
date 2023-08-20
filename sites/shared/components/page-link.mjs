import Link from 'next/link'

export const PageLink = ({ href, txt, className = '', children = null }) => (
  <Link
    href={href}
    className={`underline decoration-2 hover:decoration-4 ${className}`}
    title={txt ? txt : ''}
  >
    {children ? children : txt}
  </Link>
)
