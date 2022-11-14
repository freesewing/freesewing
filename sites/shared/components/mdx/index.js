import Popout from '../popout.js'
import Highlight from './highlight.js'
import YouTube from './youtube.js'
import Figure from './figure.js'
import ReadMore from './read-more.js'
import { Tab, Tabs } from './tabs.js'
import Example from './example.js'
import Examples from './examples.js'

const methodClasses = {
  get: 'bg-green-600 text-white',
  post: 'bg-sky-600 text-white',
  put: 'bg-orange-500 text-white',
  delete: 'bg-red-600 text-white',
}

const Method = (props) => {
  let method = false
  for (const m in methodClasses) {
    if (!method && props[m]) method = m.toUpperCase()
  }

  return (
    <div
      className={`my-1 text-xs inline-flex items-center font-bold leading-sm uppercase px-3 py-1 rounded-full ${
        methodClasses[method.toLowerCase()]
      }`}
    >
      {method}
    </div>
  )
}

const statusClasses = {
  2: 'bg-green-600 text-white',
  4: 'bg-orange-500 text-white',
  5: 'bg-red-600 text-white',
}

const StatusCode = ({ status }) => {
  return (
    <div
      className={`my-1 text-xs inline-flex items-center font-bold leading-sm uppercase px-3 py-1 rounded-full ${
        statusClasses['' + status.slice(0, 1)]
      }`}
    >
      {status}
    </div>
  )
}

const mdxCustomComponents = (app = false) => ({
  // Custom components
  Method,
  StatusCode,
  Comment: (props) => <Popout {...props} comment />,
  Fixme: (props) => <Popout {...props} fixme />,
  Link: (props) => <Popout {...props} link />,
  Note: (props) => <Popout {...props} note />,
  ReadMore: (props) => <ReadMore {...props} app={app} slug={app.slug} />,
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
  Example: (props) => <Example {...props} app={app} />,
  Examples: (props) => <Examples {...props} app={app} />,
})

export default mdxCustomComponents

//<span className="bg-secondary px-2 mx-1 rounded text-primary-content bg-opacity-80">{children}</span>
