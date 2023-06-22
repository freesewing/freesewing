// Dependencies
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { sanityImage, numPerPage, sanityLoader } from 'site/components/sanity/utils.mjs'
// Hooks
import { useTranslation } from 'next-i18next'
// Components
import Link from 'next/link'
import { TimeAgo } from 'shared/components/wrappers/mdx.mjs'
import { PageWrapper, ns as pageNs } from 'shared/components/wrappers/page.mjs'
import { Pagination } from 'shared/components/navigation/pagination.mjs'

// Translation namespaces used on this page
const namespaces = [...new Set(['designs', ...pageNs])]

const textShadow = {
  style: {
    textShadow:
      '1px 1px 1px #000000, -1px -1px 1px #000000, 1px -1px 1px #000000, -1px 1px 1px #000000, 2px 2px 1px #000000',
  },
}

const Preview = ({ post, t }) => (
  <div className="shadow rounded-lg">
    <Link href={`blog/${post.slug.current}`} className="hover:underline">
      <div
        className="bg-base-100 w-full h-full overflow-hidden shadow flex flex-column items-center rounded-lg"
        style={{
          backgroundImage: `url(${sanityImage(post.image) + '?fit=clip&w=400'})`,
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
              {post.title}
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
              <TimeAgo date={post.date} t={t} /> by <strong>{post.author}</strong>
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
    <PageWrapper {...page}>
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 xl:grid-cols-3 max-w-7xl lg:pr-4 xl:pr-6">
        {posts.map((post) => (
          <Preview post={post} t={t} key={post.slug.current} />
        ))}
      </div>
      <Pagination {...{ current, total }} />
    </PageWrapper>
  )
}

export default BlogIndexPage

export async function getStaticProps({ locale, params }) {
  const allPosts = await sanityLoader({
    language: locale,
    type: 'blog',
    order: 'date desc',
    filters: '{_id, date, slug, title, author, image}',
  })
  const pageNum = parseInt(params.page)

  return {
    props: {
      posts: allPosts.slice(numPerPage * (pageNum - 1), numPerPage * pageNum),
      current: pageNum,
      total: allPosts.length,
      ...(await serverSideTranslations(locale, namespaces)),
      page: {
        locale,
        // title: 'Freesewing Blog',
        path: ['blog', 'page', params.page],
      },
    },
  }
}

const locales = ['', 'de', 'es', 'fr', 'nl']
export const getStaticPaths = async () => {
  const numPosts = await sanityLoader({ query: `count(*[_type == "blogen"])` })
  const numPages = Math.ceil(numPosts / numPerPage)
  const paths = []
  for (let i = 0; i < numPages; i++) {
    const pathName = `/blog/page/${i + 1}`
    locales.forEach((l) => paths.push(`${l.length ? '/' : ''}${l}${pathName}`))
  }

  return {
    paths,
    fallback: false,
  }
}
