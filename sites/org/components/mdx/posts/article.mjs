import { Lightbox } from 'shared/components/lightbox.mjs'
import { ImageWrapper } from 'shared/components/wrappers/img.mjs'
import { Author } from './author.mjs'
import { TimeAgo, ns as timeagoNs } from 'shared/components/timeago/index.mjs'
import { useTranslation } from 'next-i18next'
import { MdxWrapper } from 'shared/components/wrappers/mdx.mjs'
import { cloudflareImageUrl } from 'shared/utils.mjs'
import Markdown from 'react-markdown'
import { nsMerge } from 'shared/utils.mjs'
import { Tag } from 'shared/components/tag.mjs'

export const ns = nsMerge('common', 'posts', timeagoNs)

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
      <TimeAgo date={frontmatter.date} t={t} />
    </div>
    <div>
      {frontmatter.designs?.map((design) => (
        <Tag
          href={`/showcase/designs/${design}`}
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
