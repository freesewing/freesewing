import Author from '@/shared/components/strapi/author'
import MdxWrapper from '@/shared/components/wrappers/mdx'

const PostPage = (props) => {
  return (
    <>
      <article className="strapi mb-12">
        <div className="flex flex-row justify-between text-sm mb-1 mt-2">
          <span>{props.post.date}</span>
          <span>
            By&nbsp;
            <a
              href="#author"
              className="text-secondary hover:text-secondary-focus"
            >
              {props.post.author.displayname}
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
      <Author author={props.post.author} />
    </>
  )
}

export default PostPage
