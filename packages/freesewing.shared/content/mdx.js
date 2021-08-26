import { serialize } from 'next-mdx-remote/serialize'
import { jargon_en, jargon_es, jargon_nl, jargon_de, jargon_fr } from '@freesewing/i18n'
import remarkJargon from 'remark-jargon'
import remarkSlug from 'remark-slug'
import remarkAutolinkHeadings from 'remark-autolink-headings'
import remarkGfm from 'remark-gfm'
import remarkCopyLinkedFiles from 'remark-copy-linked-files'
import remarkImages from '@fec/remark-images'
import remarkA11yEmoji from '@fec/remark-a11y-emoji'
import mdx from '../lib/mdx'
import path from 'path'

export const getMdxPaths = mdx.getPaths

const jargon = {
  en: jargon_en,
  de: jargon_de,
  es: jargon_es,
  fr: jargon_fr,
  nl: jargon_nl,
}

export const getMdxStaticProps = async (config, page=false) => {
  const {monorepo, site, language} = config
  const staticPath = 'mdx_files'
  const destinationDir = path.join(monorepo, 'packages', `freesewing.${site}`, 'public')
  const [paths, pages] = await mdx.get(config)
  const props = { paths, pages }
  if (page) {
    const rawMdx = mdx.loadFile(page, site, language)
    const { content, data } = mdx.matter(rawMdx)
    const filepath = path.join(...[monorepo, 'markdown', site, ...page.split('/'), `${language}.md`])
    props.href = `/${page}`
    props.mdx = await serialize(content, {
      scope: { site, language, page, frontmatter: data },
      mdxOptions: {
        remarkPlugins: [
          // Our very own jargon plugin
          [ remarkJargon, { jargon: jargon[language] } ],
          // Add anchor links to headings
          remarkSlug,
          [ remarkAutolinkHeadings, { behavior: 'append' }],
          // Github-flavored markdown
          remarkGfm,
          // Make emojis accessible
          remarkA11yEmoji,
          // Optimize images
          [remarkImages, {
            loadingPolicy: 'lazy',
            srcDir: path.join(...[monorepo, 'markdown', site, ...page.split('/')]),
            targetDir: destinationDir,
            staticPrefix: '/mdx_files/',
            blurredBackground: false,
            imageSizes: [250, 500, 1000, 2000],
            resolutions: [1,2,3],
          }],
          // Copy linked files
          [ remarkCopyLinkedFiles, { destinationDir: `${destinationDir}/${staticPath}`, staticPath }],
        ],
        filepath,
      },
      target: ['esnext'],
    })
    props.frontmatter = data
  }

  return props
}

