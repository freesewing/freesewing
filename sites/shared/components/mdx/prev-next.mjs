import get from 'lodash.get'
import orderBy from 'lodash.orderby'
import Link from 'next/link'
import { LeftIcon, RightIcon } from 'shared/components/icons.mjs'
import { Popout } from 'shared/components/popout.mjs'

// helper method to order nav entries
const order = (obj) => orderBy(obj, ['__order', '__title'], ['asc', 'asc'])

// Helper method to filter out the real children
const currentChildren = (current) =>
  Object.values(order(current)).filter((entry) => typeof entry === 'object')

// Helper method to get the siblings
const currentSiblings = (app) =>
  currentChildren(get(app.navigation, app.state.slug.split('/').slice(0, -1)))

// Helper method to get the parents
const currentParents = (app) =>
  currentChildren(get(app.navigation, app.state.slug.split('/').slice(0, -2)))

// Helper method to get current node
const current = (app) => get(app.navigation, app.state.slug.split('/'))

const previous = (app) => {
  // Previous sibling (aside)
  const aside = currentSiblings(app)
  if (aside.length > 0) {
    let next = false
    for (const node of aside.reverse()) {
      if (next) return node
      if (node?.__slug && node.__slug === app.state.slug) next = true
    }
  }

  // Previous parent (up)
  const up = currentParents(app)
  if (up.length > 0) {
    let next = false
    for (const node of up.reverse()) {
      if (next) return node
      if (node?.__slug && node.__slug === app.state.slug.slice(0, node.__slug.length)) next = true
    }
  }
  return false
}

const next = (app) => {
  // Next child (down)
  const down = currentChildren(current(app))
  if (down.length > 0) return down[0]

  // Next sibling (aside)
  const aside = currentSiblings(app)
  if (aside.length > 0) {
    let next = false
    for (const node of aside) {
      if (next) return node
      if (node?.__slug && node.__slug === app.state.slug) next = true
    }
  }

  // Next parent (up)
  const up = currentParents(app)
  if (up.length > 0) {
    let next = false
    for (const node of up) {
      if (next) return node
      if (node?.__slug && node.__slug === app.state.slug.slice(0, node.__slug.length)) next = true
    }
  }
  return false
}

const renderPrevious = (node) =>
  node ? (
    <div className="flex flex-row gap-2 items-center">
      <LeftIcon className="w-6 h-6 shrink-0" />
      <Link href={'/' + node.__slug} className="text-secondary break-words">
        {node.__linktitle}
      </Link>
    </div>
  ) : (
    <span></span>
  )

const renderNext = (node) =>
  node ? (
    <div className="flex flex-row gap-2 items-center justify-end">
      <Link href={'/' + node.__slug} className="text-right break-words">
        {node.__linktitle}
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
      <Popout fixme>
        <h5>Not yet implemented</h5>
        <p>
          Fix it in <code>site/shared/components/mdx/prev-next.mjs</code>
        </p>
      </Popout>
      {renderNext(next(app))}
    </div>
  )
}
