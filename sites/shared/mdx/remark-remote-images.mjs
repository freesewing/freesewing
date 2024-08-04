//  __SDEFILE__ - This file is a dependency for the stand-alone environment
/*
 * This is a remark plugin that will update the src of local images to
 * load them from the server. It is used when we load markdown/mdx dynamically
 * for client-side rendering.
 */
import { visit } from 'unist-util-visit'

export const remotePrefix = '/markdown'

const convertUrl = ({ site, slug, url }) => {
  if (url.slice(0, 1) === 'http://') return url
  if (url.slice(0, 7) === 'http://') return url
  if (url.slice(0, 8) === 'https://') return url

  return `${remotePrefix}/${site}/${slug}/${url}`
}

export function remarkRemoteImages({ site, slug }) {
  return (tree) => {
    visit(tree, function (node) {
      if (node.type === 'image') node.url = convertUrl({ site, slug, url: node.url })

      return node
    })

    return tree
  }
}
