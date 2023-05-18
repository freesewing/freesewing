import dynamic from 'next/dynamic'
import { useState } from 'react'
import { Spinner } from 'shared/components/spinner.mjs'
import { MdxWrapper } from './wrapper.mjs'
import { components } from 'shared/components/mdx/index.mjs'

/*
 * Webpack will check on disk for all possible files matching this
 * dynamic import. So unless we divide it up a bit your computer
 * will melt when running this in development mode
 *
 * This will return a language-specific component
 */
const dynamicDocsFactory = (lang) => {
  return function ({ path }) {
    const [frontmatter, setFrontmatter] = useState({})
    const mdx = dynamic(
      () =>
        import(`orgmarkdown/docs/${path}/${lang}.md`).then((mod) => {
          setFrontmatter(mod.frontmatter)
          return mod
        }),
      { ssr: false }
    )
    const MDX = mdx ? mdx : <Spinner className="w16 h-16 animate-spin text-primary" />

    return (
      <MdxWrapper {...frontmatter} path={`site/draft/core-settings`} language={lang}>
        <MDX components={components} />
      </MdxWrapper>
    )
  }
}

/*
 * Instantiate language-specific components
 */
const OrgDocsEn = dynamicDocsFactory('en')
const OrgDocsDe = dynamicDocsFactory('de')
const OrgDocsFr = dynamicDocsFactory('fr')
const OrgDocsEs = dynamicDocsFactory('es')
const OrgDocsNl = dynamicDocsFactory('nl')

/*
 * Return language-specific component
 */
export const DynamicOrgDocs = ({ path = false, language = 'en' }) => {
  if (!path) return null
  if (language === 'en') return <OrgDocsEn path={path} />
  if (language === 'de') return <OrgDocsDe path={path} />
  if (language === 'es') return <OrgDocsEs path={path} />
  if (language === 'fr') return <OrgDocsFr path={path} />
  if (language === 'nl') return <OrgDocsNl path={path} />
}
