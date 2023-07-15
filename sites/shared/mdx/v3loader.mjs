// We need fs and path to read from disk
import fs from 'fs/promises'
import path from 'path'
import { jargon } from 'shared/jargon/index.mjs'
// MDX compiler
import { compile } from '@mdx-js/mdx'

import { getMdxConfig } from 'shared/config/mdx.mjs'
import { remarkIntroPlugin } from './remark-intro-plugin.mjs'
import mdxPluginToc from './mdx-plugin-toc.mjs'

export const mdxLoader = async (language, site, slug) => {
  let mdxFile
  const intro = []
  const mdxConfig = getMdxConfig({ site, jargon, slug })
  mdxConfig.options.remarkPlugins.push(mdxPluginToc, [remarkIntroPlugin, { intro }])

  // TODO will this work on windows?
  try {
    mdxFile = await fs.readFile(
      path.resolve(`../../markdown/${site}/${slug}/${language}.md`),
      'utf-8'
    )
  } catch {
    mdxFile = await fs.readFile(path.resolve(`../../markdown/${site}/${slug}/en.md`), 'utf-8')
  }

  const code = await compile(mdxFile, {
    ...mdxConfig.options,
    outputFormat: 'function-body',
    baseUrl: import.meta.url,
    useDynamicImport: true,
    development: false,
    providerImportSource: undefined,
  })

  return {
    mdx: code.toString(),
    intro,
  }
}
