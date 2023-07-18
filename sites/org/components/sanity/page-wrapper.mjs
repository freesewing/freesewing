import Head from 'next/head'
import { PageLink } from 'shared/components/page-link.mjs'
import { Lightbox } from 'shared/components/lightbox.mjs'
import { ImageWrapper } from 'shared/components/wrappers/img.mjs'
import { PageWrapper, ns as pageNs } from 'shared/components/wrappers/page.mjs'
import { Author } from './author.mjs'
import { TimeAgo } from 'shared/components/mdx/meta.mjs'
import { useTranslation } from 'next-i18next'
import { MdxWrapper } from 'shared/components/wrappers/mdx.mjs'
import { DocsLayout, ns as layoutNs } from 'site/components/layouts/docs.mjs'
import { PrevNext } from 'shared/components/prev-next.mjs'

export const ns = ['common', 'posts', ...pageNs]

const preGenerate = 6
export const SanityPageWrapper = ({ slug, frontmatter, MDX, namespaces, page }) => {
  const { t } = useTranslation(namespaces)
  return (
    <PageWrapper {...page} title={frontmatter.title} slug={slug}>
      <Head>
        <meta property="og:type" content="article" key="type" />
        <meta
          property="og:description"
          content={frontmatter.intro || frontmatter.title}
          key="description"
        />
        <meta property="og:article:author" content={frontmatter.author} key="author" />
        <meta property="og:url" content={`https://freesewing.org/blog/${slug}`} key="url" />
        <meta
          property="og:image"
          content={`https://canary.backend.freesewing.org/og-img/en/dev/blog/${slug}`}
          key="image"
        />
        <meta property="og:image:type" content="image/png" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:locale" content="en_US" key="locale" />
        <meta property="og:site_name" content="freesewing.org" key="site" />
      </Head>
      <article className="mb-12 px-8 max-w-7xl">
        <div className="flex flex-row justify-between text-sm mb-1 mt-2">
          <div>
            <TimeAgo date={frontmatter.date} t={t} /> [{frontmatter.date}]
          </div>
          <div>
            {frontmatter.designs?.map((design) => (
              <PageLink
                href={`/showcase/designs/${design}`}
                txt={design}
                key={design}
                className="px-2 capitalize"
              />
            ))}
          </div>
          <div>
            By{' '}
            <a href="#maker" className="text-secondary hover:text-secondary-focus">
              {frontmatter.author || frontmatter.maker || 'FIXME: No displayname'}
            </a>
          </div>
        </div>
        <figure>
          <Lightbox>
            <ImageWrapper>
              <img src={frontmatter.image} alt={frontmatter.caption} className="shadow m-auto" />
            </ImageWrapper>
            <figcaption
              className="text-center mb-8 prose m-auto"
              dangerouslySetInnerHTML={{ __html: frontmatter.caption }}
            />
          </Lightbox>
        </figure>
        <div className="strapi prose lg:prose-lg mb-12 m-auto">
          <MdxWrapper>{MDX}</MdxWrapper>
        </div>
        <div className="max-w-prose text-lg lg:text-xl">
          <Author author={frontmatter.author || frontmatter.maker} />
        </div>
      </article>
      <PrevNext
        slug={page?.path.join('/')}
        noPrev={(s) => s.split('/').length === 1}
        noNext={(s) => s.split('/').length === 1}
      />
    </PageWrapper>
  )
}

const pathStr = '../../../../markdown/org/'
export const getSanityStaticPaths = (type) => {
  return async () => {
    const paths = []
    const allPathsMod = await import(`../../prebuild/${type}-paths.mjs`)

    for (const lang in allPathsMod.order) {
      const lPath = lang === 'en' ? '' : `/${lang}`
      let i = 0,
        counter = 0
      while (i < preGenerate && counter < 20) {
        counter++
        const slug = allPathsMod.order[lang][i]
        if (!slug) continue

        paths.push(`${lPath}/${allPathsMod.order[lang][i]}`)
        i++
      }
    }

    return {
      paths: paths,
      fallback: 'blocking',
    }
  }
}
