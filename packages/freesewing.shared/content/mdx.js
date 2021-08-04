import { serialize } from 'next-mdx-remote/serialize'
import { jargon_en, jargon_es, jargon_nl, jargon_de, jargon_fr } from '@freesewing/i18n'
import remarkJargon from 'remark-jargon'
import remarkSlug from 'remark-slug'
import remarkAutolinkHeadings from 'remark-autolink-headings'
import remarkGfm from 'remark-gfm'
import mdx from '../lib/mdx'

export const getMdxPaths = mdx.getPaths

const jargon = {
  en: jargon_en,
  de: jargon_de,
  es: jargon_es,
  fr: jargon_fr,
  nl: jargon_nl,
}

export const getMdxStaticProps = async (folder, lang='en', path=false) => {
  const [paths, pages] = await mdx.get(folder, lang)
  const props = { paths, pages }
  if (path) {
    const rawMdx = mdx.loadFile(path, folder, lang)
    const { content, data } = mdx.matter(rawMdx)
    props.href = `/${path}`
    props.mdx = await serialize(content, {
      scope: { folder, lang, path, frontmatter: data },
      mdxOptions: {
        remarkPlugins: [
          // Our very own jargon plugin
          [ remarkJargon, { jargon: jargon[lang] } ],
          // Add anchor links to headings
          remarkSlug,
          [ remarkAutolinkHeadings, { behavior: 'append' }],
          // Github-flavored markdown
          remarkGfm,
        ]
      },
      target: ['esnext'],
    })
    props.frontmatter = data
  }

  return props
}

