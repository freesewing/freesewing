/*
 * This is a remark plugin that will pull the (text of the)
 * first few  paragraph out of a markdown document and add it
 * as the `lead` field in the documents's frontmatter.
 *
 * It will only do anything if the document has frontmatter.
 * It also places this in the *lead* frontmatter key so that
 * people can manually specify a *intro* key that will take
 * precendence.
 *
 * I wrote this specifically to pull the intro out of our
 * markdown content for SEO and open graph.
 * I'm not publishing this as a proper remark plugin because
 * while this works for our use-cases, it may or may not
 * work for the many different ways people use markdown and
 * remark out there.
 */

const extractIntro = (node) => {
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
  key: { type: 'Literal', value: 'lead' },
  value: { type: 'Literal', value: intro },
})

export function remarkIntroAsFrontmatter() {
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
