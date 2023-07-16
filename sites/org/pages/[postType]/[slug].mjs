import { useCompiledMdx } from 'shared/components/docs/docs-page.mjs'
import { mdxLoader } from 'shared/mdx/v3loader.mjs'
import { order as showcaseOrder } from 'site/prebuild/showcase-paths.mjs'
import { order as blogOrder } from 'site/prebuild/blog-paths.mjs'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { PostPageWrapper, ns as pageNs } from 'site/components/posts/page-wrapper.mjs'
import { localeSlug } from 'shared/utils.mjs'

const preGenerate = 6
const namespaces = [...pageNs]

const orders = {
  showcase: showcaseOrder,
  blog: blogOrder,
}
const PostPage = ({ page, slug, locale, mdx }) => {
  const { mdxContent, frontmatter } = useCompiledMdx(mdx, 'org')

  return <PostPageWrapper {...{ page, slug, locale, frontmatter, mdxContent }} />
}

export default PostPage

/*
 * getStaticProps() is used to fetch data at build-time.
 * To learn more, see: https://nextjs.org/docs/basic-features/data-fetching
 */
export async function getStaticProps({ locale, params }) {
  const slug = `${params.postType}/${params.slug}`

  if (orders[params.postType][locale].indexOf(slug) === -1) {
    return {
      notFound: true,
    }
  }

  return {
    props: {
      ...(await serverSideTranslations(locale, [params.postType, ...pageNs])),
      ...(await mdxLoader(locale, 'org', slug)),
      slug,
      locale,
      page: {
        locale,
        path: [params.postType, params.slug],
      },
    },
  }
}

/*
 * getStaticPaths() is used to specify for which routes (think URLs)
 * this page should be used to generate the result.
 *
 * On this page, it is returning a list of routes (think URLs) for all
 * the mdx (markdown) content.
 * That list comes from mdxMeta, which is build in the prebuild step
 * and contains paths, titles, and intro for all markdown.
 *
 * To learn more, see: https://nextjs.org/docs/basic-features/data-fetching
 */
export async function getStaticPaths() {
  const paths = []
  for (const postType of ['blog', 'showcase']) {
    for (const lang in orders[postType]) {
      let i = 0,
        counter = 0
      while (i < preGenerate && counter < 20) {
        counter++
        const slug = orders[postType][lang][i]
        if (!slug) continue

        paths.push(localeSlug(lang, `/${orders[postType][lang][i]}`))
        i++
      }
    }
  }

  return {
    paths,
    fallback: true,
  }
}
