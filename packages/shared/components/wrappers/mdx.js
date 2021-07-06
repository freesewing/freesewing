import { MDXProvider } from "@mdx-js/react";
import MDX from "@mdx-js/runtime";
import YouTube from "../mdx/youtube"
import Highlight from "../mdx/highlight"
import Popout from '../popout'

const components = {
  Fixme: props => <Popout {...props} fixme />,
  Note: props => <Popout {...props} note />,
  Tip: props => <Popout {...props} tip />,
  Warning: props => <Popout {...props} warning />,
  h5: props => <h5 className="font-bold my-2">{props.children}</h5>,
  h6: props => <h6 className="font-bold my-2 text-sm">{props.children}</h6>,
  YouTube,
  Hashtag: props => <span className="font-bold bg-neutral px-4 py-1 rounded-full text-accent animate-pulse">#{props.tag}</span>,
  pre: props => <Highlight {...props} tag='pre'/>,
  code: props => <Highlight {...props} tag='code'/>,
}

const MdxWrapper = props => {
  return (
    <MDXProvider components={components} >
      <MDX>{props.children}</MDX>
    </MDXProvider>
  )
}

export default MdxWrapper

