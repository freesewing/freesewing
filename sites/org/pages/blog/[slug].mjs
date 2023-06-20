import { SanityPageWrapper, ns as sanityNs } from 'site/components/sanity/page-wrapper.mjs'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { sanityLoader, sanityImage } from 'site/components/sanity/utils.mjs'

const namespaces = [...sanityNs]

const BlogPostPage = (props) => {
  return <SanityPageWrapper {...props} namespaces={namespaces} />
}

/*
 * getStaticProps() is used to fetch data at build-time.
 *
 * On this page, it is loading the blog content from strapi.
 *
 * This, in combination with getStaticPaths() below means this
 * page will be used to render/generate all blog content.
 *
 * To learn more, see: https://nextjs.org/docs/basic-features/data-fetching
 */
export async function getStaticProps({ params, locale }) {
  const { slug } = params
  const post = await sanityLoader({ type: 'blog', language: locale, slug })
    .then((data) => data[0])
    .catch((err) => console.log(err))

  return {
    props: {
      post: {
        slug,
        body: post.body,
        title: post.title,
        date: post.date,
        caption: post.caption,
        image: sanityImage(post.image),
      },
      // FIXME load the author separately
      author: {
        displayname: post.author,
        // slug: post.author.slug,
        // about: post.author.about,
        // image: strapiImage(post.author.picture, ['small']),
        // about: post.author.about,
      },
      ...(await serverSideTranslations(locale, namespaces)),
    },
  }
}

export const getStaticPaths = async () => {
  const paths = await sanityLoader({ language: 'en', type: 'blog' })
    .then((data) => data.map((post) => `/blog/${post.slug.current}`))
    .catch((err) => console.log(err))

  return {
    paths: [
      ...paths,
      ...paths.map((p) => `/de${p}`),
      ...paths.map((p) => `/es${p}`),
      ...paths.map((p) => `/fr${p}`),
      ...paths.map((p) => `/nl${p}`),
    ],
    fallback: false,
  }
}

export default BlogPostPage
