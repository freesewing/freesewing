import Link from 'next/link'
import sortBy from 'lodash.sortby'
import Tree from '../navigation/tree'

const pageFromHref = (href, pages) => pages?.[href.slice(1)]

const getOffspring = (href, pages) => {
  const page = pageFromHref(href, pages)
  if (!page || !page.offspring) return []

  return sortBy(
    page.offspring.map(href => ({...pages[href], href: `/${pages[href].path}`})),
    ['order', 'title']
  )
}

const ReadMore = props => {

  const pages = getOffspring(props.href, props.pages).map(page => (
    <li key={page.href}>
      <Link href={page.href}>
        <a href={page.href}>
          {page.frontmatter.title}
        </a>
      </Link>
    </li>
  ))

  if (props.list) return props.recurse
    ? <p>recurse</p>
    : <ul>{pages}</ul>

  else return (
    <div className="border-2 border-primary rounded-lg border-opacity-25 my-4">
      <div className="bg-primary p-4 rounded-t-lg text-xl font-bold bg-opacity-25">
        {props.title ? props.title : 'Read more'}
      </div>
      <div className="px-4">
        <ul>{pages}</ul>
      </div>
    </div>
  )

  return (
    <>
      <pre>{JSON.stringify(getOffspring(props.href, props.pages), null, 2)}</pre>
      <pre>{JSON.stringify(props.pages, null, 2)}</pre>
    </>
  )
}

export default ReadMore
