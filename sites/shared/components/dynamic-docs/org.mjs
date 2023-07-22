import { siteConfig } from 'site/site.config.mjs'
import dynamic from 'next/dynamic'
import { useState } from 'react'
import { Spinner } from 'shared/components/spinner.mjs'
import { MdxWrapper } from './wrapper.mjs'
import { components } from 'shared/components/mdx/index.mjs'

export const loader = (path) => import(`orgmarkdown/docs/${path}/${siteConfig.language}.md`)

/*
 * Webpack will check on disk for all possible files matching this
 * dynamic import. So unless we divide it up a bit your computer
 * will melt when running this in development mode
 */
function DynamicDocs({ path }) {
  const [frontmatter, setFrontmatter] = useState({})
  console.log('FIXME in DynamicDocs', { path })
  const mdx = dynamic(
    () =>
      loader(path).then((mod) => {
        setFrontmatter(mod.frontmatter)
        return mod
      }),
    { ssr: false }
  )
  const MDX = mdx ? mdx : <Spinner className="w16 h-16 animate-spin text-primary" />

  return (
    <MdxWrapper {...frontmatter} path={path}>
      <MDX components={components} />
    </MdxWrapper>
  )
}

/*
 * Return component
 */
export const DynamicOrgDocs = ({ path = false }) => (path ? <DynamicDocs path={path} /> : null)
