import dynamic from 'next/dynamic'
import { MDXProvider } from '@mdx-js/react'
import { useState } from 'react'
import { Spinner } from 'shared/components/spinner.mjs'
import { PageLink } from 'shared/components/page-link.mjs'
import { useTranslation } from 'next-i18next'
import { components } from 'shared/components/mdx/index.mjs'
import { MdxWrapper, ns as wrapperNs } from './wrapper.mjs'

export const ns = wrapperNs

/*
 * Webpack will check on disk for all possible files matching this
 * dynamic import. So unless we divide it up a bit your computer
 * will melt when running this in development mode
 *
 * This will return a language-specific component
 */
const dynamicDocsFactory = (lang) => {
  return function ({ setting = false }) {
    const [frontmatter, setFrontmatter] = useState({})
    const mdx = dynamic(
      () =>
        import(
          `orgmarkdown/docs/site/draft/core-settings/${setting ? setting + '/' : ''}${lang}.md`
        ).then((mod) => {
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
const CoreSettingsDocsEn = dynamicDocsFactory('en')
const CoreSettingsDocsDe = dynamicDocsFactory('de')
const CoreSettingsDocsFr = dynamicDocsFactory('fr')
const CoreSettingsDocsEs = dynamicDocsFactory('es')
const CoreSettingsDocsNl = dynamicDocsFactory('nl')

/*
 * Return language-specific component
 */
export const DynamicCoreSettingsDocs = ({ setting = false, language = 'en' }) => {
  if (language === 'en') return <CoreSettingsDocsEn setting={setting} />
  if (language === 'de') return <CoreSettingsDocsDe setting={setting} />
  if (language === 'es') return <CoreSettingsDocsEs setting={setting} />
  if (language === 'fr') return <CoreSettingsDocsFr setting={setting} />
  if (language === 'nl') return <CoreSettingsDocsNl setting={setting} />
}
