// Dependencies
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import {
  postInfo as showcasePostInfo,
  order as showcaseOrder,
} from 'site/prebuild/showcase-paths.mjs'
import { postInfo as blogPostInfo, order as blogOrder } from 'site/prebuild/blog-paths.mjs'
// Hooks
import { useTranslation } from 'next-i18next'
// Components
import { PageWrapper, ns as pageNs } from 'shared/components/wrappers/page.mjs'
import Link from 'next/link'
import { Pagination } from 'shared/components/navigation/pagination.mjs'
import { TimeAgo } from 'shared/components/mdx/meta.mjs'
import { siteConfig } from 'site/site.config.mjs'
import { localeSlug } from 'shared/utils.mjs'

// Translation namespaces used on this page
const namespaces = [...new Set(['common', 'designs', ...pageNs])]

const orders = {
  blog: blogOrder,
  showcase: showcaseOrder,
}

const infos = {
  blog: blogPostInfo,
  showcase: showcasePostInfo,
}

export const numPerPage = 12
export const numPages = (locale, postType) =>
  Math.ceil(orders[postType][locale].length / numPerPage)

export const ShowcaseTile = ({ post }) => (
  <Link href={`/${post.s}`} className="text-center">
    <span
      style={{ backgroundImage: `url(${post.i})`, backgroundSize: 'cover' }}
      className={`
        rounded-full inline-block border-base-100
        w-40 h-40
        md:w-56 md:h-56
      `}
    ></span>
    <p>{post.t}</p>
  </Link>
)

const textShadow = {
  style: {
    textShadow:
      '1px 1px 1px #000000, -1px -1px 1px #000000, 1px -1px 1px #000000, -1px 1px 1px #000000, 2px 2px 1px #000000',
  },
}

const BlogTile = ({ post, t }) => (
  <div className="shadow rounded-lg">
    <Link href={`/${post.s}`} className="hover:underline">
      <div
        className="bg-base-100 w-full h-full overflow-hidden shadow flex flex-column items-center rounded-lg"
        style={{
          backgroundImage: `url(${post.i})`,
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
// const DesignPosts = ({ design, posts }) => {
//   const { t } = useTranslation(['patterns'])
//   return (
//     <div className='py-2'>
//       <h2>
//         <Link href={`/showcase/designs/${design}`}>
//           <a className="hover:text-secondary-focus hover:underline">{t(`${design}.t`)}</a>
//         </Link>
//       </h2>

//     </div>
//   )
// }

const tiles = {
  blog: BlogTile,
  showcase: ShowcaseTile,
}
const PostIndexPage = ({ posts, page, current, total, postType }) => {
  const { t } = useTranslation()
  if (!posts) return null

  const previews = []
  const Tile = tiles[postType]
  // const designKeys = useMemo(() => Object.keys(designs).sort(), [designs])
  posts.forEach((post) => {
    // for (const design of post.designs) {
    //   if (typeof designs[design] === 'undefined') designs[design] = []
    //   designs[design].push(post)
    // }

    previews.push(<Tile post={post} t={t} key={post.s} />)
  })
  return (
    <PageWrapper title={t(`sections:${postType}`)} {...page}>
      <div className="text-center">
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 xl:grid-cols-3 max-w-7xl lg:pr-4 xl:pr-6">
          {previews}
        </div>
        <Pagination
          {...{ current, total, hrefBuilder: (pageNum) => `/${postType}/page/${pageNum}` }}
        />
      </div>
    </PageWrapper>
  )
}

export default PostIndexPage

export async function getStaticProps({ locale, params }) {
  const pageNum = parseInt(params.page)
  const { postType } = params
  const postSlugs = orders[postType][locale].slice(numPerPage * (pageNum - 1), numPerPage * pageNum)
  const posts = postSlugs.map((s) => ({ ...infos[postType][locale][s], s }))

  return {
    props: {
      // designs,
      postType,
      posts,
      current: pageNum,
      total: numPages(locale, postType),
      ...(await serverSideTranslations(locale, namespaces)),
      page: {
        locale,
        path: [postType],
      },
    },
  }
}

export const getStaticPaths = async () => {
  let paths = []
  for (const postType of ['blog', 'showcase']) {
    for (const locale in orders[postType]) {
      const numLocPages = numPages(locale, postType)
      for (let i = 0; i < numLocPages; i++) {
        paths.push(localeSlug(locale, `/${postType}/page/${i + 1}`))
      }
    }
  }

  return {
    paths: [],
    fallback: false,
  }
}
