/*
 * This is used to wrap MDX as returned from the mdxLoader
 * method (see shared/mdx/loader.js)
 * It is NOT for wrapping plain markdown/mdx
 */
import { useState, useEffect, Fragment } from 'react'

// See: https://mdxjs.com/guides/mdx-on-demand/
import { run } from '@mdx-js/mdx'
import * as runtime from 'react/jsx-runtime.js'

// Components that are available in all MDX
import { list as designs } from '@freesewing/pattern-info'
import Popout from '../popout'
import Highlight from '../mdx/highlight'
import YouTube from '../mdx/youtube'
//import * as dfltComponents from 'shared/components/elements/in-mdx'

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

const Example = props => <p>FIXME: Example still todo</p>

const MdxWrapper = ({mdx, components={}}) => {

  const [mdxModule, setMdxModule] = useState()

  useEffect(() => {
    ;(async () => {
      setMdxModule(await run(mdx, runtime))
    })()
  }, [mdx])

  const dfltComponents = {
    Example,
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
    pre: props => <Highlight {...props} />,
    //code: props => <Highlight {...props} tag='code'/>,
    DesignIterator,
  }


  /*
   * We use some default components that are available
   * everywhere in MDX, but we also accept passing in
   * extra components via props
   */
  const allComponents = {
    ...dfltComponents,
    ...components
  }

  // React component for MDX content
  const MdxContent = mdxModule ? mdxModule.default : Fragment

  return (
    <div className="prose lg:prose-xl prose-pre:bg-primary">
      <MdxContent components={allComponents}/>
    </div>
  )
}

export default MdxWrapper

