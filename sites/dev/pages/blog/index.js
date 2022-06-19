import Page from 'site/components/wrappers/page.js'
import useApp from 'site/hooks/useApp.js'
import Link from 'next/link'
import TimeAgo from 'react-timeago'
import { strapiHost } from 'shared/config/freesewing.mjs'
import { strapiImage } from 'shared/utils'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

const strapi = "https://posts.freesewing.org"
const textShadow = {
  style: {
    textShadow: "1px 1px 1px #000000, -1px -1px 1px #000000, 1px -1px 1px #000000, -1px 1px 1px #000000, 2px 2px 1px #000000"
  }
}

const Preview = ({ app, post }) => (
  <div className="shadow rounded-lg">
    <Link href={`/blog/${post.slug}`}>
      <a title={post.title} className="hover:underline">
        <div className="bg-base-100 w-full aspect-video shadow flex flex-column items-end rounded-lg" style={{
          backgroundImage: `url(${strapi}${post.image.sizes.medium.url})`,
          backgroundSize: 'cover',
        }}>
          <div className="grow"></div>
          <div className="text-right mb-3 lg:mb-8">
            <div className={`
              bg-neutral text-neutral-content bg-opacity-40 text-right
              px-4 py-1
              lg:px-8 lg:py-4

            `}>
              <h5 className={`
                text-neutral-content
                text-xl font-bold
                md:text-2xl md:font-normal
                xl:text-3xl
              `} {...textShadow}
              >
                {post.title}
              </h5>
              <p className={`
                hidden md:block
                m-0 p-1 -mt-2
                text-neutral-content
                leading-normal text-sm font-normal
                opacity-70
              `}{ ...textShadow}>
                <TimeAgo date={post.date} /> by <strong>{post.author}</strong>
              </p>
            </div>
          </div>
        </div>
      </a>
    </Link>
  </div>
)

const BlogIndexPage = (props) => {
  const app = useApp()
  const { t } = useTranslation()

  return (
    <Page app={app} title={t('blog')} slug='blog'>
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 max-w-7xl">
        {props.posts.map(post => <Preview app={app} post={post} key={post.slug}/>)
        }
      </div>
    </Page>
  )
}

export default BlogIndexPage

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

  const posts = await fetch(
    `${strapiHost}/blogposts?_locale=en&_sort=date:DESC&dev_eq=true`
  )
  .then(response => response.json())
  .then(data => data)
  .catch(err => console.log(err))

  return {
    props: {
      posts: posts.map(post => ({
        slug: post.slug,
        title: post.title,
        date: post.date,
        author: post.author.displayname,
        image: strapiImage(post.image, ['medium']),
      })),
      ...(await serverSideTranslations(locale)),
    }
  }
}

