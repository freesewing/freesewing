import Page from 'site/components/wrappers/page.js'
import useApp from 'site/hooks/useApp.js'
import Link from 'next/link'
import PageLink from 'shared/components/page-link.js'
import { strapiHost } from 'shared/config/freesewing.mjs'
import { strapiImage } from 'shared/utils.js'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

export const PreviewTile = ({ img, slug, title }) => (
  <div
    style={{ backgroundImage: `url(${img})`, backgroundSize: 'cover' }}
    className={`
      rounded-full inline-block border-base-100 shrink-0
      w-40 h-40 -ml-8 border-8
      md:w-56 md:h-56 md:-ml-12
      theme-gradient
    `}
  >
    <Link href={`/showcase/${slug}`}>
      <a className={`
        w-42 h-42 block
        md:w-56 md:h-56
        `} title={title}/>
    </Link>
  </div>
)

const DesignPosts = ({ design, posts }) => {
  const { t } = useTranslation(['patterns'])
  return (
    <div className='py-2'>
      <h2>
        <Link href={`/showcase/designs/${design}`}>
          <a className="hover:text-secondary-focus hover:underline">{t(`${design}.t`)}</a>
        </Link>
      </h2>
      <div className={`
        flex flex-row overflow-cli
        pl-8
        md:-mr-12 md:pl-12
      `} style={{maxWidth: "calc(100vw - 3rem)"}}>
      {posts.slice(0, 10).map(post => <PreviewTile
        img={`${strapiHost}${post.image?.sizes?.medium?.url}`}
        slug={post.slug}
        title={post.title}
        key={post.slug}
      />)}
      </div>
    </div>
  )
}

const ShowcaseIndexPage = (props) => {
  const app = useApp()
  const { t } = useTranslation()

  const designs = {}
  for (const post of props.posts) {
    for (const design of post.designs) {
      if (typeof designs[design] === 'undefined') designs[design] = []
      designs[design].push(post)
    }
  }

  return (
    <Page app={app} title={t('showcase')} slug='showcase'>
      <div className="max-w-4xl m-auto text-center">
        <ul className="flex flex-row flex-wrap gap-4 items-center justify-center leading-tight text-xl">
          {Object.keys(designs).sort().map(design => (
            <li key={design}>
              <PageLink href={`/showcase/designs/${design}`} txt={design} className="capitalize" />
            </li>
          ))}
        </ul>
      </div>
      <div className={`
        2xl:pl-16 overflow-visible overflow-x-hidden
        -mr-6
        max-w-sm
        md:max-w-md
        lg:max-w-lg
        xl:max-w-3xl
        2xl:max-w-7xl
      `}>
        {Object.keys(designs).sort().map(design => <DesignPosts
          key={design} design={design} posts={designs[design]} />)}
      </div>
    </Page>
  )
}

export default ShowcaseIndexPage

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

  const posts = await fetch(
    `${strapiHost}/showcaseposts?_locale=${locale}&_sort=date:DESC&_limit=-1`
  )
  .then(response => response.json())
  .then(data => data)
  .catch(err => console.log(err))

  return {
    props: {
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

