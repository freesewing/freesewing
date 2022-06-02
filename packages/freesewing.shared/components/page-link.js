import Link from 'next/link'

const PageLink = ({ href, txt, className="" }) => (
  <Link href={href}>
    <a className={`font-bold text-secondary
      hover:text-secondary-focus hover:underline ${className}`}
    title={txt}>{txt}</a>
  </Link>
)

export default PageLink

