import Page from 'shared/components/wrappers/page.js'
import useApp from 'site/hooks/useApp.js'
import strapiLoader from 'shared/strapi/loader'
import { posts } from 'site/prebuild/strapi.blog.en.js'
import TimeAgo from 'react-timeago'
import MdxWrapper from 'shared/components/wrappers/mdx'
import Markdown from 'react-markdown'
import Head from 'next/head'
import HelpUs from 'site/components/help-us.js'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

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
      <Head>
        <meta property="og:title" content={post.title} key="title" />
        <meta property="og:type" content="article" key='type' />
        <meta property="og:description" content={post.intro || post.title} key='description' />
        <meta property="og:article:author" content={author.displayname} key='author' />
        <meta property="og:url" content={`https://freesewing.dev/blog/${post.slug}`} key='url' />
        <meta property="og:image" content={`https://canary.backend.freesewing.org/og-img/en/dev/blog/${post.slug}`} key='image' />
        <meta property="og:image:type" content="image/png" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:locale" content="en_US" key='locale' />
        <meta property="og:site_name" content="freesewing.dev" key='site' />
      </Head>
      <article className="mb-12">
        <div className="flex flex-row justify-between text-sm mb-1 mt-2">
          <span><TimeAgo date={post.date} /> [{post.date}]</span>
          <span>
            By <a
              href="#author"
              className="text-secondary hover:text-secondary-focus"
            >
              {author.displayname || 'FIXME: No displayname'}
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
        <HelpUs blog slug={`/blog/${post.slug}`} />
      </article>
    </Page>
  )
}

export const getStaticProps = async (props) => {
  const { post, author } = await strapiLoader('en', 'dev', 'blog', props.params.slug)

  return {
    props: {
      post,
      author,
      slug: `blog/${props.params.slug}`,
      ...(await serverSideTranslations(props.locale)),
    }
  }
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

