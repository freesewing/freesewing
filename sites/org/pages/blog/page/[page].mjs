// Dependencies
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { pages as posts } from 'site/prebuild/blog.mjs'
import { meta } from 'site/prebuild/blog-meta.mjs'
import { getPostIndexPaths, getPostIndexProps } from 'site/components/mdx/posts/utils.mjs'
import { cloudflareImageUrl } from 'shared/utils.mjs'
import { nsMerge } from 'shared/utils.mjs'
// Hooks
import { useTranslation } from 'next-i18next'
// Components
import Link from 'next/link'
import { TimeAgo, ns as timeagoNs } from 'shared/components/timeago/index.mjs'
import { PageWrapper, ns as pageNs } from 'shared/components/wrappers/page.mjs'
import { Pagination } from 'shared/components/navigation/pagination.mjs'

// Translation namespaces used on this page
const namespaces = nsMerge('designs', 'sections', pageNs, timeagoNs)

const textShadow = {
  style: {
    textShadow:
      '1px 1px 1px #000000, -1px -1px 1px #000000, 1px -1px 1px #000000, -1px 1px 1px #000000, 2px 2px 1px #000000',
  },
}

const Preview = ({ post, t }) => (
  <div className="shadow rounded-lg">
    <Link href={`/${post.s}`} className="hover:underline">
      <div
        className="bg-base-100 w-full h-full overflow-hidden shadow flex flex-column items-center rounded-lg"
        style={{
          backgroundImage: `url(${cloudflareImageUrl({
            id: post.s.replace('/', '-'),
            variant: 'w500',
          })})`,
          backgroundSize: 'cover',
        }}
      >
        <div className="text-right my-2 w-full">
          <div
            className={`
              bg-neutral text-neutral-content bg-opacity-40 text-right
              px-4 py-1
              lg:px-8 lg:py-4

            `}
          >
            <h5
              className={`
                text-neutral-content
                text-xl font-bold
                md:text-2xl md:font-normal
                xl:text-3xl
              `}
              {...textShadow}
            >
              {post.t}
            </h5>
            <p
              className={`
                hidden md:block
                m-0 p-1 -mt-2
                text-neutral-content
                leading-normal text-sm font-normal
                opacity-70
              `}
              {...textShadow}
            >
              <TimeAgo date={post.d} t={t} /> by <strong>{post.a}</strong>
            </p>
          </div>
        </div>
      </div>
    </Link>
  </div>
)

/*
 * Each page MUST be wrapped in the PageWrapper component.
 * You also MUST spread props.page into this wrapper component
 * when path and locale come from static props (as here)
 * or set them manually.
 */
const BlogIndexPage = ({ posts, page, current, total }) => {
  const { t } = useTranslation()
  return (
    <PageWrapper {...page} t={t('sections:blog')}>
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 xl:grid-cols-3 max-w-7xl lg:pr-4 xl:pr-6">
        {posts.map((post) => (
          <Preview post={post} t={t} key={post.s} />
        ))}
      </div>
      <Pagination {...{ current, total }} />
    </PageWrapper>
  )
}

export default BlogIndexPage

/*
 * getStaticProps() is used to fetch data at build-time.
 *
 * On this page, it fetches data for the blogs to be linked to on this page
 *
 * This, in combination with getStaticPaths() below means this
 * page will be used to link to all blogs.
 *
 * To learn more, see: https://nextjs.org/docs/basic-features/data-fetching
 */
export async function getStaticProps({ locale, params }) {
  const props = getPostIndexProps(params.page, posts[locale], meta)

  // if there shouldn't be a page with these params, return 404
  if (props === false) return { notFound: true }

  return {
    props: {
      // designs,
      ...props,
      ...(await serverSideTranslations(locale, namespaces)),
      page: {
        locale,
        path: ['showcase'],
      },
    },
  }
}

/*
 * getStaticPaths() is used to specify for which routes (think URLs)
 * this page should be used to generate the result.
 *
 * On this page, it is returning a truncated list of routes (think URLs) for pages that list and link to
 * the mdx blog (markdown) content.
 * That list comes from prebuild/blog-paths.mjs, which is built in the prebuild step
 * and contains paths, titles, imageUrls, and intro for all blog posts.
 *
 * the fallback: 'blocking' property means that
 * any pages that haven't been pre-generated
 * will generate and cache the first time someone visits them
 *
 * To learn more, see: https://nextjs.org/docs/basic-features/data-fetching
 */
export const getStaticPaths = async () => {
  return {
    paths: getPostIndexPaths(posts, 'blog'),
    fallback: 'blocking',
  }
}
