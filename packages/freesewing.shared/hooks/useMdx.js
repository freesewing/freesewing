import { paths, pages } from '@/site/prebuild/en.mdx'

const useMdx = (post=false) => {
  if (!post) {
    for (const [slug, page] of Object.entries(pages)) {
    }
  }


  return {paths,pages}
}

export default useMdx
