import Popout from '../popout.js'
import Highlight from './highlight.js'
import YouTube from './youtube.js'
import DesignIterator from './design-iterator.js'
import Figure from './figure.js'
import Example from './example.js'
import ReadMore from './read-more.js'


const mdxCustomComponents = {
  // Custom components
  DesignIterator,
  Example,
  Fixme: props => <Popout {...props} fixme />,
  Link: props => <Popout {...props} link />,
  Note: props => <Popout {...props} note />,
  ReadMore,
  Related: props => <Popout {...props} related />,
  Tip: props => <Popout {...props} tip />,
  Warning: props => <Popout {...props} warning />,
  YouTube,
  // Tailwind typography plugin overrides
  h5: props => <h5 className="font-bold my-2">{props.children}</h5>,
  h6: props => <h6 className="font-bold my-2 text-sm">{props.children}</h6>,
  pre: props => <Highlight {...props} />,
  //code: props => <Highlight {...props} tag='code'/>,
}

export default mdxCustomComponents

