import dynamic from 'next/dynamic'
import { useState } from 'react'
import { Spinner } from 'shared/components/spinner.mjs'
import { MdxWrapper } from './wrapper.mjs'
import { components } from 'shared/components/mdx/index.mjs'

const orgComponents = components()
export const loaders = {
  en: (path) => import(`orgmarkdown/docs/${path}/en.md`),
  de: (path) => import(`orgmarkdown/docs/${path}/de.md`),
  fr: (path) => import(`orgmarkdown/docs/${path}/fr.md`),
  es: (path) => import(`orgmarkdown/docs/${path}/es.md`),
  nl: (path) => import(`orgmarkdown/docs/${path}/nl.md`),
  uk: (path) => import(`orgmarkdown/docs/${path}/uk.md`),
}
/*
 * Webpack will check on disk for all possible files matching this
 * dynamic import. So unless we divide it up a bit your computer
 * will melt when running this in development mode
 *
 * This will return a language-specific component
 */

function DynamicDocs({ path, lang }) {
  const [frontmatter, setFrontmatter] = useState({})
  const mdx = dynamic(
    () =>
      loaders[lang](path).then((mod) => {
        setFrontmatter(mod.frontmatter)
        return mod
      }),
    { ssr: false }
  )
  const MDX = mdx ? mdx : <Spinner className="w16 h-16 animate-spin text-primary" />

  return (
    <MdxWrapper {...frontmatter} path={path} language={lang}>
      <MDX components={orgComponents} />
    </MdxWrapper>
  )
}

/*
 * Return language-specific component
 */
export const DynamicOrgDocs = ({ path = false, language = 'en' }) => {
  if (!path) return null
  return <DynamicDocs path={path} lang={language} />
}
