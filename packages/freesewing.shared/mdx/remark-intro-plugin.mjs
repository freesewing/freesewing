import { visit } from 'unist-util-visit'

/*
 * This is a remark plugin that will pull the (text of the)
 * first paragraph out of a markdown document and add it as
 * the `intro` field in the documents's frontmatter.
 *
 * As such, it will only do anything if the document has
 * frontmatter.
 *
 * I wrote this specifically to pull the intro out of our
 * markdown content for SEO and open graph.
 * I'm not publishing this as a proper remark plugin because
 * while this works for our use-cases, it may or may not
 * work for the many different ways people use markdown and
 * remark out there.
 */

// These are child types of a paragraph of which we'll extract the text
const asText = [
  'text',
  'strong',
  'emphasis',
  'inlineCode',
]

// The actual plugin starts here
export const remarkIntroPlugin = (opts={}) => {

  const { intro=[] } = opts

  // Check to see whether the node has frontmatter
  const hasFrontmatter = node => (node.children[0].type === 'yaml')

  // Pulls text out of a paragraph
  const extractIntro = node => {
    const text = []
    for (const child of node.children) {
      if (asText.indexOf(child.type) !== -1) text.push(child.value)
      else if (child.type === 'link') text.push(child.children[0].value)
    }

    return text.map(item => item ? item.trim() : '').join(' ')
  }

  // Pulls the first paragraph out of a root node
  const extractFirstParagraph = node => {
    for (const child of node.children) {
      if (child.type === 'paragraph') return extractIntro(child)
    }

    return 'FIXME_no_intro'
  }

  // Tree visitor
  const visitor = (node) => {
    const nodeIntro = extractFirstParagraph(node)
    // Forgive me for this hack
    intro.push(nodeIntro)
    if (hasFrontmatter(node)) {
      node.children[0].value += `\nintro: "${nodeIntro}"\n`
    } else {
      node.children.unshift({
        type: 'yaml',
        value: `intro: "${nodeIntro}"`
      })
    }
  }

  // Transformer method using the visitor pattern
  const transform = (tree) => {
    visit(tree, 'root', visitor)
  }

  return transform
}

