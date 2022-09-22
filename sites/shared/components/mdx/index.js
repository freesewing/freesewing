import Popout from '../popout.js'
import Highlight from './highlight.js'
import YouTube from './youtube.js'
import Figure from './figure.js'
import ReadMore from './read-more.js'
import Example from './example/index.js'
import Dot from './dot.js'
import { Tab, Tabs } from './tabs.js'
import TabbedExample from './example/tabbed.js'

const mdxCustomComponents = (app=false) => ({
  // Custom components
  Example: props => <Example {...props}>{props.children}</Example>,
  Comment: props => <Popout {...props} comment />,
  Fixme: props => <Popout {...props} fixme />,
  Link: props => <Popout {...props} link />,
  Note: props => <Popout {...props} note />,
  ReadMore: props => <ReadMore {...props} app={app} slug={app.slug} />,
  Related: props => <Popout {...props} related />,
  Tip: props => <Popout {...props} tip />,
  Warning: props => <Popout {...props} warning />,
  YouTube,
  pre: props => <Highlight {...props} />,
  img: Figure,
  Dot,
  table: props => <table {...props} className="mdx-table table-auto w-full">{props.children}</table>,
  Tab,
  Tabs,
  TabbedExample: (props) => <TabbedExample {...props} app={app} />,
})

export default mdxCustomComponents

