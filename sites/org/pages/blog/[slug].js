import Page from 'site/components/wrappers/page.js'
import useApp from 'site/hooks/useApp.js'
import TimeAgo from 'react-timeago'
import MdxWrapper from 'shared/components/wrappers/mdx'
import mdxCompiler from 'shared/mdx/compiler'
import Head from 'next/head'
import Lightbox from 'shared/components/lightbox.js'
import ImageWrapper from 'shared/components/wrappers/img.js'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { strapiHost } from 'shared/config/freesewing.mjs'
import { strapiImage } from 'shared/utils.js'

const Author = ({ author }) => (
  <div id="author" className="flex flex-col lg:flex-row m-auto p-2 items-center">
    <div className="theme-gradient w-40 h-40 p-2 rounded-full aspect-square hidden lg:block">
      <div
        className={`
          w-lg bg-cover bg-center rounded-full aspect-square
          hidden lg:block
        `}
        style={{backgroundImage: `url(${strapiHost}${author?.image?.sizes?.small?.url})`}}
      >
      </div>
    </div>

    <div className="theme-gradient p-2 rounded-full aspect-square w-40 h-40 lg:hidden m-auto">
      <img
        className={`block w-full h-full mx-auto rounded-full`}
        src={`${strapiHost}${author?.image?.sizes.small.url}`}
        alt={author?.displayname}
        width={author?.image?.sizes.small.w}
        height={author?.image?.sizes.small.h}
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
        <MdxWrapper mdx={author?.mdx} />
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
          <Lightbox>
            <ImageWrapper>
              <img
                src={`${strapiHost}${post.image.url}`}
                alt={post.caption}
                className="shadow m-auto"
              />
            </ImageWrapper>
            <figcaption
              className="text-center mb-8 prose m-auto mt-1"
              dangerouslySetInnerHTML={{__html: post.caption}}
            />
          </Lightbox>
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
}

/*
 * getStaticProps() is used to fetch data at build-time.
 *
 * On this page, it is loading the blog content from strapi.
 *
 * This, in combination with getStaticPaths() below means this
 * page will be used to render/generate all blog content.
 *
 * To learn more, see: https://nextjs.org/docs/basic-features/data-fetching
 */
export async function getStaticProps({ params, locale }) {

  const { slug } = params
  const post = await fetch(
    `${strapiHost}/blogposts?_locale=${locale}&dev_ne=true&slug_eq=${slug}`
  )
  .then(response => response.json())
  .then(data => data[0])
  .catch(err => console.log(err))

  return {
    props: {
      post: {
        slug,
        ...(await mdxCompiler(post.body)),
        title: post.title,
        date: post.date,
        caption: post.caption,
        image: {
          w: post.image.width,
          h: post.image.height,
          url: post.image.url
        },
      },
      author: {
        displayname: post.author.displayname,
        slug: post.author.slug,
        about: post.author.about,
        image: strapiImage(post.author.picture, ['small']),
        ...(await mdxCompiler(post.author.about)),
      },
      ...(await serverSideTranslations(locale)),
    }
  }
}

export const getStaticPaths = async () => {
  const paths = await fetch(
    `${strapiHost}/blogposts?_locale=en&dev_ne=true&_limit=-1`
  )
  .then(response => response.json())
  .then(data => data.map(post => `/blog/${post.slug}`))
  .catch(err => console.log(err))

  return {
    paths: [
      ...paths,
      ...paths.map(p => `/de${p}`),
      ...paths.map(p => `/es${p}`),
      ...paths.map(p => `/fr${p}`),
      ...paths.map(p => `/nl${p}`),
    ],
    fallback: false,
  }
}

export default PostPage

