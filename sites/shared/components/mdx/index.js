import Popout from '../popout.js'
import Highlight from './highlight.js'
import YouTube from './youtube.js'
import Figure from './figure.js'
import ReadMore from './read-more.js'
import { Tab, Tabs } from './tabs.js'
import Example from './example.js'
import Examples from './examples.js'

const mdxCustomComponents = (app = false) => ({
  // Custom components
  Comment: (props) => <Popout {...props} comment />,
  Fixme: (props) => <Popout {...props} fixme />,
  Link: (props) => <Popout {...props} link />,
  Note: (props) => <Popout {...props} note />,
  ReadMore: (props) => <ReadMore {...props} app={app} slug={app.slug} />,
  Related: (props) => <Popout {...props} related />,
  Tip: (props) => <Popout {...props} tip />,
  Warning: (props) => <Popout {...props} warning />,
  YouTube,
  pre: (props) => <Highlight {...props} />,
  img: Figure,
  table: (props) => (
    <table {...props} className="mdx-table table-auto w-full">
      {props.children}
    </table>
  ),
  Tab,
  Tabs,
  Example: (props) => <Example {...props} app={app} />,
  Examples: (props) => <Examples {...props} app={app} />,
})

export default mdxCustomComponents
