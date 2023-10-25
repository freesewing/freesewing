//  __SDEFILE__ - This file is a dependency for the stand-alone environment
import { HomeIcon, RightIcon } from 'shared/components/icons.mjs'
import { Link, PageLink } from 'shared/components/link.mjs'

export const Breadcrumbs = ({ crumbs, title }) => {
  if (!crumbs) return null

  return (
    <ul className="flex flex-row flex-wrap">
      <li className="inline">
        <Link href="/" title="FreeSewing">
          <HomeIcon />
        </Link>
      </li>
      {crumbs.map((crumb, i) => (
        <li key={crumb.s} className="flex flex-row flex-wrap items-center">
          <RightIcon className="w-4 h-4 opacity-50" stroke={3} />
          {i < crumbs.length - 1 ? (
            <PageLink href={`/${crumb.s}`} title={crumb.t} txt={crumb.t} />
          ) : (
            <span className="font-medium">{title || crumb.t}</span>
          )}
        </li>
      ))}
    </ul>
  )
}
