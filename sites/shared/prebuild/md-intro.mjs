// We need fs and path to read from disk
import fs from 'fs'
import path from 'path'

// Remark
import { remark } from 'remark'
import { visit } from 'unist-util-visit'
// Remark plugins we want to use
import remarkParse from 'remark-parse'
import remarkFrontmatter from 'remark-frontmatter'

const asText = ['text', 'strong', 'emphasis']
const asLink = ['link', 'linkReference']

// Pulls the intro from a markdown document
const remarkIntroPlugin = () => {
  // Pulls text out of a paragraph
  const extractIntro = (node) => {
    const text = []
    for (const child of node.children) {
      // add regular text without modification
      if (asText.indexOf(child.type) !== -1) text.push(child.value)
      // escape inline code
      else if (child.type === 'inlineCode')
        text.push(child.value.replace(/</g, '&lt;').replace(/>/g, '&gt;'))
      // get all the text content of links and like references
      else if (asLink.includes(child.type)) text.push(extractIntro(child))
    }

    return text.map((item) => (item ? item.trim() : '')).join(' ')
  }

  // Pulls the first paragraph out of a root node
  const extractFirstParagraph = (node) => {
    for (const child of node.children) {
      if (child.type === 'paragraph') return extractIntro(child)
    }

    return 'FIXME_no_intro'
  }

  // Tree visitor
  const visitor = (node) => {
    if (node.type === 'root') {
      node.children = [
        {
          type: 'text',
          value: extractFirstParagraph(node).split('\n').join(' ').trim(),
        },
      ]
    }
  }

  // Transformer method using the visitor pattern
  const transform = (tree) => {
    visit(tree, 'root', visitor)
  }

  return transform
}

/*
 * Summary: Loads markdown from disk and return the intro as plain text
 *
 * @param (string) language - language to load (eg: 'en')
 * @param (string) site - site to load (either 'dev' or 'org')
 * @param (string) slug - slug of the page (eg: 'guides/patterns')
 *
 * @return (string) intro - the document's intro
 */
export const mdIntro = async (language, site, slug) => {
  // TODO: Will this work on Windows?
  const md = await fs.promises.readFile(
    path.resolve(`../../markdown/${site}/${slug}/${language}.md`),
    'utf-8'
  )

  const result = await remark()
    .use(remarkFrontmatter)
    .use(remarkParse)
    .use(remarkIntroPlugin)
    .process(md)

  return result.toString()
}
