import get from 'lodash.get'
import orderBy from 'lodash.orderby'
import Link from 'next/link'
import LeftIcon from 'shared/components/icons/left.js'
import RightIcon from 'shared/components/icons/right.js'

// helper method to order nav entries
const order = obj => orderBy(obj, ['__order', '__title'], ['asc', 'asc'])

// Helper method to filter out the real children
const currentChildren = current => Object.values(order(current))
  .filter(entry => (typeof entry === 'object'))

// Helper method to get the siblings
const currentSiblings = app => currentChildren(get(app.navigation, app.slug.split('/').slice(0, -1)))

// Helper method to get the parents
const currentParents = app => currentChildren(get(app.navigation, app.slug.split('/').slice(0, -2)))

// Helper method to get current node
const current = app => get(app.navigation, app.slug.split('/'))


const previous = app => {

  // Previous sibling (aside)
  const aside = currentSiblings(app)
  if (aside.length > 0) {
    let next = false
    for (const node of aside.reverse()) {
      if (next) return node
      if (node?.__slug && node.__slug === app.slug) next = true
    }
  }

  // Previous parent (up)
  const up = currentParents(app)
  if (up.length > 0) {
    let next = false
    for (const node of up.reverse()) {
      if (next) return node
      if (node?.__slug && node.__slug === app.slug.slice(0, node.__slug.length)) next = true
    }
  }
  return false
}

const next = app => {
  // Next child (down)
  const down = currentChildren(current(app))
  if (down.length > 0) return down[0]

  // Next sibling (aside)
  const aside = currentSiblings(app)
  if (aside.length > 0) {
    let next = false
    for (const node of aside) {
      if (next) return node
      if (node?.__slug && node.__slug === app.slug) next = true
    }
  }

  // Next parent (up)
  const up = currentParents(app)
  if (up.length > 0) {
    let next = false
    for (const node of up) {
      if (next) return node
      if (node?.__slug && node.__slug === app.slug.slice(0, node.__slug.length)) next = true
    }
  }
  return false
}

const renderPrevious = node => node
  ? (
    <div className="flex flex-row gap-2 items-center">
      <LeftIcon className="w-8 h-8"/>
      <Link href={'/'+node.__slug}>
        <a className="text-secondary">{node.__linktitle}</a>
      </Link>
    </div>
  ) : <span></span>

const renderNext = node => node
  ? (
    <div className="flex flex-row gap-2 items-center">
      <Link href={'/'+node.__slug}>
        <a className="text-right">{node.__linktitle}</a>
      </Link>
      <RightIcon className="w-8 h-8"/>
    </div>
  ) : <span></span>

const PrevNext = ({ app }) => {

  return (
    <div className="flex flex-row justify-between border-t mt-12 py-2 gap-8">
      {renderPrevious(previous(app))}
      {renderNext(next(app))}
    </div>
  )
}

export default PrevNext
