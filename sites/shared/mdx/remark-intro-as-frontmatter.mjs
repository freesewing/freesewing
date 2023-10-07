const extractIntro = (node, options, slugger) => {
  const intro = []
  for (const el of node.children.filter((node) => node.type === 'paragraph').slice(0, 3)) {
    for (const child of el.children) {
      if (child.type === 'text' && child.value) intro.push(child.value)
      else if (['link', 'strong', 'emphasis'].includes(child.type) && child.children) {
        for (const grandchild of child.children) {
          if (grandchild.type === 'text' && grandchild.value) intro.push(grandchild.value)
        }
      }
    }
  }

  return intro.length < 1 ? 'FIXME -- No intro found' : intro.join('')
}

const introAsProperty = (intro) => ({
  type: 'Property',
  method: false,
  shorthand: false,
  computed: false,
  kind: 'init',
  key: { type: 'Literal', value: 'intro' },
  value: { type: 'Literal', value: intro },
})

export function remarkIntroAsFrontmatter(options = {}) {
  return (node) => {
    const esm = node.children.filter((child) => child.type === 'mdxjsEsm')
    if (
      esm &&
      esm.length === 1 &&
      esm[0].data?.estree?.body?.[0]?.declaration?.declarations?.[0]?.init?.properties
    )
      esm[0].data.estree.body[0].declaration.declarations[0].init.properties.push(
        introAsProperty(extractIntro(node))
      )

    return node
  }
}
