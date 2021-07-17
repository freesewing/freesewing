import config from '@/site/freesewing.config'
import Link from 'next/link'
import TimeAgo from 'react-timeago'

const Preview = ({ post }) => (
  <div className="flex flex-col w-full lg:w-1/2 p-2">
    <div className="shadow border rounded-lg hover:shadow-md ">
      <Link href={`/blog/${post.slug}`}>
        <a href={`/blog/${post.slug}`} title={post.title}>
          <div
            className={`
              h-60 w-full bg-cover bg-center block rounded-t-lg
              lg:h-40 lg:w-full
            `}
            style={{backgroundImage: `url(${config.strapi.host}${post?.image?.formats?.small?.url}`}}
          ></div>
          <div className="pt-4 px-4">
            <h2 className="text-xl mb-4">
              {post.title}
            </h2>
            <div className="flex flex-row justify-between text-sm text-base-300 pb-2">
              <TimeAgo date={post.date} />
              <span>{post.author.displayname}</span>
            </div>
          </div>
        </a>
      </Link>
    </div>
  </div>
)

export default Preview
