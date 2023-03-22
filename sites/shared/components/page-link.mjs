import Link from 'next/link'

export const PageLink = ({ href, txt, className = '' }) => (
  <Link
    href={href}
    className={`font-medium text-secondary hover:text-secondary-focus hover:underline ${className}`}
    title={txt}
  >
    {txt}
  </Link>
)
