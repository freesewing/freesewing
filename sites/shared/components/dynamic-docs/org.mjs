import dynamic from 'next/dynamic'
import { useState, useEffect } from 'react'
import { Spinner } from 'shared/components/spinner.mjs'
import { MdxWrapper } from './wrapper.mjs'
import { components } from 'shared/components/mdx/index.mjs'

const Loader = () => <Spinner className="w16 h-16 animate-spin text-primary" />

const getSplitPath = (split, slice) => {
  let sliced = split.slice(slice)
  return (sliced.length ? '/' : '') + sliced.join('/')
}

/*
 * Webpack will check on disk for all possible files matching this
 * dynamic import. So unless we divide it up a bit your computer
 * will melt when running this in development mode
 */

const getLoader = (path, lang) => {
  const split = path.split('/')
  const splitPath = getSplitPath(split, 1)
  switch (split[0]) {
    case 'designs':
      return () => import(`../../../../markdown/org/docs/designs${splitPath}/${lang}.md`)
    case 'faq':
      return () => import(`../../../../markdown/org/docs/faq${splitPath}/${lang}.md`)
    case 'guide':
      return () => import(`../../../../markdown/org/docs/guide${splitPath}/${lang}.md`)
    case 'measurements':
      return () => import(`../../../../markdown/org/docs/measurements${splitPath}/${lang}.md`)
    case 'sewing':
      return () => import(`../../../../markdown/org/docs/sewing${splitPath}/${lang}.md`)
    case 'site':
      return () => import(`../../../../markdown/org/docs/site${splitPath}/${lang}.md`)
    case 'various':
      return () => import(`../../../../markdown/org/docs/various${splitPath}/${lang}.md`)
    default:
      return () =>
        import(
          /* webpackExclude: /docs\/(designs|faq|guide|measurements|sewing|site|various)/ */ `../../../../markdown/org/docs${path}/${lang}.md`
        )
  }
}

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
