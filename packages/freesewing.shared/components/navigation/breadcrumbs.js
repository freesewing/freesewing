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

const Breadcrumbs = (props) => {
  const {path=false, tree, t, title='FIXME: No title'} = props
  console.log(props)
  if (!path) return null
  const crumbs = []
  const steps = path.slice(1).split('/').slice(0, -1)
  let href = ''
  for (const step of steps) {
    href += '/' + step
    crumbs.push({
      href,
      title: step
    })
  }

  crumbs.unshift({ title: t('home'), href: '/' })

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
          <li key={`${crumb.href}-spacer`} className="inline font-semibold px-2">
            &raquo;
          </li>
        </React.Fragment>
      ))}
      <li className="inline">{title}</li>
    </ul>
  )
}

export default Breadcrumbs
