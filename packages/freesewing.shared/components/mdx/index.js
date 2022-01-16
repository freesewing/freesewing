import Popout from '../popout.js'
import Highlight from './highlight.js'
import YouTube from './youtube.js'
import Figure from './figure.js'
import ReadMore from './read-more.js'
import Example from './example/index.js'
import examples from '@freesewing/examples'
import rendertest from '@freesewing/rendertest'
import tutorial from '@freesewing/tutorial'


const mdxCustomComponents = (app) => ({
  // Custom components
  Example: props => <Example
    {...props}
    patterns={{examples, rendertest, tutorial}}
  >{props.children}</Example>,
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
})

export default mdxCustomComponents

