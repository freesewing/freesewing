import { MDXRemote } from 'next-mdx-remote'
import { MDXProvider } from "@mdx-js/react";
import MDX from "@mdx-js/runtime";
import YouTube from "../mdx/youtube"
import Highlight from "../mdx/highlight"
import Popout from '../popout'
import Tree from '../navigation/aside'
import Example from '../core/example'
import { list as designs } from '@freesewing/pattern-info'
// Site config
import config from '@/site/freesewing.config'

const DesignIterator = props => {
  const Component = props.component
  return designs.map(design => <Component design={design} />)
}

const components = {
  Example,
  Hashtag: props => <span className="font-bold bg-neutral px-4 py-1 rounded-full text-accent animate-pulse">#{props.tag}</span>,
  Fixme: props => <Popout {...props} fixme />,
  Note: props => <Popout {...props} note />,
  Tip: props => <Popout {...props} tip />,
  Warning: props => <Popout {...props} warning />,
  YouTube,
  // Tailwind typography plugin overrides
  h5: props => <h5 className="font-bold my-2">{props.children}</h5>,
  h6: props => <h6 className="font-bold my-2 text-sm">{props.children}</h6>,
  pre: props => <Highlight {...props} tag='pre'/>,
  code: props => <Highlight {...props} tag='code'/>,
  DesignIterator,
}





const MdxWrapper = props => {
  if (props.pages) components.ReadMore = mdxProps => <Tree {...props} {...mdxProps} pages={props.pages} offspring plain />
  return (
    <MDXRemote
      components={{...components, ...props.components}}
      compiledSource={props.mdx.compiledSource}
    />
  )
}

export default MdxWrapper

