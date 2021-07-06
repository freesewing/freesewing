//import BreadCrumbs from '../breadcrumbs'
//import PrevNext from '../prev-next'
//import EditIcon from '@material-ui/icons/Edit'
//import IconButton from '@material-ui/core/IconButton'
//import './default.scss'
import Navigation from '../navigation/tree'
import Breadcrumbs from '../navigation/breadcrumbs'
import H1 from '../elements/h1'

const DefaultLayout = props => (
  <div className="grid grid-cols-12 max-w-screen-xl w-full mx-auto gap-24">
    <main className="col-span-8">
      {!props.noCrumbs && <Breadcrumbs pages={props.pages} href={props.href}/>}
      <H1>{props.title || props.pages[props.href.slice(1)].frontmatter.title}</H1>
      {props.children}
    </main>
    <aside className="col-span-4">
      <Navigation pages={props.pages} href={props.href}/>
    </aside>
  </div>
)

export default DefaultLayout
