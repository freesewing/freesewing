import Popout from '../popout.js'
import Highlight from './highlight.js'
import YouTube from './youtube.js'
import DesignIterator from './design-iterator.js'
import Figure from './figure.js'
import ReadMore from './read-more.js'
import Example from './example/index.js'
import examples from '@freesewing/examples'
import rendertest from '@freesewing/rendertest'
import tutorial from '@freesewing/tutorial'


const mdxCustomComponents = (app) => ({
  // Custom components
  DesignIterator,
  Example: props => <Example
    {...props}
    patterns={{examples, rendertest, tutorial}}
  >{props.children}</Example>,
  Fixme: props => <Popout {...props} fixme />,
  Link: props => <Popout {...props} link />,
  Note: props => <Popout {...props} note />,
  ReadMore: props => <ReadMore {...props} app={app} />,
  Related: props => <Popout {...props} related />,
  Tip: props => <Popout {...props} tip />,
  Warning: props => <Popout {...props} warning />,
  YouTube,
  pre: props => <Highlight {...props} />,
  //code: props => <Highlight {...props} tag='code'/>,
  // TODO: Handle PatternPage component
  PatternPage: props => (
    <Popout {...props} fixme>
      <p>
        The PatternPage component is not yet implemented.
        <br />
        Below are the props:
      </p>
      <pre>{JSON.stringify(props, null ,2)}</pre>
    </Popout>
  ),

})

export default mdxCustomComponents

