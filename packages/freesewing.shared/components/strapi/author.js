import config from '@/site/freesewing.config'
import MDX from "@mdx-js/runtime";

const Author = ({author, type, t}) => (
  <div id="author" className="shadow flex flex-col lg:flex-row rounded-xl border border-base-300 max-w-prose py-4 mx-auto lg:p-0">
    <div
      className={`
        w-1/2 h-auto bg-cover bg-center rounded-l-lg hidden
        lg:block
      `}
      style={{backgroundImage: `url(${config.strapi.host}${author?.picture?.url})`}}
    >
    </div>
    <img
      className={`
        block w-32 h-32 mx-auto rounded-full
        lg:hidden
      `}
      src={`${config.strapi.host}${author?.picture?.url}`}
      alt={author?.displayname}
      width={author?.picture?.width}
      height={author?.picture?.height}
    />
    <div className={`
        text-center p-4 rounded-r-lg bg-opacity-50
        lg:text-left
      `}
    >
      <p className="text-xl mb-2">
        <span className="font-semibold"> {author.displayname}</span>
        <span className="text-base-300 text-sm pl-2">
          {t('xThis', {x: t(type === 'blog' ? 'wrote' : 'made')})}
        </span>
      </p>
      <div className="prose">
        <MDX>{author.about}</MDX>
      </div>
    </div>
  </div>
)

export default Author
