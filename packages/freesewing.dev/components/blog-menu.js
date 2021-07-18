import Link from 'next/link'
import SidebarWrap from '@/site/components/wrap-sidebar'

const BlogMenu = ({ posts, current=false }) => (
  <SidebarWrap>
    <ul>
      <li>
        <h4 className="text-xl mb-2">Developer blog posts:</h4>
        <ul className="pl-2">
          {Object.values(posts).reverse().map(post => (
            <li key={post.slug}>
              {current && current === post.slug
                ? <span className="font-bold">{post.linktitle}</span>
                : (
                  <Link href={`/blog/${post.slug}`}>
                    <a href={`/blog/${post.slug}`} title={post.title} className="text-secondary hover:text-secondary-focus">
                      {post.linktitle}
                    </a>
                  </Link>
                )}
            </li>
          ))}
        </ul>
      </li>
    </ul>
  </SidebarWrap>
)


export default BlogMenu
