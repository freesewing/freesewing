import Page from 'shared/components/wrappers/page.js'
import useApp from 'site/hooks/useApp.js'
import strapiLoader from 'shared/strapi/loader'
import { posts } from 'site/prebuild/strapi.blog.en.js'
import TimeAgo from 'react-timeago'
import MdxWrapper from 'shared/components/wrappers/mdx'
import Markdown from 'react-markdown'
import Image from 'next/image'

const strapi = "https://posts.freesewing.org"

const Author = ({ author }) => (
  <div id="author" className="flex flex-col lg:flex-row m-auto p-2 items-center">
    <div className="theme-gradient w-40 h-40 p-2 rounded-full aspect-square hidden lg:block">
      <div
        className={`
          w-lg bg-cover bg-center rounded-full aspect-square
          hidden lg:block
        `}
        style={{backgroundImage: `url(${strapi}${author?.img})`}}
      >
      </div>
    </div>

    <div className="theme-gradient p-2 rounded-full aspect-square w-40 h-40 lg:hidden m-auto">
      <img
        className={`block w-full h-full mx-auto rounded-full`}
        src={`${strapi}${author?.img}`}
        alt={author?.displayname}
        width={author?.picture?.width}
        height={author?.picture?.height}
      />
    </div>
    <div className={`
        text-center p-2 px-4 rounded-r-lg bg-opacity-50
        lg:text-left
      `}
    >
      <p className="text-xl">
        <span className="font-semibold"> {author?.displayname}</span>
        <span className="text-sm pl-2 opacity-70">Wrote this</span>
      </p>
      <div className="prose mdx">
        <Markdown>{author?.about}</Markdown>
      </div>
    </div>
  </div>
)

const PostPage = ({ post, author }) => {
  const app = useApp()

  return (
    <Page app={app} title={post.title}>
      <article className="mb-12">
        <div className="flex flex-row justify-between text-sm mb-1 mt-2">
          <span><TimeAgo date={post.date} /> [{post.date}]</span>
          <span>
            By <a
              href="#author"
              className="text-secondary hover:text-secondary-focus"
            >
              {author?.displayname || 'FIXME: No displayname'}
            </a>
          </span>
        </div>
        <figure>
          <img
            src={`${strapi}${post.image.formats.large.url}`}
            alt={post.caption}
            className="shadow m-auto"
          />
          <figcaption
            className="text-center mb-8 prose m-auto"
            dangerouslySetInnerHTML={{__html: post.caption}}
          />
        </figure>
        <div className="strapi prose lg:prose-lg mb-12 m-auto">
          <MdxWrapper mdx={post.mdx} app={app} />
        </div>
        <div className="max-w-prose text-lg lg:text-xl">
          <Author author={author} />
        </div>
      </article>
    </Page>
  )

  return (
    <Page app={app} title='Blog' slug='blog'>
      <article className="mb-12">
        <div className="strapi prose lg:prose-lg mb-12 m-auto">
          <MdxWrapper mdx={props.post.mdx} />
        </div>
      </article>
      <Author author={author} type={props.type} t={props.t}/>
      <pre>{JSON.stringify(props, null, 2)}</pre>
    </Page>
  )
}

export const getStaticProps = async (props) => {
  const { post, author } = await strapiLoader('en', 'dev', 'blog', props.params.slug)

  return { props: { post, author, slug: `blog/${props.params.slug}` } }
}

export const getStaticPaths = async () => {
  const paths = []
  for (const post of posts) paths.push({
    params: {slug: post.slug}
  })

  return {
    paths,
    fallback: false,
  }
}

export default PostPage
