import PageLink from './page-link'
import get from 'lodash.get'
import useApp from 'site/hooks/useApp'

const DocsLink = ({ slug }) => {
  const app = useApp()
  return <PageLink href={slug} txt={get(app.navigation, [...slug.split('/'), '__title'])} />
}

export default DocsLink


