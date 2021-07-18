import { getStrapiStaticProps, getStrapiPaths } from '@/shared/content/strapi'
import { serialize } from 'next-mdx-remote/serialize'
import AppWrapper from '@/shared/components/wrappers/app'
import PageTemplate from '@/shared/pages/blog/post'
import config from '@/site/freesewing.config'

const PostPage = (props) => (
  <AppWrapper
    crumbs={[ { title: 'Blog', href: '/blog' } ]}
    title={props.post.title}
  >
    <PageTemplate {...props} config={config} post={props.post} />
  </AppWrapper>
)

export const getStaticProps = async (props) => {
  const posts = await getStrapiStaticProps('blog', config.site)
  const post = {}
  if (posts.posts[props.params.post]) {
    const p = posts.posts[props.params.post]
    post.mdx =  await serialize(posts.posts[props.params.post].body)
    for (const field of config.strapi.blogpost) post[field] = posts.posts[props.params.post][field]
  }

  return { props: { post, slug: props.params.post } }
}

export const getStaticPaths = async () => {
  const paths = await getStrapiPaths('blog', config.site)

  return {
    paths,
    fallback: false,
  }
}

export default PostPage
