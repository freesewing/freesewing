import PageLink from './page-link.mjs'
import get from 'lodash.get'

export const DocsLink = ({ slug }) => {
  const app = useApp()
  return <PageLink href={slug} txt={get(app.navigation, [...slug.split('/'), '__title'])} />
}
