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
  for (const el of node.children) {
    if (el.type === 'heading' && el.depth <= options.maxDepth && el.children[0].value) {
      toc.push(nodeAsTocEntry(el, slugger))
    }
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
  options = { ...defaultOptions, options }
  return (node) => {
    const slugger = new GithubSlugger()
    const esm = node.children.find((child) => child.type === 'mdxjsEsm')
    if (esm && esm.data?.estree?.body?.[0]?.declaration?.declarations?.[0]?.init?.properties)
      esm.data.estree.body[0].declaration.declarations[0].init.properties.push(
        tocAsProperty(extractToc(node, options, slugger))
      )

    return node
  }
}
