//  __SDEFILE__ - This file is a dependency for the stand-alone environment
import { useContext } from 'react'
import { NavigationContext } from 'shared/context/navigation-context.mjs'
import { isSlugPart } from 'shared/utils.mjs'
import get from 'lodash.get'
import { HomeIcon, RightIcon, BulletIcon } from 'shared/components/icons.mjs'
import { Link, PageLink } from 'shared/components/link.mjs'
import orderBy from 'lodash.orderby'
import { icons } from 'shared/components/navigation/primary.mjs'
import { useTranslation } from 'next-i18next'
import { ReadMore } from 'shared/components/mdx/read-more.mjs'

export const ns = ['sections']

/*
 * This returns only those children that are main sections. Specifically:
 *  - Key length needs to be longer than 1
 *  - Child pages cannot have m set (main section)
 *  - Title may not be 'spacer' (header spacer)
 *
 *  It also takes care of ordering them, and returns an array
 *
 * @params tree {object} - A navigation object as returned by useNavigation => siteNav
 */
const onlyMainSections = (tree) =>
  orderBy(tree, ['o', 't'], ['asc', 'asc']).filter((entry) => entry.m)

/*
 * A React component to render breadcrumbs to the current page
 *
 * @param lead {string}  - A lead to display before the cumbs (eg: You are here)
 */
export const Breadcrumbs = ({ lead = false }) => {
  // Grab siteNav and slug from the navigation context
  const { siteNav, slug } = useContext(NavigationContext)

  const { t } = useTranslation(['common'])

  if (slug === false) {
    console.log('No slug passed to Breadcrumbs')
    return null
  }
  // Start with the home crumb
  const crumbs = []
  // Do we need a lead?
  if (lead)
    crumbs.push(
      <li key="lead" className="font-medium text-sm pr-2">
        {t('youAreHere')}:
      </li>
    )
  crumbs.push(
    <li className="inline" key={0}>
      <Link href="/" title="FreeSewing">
        <HomeIcon className="w-4 h-4" stroke={2.5} />
      </Link>
    </li>
  )

  // Home page?
  if (slug === '') return <ul className="flex flex-row flex-wrap items-center">{crumbs}</ul>
  // Then split the slug and add a crumb for each
  const chunks = slug.split('/')
  for (let i = 1; i <= chunks.length; i++) {
    const page = get(siteNav, chunks.slice(0, i))
    if (page) {
      crumbs.push(
        <li className="pl-1" key={`${i}s`}>
          <RightIcon className="w-4 h-4 opacity-50" stroke={3} />
        </li>,
        i === chunks.length ? (
          <li className="pl-1" key={i}>
            <span className="font-medium">{page.t}</span>
          </li>
        ) : (
          <li key={i}>
            <PageLink
              href={`/${page.s}`}
              title={page.t}
              className="font-medium pl-1"
              txt={page.t}
            />
          </li>
        )
      )
    }
  }

  return <ul className="flex flex-row flex-wrap items-center">{crumbs}</ul>
}

/*
 * A React component to render sidebar navigation based on the siteNav object and current slug
 * It just re-uses the ReadMore component as we provide to MDX content
 */
export const NavLinks = () => {
  const { slug } = useContext(NavigationContext)
  const chunks = slug.split('/')

  return (
    <div className="mdx my-4 bg">
      <ReadMore recurse asMenu from={chunks[0]} />
    </div>
  )
}

/*
 * A React component to render sidebar navigation for the main sections
 */
export const MainSections = () => {
  // Grab siteNav and slug from the navigation context
  const { siteNav, slug } = useContext(NavigationContext)
  const output = []
  for (const page of onlyMainSections(siteNav)) {
    const act = isSlugPart(page.s, slug)
    const txt = (
      <>
        {icons[page.s] ? icons[page.s]('w-6 h-6') : <BulletIcon fill={act} className="w-6 h-6" />}
        <span className="font-bold">{page.t}</span>
      </>
    )

    const item = (
      <li key={page.s}>
        {act ? (
          <span
            title={page.t}
            className={`flex flex-row gap-4 items-center bg-opacity-20 text-base-content
              bg-secondary p-2 px-4 rounded rounded-none`}
          >
            {txt}
          </span>
        ) : (
          <Link
            href={`/${page.s}`}
            title={page.t}
            className={`
              flex flex-row gap-4 items-center hover:bg-secondary hover:bg-opacity-10
              hover:cursor-pointer p-2 px-4 rounded rounded-none`}
          >
            {txt}
          </Link>
        )}
      </li>
    )
    output.push(item)
  }

  return <ul>{output}</ul>
}
