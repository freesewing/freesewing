import { Popout } from 'shared/components/popout.mjs'
import { Highlight } from './highlight.mjs'
import { YouTube } from './youtube.mjs'
import { Figure } from './figure.mjs'
import { ReadMore } from './read-more.mjs'
import { Tab, Tabs } from './tabs.mjs'
import { TabbedExample as Example } from './tabbed-example.mjs'
import { HttpMethod, HttpStatusCode } from './http.mjs'

const Fixme = () => <p>FIXME</p>

export const MdxComponents = () => ({
  // Custom components
  Method: HttpMethod,
  StatusCode: HttpStatusCode,
  Comment: (props) => <Popout {...props} comment />,
  Fixme: (props) => <Popout {...props} fixme />,
  Link: (props) => <Popout {...props} link />,
  Note: (props) => <Popout {...props} note />,
  ReadMore,
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
  Example,
  PatternDocs: Fixme,
  PatternOptions: Fixme,
})
