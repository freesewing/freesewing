import get from 'lodash.get'
import orderBy from 'lodash.orderby'
import Link from 'next/link'
import { LeftIcon, RightIcon } from 'shared/components/icons.mjs'
import { useContext } from 'react'
import { NavigationContext } from 'shared/context/navigation-context.mjs'

// helper method to order nav entries
const order = (obj) => orderBy(obj, ['o', 't'], ['asc', 'asc'])

// Helper method to filter out page nodes
const nodesOnly = (current) =>
  Object.values(order(current)).filter((entry) => typeof entry === 'object')

// Helper method to get the siblings
const siblings = (siteNav, slug) =>
  slug ? nodesOnly(get(siteNav, slug.split('/').slice(0, -1))) : []

// Helper method to get the current parent
const currentParent = (siteNav, slug) => (slug ? [get(siteNav, slug.split('/').slice(0, -1))] : [])

// Helper method to get the next parent
const nextParent = (siteNav, slug) => {
  if (slug)
    return slug.split('/').length < 4
      ? nodesOnly(siteNav)
      : nodesOnly(get(siteNav, slug.split('/').slice(0, -2)))

  return []
}

// Helper method to get current node
const current = (siteNav, slug) => (slug ? get(siteNav, slug.split('/')) : null)

const previous = (siteNav, slug) => {
  // Previous sibling (aside)
  const aside = siblings(siteNav, slug)
  if (aside.length > 0) {
    let next = false
    for (const node of aside.reverse()) {
      if (next) return node
      if (node?.s && node.s === slug) next = true
    }
  }

  // Previous parent (up)
  const up = currentParent(siteNav, slug)
  if (up.length === 1) return up.pop()

  return false
}

const next = (siteNav, slug) => {
  // Next child (down)
  const down = nodesOnly(current(siteNav, slug))
  if (down.length > 0) return down[0]

  // Next sibling (aside)
  const aside = siblings(siteNav, slug)
  if (aside.length > 0) {
    let next = false
    for (const node of aside) {
      if (next) return node
      if (node?.s && node.s === slug) next = true
    }
  }

  // Next parent (up)
  const up = nextParent(siteNav, slug)
  if (up.length > 0) {
    let next = false
    for (const node of up) {
      if (next) return node
      if (node?.s && node.s === slug.slice(0, node.s.length)) next = true
    }
  }
  return false
}

const renderPrevious = (node) =>
  node ? (
    <div className="flex flex-row gap-2 items-center">
      <LeftIcon className="w-6 h-6 shrink-0" />
      <Link href={'/' + node.s} className="text-secondary break-words">
        {node.t}
      </Link>
    </div>
  ) : (
    <span></span>
  )

const renderNext = (node) =>
  node ? (
    <div className="flex flex-row gap-2 items-center justify-end">
      <Link href={'/' + node.s} className="text-right break-words">
        {node.t}
      </Link>
      <RightIcon className="w-6 h-6 shrink-0" />
    </div>
  ) : (
    <span></span>
  )

export const PrevNext = () => {
  const { slug, siteNav } = useContext(NavigationContext)

  return (
    <div className="grid grid-cols-2 gap-4 border-t mt-12 py-2 mdx">
      {renderPrevious(previous(siteNav, slug))}
      {renderNext(next(siteNav, slug))}
    </div>
  )
}

//<pre>{JSON.stringify(siteNav, null ,2)}</pre>
//<pre>{JSON.stringify(slug, null ,2)}</pre>
