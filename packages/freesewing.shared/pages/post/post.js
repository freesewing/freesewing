import Author from '@/shared/components/strapi/author'
import MdxWrapper from '@/shared/components/wrappers/mdx'
import Timeago from 'react-timeago'

const PostPage = (props) => {
  const author = props.post.author || props.post.maker
  return (
    <>
      <article className="strapi mb-12">
        <div className="flex flex-row justify-between text-sm mb-1 mt-2">
          <span><Timeago date={props.post.date} /> [{props.post.date}]</span>
          <span>
            {props.t('by')}&nbsp;
            <a
              href="#author"
              className="text-secondary hover:text-secondary-focus"
            >
              {author?.displayname || 'FIXME: No displayname'}
            </a>
          </span>
        </div>
        <figure>
          <img
            src={`${props.config.strapi.host}${props.post.image.url}`}
            alt={props.post.caption}
            className="shadow"
          />
          <figcaption
            className="text-center mb-8 prose m-auto"
            dangerouslySetInnerHTML={{__html: props.post.caption}}
          />
        </figure>
        <div className="strapi prose lg:prose-lg mb-12 m-auto">
          <MdxWrapper
            pages={props.pages}
            href={props.href}
            mdx={props.post.mdx}
          />
        </div>
      </article>
      <Author author={author} t={props.t} type={props.type}/>
    </>
  )
}

export default PostPage
