/*
 * This is a remark plugin that will update the src of local images to
 * load them from Github. It is used when we load markdown/mdx dynamically
 * from Github rather than from disk.
 */
import { visit } from 'unist-util-visit'

export const ghPrefix = 'https://raw.githubusercontent.com/freesewing/freesewing/develop/markdown'

const convertUrl = ({ site, slug, url }) => {
  if (url.slice(0, 1) === 'http://') return url
  if (url.slice(0, 7) === 'http://') return url
  if (url.slice(0, 8) === 'https://') return url

  return `${ghPrefix}/${site}/${slug}/${url}`
}

export function remarkGithubImages({ site, slug }) {
  return (tree) => {
    visit(tree, function (node) {
      if (node.type === 'image') node.url = convertUrl({ site, slug, url: node.url })

      return node
    })

    return tree
  }
}
