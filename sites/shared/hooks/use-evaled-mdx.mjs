import { compile, run } from '@mdx-js/mdx'
import * as runtime from 'react/jsx-runtime' // Production.

import { useState, useEffect } from 'react'

export const useEvaledMdx = (mdxStr = '') => {
  const [mdxModule, setMdxModule] = useState(false)

  useEffect(() => {
    ;(async () => {
      const code = await compile(mdxStr, {
        outputFormat: 'function-body',
        development: false,
      })
      const evaled = await run(code, runtime)
      setMdxModule(() => evaled.default)
    })()
  }, [mdxStr])

  return mdxModule
}
