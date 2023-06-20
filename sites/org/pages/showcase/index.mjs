// Dependencies
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useTranslation } from 'next-i18next'
import { sanityLoader, sanityImage } from 'site/components/sanity/utils.mjs'
// Components
import { PageWrapper, ns as pageNs } from 'shared/components/wrappers/page.mjs'
import Link from 'next/link'

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

// FIXME paginate
const Posts = ({ posts }) => (
  <div className="grid grid-cols-1 gap-4 xl:gap-8 lg:grid-cols-2 xl:grid-cols-3 lg:pr-4 xl:pr-8">
    {posts.map((post) => (
      <PreviewTile img={post.image} slug={post.slug} title={post.title} key={post.slug} />
    ))}
  </div>
)

const ShowcaseIndexPage = (props) => {
  const { t } = useTranslation()
  const { posts } = props
  // const designKeys = useMemo(() => Object.keys(designs).sort(), [designs])
  return (
    <PageWrapper title={t('showcase')} {...props.page}>
      <Posts posts={posts} />
    </PageWrapper>
  )
}

export default ShowcaseIndexPage

export async function getStaticProps({ locale }) {
  const posts = await sanityLoader({
    language: locale,
    type: 'showcase',
    order: 'date desc',
  }).catch((err) => console.log(err))

  const designs = {}
  const propPosts = []
  posts.forEach((post) => {
    // for (const design of post.designs) {
    //   if (typeof designs[design] === 'undefined') designs[design] = []
    //   designs[design].push(post)
    // }

    propPosts.push({
      slug: post.slug.current,
      title: post.title,
      date: post.date,
      // FIXME get the authors separately
      author: post.maker,
      image: sanityImage(post.image[0]) + '?fit=clip&w=400',
    })
  })

  return {
    props: {
      posts: propPosts,
      designs,
      ...(await serverSideTranslations(locale, namespaces)),
      page: {
        locale,
        // title: 'Freesewing Blog',
        path: ['showcase'],
      },
    },
  }
}
