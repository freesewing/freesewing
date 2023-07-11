import dynamic from 'next/dynamic'
import { useState, useEffect } from 'react'
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
  return function DynamicDocs({ path }) {
    const [loader, setLoader] = useState(null)
    const [frontmatter, setFrontmatter] = useState({})

    useEffect(() => {
      import(`site/prebuild/docs-loader/${lang}.mjs`)
        .then((l) => {
          setLoader(() => l.loader)
        })
        .catch((e) => console.log(e))
    }, [lang, setLoader])

    const mdx = loader
      ? dynamic(
          () =>
            loader(path)
              .then((mod) => {
                setFrontmatter(mod.frontmatter)
                return mod
              })
              .catch((e) => console.log(e)),
          { ssr: false }
        )
      : null

    const MDX = mdx ? mdx : () => <Spinner className="w16 h-16 animate-spin text-primary" />

    return (
      <MdxWrapper {...frontmatter} path={path} language={lang}>
        <MDX components={components} />
      </MdxWrapper>
    )
  }
}

/*
 * Instantiate language-specific components
 */
// const OrgDocsEn = dynamicDocsFactory('en')
// const OrgDocsDe = dynamicDocsFactory('de')
// const OrgDocsFr = dynamicDocsFactory('fr')
// const OrgDocsEs = dynamicDocsFactory('es')
// const OrgDocsNl = dynamicDocsFactory('nl')

/*
 * Return language-specific component
 */
export const DynamicOrgDocs = ({ path = false, language = 'en' }) => {
  if (!path) return null
  const DocComponent = dynamicDocsFactory(language)

  return <DocComponent path={path} />
}
