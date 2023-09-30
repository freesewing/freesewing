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

  const splitParams = (node) => {
    if (node.children.length === 1 && node.children[0].type === 'text') {
      const content = node.children[0].value.split('\n')
      node.children = content.map((value) =>
        value.includes('//')
          ? {
              type: 'element',
              tagName: 'span',
              properties: {
                className: options.commentClass,
              },
              children: [{ type: 'text', value }],
            }
          : { type: 'text', value: value + '\n', isParamLine: true }
      )
    }
  }

  // Keep track of whether we've opened a highlight block
  let isOpen = 0
  let children = {}

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

  // Visitor method
  const visitor = (node, i, parent) => {
    const [type, variant] = isOpeningOrClosingComment(node)
    if (type) {
      if (type === 'opening') {
        isOpen = 1

        // Deal with extra linebreaks in the element before the start
        const prev = parent.children[i - 1]
        if (prev?.type === 'text' && prev.value.includes('\n'))
          prev.value = prev.value.replace(/\n/g, '') + '\n'

        if (options.swallow) node.__remove_dupes = true
      } else if (type === 'closing') {
        // Deal with extra linebreaks in the element before the end
        const prev = children[i - 1]
        if (prev.type === 'text' && prev.value.includes('\n') && !node.isParamLine)
          prev.value = prev.value.trimEnd()

        isOpen = 0
        const curNode = { ...node }
        parent.children[i] = {
          type: 'element',
          tagName: options.highlightTag,
          properties: {
            className: Array.isArray(options[`${variant}Class`])
              ? options[`${variant}Class`]
              : [options[`${variant}Class`]],
          },
          children: [
            {
              type: 'element',
              tagName: 'div',
              properties: {
                className: ['code-section-inner'],
              },
              children: [...Object.values(children)],
            },
          ],
        }

        if (!options.swallow) parent[i].children.push(curNode)
        children = {}
      }
    } else if (isOpen) {
      if (
        parent.tagName === 'code' ||
        (parent.tagName === 'span' &&
          parent.properties?.className &&
          parent.properties.className.includes('hljs-params'))
      ) {
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
        // On the first highlighted line, trim the previous linebreak (not for param lines)
        if (isOpen === 1 && node.type === 'text' && !node.isParamLine)
          node.value = node.value.replace('\n', '')
        children[i] = { ...node }
        isOpen++
        node.__remove_dupes = true
      }
    }
  }

  const isParamsNode = (node) =>
    node?.properties?.className && node.properties.className.includes('hljs-params')

  const transform = (tree) => {
    visit(tree, (node) => isParamsNode(node), splitParams)
    visit(tree, () => true, visitor)
    remove(tree, (node) => node.__remove_dupes === true)
  }

  return transform
}
