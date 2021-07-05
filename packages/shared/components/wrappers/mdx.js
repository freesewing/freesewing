import { MDXProvider } from "@mdx-js/react";
import MDX from "@mdx-js/runtime";
import Icon from "../icon"
import YouTube from "../mdx/youtube"
import Highlight from "../mdx/highlight"
//import ReadMore from './readmore'
//import YouTube from '../youtube'
//import Legend from '@freesewing/components/Legend'
//import Hashtag from '../hashtag'

const classesPerType = {
  fixme: {
    main: 'border-error border-dashed',
    label: 'bg-error border-dashed border-0 border-t-2',
  },
  note: {
    main: 'border-primary',
    label: 'bg-primary',
  },
  tip: {
    main: 'border-accent',
    label: 'bg-accent',
  },
  warning: {
    main: 'border-warning border-dashed',
    label: 'bg-warning border-dashed border-0 border-t-2',
  },
}
const Popout = (props, type) => (
  <div className={`${type} ${classesPerType[type].main} border-2 px-4 rounded-lg static my-2 mb-10`}>
    {props.children}
    <div className={`${classesPerType[type].label} absolute block px-4 py-1 text-primary-content uppercase font-bold text-base rounded-b-lg`}>
    {type === 'fixme' ? 'fixme' : <Icon icon={type} size="24" />}
    </div>
  </div>
)

const components = {
  Fixme: props => Popout(props, 'fixme'),
  Note: props => Popout(props, 'note'),
  Tip: props => Popout(props, 'tip'),
  Warning: props => Popout(props, 'warning'),
  h5: props => <h5 className="font-bold my-2">{props.children}</h5>,
  h6: props => <h6 className="font-bold my-2">{props.children}</h6>,
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

