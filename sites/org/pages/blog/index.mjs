// Dependencies
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { pages as posts } from 'site/prebuild/blog.mjs'
import { meta } from 'site/prebuild/blog-meta.mjs'
import { cloudflareImageUrl } from 'shared/utils.mjs'
import { nsMerge } from 'shared/utils.mjs'
// Hooks
import { useTranslation } from 'next-i18next'
// Components
import Link from 'next/link'
import { PageWrapper, ns as pageNs } from 'shared/components/wrappers/page.mjs'

// Translation namespaces used on this page
const namespaces = nsMerge('designs', 'sections', pageNs)

// Helper object to order posts
const order = {}
for (const [slug, props] of Object.entries(meta)) order[props.d] = slug

export const recentBlogPosts = Object.keys(order)
  .sort()
  .reverse()
  .slice(0, 2)
  .map((d) => order[d])

const textShadow = {
  style: {
    textShadow:
      '1px 1px 1px #000000, -1px -1px 1px #000000, 1px -1px 1px #000000, -1px 1px 1px #000000, 2px 2px 1px #000000',
  },
}

export const BlogPreview = ({ post }) => (
  <Link href={`/${post.s}`} className="aspect-video relative">
    <img
      src={cloudflareImageUrl({ id: post.s.replace('/', '-'), variant: 'w1000' })}
      loading="lazy"
      className="rounded md:rounded-lg top-0 left-0"
    />
    <div
      className={`absolute bottom-4 md:bottom-8 right-0 ml-8 md:ml-12
          rounded-l md:rounded-l-lg bg-neutral bg-opacity-70 p-2 px-4 font-medium leading-7
          text-neutral-content text-right text-xl md:text-2xl

        `}
      {...textShadow}
    >
      {post.t}
    </div>
  </Link>
)

/*
 * Each page MUST be wrapped in the PageWrapper component.
 * You also MUST spread props.page into this wrapper component
 * when path and locale come from static props (as here)
 * or set them manually.
 */
const BlogIndexPage = ({ page }) => {
  const { t } = useTranslation()

  return (
    <PageWrapper {...page} t={t('sections:blog')}>
      <div className="grid grid-cols-1 gap-2 lg:grid-cols-2 lg:gap-4 max-w-7xl">
        {Object.keys(order)
          .sort()
          .reverse()
          .map((date) => (
            <BlogPreview
              post={{
                s: order[date],
                ...posts[page.locale][order[date]],
              }}
              key={order[date]}
            />
          ))}
      </div>
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
export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, namespaces)),
      page: {
        locale,
        path: ['blog'],
      },
    },
  }
}
