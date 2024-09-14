//  __SDEFILE__ - This file is a dependency for the stand-alone environment
import { Popout } from 'shared/components/popout/index.mjs'
import { Highlight } from './highlight.mjs'
import { YouTube } from './youtube.mjs'
//import { Figure } from './figure.mjs'
import { ReadMore } from './read-more.mjs'
import { Tab, Tabs } from '../tabs.mjs'
import { TabbedExample as Example } from './tabbed-example.mjs'
import { HttpMethod, HttpStatusCode } from './http.mjs'
import { ControlTip } from '../control/tip.mjs'
import { DocsTitle, DocsLink } from './docs-helpers.mjs'
import { Legend } from './legend.mjs'
// Extra components
import { DesignInfo } from 'shared/components/designs/info.mjs'
import { collection } from 'site/hooks/use-design.mjs'
import { DesignMeasurements } from './design-measurements.mjs'
import { DesignOptions } from './design-options.mjs'
import { MeasieImage } from 'shared/components/measurements/image.mjs'
// Dev/Org jargon
import { Term as SharedTerm, termList } from 'shared/components/jargon.mjs'
import { jargon, site } from 'site/prebuild/jargon.mjs'
// Dev web of trust
import { WebOfTrustMap, WebOfTrustTable } from '../../../dev/components/web-of-trust.mjs'
export const Term = ({ children }) => <SharedTerm {...{ jargon, children, site }} />
export const TermList = termList(jargon, site)

export const components = (site = 'org', slug = []) => {
  const base = {
    Comment: (props) => <Popout {...props} comment />,
    Fixme: (props) => <Popout {...props} fixme />,
    Link: (props) => <Popout {...props} link />,
    Note: (props) => <Popout {...props} note />,
    ReadMore: (props) => <ReadMore {...props} site={site} />,
    Related: (props) => <Popout {...props} related />,
    Tab,
    Tabs,
    Tip: (props) => <Popout {...props} tip />,
    Tldr: (props) => <Popout {...props} tldr />,
    Warning: (props) => <Popout {...props} warning />,
    em: (props) => <Term {...props} />,
  }

  const extra = {
    pre: (props) => <Highlight {...props} />,
    YouTube,
    // This Figure component causes hydration errors
    //img: Figure,
    table: (props) => (
      <table {...props} className="mdx-table table-auto w-full">
        {props.children}
      </table>
    ),
    ControlTip,
    Example,
    DocsTitle: (props) => <DocsTitle {...props} site={site} />,
    DocsLink: (props) => <DocsLink {...props} site={site} />,
  }

  if (site === 'sde') return base

  // TermList
  if (site === 'dev' && Array.isArray(slug) && slug.join('/') === 'reference/terms')
    extra.TermList = TermList
  else if (site === 'org' && Array.isArray(slug) && slug.join('/') === 'about/terms')
    extra.TermList = TermList

  if (site === 'dev')
    return {
      ...base,
      ...extra,
      Method: HttpMethod,
      StatusCode: HttpStatusCode,
      WebOfTrustTable,
      WebOfTrustMap,
    }

  const specific = {}
  if (typeof slug === 'string') slug = slug.split('/')
  if (
    site === 'org' &&
    slug &&
    slug.length > 1 &&
    slug[0] === 'designs' &&
    collection.includes(slug[1])
  ) {
    if (slug.length === 2) specific.DesignInfo = DesignInfo
    if (slug.length === 3 && slug[2] === 'measurements')
      specific.DesignMeasurements = DesignMeasurements
    if (slug.length === 3 && slug[2] === 'options') specific.DesignOptions = DesignOptions
  }

  if (site === 'org' && Array.isArray(slug)) {
    const url = slug.join('/')
    if (url.indexOf('about/notation') !== -1 || url.indexOf('sewing/on-the-fold') !== -1)
      specific.Legend = Legend
  }

  // MeasieImage
  if (site === 'org' && slug) {
    // Regular MDX - MeasieImage
    if (slug.length === 2 && slug[0] === 'measurements') {
      specific.MeasieImage = function MdxMeasieImage() {
        return <MeasieImage m={slug[1]} />
      }
    }

    // Dynamic MDX - MeasieImage
    if (slug.length === 3 && slug[0] === 'docs' && slug[1] === 'measurements') {
      specific.MeasieImage = function MdxMeasieImage() {
        return <MeasieImage m={slug[2]} />
      }
    }
  }

  return {
    ...base,
    ...extra,
    ...specific,
  }
}
