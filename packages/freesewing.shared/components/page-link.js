import Link from 'next/link'

const PageLink = ({ href, txt }) => (
  <Link href={href}>
    <a className={`
      font-bold text-secondary
      hover:text-secondary-focus hover:underline`}
    title={txt}>{txt}</a>
  </Link>
)

export default PageLink

