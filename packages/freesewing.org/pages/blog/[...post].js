import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { getStrapiStaticProps, getStrapiPaths } from '@/shared/content/strapi'
import { useTranslation } from 'next-i18next'
import AppWrapper from '@/shared/components/wrappers/app'
import config from '@/site/freesewing.config'
import { serialize } from 'next-mdx-remote/serialize'
import PageTemplate from '@/shared/pages/post/post'

const PostPage = (props) => {
  const { t } = useTranslation('common')
  const post = props.posts[props.slug]
  return (
    <AppWrapper t={t} title={post.title} {...props}>
      <PageTemplate {...props} config={config} post={post} t={t} type='blog'/>
    </AppWrapper>
  );
};

export const getStaticProps = async ({params, locale}) => {
  const posts = await getStrapiStaticProps('blog', config.site, config.language)
  if (posts.posts[params.post]) {
    posts.posts[params.post].mdx = await serialize(posts.posts[params.post].body)
    posts.posts[params.post].page = params.post
  }

  return {
    props: {
      ...posts,
      slug: params.post,
      ...(await serverSideTranslations(locale, ['common']))
    }
  }
}

export const getStaticPaths = async (context) => {
  const basePaths = await getStrapiPaths('blog', config.site, config.language)
  const paths = []
  for (const path of basePaths) {
    for (const locale of context.locales) {
      paths.push({params: {post: path.split('/').slice(2)} , locale})
    }
  }

  return { paths, fallback: false }
}

export default PostPage
