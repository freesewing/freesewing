import Page from 'shared/components/wrappers/page.js'
import useApp from 'site/hooks/useApp.js'
import Link from 'next/link'
import { posts } from 'site/prebuild/strapi.blog.en.js'
import orderBy from 'lodash.orderby'
import TimeAgo from 'react-timeago'
import Head from 'next/head'
import HelpUs from 'site/components/help-us.js'

const strapi = "https://posts.freesewing.org"

const Preview = ({ app, post }) => (
  <div className="theme-gradient p-1 hover:p-0 hover:mb-1 hover:pointer transition-all">
    <Link href={`/blog/${post.slug}`}>
      <a title={post.title} className="hover:underline">
        <div className="bg-base-100 w-full aspect-video shadow flex flex-column items-end" style={{
          backgroundImage: `url(${strapi}${post.img})`,
          backgroundSize: 'cover',
        }}>
          <div className="grow"></div>
          <div className="text-right">
            <div className={`
              bg-neutral text-neutral-content
              bg-opacity-80
              px-4 text-right
            `}>
              <h5 className={`
                text-neutral-content
                text-xl font-normal
                md:text-2xl md:font-light
              `}>
                {post.title}
              </h5>
              <p className={`
                m-0 p-1 -mt-2
                text-neutral-content
                opacity-50
                leading-normal text-sm font-normal
              `}>
                <TimeAgo date={post.date} /> by {post.author}
              </p>
            </div>
          </div>
        </div>
      </a>
    </Link>
  </div>
)

const BlogIndexPage = (props) => {
  const app = useApp()

  return (
    <Page app={app} title='FreeSewing Development Blog' slug='blog'>
      <Head>
        <meta property="og:title" content="FreeSewing Developers Blog" key="title" />
        <meta property="og:type" content="article" key='type' />
        <meta property="og:description" content="Content for developers and contributors alike. Strictly no sewing stuff" key='type' />
        <meta property="og:article:author" content='Joost De Cock' key='author' />
        <meta property="og:image" content="https://canary.backend.freesewing.org/og-img/en/dev/blog" key='image' />
        <meta property="og:image:type" content="image/png" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:url" content="https://freesewing.dev/blog" key='url' />
        <meta property="og:locale" content="en_US" key='locale' />
        <meta property="og:site_name" content="freesewing.dev" key='site' />
      </Head>
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        {Object.values(orderBy(posts, ['date'], ['desc']))
          .map(post => <Preview app={app} post={post} key={post.slug}/>)
        }
      </div>
      <HelpUs slug='/blog' />
    </Page>
  )
}

export default BlogIndexPage
