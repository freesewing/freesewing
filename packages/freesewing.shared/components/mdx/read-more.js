import get from 'lodash.get'
import orderBy from 'lodash.orderby'
import Link from 'next/link'

// Helper method to filter out the real children
const currentChildren = current => Object.values(current)
  .filter(entry => (typeof entry === 'object'))

const ReadMore = props => {

  const root = get(props.app.navigation, props.app.slug.split('/'))
  const list = []
  for (const page of currentChildren(root)) {
    list.push(<li key={page.__slug}>
      <Link href={`/${page.__slug}`}>
        <a>{page.__title}</a>
      </Link>
    </li>)
  }
  return <ul>{list}</ul>
}

export default ReadMore

