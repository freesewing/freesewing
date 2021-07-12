import { getStrapiStaticProps, getStrapiPaths } from 'shared/content/strapi'
import AppWrapper from 'shared/components/wrappers/app'
import config from 'site/freesewing.config'
import Author from 'shared/components/strapi/author'
import BlogMenu from 'site/components/blog-menu'
import Markdown from 'react-markdown'

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
            src={`${config.strapi.host}${post.image.url}`}
            alt={post.caption}
            className="shadow"
          />
          <figcaption className="text-center mb-8">{post.caption}</figcaption>
        </figure>
        <div className="strapi prose lg:prose-lg mb-12">
          <Markdown>{post.body}</Markdown>
        </div>
      </article>
      <Author author={post.author} />
    </AppWrapper>
  );
};

export const getStaticProps = async (props) => {
  const posts = await getStrapiStaticProps(config.site)

  return { props: { ...posts, slug: props.params.post } }
}

export const getStaticPaths = async () => {
  const paths = await getStrapiPaths(config.site)

  const re = {
    paths,
    fallback: false,
  }

  return re
}

export default PostPage
