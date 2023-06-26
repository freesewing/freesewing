import Head from 'next/head'
import { PageLink } from 'shared/components/page-link.mjs'
import { Lightbox } from 'shared/components/lightbox.mjs'
import { ImageWrapper } from 'shared/components/wrappers/img.mjs'
import { PageWrapper, ns as pageNs } from 'shared/components/wrappers/page.mjs'
import { Author } from './author.mjs'
import { TimeAgo } from 'shared/components/wrappers/mdx.mjs'
import { SanityMdxWrapper } from './mdx-wrapper.mjs'
import { useTranslation } from 'next-i18next'

export const ns = ['common', 'posts', ...pageNs]

export const SanityPageWrapper = ({
  post = {},
  author = {},
  page = {},
  namespaces = ['common'],
}) => {
  const { t } = useTranslation(namespaces)
  return (
    <PageWrapper title={post.title} {...page}>
      <Head>
        <meta property="og:type" content="article" key="type" />
        <meta property="og:description" content={post.intro || post.title} key="description" />
        <meta property="og:article:author" content={author.displayname} key="author" />
        <meta property="og:url" content={`https://freesewing.org/blog/${post.slug}`} key="url" />
        <meta
          property="og:image"
          content={`https://canary.backend.freesewing.org/og-img/en/dev/blog/${post.slug}`}
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
            <TimeAgo date={post.date} t={t} /> [{post.date}]
          </div>
          <div>
            {post.designs?.map((design) => (
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
              {author.displayname || 'FIXME: No displayname'}
            </a>
          </div>
        </div>
        <figure>
          <Lightbox>
            <ImageWrapper>
              <img src={post.image} alt={post.caption} className="shadow m-auto" />
            </ImageWrapper>
            <figcaption
              className="text-center mb-8 prose m-auto"
              dangerouslySetInnerHTML={{ __html: post.caption }}
            />
          </Lightbox>
        </figure>
        <div className="strapi prose lg:prose-lg mb-12 m-auto">
          <SanityMdxWrapper MDX={post.body} />
        </div>
        <div className="max-w-prose text-lg lg:text-xl">
          <Author author={author} />
        </div>
      </article>
    </PageWrapper>
  )
}
