import { Popout } from 'shared/components/popout/index.mjs'
import { Highlight } from './highlight.mjs'
import { YouTube } from './youtube.mjs'
//import { Figure } from './figure.mjs'
import { ReadMore } from './read-more.mjs'
import { Tab, Tabs } from './tabs.mjs'
import { TabbedExample as Example } from './tabbed-example.mjs'
import { HttpMethod, HttpStatusCode } from './http.mjs'
import { ControlTip } from '../control/tip.mjs'
import { Legend } from './legend.mjs'
import { DocsTitle, DocsLink } from './docs-helpers.mjs'
import { V3Wip } from '../v3-wip.mjs'

const WipWithReadMore = (props) => (
  <>
    <V3Wip {...props} />
    <ReadMore />
  </>
)

export const components = (site = 'org') => {
  const base = {
    // Custom components
    Comment: (props) => <Popout {...props} comment />,
    Fixme: (props) => <Popout {...props} fixme />,
    Link: (props) => <Popout {...props} link />,
    Note: (props) => <Popout {...props} note />,
    ReadMore: (props) => <ReadMore {...props} site={site} />,
    Related: (props) => <Popout {...props} related />,
    Tip: (props) => <Popout {...props} tip />,
    Tldr: (props) => <Popout {...props} tldr />,
    Warning: (props) => <Popout {...props} warning />,
    YouTube,
    pre: (props) => <Highlight {...props} />,
    // This Figure component causes hydration errors
    //img: Figure,
    table: (props) => (
      <table {...props} className="mdx-table table-auto w-full">
        {props.children}
      </table>
    ),
    Tab,
    Tabs,
    ControlTip,
    Example,
    DocsTitle: (props) => <DocsTitle {...props} site={site} />,
    DocsLink: (props) => <DocsLink {...props} site={site} />,
  }

  return site === 'dev'
    ? {
        ...base,
        Method: HttpMethod,
        StatusCode: HttpStatusCode,
      }
    : {
        ...base,
        PatternDocs: WipWithReadMore,
        PatternOptions: WipWithReadMore,
        PatternMeasurements: WipWithReadMore,
        Gauge: V3Wip,
        Legend,
      }
}
