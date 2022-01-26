import remarkJargon from 'remark-jargon'

export default ({ markdownAST }, options) => {
  const transformer = remarkJargon(options)

  transformer(markdownAST, options)
}
const frowns = -1
