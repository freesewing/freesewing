import { PageLink } from 'shared/components/page-link.mjs'
import { Lightbox } from 'shared/components/lightbox.mjs'
import { ImageWrapper } from 'shared/components/wrappers/img.mjs'
import { Author } from './author.mjs'
import { TimeAgo } from 'shared/components/mdx/meta.mjs'
import { useTranslation } from 'next-i18next'
import { MdxWrapper } from 'shared/components/wrappers/mdx.mjs'
import { cloudflareImageUrl } from 'shared/utils.mjs'
import Markdown from 'react-markdown'

export const ns = ['common', 'posts']

export const PostArticle = (props) => {
  const { t } = useTranslation('common')

  return (
    <PostWrapper>
      <PostMeta frontmatter={props.frontmatter} t={t} />
      <PostImage imgId={props.imgId} frontmatter={props.frontmatter} />
      <PostContent {...props} />
      <PostAuthor frontmatter={props.frontmatter} />
    </PostWrapper>
  )
}

const PostWrapper = ({ children }) => <article className="mb-12 px-8 max-w-7xl">{children}</article>

const PostMeta = ({ frontmatter, t }) => (
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
)

const PostImage = ({ imgId, frontmatter }) => (
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
        className="text-center mb-8 prose m-auto"
        dangerouslySetInnerHTML={{ __html: frontmatter.caption }}
      />
    </Lightbox>
  </figure>
)

const PostAuthor = ({ frontmatter }) => (
  <div className="max-w-prose text-lg lg:text-xl">
    <Author author={frontmatter.author || frontmatter.maker} />
  </div>
)

const PostContent = (props) =>
  props.MDX ? <PostMDXContent {...props} /> : <PostPreviewContent {...props} />

const PostMDXContent = ({ MDX }) => (
  <div className="strapi prose lg:prose-lg mb-12 m-auto">
    <MdxWrapper>{MDX}</MdxWrapper>
  </div>
)

const PostPreviewContent = ({ body }) => (
  <div className="strapi prose lg:prose-lg mb-12 m-auto">
    <Markdown>{body}</Markdown>
  </div>
)
