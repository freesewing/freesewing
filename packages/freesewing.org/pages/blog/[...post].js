import { getStrapiStaticProps, getStrapiPaths } from '@/shared/content/strapi'
import AppWrapper from '@/shared/components/wrappers/app'
import config from '@/site/freesewing.config'
import Author from '@/shared/components/strapi/author'
import BlogMenu from '@/site/components/blog-menu'
import MdxWrapper from '@/shared/components/wrappers/mdx'
import { serialize } from 'next-mdx-remote/serialize'
import PageTemplate from '@/shared/pages/blog/post'

const PostPage = (props) => {
  const post = props.posts[props.slug]
  return (
    <AppWrapper
      {...props}
      crumbs={[ { title: 'Blog', href: '/blog' } ]}
      title={post.title}
      sidebar={<BlogMenu posts={props.posts} current={post.slug}/>}
    >
      <PageTemplate {...props} config={config} post={post} />
    </AppWrapper>
  );
};

export const getStaticProps = async (props) => {
  const posts = await getStrapiStaticProps('blog', config.site, config.language)
  if (posts.posts[props.params.post]) {
    posts.posts[props.params.post].mdx = await serialize(posts.posts[props.params.post].body)
  }

  return { props: { ...posts, slug: props.params.post } }
}

export const getStaticPaths = async () => {
  const paths = await getStrapiPaths('blog', config.site, config.language)

  const re = {
    paths,
    fallback: false,
  }

  return re
}

export default PostPage
