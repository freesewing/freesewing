import { nsMerge, localePath } from 'shared/utils.mjs'
import { pages as posts } from 'site/prebuild/blog.mjs'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { loadMdxAsStaticProps } from 'shared/mdx/load.mjs'
import { PostLayout, ns as layoutNs } from 'site/components/layouts/post.mjs'
import { PageWrapper, ns as pageNs } from 'shared/components/wrappers/page.mjs'

const ns = nsMerge(pageNs, layoutNs)

const BlogPage = ({ dir, page, mdx, frontmatter }) => {
  return (
    <PageWrapper
      {...page}
      intro={frontmatter.intro}
      title={frontmatter.title}
      layout={(props) => (
        <PostLayout
          {...props}
          slug={page.path.join('/')}
          frontmatter={frontmatter}
          mdx={mdx}
          dir={dir}
          type="blog"
        />
      )}
    />
  )
}

export async function getStaticProps({ params, locale }) {
  return {
    props: {
      dir: params.dir,
      locale,
      ...(await serverSideTranslations(locale, ns)),
      ...(await loadMdxAsStaticProps({
        language: locale,
        site: 'org',
        slug: `blog/${params.dir}`,
      })),
      page: {
        locale,
        path: ['blog', params.dir],
      },
    },
  }
}

export const getStaticPaths = async () => {
  const paths = []
  for (const lang in posts) {
    paths.push(...Object.keys(posts[lang]).map((slug) => localePath(lang, slug)))
  }
  return { paths, fallback: false }
}

export default BlogPage
