import { nsMerge } from 'shared/utils.mjs'
import { pages as posts } from 'site/prebuild/showcase.mjs'
import { getPostSlugPaths } from 'site/components/mdx/posts/utils.mjs'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { loadMdxAsStaticProps } from 'shared/mdx/load.mjs'
import { PageWrapper, ns as pageNs } from 'shared/components/wrappers/page.mjs'
import { PostLayout, ns as layoutNs } from 'site/components/layouts/post.mjs'

const ns = nsMerge(pageNs, layoutNs)

const ShowcasePage = ({ dir, page, mdx, frontmatter }) => {
  return (
    <PageWrapper
      {...page}
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
  const { dir } = params

  // if the dir isn't present in the prebuilt posts, return 404
  if (!Object.keys(posts[locale]).includes(`showcase/${dir}`)) return { notFound: true }

  return {
    props: {
      dir,
      locale,
      ...(await serverSideTranslations(locale, ns)),
      ...(await loadMdxAsStaticProps({
        language: locale,
        site: 'org',
        slug: `showcase/${params.dir}`,
      })),
      page: {
        locale,
        path: ['showcase', dir],
      },
    },
  }
}

export const getStaticPaths = async () => {
  return {
    paths: getPostSlugPaths(posts),
    fallback: 'blocking',
  }
}

export default ShowcasePage
