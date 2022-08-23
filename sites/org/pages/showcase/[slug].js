import Page from 'site/components/wrappers/page.js'
import useApp from 'site/hooks/useApp.js'
import TimeAgo from 'react-timeago'
import MdxWrapper from 'shared/components/wrappers/mdx'
import mdxCompiler from 'shared/mdx/compiler'
import PageLink from 'shared/components/page-link.js'
import Lightbox from 'shared/components/lightbox.js'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { strapiHost } from 'shared/config/freesewing.mjs'
import { strapiImage } from 'shared/utils.js'
import { useTranslation } from 'next-i18next'

const Maker = ({ maker }) => {
  const { t } = useTranslation(['posts'])

  return (
    <div id="maker" className="flex flex-col lg:flex-row m-auto p-2 items-center">
      <div className="theme-gradient w-40 h-40 p-2 rounded-full aspect-square hidden lg:block">
        <div
          className={`
            w-lg bg-cover bg-center rounded-full aspect-square
            hidden lg:block
          `}
          style={{backgroundImage: `url(${strapiHost}${maker?.image?.sizes?.small?.url})`}}
        >
        </div>
      </div>

      <div className="theme-gradient p-2 rounded-full aspect-square w-40 h-40 lg:hidden m-auto">
        <img
          className={`block w-full h-full mx-auto rounded-full`}
          src={`${strapiHost}${maker?.image?.sizes.small.url}`}
          alt={maker?.displayname}
          width={maker?.image?.sizes.small.w}
          height={maker?.image?.sizes.small.h}
        />
      </div>
      <div className={`
          text-center p-2 px-4 rounded-r-lg bg-opacity-50
          lg:text-left
        `}
      >
        <p className="text-xl"
          dangerouslySetInnerHTML={{
            __html: t('xMadeThis', { x: maker?.displayname })
        }} />
        <div className="prose mdx">
          <MdxWrapper mdx={maker?.mdx} />
        </div>
      </div>
    </div>
  )
}

const PostPage = ({ post, maker }) => {
  const app = useApp()
  const crumbs = [
    app.getBreadcrumb('showcase'),
    [ post.title ]
  ]

  return (
    <Page app={app} title={post.title} crumbs={crumbs} >
      <article className="mb-12 px-8 max-w-7xl">
        <div className="flex flex-row justify-between text-sm mb-1 mt-2">
          <div><TimeAgo date={post.date} /> [{post.date}]</div>
          <div>{post.designs.map(design => (
            <PageLink href={`/showcase/designs/${design}`}
            txt={design} key={design} className="px-2 capitalize" />
          ))}</div>
          <div>
            By <a
              href="#maker"
              className="text-secondary hover:text-secondary-focus"
            >
              {maker.displayname || 'FIXME: No displayname'}
            </a>
          </div>
        </div>
        <figure>
          <Lightbox>
            <img
              src={`${strapiHost}${post.image.url}`}
              alt={post.caption}
              className="shadow m-auto max-h-full"
            />
            <figcaption
              className="text-center mb-8 prose m-auto"
              dangerouslySetInnerHTML={{__html: post.caption}}
            />
          </Lightbox>
        </figure>
        <div className="strapi prose lg:prose-lg mb-12 m-auto">
          <MdxWrapper mdx={post.mdx} app={app} />
        </div>
        <div className="max-w-prose text-lg lg:text-xl">
          <Maker maker={maker} />
        </div>
      </article>
    </Page>
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
  const post = await fetch(
    `${strapiHost}/showcaseposts?_locale=${locale}&slug_eq=${slug}`
  )
  .then(response => response.json())
  .then(data => data[0])
  .catch(err => console.log(err))

  const designs = [post.design1]
  if (post.design2 && post.design2.length > 2) designs.push(post.design2)
  if (post.design3 && post.design3.length > 2) designs.push(post.design3)

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
        designs,
      },
      maker: {
        displayname: post.maker.displayname,
        slug: post.maker.slug,
        image: strapiImage(post.maker.picture, ['small']),
        ...(await mdxCompiler(post.maker.about)),
      },
      ...(await serverSideTranslations(locale)),
    }
  }
}

export const getStaticPaths = async () => {
  const paths = await fetch(
    `${strapiHost}/showcaseposts?_locale=en&_limit=-1`
  )
  .then(response => response.json())
  .then(data => data.map(post => ({ params: { slug: post.slug } })))
  .catch(err => console.log(err))

  return {
    paths,
    fallback: false,
  }
}

export default PostPage

