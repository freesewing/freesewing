import GithubSlugger from 'github-slugger'

const defaultOptions = {
  maxDepth: 4,
}

const nodeAsTocEntry = (node, slugger) => ({
  text: node.children[0].value,
  level: node.depth,
  slug: slugger.slug(node.children[0].value),
})

const extractToc = (node, options, slugger) => {
  const toc = []
  for (const el of node.children.filter((node) => node.type === 'heading')) {
    if (el.depth <= options.maxDepth) toc.push(nodeAsTocEntry(el, slugger))
  }

  return toc
}

const asObjectPropertyString = (key, val) => ({
  type: 'Property',
  method: false,
  shorthand: false,
  computed: false,
  kind: 'init',
  key: { type: 'Literal', value: key },
  value: { type: 'Literal', value: val },
})

const tocAsProperty = (toc) => ({
  type: 'Property',
  method: false,
  shorthand: false,
  computed: false,
  kind: 'init',
  key: { type: 'Literal', value: 'toc' },
  value: {
    type: 'ArrayExpression',
    elements: toc.map((entry) => ({
      type: 'ObjectExpression',
      properties: [
        asObjectPropertyString('title', entry.text || 'FIXME: Title not found in toc'),
        asObjectPropertyString('level', entry.level),
        asObjectPropertyString('slug', entry.slug),
      ],
    })),
  },
})

export default function mdxToc(options = {}) {
  return (node) => {
    const slugger = new GithubSlugger()
    options = { ...defaultOptions, options }
    const esm = node.children.filter((child) => child.type === 'mdxjsEsm')
    if (
      esm &&
      esm.length === 1 &&
      esm[0].data?.estree?.body?.[0]?.declaration?.declarations?.[0]?.init?.properties
    )
      esm[0].data.estree.body[0].declaration.declarations[0].init.properties.push(
        tocAsProperty(extractToc(node, options, slugger))
      )

    return node
  }
}
