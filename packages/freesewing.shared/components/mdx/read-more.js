import get from 'lodash.get'
import orderBy from 'lodash.orderby'
import Link from 'next/link'

// Helper method to filter out the real children
const order = obj => orderBy(obj, ['__order', '__title'], ['asc', 'asc'])
const currentChildren = current => Object.values(order(current))
  .filter(entry => (typeof entry === 'object'))

const ReadMore = props => {

  const root = get(props.app.navigation, props.slug.split('/'))
  const list = []
  for (const page of currentChildren(root)) {
    list.push(<li key={page.__slug} className={props.recurse ? 'ont-bold' : ''}>
      <Link href={`/${page.__slug}`}>
        <a className={props.recurse ? 'inline-block font-bold pt-3 pb-1' : ''}>{page.__title}</a>
      </Link>
      {props.recurse && <ReadMore app={props.app} slug={page.__slug}  />}
    </li>)
  }
  return <ul>{list}</ul>
}

export default ReadMore

