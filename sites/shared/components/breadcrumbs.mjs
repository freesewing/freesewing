import { HomeIcon } from 'shared/components/icons.mjs'
import Link from 'next/link'

export const Breadcrumbs = ({ crumbs, title }) =>
  crumbs ? (
    <div className="text-sm breadcrumbs flex-wrap">
      <ul>
        <li>
          <Link href="/" title="FreeSewing">
            <HomeIcon />
          </Link>
        </li>
        {crumbs.map((crumb) => (
          <li key={crumb.s}>
            <Link href={`/${crumb.s}`} title={crumb.t} className="text-secondary-focus font-bold">
              {crumb.t}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  ) : null
