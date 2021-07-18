import React from 'react'
import Link from 'next/link'
import Icon from '@/shared/components/icon'
import useNavigation from '@/shared/hooks/useNavigation'

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

const Breadcrumbs = ({crumbs=false, path='/', lang='en', home=defaultHome, title=false}) => {
  return null
  const nav = useNavigation(lang, path)
  if (!crumbs) crumbs = getCrumbs(pages, href)

  if (crumbs && crumbs[0] && crumbs[0].href !== '/') crumbs.unshift({ title: home, href: '/' })

  return (
    <ul>
      {crumbs.map(crumb => (
        <React.Fragment key={crumb.href}>
          <li key={`${crumb.href}-link`} className="inline">
            <Link href={crumb.href}>
              <a className="font-semibold text-secondary hover:text-secondary-focus">
                {crumb.title}
              </a>
            </Link>
          </li>
          <li key={`${crumb.href}-spacer`} className="inline font-semibold p-3">
            &raquo;
          </li>
        </React.Fragment>
      ))}
      <li className="inline">{title || pages[href.slice(1)].frontmatter.title}</li>
    </ul>
  )
}

export default Breadcrumbs
