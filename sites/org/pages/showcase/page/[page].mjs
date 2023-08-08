// Dependencies
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { pages as posts } from 'site/prebuild/showcase.mjs'
import { meta } from 'site/prebuild/showcase-meta.mjs'
import { getPostIndexPaths, getPostIndexProps } from 'site/components/mdx/posts/utils.mjs'
import { cloudflareImageUrl } from 'shared/utils.mjs'
// Hooks
import { useTranslation } from 'next-i18next'
// Components
import Link from 'next/link'
import { PageWrapper, ns as pageNs } from 'shared/components/wrappers/page.mjs'
import { Pagination } from 'shared/components/navigation/pagination.mjs'

// Translation namespaces used on this page
const namespaces = [...new Set(['common', 'designs', ...pageNs])]

export const PreviewTile = ({ slug, title }) => (
  <Link href={`/${slug}`} className="text-center">
    <span
      style={{
        backgroundImage: `url(${cloudflareImageUrl({
          id: slug.replace('/', '-'),
          variant: 'sq500',
        })})`,
        backgroundSize: 'cover',
      }}
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

    previews.push(<PreviewTile slug={post.s} title={post.t} key={post.s} />)
  })

  return (
    <div className="grid grid-cols-1 gap-4 xl:gap-8 lg:grid-cols-2 xl:grid-cols-3 lg:pr-4 xl:pr-8">
      {previews}
    </div>
  )
}

/*
 * Each page MUST be wrapped in the PageWrapper component.
 * You also MUST spread props.page into this wrapper component
 * when path and locale come from static props (as here)
 * or set them manually.
 */
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

/*
 * getStaticProps() is used to fetch data at build-time.
 *
 * On this page, it fetches data for the showcases to be linked to on this page
 *
 * This, in combination with getStaticPaths() below means this
 * page will be used to link to all showcases.
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
 * the mdx showcase (markdown) content.
 * That list comes from prebuild/showcase-paths.mjs, which is built in the prebuild step
 * and contains paths, titles, imageUrls, and intro for all showcase posts.
 *
 * the fallback: 'blocking' property means that
 * any pages that haven't been pre-generated
 * will generate and cache the first time someone visits them
 *
 * To learn more, see: https://nextjs.org/docs/basic-features/data-fetching
 */
export const getStaticPaths = async () => {
  return {
    paths: getPostIndexPaths(posts, 'showcase'),
    fallback: 'blocking',
  }
}
