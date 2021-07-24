import { serialize } from 'next-mdx-remote/serialize'
import mdx from '../lib/mdx'

export const getMdxPaths = mdx.getPaths

export const getMdxStaticProps = async (folder, lang='en', path=false) => {
  const [paths, pages] = await mdx.get(folder, lang)
  const props = { paths, pages }
  if (path) {
    const rawMdx = mdx.loadFile(path)
    const { content, data } = mdx.matter(rawMdx)
    props.href = `/${path}`
    props.mdx = await serialize(content)
    props.frontmatter = data
  }

  return props
}

