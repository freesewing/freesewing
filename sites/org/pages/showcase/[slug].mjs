import { order } from 'site/prebuild/showcase-paths.mjs'
import { getPostSlugPaths } from 'site/components/mdx/posts/utils.mjs'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useDynamicMdx } from 'shared/hooks/use-dynamic-mdx.mjs'
import { useCallback } from 'react'
import { PostLayout, ns as layoutNs } from 'site/components/layouts/post.mjs'
import { PostArticle, ns as postNs } from 'site/components/mdx/posts/article.mjs'
import { PageWrapper, ns as pageNs } from 'shared/components/wrappers/page.mjs'

const namespaces = [...layoutNs, ...postNs, ...pageNs]

const ShowcasePage = ({ locale, slug, page }) => {
  const loader = useCallback(
    () => import(`orgmarkdown/showcase/${slug}/${locale}.md`),
    [slug, locale]
  )

  const { frontmatter, MDX } = useDynamicMdx(loader)
  if (!MDX) return null
  return (
    <PageWrapper
      {...page}
      locale={locale}
      title={frontmatter.title}
      layout={(props) => <PostLayout {...props} {...{ slug: page.path.join('/'), frontmatter }} />}
    >
      <PostArticle
        {...{
          slug,
          frontmatter,
          MDX,
          page,
        }}
      />
    </PageWrapper>
  )
}

/*
 * getStaticProps() is used to fetch data at build-time.
 *
 * On this page, it is loading the showcase content from strapi.
 *
 * This, in combination with getStaticPaths() below means this
 * page will be used to render/generate all showcase content.
 *
 * To learn more, see: https://nextjs.org/docs/basic-features/data-fetching
 */
export async function getStaticProps({ params, locale }) {
  const { slug } = params

  return {
    props: {
      slug,
      locale,
      ...(await serverSideTranslations(locale, namespaces)),
      page: {
        locale,
        path: ['showcase', slug],
      },
    },
  }
}

export const getStaticPaths = async () => {
  return {
    paths: getPostSlugPaths(order),
    fallback: 'blocking',
  }
}

export default ShowcasePage
