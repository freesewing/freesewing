import dynamic from 'next/dynamic'
import { MDXProvider } from '@mdx-js/react'
import { useState } from 'react'
import { Spinner } from 'shared/components/spinner.mjs'
import { PageLink } from 'shared/components/page-link.mjs'
import { useTranslation } from 'next-i18next'
import { MdxComponents } from 'shared/components/mdx/index.mjs'

export const components = MdxComponents

console.log('these are the', components)

export const ns = ['modal']

export const MdxWrapper = ({ title = false, path, language, children }) => {
  const { t } = useTranslation(ns)
  const slug = `${language === 'en' ? '' : '/' + language}/docs/${path}`

  return (
    <>
      {title ? <h1>{title}</h1> : null}
      <div className="text-primary mdx text-base-content text-base">
        <MDXProvider components={components}>{children}</MDXProvider>
      </div>
      <div
        className={`flex flex-row gap-1 text-sm opacity-70 justify-end items-center
        border border-solid border-neutral border-b-0 border-r-0 border-l-0 pt-1 mt-2`}
      >
        <span>{t('modal:source')}:</span>
        <PageLink txt={slug} href={slug} />
      </div>
    </>
  )
}

export const DynamicMdx = ({ path = false, language = 'en' }) => {
  // Extract frontmatter from mdx
  const [frontmatter, setFrontmatter] = useState({})

  // Dynamic import of the MDX content
  const mdx = dynamic(
    () =>
      import(`markdown/docs/${path}/${language}.md`).then((mod) => {
        setFrontmatter(mod.frontmatter)
        return mod
      }),
    { ssr: false }
  )

  const MDX = mdx ? mdx : <Spinner className="w16 h-16 animate-spin text-primary" />

  console.log({ components })
  return (
    <MdxWrapper {...{ path, language, ...frontmatter }}>
      <MDX components={components} />
      <pre>{JSON.stringify(Object.keys(components), null, 2)}</pre>
    </MdxWrapper>
  )
}
