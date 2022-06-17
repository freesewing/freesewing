/*
 * This is used to wrap a Table of Contents (toc) as returned
 * from the mdxLoader method (see shared/mdx/loader.js)
 * It is NOT for wrapping plain markdown/mdx
 */
import { useState, useEffect, Fragment } from 'react'

// See: https://mdxjs.com/guides/mdx-on-demand/
import { run } from '@mdx-js/mdx'
import * as runtime from 'react/jsx-runtime.js'

// Components that are available in all MDX
import customComponents from 'shared/components/mdx'

const TocWrapper = ({toc, app}) => {

  const [mdxModule, setMdxModule] = useState()

  useEffect(() => {
    ;(async () => {
      setMdxModule(await run(toc, runtime))
    })()
  }, [toc])

  // React component for MDX content
  const MdxContent = mdxModule ? mdxModule.default : Fragment

  return (
    <div className={`
      mdx mdx-toc text-base-content text-lg lg:text-xl
      sticky top-8 max-h-screen overflow-y-auto
      max-w-prose
      md:border-l-4 md:pl-4 md:mb-8 md:border-base-200
    `}
    >
      {mdxModule && <MdxContent components={customComponents(app)}/>}
    </div>
  )
}

export default TocWrapper

