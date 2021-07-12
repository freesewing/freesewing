import Link from 'next/link'
import sortBy from 'lodash.sortby'
import Icon from 'shared/components/icon'
import Button from 'shared/components/elements/button'
import { getSiteTree } from 'shared/components/navigation/tree'

const pageFromHref = (href, pages) => pages?.[href.slice(1)]
const hrefAsPath = href => href.slice(1).split('/').join('/subnav/').split('/').slice(0,-1)

const getBranch = (href, tree) => {
  const path = hrefAsPath(href)
  let branch = tree
  for (const fork of path) branch = branch[fork]
  branch = sortBy(branch, ['order', 'title'])

  return branch
}

const getPrevParent = (href, pages, tree) => {
  const hrefUp = '/' + href.slice(1).split('/').slice(0,-1).join('/')

  return getBranch(hrefUp, tree).pop()
}
const getNextParent = (href, pages, tree) => {
  const hrefUp = '/' + href.slice(1).split('/').slice(0,-1).join('/')
  const page = pageFromHref(hrefUp, pages)
  let next = getNextSibling(hrefUp, tree)
  if (!next) next = getNextParent(hrefUp, pages, tree)

  return next
}

const getFinalChild = (branch, pages) => {
  //while (branch.subnav && Object.keys(branch.subnav).length > 0) {
  //  branch = sortBy(branch.subnav, ['order', 'title'])[0]
  //}

  return pageFromHref(branch.href, pages)
}

const getPrevSibling = (href, pages, tree) => {
  const path = hrefAsPath(href)
  const branch = getBranch(href, tree)
  let i = 0
  let index = false
  for (const page of branch) {
    if (index === false && page.href === href) index = i
    i++
  }
  if (index > 0) return getFinalChild(branch[index- 1], pages)

  return false
}
const getNextSibling = (href, tree) => {
  const path = hrefAsPath(href)
  let branch = tree
  for (const fork of path) branch = branch[fork]
  branch = sortBy(branch, ['order', 'title'])
  let i = 0
  let index = false
  for (const page of branch) {
    if (index === false && page.href === href) index = i
    i++
  }
  if (branch.length > index) return branch[index + 1]

  return false
}

const getNextChild = (page, pages) => {
  if (page.offspring && page.offspring.length > 0) return pages[page.offspring[0]]
  return false
}

const getPrev = (href, pages, tree) => {
  const page = pageFromHref(href, pages)
  if (!page) return null

  let prev = getPrevSibling(href, pages, tree)
  if (!prev) prev = getPrevParent(href, pages, tree)

  return prev
}

const getNext = (href, pages, tree) => {
  const page = pageFromHref(href, pages)
  if (!page) return null

  let next = getNextChild(page, pages)
  if (!next) next = getNextSibling(href, tree)
  if (!next) next = getNextParent(href, pages, tree)

  return next
}

const spanClasses = "px-2 text-xl text-secondary hover:text-secondary-focus"

const Render = ({page, prev=false}) => page ? (
  <Link href={page?.href || `/${page?.path}`}>
    <a
      href={page?.href || `/${page?.path}`}
      title={page?.title || page?.frontmatter?.title}
      className={`w-1/2 ${prev ? '' : "text-right"}`}
    >
      <div className={`flex items-center flex-row justify-${prev ? 'start' : 'end'}`}>
        {prev && <Icon icon='down' className="rotate-90 inline"/>}
        <span className={spanClasses}>
          {page?.title || page?.frontmatter?.title}
        </span>
        {!prev && <Icon icon='down' className="-rotate-90 inline"/>}
      </div>
    </a>
  </Link>
) : null

const PrevNext = props => {
  const tree = getSiteTree(props.pages)
  const next = getNext(props.href, props.pages, tree)
  const prev = getPrev(props.href, props.pages, tree)

  return (
    <div className="flex flex-row justify-between my-12 border-t-2 border-base-200 pt-4">
      <Render page={prev} prev />
      <Render page={next} />
    </div>
  )
}

        //href={prev.href || `/${prev.path}`} title={prev?.frontmatter?.title || prev?.title} />}
export default PrevNext

