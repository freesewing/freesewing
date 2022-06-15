import {toc} from 'mdast-util-toc'

const headings = {
  en: 'Table of contents',
  fr: 'Table des matières',
  nl: 'Inhoudsopgave',
  es: 'Tabla de contenido',
  de: 'Inhaltsverzeichnis'
}

export default function mdxToc(options = {}) {
  return (node) => {
    const result = toc(node, { heading: false })

    if (result.map) node.children = [
      {
        type: 'heading',
        depth: 4,
        children: [{
          type: 'text',
          value: headings[options.language || 'en']
        }]
      },
      result.map
    ]
    else node.children = []

    return
  }
}
