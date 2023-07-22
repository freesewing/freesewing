import { siteConfig } from 'site/site.config.mjs'
import { components } from 'shared/components/mdx/index.mjs'
import { Loading } from 'shared/components/spinner.mjs'
import { useState, useEffect } from 'react'

/**
 * Dynamically load and compile mdx
 * @param  {Function} loader an import function to use to load the mdx
 * @return {Object} props
 * @return {React.component} props.MDX an component to render the loaded MDX
 * @return {Object} props.frontmatter the frontmatter loaded from the markdown
 */
export const useDynamicMdx = (loader, params) => {
  // State
  const [frontmatter, setFrontmatter] = useState({ title: `FreeSewing.${siteConfig.tld}` })
  const [MDX, setMDX] = useState(<Loading />)

  /* Load MDX dynamically */
  useEffect(() => {
    const loadMDX = async () => {
      loader(params).then((mod) => {
        setFrontmatter(mod.frontmatter)
        const Component = mod.default
        setMDX(<Component components={components(siteConfig.tld)} />)
      })
    }
    if (loader) loadMDX()
  }, [params])

  return { MDX, frontmatter }
}
