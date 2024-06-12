import { visit } from 'unist-util-visit'
import { fromHtml } from 'hast-util-from-html'

const jargonTransform = (term, html) =>
  `<span class="jargon-term">${term}<span class="jargon-info">${html}</span></span>`

export default (options) => {
  // Don't bother if we don't have any jargon
  if (!options || !options.jargon) {
    throw Error('Required "jargon" option is missing in remark-jargon configuration')
  }

  // Allow passing in a custom transform method
  if (!options.transform) options.transform = jargonTransform

  // Detect jargon nodes
  const isJargon = (node) => {
    if (
      node.tagName === 'em' &&
      node.children.every((n) => n.type === 'text') &&
      Object.keys(options.jargon).indexOf(node.children[0].value.toLowerCase()) !== -1
    )
      return true
    return false
  }

  // Visitor method
  const visitor = (node) => {
    if (isJargon(node)) {
      const termTree = fromHtml(
        options.transform(
          node.children[0].value,
          options.jargon[node.children[0].value.toLowerCase()]
        ),
        { fragment: true }
      )
      node.children = termTree.children
    }
  }

  const transform = (tree) => {
    visit(tree, 'element', visitor)
  }

  return transform
}
