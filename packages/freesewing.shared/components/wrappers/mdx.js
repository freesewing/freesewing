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
import * as dfltComponents from 'shared/components/elements/in-mdx'

const MdxWrapper = ({mdx, components={}}) => {

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
    ...dfltComponents,
    ...components
  }

  // React component for MDX content
  const MdxContent = mdxModule ? mdxModule.default : Fragment

  return <MdxContent components={allComponents}/>
}

export default MdxWrapper

