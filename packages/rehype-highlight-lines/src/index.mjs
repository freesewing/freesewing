import { visit } from 'unist-util-visit'
import { remove } from 'unist-util-remove'

const dflts = {
  commentTag: 'span',
  commentClass: 'hljs-comment',
  openingCommentHighlight: 'highlight-start',
  closingCommentHighlight: 'highlight-end',
  openingCommentStrikeout: 'strikeout-start',
  closingCommentStrikeout: 'strikeout-end',
  highlightTag: 'section',
  highlightClass: 'highlight-lines',
  strikeoutClass: 'strikeout-lines',
  swallow: true,
}

export default (userOptions = {}) => {
  // Merge defaults with user-supplied options
  const options = {
    ...dflts,
    ...userOptions,
  }

  // Keep track of whether we've opened a highlight block
  let isOpen = false
  let children = {}
  let variant

  // Detect opening or closing comment
  const isOpeningOrClosingComment = (node) => {
    if (
      node &&
      node.tagName === options.commentTag &&
      node.properties?.className.includes(options.commentClass)
    ) {
      if (node.children[0].value.includes(options.openingCommentHighlight))
        return ['opening', 'highlight']
      if (node.children[0].value.includes(options.closingCommentHighlight))
        return ['closing', 'highlight']
      if (node.children[0].value.includes(options.openingCommentStrikeout))
        return ['opening', 'strikeout']
      if (node.children[0].value.includes(options.closingCommentStrikeout))
        return ['closing', 'strikeout']
    }

    return [false, 'highlight']
  }

  // Detect opening comment
  const isOpeningComment = (node) =>
    node.tagName === options.commentTag && node.properties?.className === options.commentClass
      ? true
      : false

  // Visitor method
  const visitor = (node, i, parent) => {
    const [type, variant] = isOpeningOrClosingComment(node)
    if (type) {
      if (type === 'opening') {
        isOpen = true
        if (options.swallow) node.__remove_dupes = true
      } else if (type === 'closing') {
        isOpen = false
        const curNode = { ...node }
        parent.children[i] = {
          type: 'element',
          tagName: options.highlightTag,
          properties: {
            className: Array.isArray(options[`${variant}Class`])
              ? options[`${variant}Class`]
              : [options[`${variant}Class`]],
          },
          children: [...Object.values(children)],
        }
        if (!options.swallow) parent[i].children.push(curNode)
        children = {}
      }
    } else if (isOpen) {
      if (parent.tagName === 'code') {
        if (node.type === 'text' && node.value === '\n') {
          // Linebreak
          node.type = 'element'
          node.tagName = 'span'
          node.children = [
            {
              type: 'text',
              value: '\n',
            },
            {
              type: 'element',
              tagName: 'span',
              properties: {
                className: ['code-line-break'],
              },
            },
          ]
        }
        children[i] = { ...node }
        node.__remove_dupes = true
      }
    }
  }

  const transform = (tree) => {
    visit(tree, () => true, visitor)
    remove(tree, (node) => node.__remove_dupes === true)
  }

  return transform
}
