import { cloudflareImageUrl, nsMerge } from 'shared/utils.mjs'
// Components
import { MdxWrapper } from 'shared/components/wrappers/mdx.mjs'
import { Lightbox } from 'shared/components/lightbox.mjs'
import { ImageWrapper } from 'shared/components/wrappers/img.mjs'
import { TimeAgo, ns as timeagoNs } from 'shared/components/timeago/index.mjs'
import { useTranslation } from 'next-i18next'
import { FrontmatterHead } from './docs.mjs'
import {
  BaseLayout,
  BaseLayoutLeft,
  BaseLayoutProse,
  BaseLayoutRight,
  BaseLayoutWide,
} from 'shared/components/base-layout.mjs'
import {
  NavLinks,
  Breadcrumbs,
  MainSections,
  ns as navNs,
} from 'shared/components/navigation/sitenav.mjs'
import { Toc, ns as tocNs } from 'shared/components/mdx/toc.mjs'
import { PrevNext } from 'shared/components/prev-next.mjs'
import { Tag } from 'shared/components/tag.mjs'

export const ns = nsMerge(navNs, tocNs, timeagoNs, 'docs')

const PostMeta = ({ frontmatter, t }) => (
  <div className="flex flex-row justify-between text-sm mb-1 mt-2">
    <div>
      <TimeAgo date={frontmatter.date} t={t} />
    </div>
    <div>
      {frontmatter.designs?.map((design) => (
        <Tag
          href={`/showcase#filter="${design}"`}
          color="primary"
          hoverColor="secondary"
          key={design}
        >
          {design}
        </Tag>
      ))}
    </div>
    <div>
      By{' '}
      <a href="#maker" className="text-secondary hover:text-secondary-focus">
        {frontmatter.author || frontmatter.maker || 'FIXME: No displayname'}
      </a>
    </div>
  </div>
)

export const PostImage = ({ imgId, frontmatter }) => (
  <figure>
    <Lightbox>
      <ImageWrapper>
        <img
          src={cloudflareImageUrl({ id: imgId })}
          alt={frontmatter.caption}
          className="shadow m-auto"
        />
      </ImageWrapper>
      <figcaption
        className="text-center mb-8 prose m-auto text-sm italic"
        dangerouslySetInnerHTML={{ __html: frontmatter.caption }}
      />
    </Lightbox>
  </figure>
)

export const PostContent = ({ mdx, dir }) => (
  <div className="strapi prose lg:prose-lg mb-12 m-auto">
    <MdxWrapper mdx={mdx} slug={`blog/${dir}`} />
  </div>
)

/** layout for a page that displays a blog, showcase or newsletter */
export const PostLayout = ({ mdx, slug, frontmatter, locale, type, dir }) => {
  const { t } = useTranslation(ns)

  return (
    <BaseLayout>
      <FrontmatterHead {...{ frontmatter, slug, locale }} />
      <BaseLayoutLeft>
        <MainSections />
        <NavLinks />
      </BaseLayoutLeft>

      <BaseLayoutWide>
        <div className="w-full max-w-4xl">
          <Breadcrumbs />
          <h1 className="break-words searchme">{frontmatter.title}</h1>
          <PostMeta frontmatter={frontmatter} t={t} />
          <PostImage imgId={`${type}-${dir}`} frontmatter={frontmatter} />
          <div className="block xl:hidden">
            <Toc toc={frontmatter.toc} wrap />
          </div>
        </div>
        <div className="flex flex-row">
          <BaseLayoutProse>
            <article className="mb-12 max-w-7xl">
              <PostContent {...{ mdx }} />
              <PrevNext />
            </article>
          </BaseLayoutProse>
          <BaseLayoutRight>
            <div className="hidden xl:block xl:sticky xl:top-4">
              <Toc toc={frontmatter.toc} wrap />
            </div>
          </BaseLayoutRight>
        </div>
      </BaseLayoutWide>
    </BaseLayout>
  )
}
