import { siteConfig } from 'site/site.config.mjs'
import { useContext } from 'react'
import { NavigationContext } from 'shared/context/navigation-context.mjs'
import Link from 'next/link'
import { pageHasChildren, isSlugPart } from 'shared/utils.mjs'
import get from 'lodash.get'
import { HomeIcon, RightIcon, BulletIcon } from 'shared/components/icons.mjs'
import { PageLink } from 'shared/components/page-link.mjs'
import orderBy from 'lodash.orderby'
import { icons } from 'shared/components/navigation/primary.mjs'
import { useTranslation } from 'next-i18next'

export const ns = ['sections']
/*
 * This returns only those children that are expected to show up
 * in the side navigation. Specifically:
 *  - Key length needs to be longer than 1
 *  - Child pages cannot have m or h set (main section or hidden)
 *  - Title may not be 'spacer' (header spacer)
 *
 *  It also takes care of ordering them, and returns an array
 *
 * @params tree {object} - A navigation object as returned by useNavigation => siteNav
 */
const onlyValidChildren = (tree) =>
  orderBy(tree, ['o', 't'], ['asc', 'asc']).filter(
    (entry) => typeof entry === 'object' && entry.t !== 'spacer' && !entry.m && !entry._ && !entry.h
  )

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

const SectionLink = ({ skey, tree, slug }) =>
  tree[skey]._ ? null : tree[skey].s === slug ? ( // Underscore means always hide
    <>
      <span className="pl-2 border-l-2 py-2 block w-full border-secondary bg-opacity-10">
        {tree[skey].t}
      </span>
      {pageHasChildren(tree[skey]) && <Section tree={tree[skey]} slug={slug} />}
    </>
  ) : isSlugPart(tree[skey].s, slug) ? (
    <>
      <Link
        href={`/${tree[skey].s}`}
        className="pl-2 border-l-2 py-2 block w-full hover:border-secondary hover:bg-secondary hover:bg-opacity-20"
      >
        {tree[skey].t}
      </Link>
      {pageHasChildren(tree[skey]) && <Section tree={tree[skey]} slug={slug} />}
    </>
  ) : (
    <Link
      href={`/${tree[skey].s}`}
      className="pl-2 border-l-2 py-2 block w-full hover:border-secondary hover:bg-secondary hover:bg-opacity-20"
    >
      {tree[skey].t}
    </Link>
  )

/*
 * A React component to render a section of the navigation
 *
 * @param t {string}    - The section title
 * @param s {string}    - The section slug
 * @param tree {object} - The object describing any futher child pages
 * @param slug {string} - The slug of the currently active/viewed page
 */
const Section = ({
  tree, // Object with the navigation
  slug, // Slug of the current page (used to make links active)
}) => (
  <ul className="ml-4">
    {onlyValidChildren(tree).map((page, i) => (
      <li key={i}>
        {slug === page.s ? (
          <>
            <span
              className={
                'pl-2 font-medium border-l-2 py-2 block w-full border-secondary ' +
                'bg-secondary bg-opacity-30'
              }
            >
              {page.t}
            </span>
            {pageHasChildren(page) && <Section tree={page} slug={slug} />}
          </>
        ) : (
          <SectionLink {...{ skey: page.s.split('/').pop(), tree, slug }} />
        )}
      </li>
    ))}
  </ul>
)

/*
 * A React component to render a main link navigation
 *
 * @param t {string}    - The section title
 * @param s {string}    - The section slug
 */
const MainLink = ({
  t, // The link title/text
  s, // The link slug
  slug, // The current page slug
}) => {
  const classes =
    '' +
    'break-normal py-2 px-2 block w-full font-bold text-lg ' +
    'flex flex-row items-start gap-0.5 lg:gap-1 border-l-2'

  return s === slug ? (
    <span className={`${classes} border-secondary bg-secondary bg-opacity-30`}>{t}</span>
  ) : (
    <Link
      href={`/${s}`}
      className={`${classes} border-transparent hover:border-secondary hover:bg-secondary hover:bg-opacity-30`}
    >
      {t}
    </Link>
  )
}

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
 *
 * The main sections are determined in the navigation prebuild code.
 * We always display the navigation as:
 *   - Always show all top-level entries
 *   - Always show all direct children of all top-level entries (this allows for better discoverability)
 *   - If we're deeper down, only expand the active page
 */
export const NavLinks = () => {
  // Grab siteNav and slug from the navigation context
  const { siteNav, slug } = useContext(NavigationContext)

  let subtree = siteNav
  /*
   * FreeSewing.org has a lot of content, especially the design docs get nested rather deep
   * So we trim the navigation tree so that the designs content is not overwhelming
   */
  if (siteConfig.tld === 'org') {
    const chunks = slug.split('/')
    if (chunks[0] === 'docs') {
      if (chunks.length > 3) {
        if (chunks[1] === 'designs') subtree = siteNav.docs.designs[chunks[2]]
      }
      // If nothing matched, restrict it to the docs root
      if (subtree.blog) subtree = siteNav.docs
    }
  }

  return (
    <ul className="w-full list mb-8 mt-3">
      {onlyValidChildren(subtree).map((page, i) => (
        <li key={i} className="w-full">
          <MainLink s={page.s} t={page.t} slug={slug} />
          {pageHasChildren(page) && !page.n && <Section {...{ tree: page, slug }} />}
        </li>
      ))}
    </ul>
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
        {icons[page.s] ? icons[page.s](`w-6 h-6`) : <BulletIcon fill={act} className={`w-6 h-6`} />}
        <span className={`font-bold ${act ? 'text-secondary-content' : ''}`}>{page.t}</span>
      </>
    )

    const item = (
      <li key={page.s}>
        {act ? (
          <span
            title={page.t}
            className={`flex flex-row gap-4 items-center text-secondary-content bg-secondary p-2 px-4 rounded bg-base-200 rounded-none`}
          >
            {txt}
          </span>
        ) : (
          <Link
            href={`/${page.s}`}
            title={page.t}
            className={`
              flex flex-row gap-4 items-center hover:bg-secondary hover:bg-opacity-25
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
