// Dependencies
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
// Hooks
import { useTranslation } from 'next-i18next'
// Components
import { PageWrapper, ns as pageNs } from 'shared/components/wrappers/page.mjs'
import Link from 'next/link'
import { Pagination } from 'shared/components/navigation/pagination.mjs'
import { postInfo, order } from 'site/prebuild/showcase-paths.mjs'

export const numPerPage = 12

// Translation namespaces used on this page
const namespaces = [...new Set(['common', 'designs', ...pageNs])]

export const PreviewTile = ({ img, slug, title }) => (
  <Link href={`/${slug}`} className="text-center">
    <span
      style={{ backgroundImage: `url(${img})`, backgroundSize: 'cover' }}
      className={`
        rounded-full inline-block border-base-100
        w-40 h-40
        md:w-56 md:h-56
      `}
    ></span>
    <p>{title}</p>
  </Link>
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

const Posts = ({ posts }) => {
  const previews = []
  posts.forEach((post) => {
    // for (const design of post.designs) {
    //   if (typeof designs[design] === 'undefined') designs[design] = []
    //   designs[design].push(post)
    // }

    previews.push(<PreviewTile img={post.i} slug={post.s} title={post.t} key={post.s} />)
  })

  return (
    <div className="grid grid-cols-1 gap-4 xl:gap-8 lg:grid-cols-2 xl:grid-cols-3 lg:pr-4 xl:pr-8">
      {previews}
    </div>
  )
}

const ShowcaseIndexPage = ({ posts, page, current, total }) => {
  const { t } = useTranslation()

  // const designKeys = useMemo(() => Object.keys(designs).sort(), [designs])
  return (
    <PageWrapper title={t('showcase')} {...page}>
      <div className="text-center">
        <Posts locale={page.locale} posts={posts} />
        <Pagination {...{ current, total }} />
      </div>
    </PageWrapper>
  )
}

export default ShowcaseIndexPage

export async function getStaticProps({ locale, params }) {
  const pageNum = parseInt(params.page)
  const postSlugs = order[locale].slice(numPerPage * (pageNum - 1), numPerPage * pageNum)
  const posts = postSlugs.map((s) => ({ ...postInfo[locale][s], s }))
  const numLocPages = Math.ceil(order[locale].length / numPerPage)

  if (pageNum > numLocPages) {
    return {
      notFound: true,
    }
  }

  return {
    props: {
      // designs,
      posts,
      current: pageNum,
      total: numLocPages,
      ...(await serverSideTranslations(locale, namespaces)),
      page: {
        locale,
        path: ['showcase'],
      },
    },
  }
}

export const getStaticPaths = async () => {
  const paths = []
  for (const language in order) {
    const lPath = language === 'en' ? '' : `/${language}`
    paths.push(`${lPath}/showcase/page/1`)
    paths.push(`${lPath}/showcase/page/2`)
  }

  return {
    paths,
    fallback: 'blocking',
  }
}
