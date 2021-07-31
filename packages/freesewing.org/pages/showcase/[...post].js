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
      <PageTemplate {...props} config={config} post={post} t={t} type='showcase'/>
    </AppWrapper>
  );
};

export const getStaticProps = async ({params, locale}) => {
  const posts = await getStrapiStaticProps('showcase', config.site, config.language)
  if (posts.posts[params.post]) {
    posts.posts[params.post].mdx = await serialize(posts.posts[params.post].body)
  }

  return {
    props: {
      ...posts,
      slug: params.post,
      ...(await serverSideTranslations(locale, ['common']))
    }
  }
}

export const getStaticPaths = async () => {
  const paths = await getStrapiPaths('showcase', config.site, config.language)

  const re = {
    paths,
    fallback: false,
  }

  return re
}

export default PostPage
