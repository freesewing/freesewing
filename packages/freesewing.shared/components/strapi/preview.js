import config from '@/site/freesewing.config'
import Link from 'next/link'
import TimeAgo from 'react-timeago'

const Preview = ({ post, type }) => (
  <div className="flex flex-col w-full lg:w-1/2 p-2">
    <div className="shadow border rounded-lg hover:shadow-md ">
      <Link href={`/${type}/${post.slug}`}>
        <a href={`/${type}/${post.slug}`} title={post.title}>
          <div
            className={`h-80 w-full bg-cover bg-center block rounded-t-lg`}
            style={{backgroundImage: `url(${config.strapi.host}${post.image}`}}
          ></div>
          <div className="pt-4 px-4">
            <h2 className="text-xl mb-4">
              {post.title}
            </h2>
            <div className="flex flex-row justify-between text-sm text-base-300 pb-2">
              <TimeAgo date={post.date} />
              <span>{post.author || post.maker}</span>
            </div>
          </div>
        </a>
      </Link>
    </div>
  </div>
)

export default Preview
