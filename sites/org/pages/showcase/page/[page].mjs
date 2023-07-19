// Dependencies
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { postInfo, order } from 'site/prebuild/showcase-paths.mjs'
import { getPostIndexPaths, getPostIndexProps } from 'site/components/mdx/posts/utils.mjs'
// Hooks
import { useTranslation } from 'next-i18next'
// Components
import Link from 'next/link'
import { PageWrapper, ns as pageNs } from 'shared/components/wrappers/page.mjs'
import { Pagination } from 'shared/components/navigation/pagination.mjs'

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
  const props = getPostIndexProps(locale, params, order, postInfo)

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

export const getStaticPaths = async () => {
  return {
    paths: getPostIndexPaths(order, 'showcase'),
    fallback: 'blocking',
  }
}
