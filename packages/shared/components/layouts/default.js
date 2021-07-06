//import BreadCrumbs from '../breadcrumbs'
//import PrevNext from '../prev-next'
//import EditIcon from '@material-ui/icons/Edit'
//import IconButton from '@material-ui/core/IconButton'
//import './default.scss'
import Navigation from '../navigation/tree'
import Breadcrumbs from '../navigation/breadcrumbs'
import H1 from '../elements/h1'

const DefaultLayout = props => (
  <div className="flex flex-row lg:max-w-screen-xl w-full mx-auto gap-12 lg:flex-nowrap sm:flex-wrap">
    <main className="w-2/3 px-8 md:px-4 sm:px-4">
      {!props.noCrumbs && <Breadcrumbs pages={props.pages} href={props.href}/>}
      <H1>{props.title || props.pages[props.href.slice(1)].frontmatter.title}</H1>
      {props.children}
    </main>
    <aside className="w-1/3 relative">
      <div className="sticky top-24">
        <Navigation pages={props.pages} href={props.href}/>
      </div>
    </aside>
  </div>
)

export default DefaultLayout
