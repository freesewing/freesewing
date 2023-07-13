import dynamic from 'next/dynamic'
import { useState, useEffect } from 'react'
import { Spinner } from 'shared/components/spinner.mjs'
import { MdxWrapper } from './wrapper.mjs'
import { components } from 'shared/components/mdx/index.mjs'
import { getLoader } from 'site/prebuild/docs-loader.mjs'

const Loader = () => <Spinner className="w16 h-16 animate-spin text-primary" />

export const useDynamicDocs = (lang, path) => {
  const [frontmatter, setFrontmatter] = useState({})
  const [MDX, setMDX] = useState(() => Loader)

  useEffect(() => {
    const loader = getLoader(path, lang)
    if (!loader || path === undefined) return

    loader(path)
      .then((mod) => {
        setFrontmatter(mod.frontmatter)
        setMDX(() => mod.default)
      })
      .catch((e) => console.log(e))
  }, [path, lang])

  return { frontmatter, MDX }
}

/*
 * Return language-specific component
 */
export const DynamicOrgDocs = ({ path = false, language = 'en' }) => {
  const { MDX, frontmatter } = useDynamicDocs(language, path)
  if (!path) return null

  return (
    <MdxWrapper {...frontmatter} path={path} language={language}>
      <MDX components={components} />
    </MdxWrapper>
  )
}
