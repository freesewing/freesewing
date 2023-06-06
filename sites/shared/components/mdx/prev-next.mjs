import get from 'lodash.get'
import orderBy from 'lodash.orderby'
import Link from 'next/link'
import { LeftIcon, RightIcon } from 'shared/components/icons.mjs'

// helper method to order nav entries
const order = (obj) => orderBy(obj, ['o', 't'], ['asc', 'asc'])

// Helper method to filter out page nodes
const nodesOnly = (current) =>
  Object.values(order(current)).filter((entry) => typeof entry === 'object')

// Helper method to get the siblings
const siblings = (app) =>
  app.state.slug ? nodesOnly(get(app.state.nav, app.state.slug.split('/').slice(1, -1))) : []

// Helper method to get the current parent
const currentParent = (app) =>
  app.state.slug ? [get(app.state.nav, app.state.slug.split('/').slice(1, -1))] : []

// Helper method to get the next parent
const nextParent = (app) => {
  if (app.state.slug)
    return app.state.slug.split('/').length < 4
      ? nodesOnly(app.state.nav)
      : nodesOnly(get(app.state.nav, app.state.slug.split('/').slice(1, -2)))

  return []
}

// Helper method to get current node
const current = (app) => (app.state.slug ? get(app.state.nav, app.state.slug.split('/')) : null)

const previous = (app) => {
  // Previous sibling (aside)
  const aside = siblings(app)
  if (aside.length > 0) {
    let next = false
    for (const node of aside.reverse()) {
      if (next) return node
      if (node?.s && node.s === app.state.slug) next = true
    }
  }

  // Previous parent (up)
  const up = currentParent(app)
  if (up.length === 1) return up.pop()

  return false
}

const next = (app) => {
  // Next child (down)
  const down = nodesOnly(current(app))
  if (down.length > 0) return down[0]

  // Next sibling (aside)
  const aside = siblings(app)
  if (aside.length > 0) {
    let next = false
    for (const node of aside) {
      if (next) return node
      if (node?.s && node.s === app.state.slug) next = true
    }
  }

  // Next parent (up)
  const up = nextParent(app)
  if (up.length > 0) {
    let next = false
    for (const node of up) {
      if (next) return node
      if (node?.s && node.s === app.state.slug.slice(0, node.s.length)) next = true
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

export const PrevNext = ({ app }) => {
  return (
    <div className="grid grid-cols-2 gap-4 border-t mt-12 py-2">
      {renderPrevious(previous(app))}
      {renderNext(next(app))}
    </div>
  )
}

//<pre>{JSON.stringify(app.state.nav, null ,2)}</pre>
//<pre>{JSON.stringify(app.state.slug, null ,2)}</pre>
