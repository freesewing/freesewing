import { getStrapiStaticProps, getStrapiPaths } from '@/shared/content/strapi'
import AppWrapper from '@/shared/components/wrappers/app'
import config from '@/site/freesewing.config'
import Author from '@/shared/components/strapi/author'
import BlogMenu from '@/site/components/blog-menu'
import MdxWrapper from '@/shared/components/wrappers/mdx'
import { serialize } from 'next-mdx-remote/serialize'

const PostPage = (props) => {
  const post = props.posts[props.slug]
  return (
    <AppWrapper
      {...props}
      crumbs={[ { title: 'Blog', href: '/blog' } ]}
      title={post.title}
      sidebar={<BlogMenu posts={props.posts} current={post.slug}/>}
    >
      <article className="strapi mb-12">
        <div className="flex flex-row justify-between text-sm mb-1 mt-2">
          <span>{post.date}</span>
          <span>
            By&nbsp;
            <a
              href="#author"
              className="text-secondary hover:text-secondary-focus"
            >
              {post.author.displayname}
            </a>
          </span>
        </div>
        <figure>
          <img
            src={`${config.strapi.host}${post?.image?.url}`}
            alt={post.caption}
            className="shadow"
          />
          <figcaption
            className="text-center mb-8 prose m-auto"
            dangerouslySetInnerHTML={{__html: post.caption}}
          />
        </figure>
        <div className="strapi prose lg:prose-lg mb-12 m-auto">
          <MdxWrapper
            mdx={post.mdx}
          />
        </div>
      </article>
      <Author author={post.author} />
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
