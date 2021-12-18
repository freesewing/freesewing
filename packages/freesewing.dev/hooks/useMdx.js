import path from 'path'

const useMdx = (slug=false) => {
  if (!slug) null
  const file = ['markdown', 'dev', ...slug.split('/'), 'en.md'].join('/')
  const mdx = require(file)
  return <p>{file}</p>
}

export default useMdx
