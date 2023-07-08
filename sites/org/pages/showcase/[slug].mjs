import { SanityPageWrapper, ns as sanityNs } from 'site/components/sanity/page-wrapper.mjs'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { sanityLoader, sanityImage } from 'site/components/sanity/utils.mjs'

const namespaces = [...sanityNs]

const ShowcasePage = (props) => {
  return <SanityPageWrapper {...props} namespaces={namespaces} />
}

/*
 * getStaticProps() is used to fetch data at build-time.
 *
 * On this page, it is loading the showcase content from strapi.
 *
 * This, in combination with getStaticPaths() below means this
 * page will be used to render/generate all showcase content.
 *
 * To learn more, see: https://nextjs.org/docs/basic-features/data-fetching
 */
export async function getStaticProps({ params, locale }) {
  const { slug } = params
  const post = await sanityLoader({ type: 'showcase', language: locale, slug })
    .then((data) => data[0])
    .catch((err) => console.log(err))

  const designs = [post.design1 || null]
  if (post.design2 && post.design2.length > 2) designs.push(post.design2)
  if (post.design3 && post.design3.length > 2) designs.push(post.design3)

  return {
    props: {
      post: {
        slug,
        body: post.body,
        title: post.title,
        date: post.date,
        caption: post.caption,
        image: sanityImage(post.image[0]),
        designs,
      },
      // FIXME load the author separately
      author: {
        displayname: post.maker,
        // slug: post.maker.slug,
        // image: strapiImage(post.maker.picture, ['small']),
        // ...(await mdxCompiler(post.maker.about)),
      },
      ...(await serverSideTranslations(locale, namespaces)),
    },
  }
}

export const getStaticPaths = async () => {
  const paths = await sanityLoader({ language: 'en', type: 'showcase' })
    .then((data) => data.map((post) => `/showcase/${post.slug.current}`))
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

export default ShowcasePage
