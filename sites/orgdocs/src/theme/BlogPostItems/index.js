import React from 'react'
import { BlogPostProvider } from '@docusaurus/plugin-content-blog/client'
import Link from '@docusaurus/Link'
import BlogPostItem from '@theme/BlogPostItem'
import { imgUrl } from '../BlogPostItem/index.js'

const textShadow = {
  textShadow:
    'rgb(0, 0, 0) 1px 1px 1px, rgb(0, 0, 0) -1px -1px 1px, rgb(0, 0, 0) 1px -1px 1px, rgb(0, 0, 0) -1px 1px 1px, rgb(0, 0, 0) 2px 2px 1px;',
  lineHeight: 1.25,
  color: 'white',
}

const teaserClasses = `absolute bottom-3 right-0 ml-3
  rounded-l md:rounded-l-lg bg-neutral bg-opacity-80 p-1 px-4 font-medium
  text-neutral-content text-right text-lg md:text-xl`

const BlogPostTeaser = ({ post }) => (
  <Link className="aspect-video relative shadow rounded-lg" href={post.content.metadata.permalink}>
    <img
      src={imgUrl(post.content.metadata.permalink)}
      loading="lazy"
      className={`
    "rounded md:rounded-lg top-0 left-0"
      `}
    />
    <div className={teaserClasses} style={textShadow}>
      {post.content.metadata.title}
    </div>
  </Link>
)

const BlogPostItems = ({ items }) => (
  <div className="grid grid-cols-1 gap-2 lg:grid-cols-2 max-w-7xl mb-8">
    {items.map((post) => (
      <BlogPostTeaser post={post} key={post.content.metadata.permalink} />
    ))}
  </div>
)

export default BlogPostItems
