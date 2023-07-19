import { components } from 'shared/components/mdx/index.mjs'
import { Loading } from 'shared/components/spinner.mjs'
import { useState, useEffect } from 'react'

export const useDynamicMdx = (loader, site = 'org') => {
  // State
  const [frontmatter, setFrontmatter] = useState({ title: `freeSewing.${site}` })
  const [MDX, setMDX] = useState(<Loading />)

  /* Load MDX dynamically */
  useEffect(() => {
    const loadMDX = async () => {
      loader().then((mod) => {
        setFrontmatter(mod.frontmatter)
        const Component = mod.default
        setMDX(<Component components={components(site)} />)
      })
    }
    if (loader) loadMDX()
  }, [loader, site])

  return { MDX, frontmatter }
}
