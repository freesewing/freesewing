// Dependencies
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { sanityImage } from 'site/components/sanity/utils.mjs'
// Hooks
import { useTranslation } from 'next-i18next'
import { useSanityPagination } from 'site/hooks/use-sanity-pagination.mjs'
// Components
import { PageWrapper, ns as pageNs } from 'shared/components/wrappers/page.mjs'
import Link from 'next/link'
import { Pagination } from 'shared/components/navigation/pagination.mjs'

// Translation namespaces used on this page
const namespaces = [...new Set(['common', 'designs', ...pageNs])]

export const PreviewTile = ({ img, slug, title }) => (
  <Link href={`/showcase/${slug}`} className="text-center">
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

    previews.push(
      <PreviewTile
        img={sanityImage(post.image[0]) + '?fit=clip&w=400'}
        slug={post.slug.current}
        title={post.title}
        key={post.slug.current}
      />
    )
  })

  return (
    <div className="grid grid-cols-1 gap-4 xl:gap-8 lg:grid-cols-2 xl:grid-cols-3 lg:pr-4 xl:pr-8">
      {previews}
    </div>
  )
}

const ShowcaseIndexPage = (props) => {
  const { t } = useTranslation()
  const { posts, page, totalPages, setPage } = useSanityPagination('showcase', props.page.locale)

  // const designKeys = useMemo(() => Object.keys(designs).sort(), [designs])
  return (
    <PageWrapper title={t('showcase')} {...props.page}>
      <div className="text-center">
        <Posts locale={props.page.locale} posts={posts} />
        <Pagination {...{ current: page, total: totalPages, setPage }} />
      </div>
    </PageWrapper>
  )
}

export default ShowcaseIndexPage

export async function getStaticProps({ locale }) {
  return {
    props: {
      // posts: propPosts,
      // designs,
      ...(await serverSideTranslations(locale, namespaces)),
      page: {
        locale,
        // title: 'Freesewing Blog',
        path: ['showcase'],
      },
    },
  }
}
