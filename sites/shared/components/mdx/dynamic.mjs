// Dependencies
import { compileMdx } from 'shared/mdx/browser-compile.mjs'
import * as runtime from 'react/jsx-runtime'
import { run } from '@mdx-js/mdx'
// Hooks
import { useState, useEffect } from 'react'
// Components
import { MdxWrapper } from 'shared/components/wrappers/mdx.mjs'
import { Loading } from 'shared/components/spinner.mjs'

const ghPrefix = 'https://raw.githubusercontent.com/freesewing/freesewing/develop/markdown'
const fromGithub = true

const titles = {
  1: ({ title }) => <h1>{title}</h1>,
  2: ({ title }) => <h2>{title}</h2>,
  3: ({ title }) => <h3>{title}</h3>,
  4: ({ title }) => <h4>{title}</h4>,
  5: ({ title }) => <h5>{title}</h5>,
  6: ({ title }) => <h6>{title}</h6>,
}

export const DynamicMdx = ({ site = 'org', slug, language, title = 1 }) => {
  const [mdx, setMdx] = useState(false)
  const [frontmatter, setFrontmatter] = useState(false)

  useEffect(() => {
    const loadMdx = async () => {
      const response = await fetch(`${ghPrefix}/${site}/${slug}/${language}.md`)
      const md = await response.text()
      const mdx = await compileMdx({ site, slug, language, md, fromGithub })
      const { frontmatter: fm } = await run(mdx, runtime)
      setMdx(mdx)
      setFrontmatter(fm)
    }
    if (!mdx) loadMdx()
  }, [site, slug, language])

  const Title = title && frontmatter?.title && titles[Number(title)] ? titles[title] : () => null

  return mdx ? (
    <>
      <Title title={frontmatter?.title} />
      <MdxWrapper {...{ mdx, site, slug }} />
    </>
  ) : (
    <Loading />
  )
}

export const Mdx = ({ md }) => {
  const [mdx, setMdx] = useState(false)

  useEffect(() => {
    const loadMdx = async () => {
      try {
        const mdx = await compileMdx({ md })
        setMdx(mdx)
      } catch {}
    }
    loadMdx()
  }, [md])

  return mdx ? <MdxWrapper mdx={mdx} /> : <Loading />
}
