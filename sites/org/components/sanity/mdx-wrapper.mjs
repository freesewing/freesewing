import { compile, run } from '@mdx-js/mdx'
import * as runtime from 'react/jsx-runtime' // Production.
import { useState, useEffect } from 'react'

import { PlainMdxWrapper } from 'shared/components/wrappers/mdx.mjs'

export const useEvaledMdx = (mdxStr = '') => {
  const [mdxModule, setMdxModule] = useState(false)

  useEffect(() => {
    const runEffect = async () => {
      const code = await compile(mdxStr, {
        outputFormat: 'function-body',
        development: false,
      })
      const evaled = await run(code, runtime)
      setMdxModule(() => evaled.default)
    }
    runEffect()
  }, [mdxStr])

  return mdxModule
}

export const MdxEvalWrapper = ({ MDX = false, components = {}, site = 'org' }) => {
  const evaled = useEvaledMdx(MDX)
  return <PlainMdxWrapper {...{ MDX: evaled, components, site }} />
}

export const SanityMdxWrapper = MdxEvalWrapper
