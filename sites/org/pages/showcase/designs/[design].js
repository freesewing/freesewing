import Page from 'site/components/wrappers/page.js'
import useApp from 'site/hooks/useApp.js'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { strapiHost } from 'shared/config/freesewing.mjs'
import { strapiImage } from 'shared/utils.js'
import { useTranslation } from 'next-i18next'
import designs from 'shared/config/designs.json'
import { PreviewTile } from '../index.js'

const DesignIndexPage = (props) => {
  const app = useApp()
  const { t } = useTranslation(['common', 'patterns'])

  const designs = {}
  for (const post of props.posts) {
    for (const design of post.designs) {
      if (typeof designs[design] === 'undefined') designs[design] = []
      designs[design].push(post)
    }
  }

  const crumbs = [
    app.getBreadcrumb('showcase'),
    [ t('designs'), '/showcase/designs' ],
    [ t(`patterns:${props.design}.t`) ]
  ]

  return (
    <Page app={app} title={t('showcase')+': '+t(`patterns:${props.design}.t`)} crumbs={crumbs}>
      <div className={`
        2xl:pl-16 overflow-visible overscroll-x-hidden
        max-w-sm
        md:max-w-md
        lg:max-w-lg
        xl:max-w-3xl
        2xl:max-w-7xl
      `}>
        <div className='py-8' >
          <div className={`
            flex flex-row flex-wrap
            -mr-8 pl-8
            md:-mr-12 md:pl-12
          `}>
          {props.posts.map(post => <PreviewTile
            img={`${strapiHost}${post.image?.sizes?.medium?.url}`}
            slug={post.slug}
            title={post.title}
            key={post.slug}
          />)}
          </div>
        </div>
      </div>
    </Page>
  )
}

export default DesignIndexPage

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
  const { design } = params
  // Strapi filtering syntax
  const url = `${strapiHost}/showcaseposts?_locale=${locale}&_sort=date:DESC` +
    `&_where[_or][0][design1_eq]=${design}` +
    `&_where[_or][1][design2_eq]=${design}` +
    `&_where[_or][2][design3_eq]=${design}` +
    `&_limit=-1`
  const posts = await fetch(url)
  .then(response => response.json())
  .then(data => data)
  .catch(err => console.log(err))

  return {
    props: {
      design,
      posts: posts.map(post => {
        const designs = [post.design1]
        if (post.design2 && post.design2.length > 2) designs.push(post.design2)
        if (post.design3 && post.design3.length > 2) designs.push(post.design3)
        return {
          slug: post.slug,
          title: post.title,
          date: post.date,
          maker: post.maker.displayname,
          image: strapiImage(post.image, ['medium']),
          designs
        }
      }),
      ...(await serverSideTranslations(locale)),
    }
  }
}

export const getStaticPaths = async () => {

  const paths = [
    ...designs.accessories,
    ...designs.blocks,
    ...designs.garments
  ].map( design => ({ params: { design } }))

  return {
    paths,
    fallback: false,
  }
}

