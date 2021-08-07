import { MDXRemote } from 'next-mdx-remote'
import { MDXProvider } from "@mdx-js/react";
import MDX from "@mdx-js/runtime";
import YouTube from "../mdx/youtube"
import Highlight from "../mdx/highlight"
import Popout from '../popout'
import ReadMore from '../navigation/readmore'
import Example from '../core/example'
import { list as designs } from '@freesewing/pattern-info'
import { useRouter } from 'next/router'
// Site config
import config from '@/site/freesewing.config'

const DesignIterator = props => {
  const Component = props.component
  return designs.map(design => <Component design={design} />)
}

const Figure = props => (
  <figure>
    <img src={props?.src} alt={props?.alt || ''} title={props?.title || ''} className="shadow-md"/>
    <figcaption className="text-center italic">{props.title || 'FIXME: No title property set on this image'}</figcaption>
  </figure>
)

const MdxWrapper = props => {
  const { page=false, t=x=>x } = props
  const { site, lang } = props.mdx.scope
  const components = {
    Example,
    Hashtag: props => <span className="font-bold bg-neutral px-4 py-1 rounded-full text-accent animate-pulse">#{props.tag}</span>,
    Fixme: props => <Popout {...props} t={t} lang={lang} fixme />,
    Note: props => <Popout {...props} t={t} lang={lang} note />,
    Tip: props => <Popout {...props} t={t} lang={lang} tip />,
    Related: props => <Popout {...props} t={t} lang={lang} related />,
    Link: props => <Popout {...props} t={t} lang={lang} link />,
    Warning: props => <Popout {...props} t={t} lang={lang} warning />,
    YouTube,
    // Tailwind typography plugin overrides
    h5: props => <h5 className="font-bold my-2">{props.children}</h5>,
    h6: props => <h6 className="font-bold my-2 text-sm">{props.children}</h6>,
    pre: props => <Highlight {...props} tag='pre'/>,
    code: props => <Highlight {...props} tag='code'/>,
    img: props => <Figure {...props}/>,
    DesignIterator,
  }
  if (page) {
    const steps = page.split('/')
    let branch = {...props.tree}
    for (const step of steps) branch = props.tree[step]
    components.ReadMore = mdxProps => <ReadMore {...props} {...mdxProps} path={'/'+page} tree={branch}/>
  }

  return (
    <MDXRemote
      components={{...components, ...props.components}}
      compiledSource={props.mdx.compiledSource}
    />
  )
}

export default MdxWrapper

