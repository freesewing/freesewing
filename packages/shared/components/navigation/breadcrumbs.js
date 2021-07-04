import Link from 'next/link'
import Icon from '../icon'

const getCrumbs = (pages, href) => {
  if (typeof pages[href.slice(1)] === 'undefined') return []

  const crumbs = []
  const steps = href.split('/')
  for (let i=2;i<steps.length;i++) {
    const href = steps.slice(0,i).join('/')
    crumbs.push({ href, title: pages[href.slice(1)].frontmatter.title})
  }

  return crumbs
}

const defaultHome = <Icon icon='freesewing' size={24} className="inline" />

const Breadcrumbs = ({crumbs=false, pages, href, home=defaultHome, title=false}) => {
  if (!crumbs) crumbs = getCrumbs(pages, href)

  crumbs.unshift({ title: home, href: '/' })

  return (
    <ul>
      {crumbs.map(crumb => (
        <>
          <li key={`${crumb.href}-link`} className="inline">
            <Link href={crumb.href}>
              <a className="font-semibold text-info">
                {crumb.title}
              </a>
            </Link>
          </li>
          <li key={`${crumb.href}-spacer`} className="inline font-semibold p-3">
            &raquo;
          </li>
        </>
      ))}
      <li className="inline">{title || pages[href.slice(1)].frontmatter.title}</li>
    </ul>
  )
}

export default Breadcrumbs
