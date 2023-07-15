import Link from 'next/link'
import { useContext } from 'react'
import { NavigationContext } from 'shared/context/navigation-context.mjs'
import { pageHasChildren, oneUpSlug, maxPovDepthSlug, isSlugPart } from 'shared/utils.mjs'
import { getRoot } from 'shared/components/mdx/read-more.mjs'
import { siteConfig } from 'site/site.config.mjs'
import get from 'lodash.get'
import { HomeIcon, RightIcon, BulletIcon } from 'shared/components/icons.mjs'
import { PageLink } from 'shared/components/page-link.mjs'
import orderBy from 'lodash.orderby'
import { icons } from 'shared/components/navigation/primary.mjs'

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
const onlyValidChildren = (tree, hIsOk = false) =>
  orderBy(tree, ['o', 't'], ['asc', 'asc']).filter(
    (entry) => typeof entry === 'object' && entry.t !== 'spacer' && !entry.h && !entry.m
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
  tree[skey].s === slug ? (
    <>
      <span className="pl-2 border-l-2 py-2 block w-full border-secondary bg-opacity-10">
        {tree[skey].t} fixme-sectionlink-1
      </span>
      {pageHasChildren(tree[skey]) && <Section tree={tree[skey]} slug={slug} />}
    </>
  ) : isSlugPart(tree[skey].s, slug) ? (
    <>
      <Link
        href={`/${tree[skey].s}`}
        className="pl-2 border-l-2 py-2 block w-full hover:border-secondary hover:bg-secondary hover:bg-opacity-10"
      >
        {tree[skey].t} fixme-sectionlink-2
      </Link>
      {pageHasChildren(tree[skey]) && <Section tree={tree[skey]} slug={slug} />}
    </>
  ) : (
    <Link
      href={`/${tree[skey].s}`}
      className="pl-2 border-l-2 py-2 block w-full hover:border-secondary hover:bg-secondary hover:bg-opacity-10"
    >
      {tree[skey].t} fixme-sectionlink-3
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
                'bg-secondary bg-opacity-10'
              }
            >
              {page.t} fixme-section-1
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
    'break-all py-2 px-2 block w-full font-medium ' +
    'flex flex-row items-start gap-0.5 lg:gap-1 border-l-2'

  return s === slug ? (
    <span className={`${classes} border-secondary bg-secondary bg-opacity-10`}>
      {t} fixme-main-1
    </span>
  ) : (
    <Link
      href={`/${s}`}
      className={`${classes} border-transparent hover:border-secondary hover:bg-secondary hover:bg-opacity-10`}
    >
      {t} fixme-main-2
    </Link>
  )
}

/*
 * A React component to render breadcrumbs to the current page
 *
 * @param slug {string}       - The slug of the current page
 * @param siteNav {object}    - The site navigation object as returned by the useNavigation hook
 */
export const Breadcrumbs = ({ slug, siteNav }) => {
  // Start with the home crumb
  const crumbs = [
    <li className="inline" key={0}>
      <Link href="/" title="FreeSewing">
        <HomeIcon className="w-4 h-4" />
      </Link>
    </li>,
  ]
  // Then split the slug and add a crumb for each
  const chunks = slug.split('/')
  for (let i = 1; i <= chunks.length; i++) {
    const page = get(siteNav, chunks.slice(0, i))
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
            className="text-secondary-focus font-medium pl-1"
            txt={page.t}
          />
        </li>
      )
    )
  }

  return <ul className="flex flex-row flex-wrap items-center">{crumbs}</ul>
}

/*
 * A React component to render sidebar navigation based on the siteNav object and current slug
 *
 * @param slug          {string}    - The slug of the current page
 * @param siteNav       {object}    - The siteNav object from the useNavigation hook
 * @param ignorecontrol {boolean}   - Whether or not to ignore the control setting of the user to hide certain things
 */
export const NavLinks = ({ slug, siteNav, ignoreControl = false }) => {
  /*
   * Point of view from which we'll render the side navigation
   * We descend only to a maximum level
   */
  let tree = getRoot[siteConfig.tld](maxPovDepthSlug(slug, siteConfig.tld), siteNav)
  let hIsOk = false // hide top-level stuff
  // If we're on a main section page, just show the entire tree
  if (tree.m) {
    tree = siteNav
    hIsOk = true
  }

  /*
   * Return navigation
   */
  return (
    <ul className="w-full list mb-8 mt-3">
      {onlyValidChildren(tree, hIsOk).map((page, i) => (
        <li key={i} className="w-full">
          <MainLink s={page.s} t={page.t} slug={slug} />
          {pageHasChildren(page) && <Section {...{ tree: page, slug }} />}
        </li>
      ))}
    </ul>
  )
}

/*
 * A React component to render sidebar navigation for the main sections
 *
 * @param siteNav       {object}    - The siteNav object from the useNavigation hook
 * @param slug          {string}    - The slug of the current page
 */
export const MainSections = ({ siteNav, slug }) => {
  const output = []
  for (const page of onlyMainSections(siteNav)) {
    const act = isSlugPart(page.s, slug)
    const txt = (
      <>
        {icons[page.s] ? (
          icons[page.s](`w-6 h-6 ${act ? 'text-base-100 opacity-70' : ''}`)
        ) : (
          <BulletIcon fill={act} className={`w-6 h-6 ${act ? 'text-base-100 opacity-70' : ''}`} />
        )}
        <span className={`font-bold ${act ? 'text-secondary-content' : ''}`}>{page.t}</span>
      </>
    )

    const item =
      page.t === 'spacer' ? (
        <li key={page.s} className="opacity-10">
          <Spacer />
        </li>
      ) : (
        <li key={page.s}>
          {act ? (
            <span
              className={`
                  flex flex-row gap-4 items-center
                  text-secondary-content
                  hover:text-base-content
                  bg-secondary
                  p-2 px-4 rounded
                  bg-base-200
                  rounded-none
                `}
              title={page.t}
            >
              {txt}
            </span>
          ) : (
            <Link
              href={`/${page.s}`}
              className={`
                flex flex-row gap-4 items-center
                hover:bg-secondary hover:bg-opacity-25 hover:cursor-pointer
                p-2 px-4 rounded
                rounded-none
              `}
              title={page.t}
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
