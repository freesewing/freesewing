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
import customComponents from 'shared/components/mdx'

// Previous-Next navigation
import PrevNext from '../mdx/prev-next'

const MdxWrapper = ({mdx, app, components={}}) => {

  const [mdxModule, setMdxModule] = useState()

  useEffect(() => {
    ;(async () => {
      setMdxModule(await run(mdx, runtime))
    })()
  }, [mdx])

  /*
   * We use some default components that are available
   * everywhere in MDX, but we also accept passing in
   * extra components via props
   */
  const allComponents = {
    ...customComponents(app),
    ...components
  }

  // React component for MDX content
  const MdxContent = mdxModule ? mdxModule.default : Fragment

  return (
    <div className="text-primary mdx max-w-prose text-base-content max-w-prose text-lg lg:text-xl">
      {mdxModule && <MdxContent components={allComponents}/>}
      <PrevNext app={app} />
    </div>
  )
}

export default MdxWrapper

