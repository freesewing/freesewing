// Dependencies
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { sanitySiteImage, numPerPage, sanityLoader } from 'site/components/sanity/utils.mjs'
// Hooks
import { useTranslation } from 'next-i18next'
// Components
import { PageWrapper, ns as pageNs } from 'shared/components/wrappers/page.mjs'
import Link from 'next/link'
import { Pagination } from 'shared/components/navigation/pagination.mjs'
import { siteConfig } from 'site/site.config.mjs'

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
        img={sanitySiteImage(post.image[0]) + '?fit=clip&w=400'}
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
  const allPosts = await sanityLoader({
    language: locale,
    type: 'showcase',
    order: 'date desc',
    filters: '{_id, date, slug, title, maker, image}',
  })
  const pageNum = parseInt(params.page)

  return {
    props: {
      // designs,
      posts: allPosts.slice(numPerPage * (pageNum - 1), numPerPage * pageNum),
      current: pageNum,
      total: allPosts.length,
      ...(await serverSideTranslations(locale, namespaces)),
      page: {
        locale,
        // title: 'Freesewing Blog',
        path: ['showcase', 'page', params.page],
      },
    },
  }
}

export const getStaticPaths = async () => {
  const numPosts = await sanityLoader({ query: `count(*[_type == "showcaseen"])` })
  const numPages = Math.ceil(numPosts / numPerPage)
  const paths = []
  for (let i = 0; i < numPages; i++) {
    const pathName = `/showcase/page/${i + 1}`
    siteConfig.languages.forEach((l) => paths.push(`${l.length ? '/' : ''}${l}${pathName}`))
  }

  return {
    paths,
    fallback: false,
  }
}
