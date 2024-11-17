import React from 'react'
import Link from '@docusaurus/Link'
import { imgUrl } from '../BlogPostItem/index.js'
import { useLocation } from '@docusaurus/router'
import { designInfo } from '@site/src/lib/designinfo.mjs'
import { tags as showcaseTags } from '@site/showcase-tags.mjs'

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

const Breadcrumb = ({ crumb, active }) => (
  <li className="breadcrumbs__item">
    <Link href={crumb.href} className="capitalize text-sm breadcrumbs__link">
      {crumb.label}
    </Link>
  </li>
)
export const Breadcrumbs = ({ breadcrumbs }) => {
  return (
    <ul className="breadcrumbs text-sm">
      {breadcrumbs.map((crumb) => (
        <Breadcrumb crumb={crumb} active={false} key={crumb.href} />
      ))}
    </ul>
  )
}

const BlogPostItems = ({ items }) => {
  const location = useLocation()
  /*
   * This code is shared between all blog instances
   * which means: blog, showcase, and newsletter
   * so we need to figure out which it is
   */
  const type = items[0].content.metadata.permalink.split('/')[1]

  if (type === 'showcase') return <ShowcaseItems items={items} slug={location.pathname} />
  if (type === 'newsletter') return <NewsletterItems items={items} slug={location.pathname} />

  return (
    <>
      <Breadcrumbs
        breadcrumbs={[
          {
            href: '/',
            label: 'Home',
          },
          {
            href: `/${type}/`,
            label: type,
          },
        ]}
      />
      <h1>Blog</h1>
      <div className="grid grid-cols-1 gap-2 lg:grid-cols-2 max-w-7xl mb-8">
        {items.map((post) => (
          <BlogPostTeaser post={post} key={post.content.metadata.permalink} />
        ))}
      </div>
    </>
  )
}

export default BlogPostItems

const ShowcasePostTeaser = ({ post }) => (
  <div className="mb-4">
    <Link className="relative block shadow rounded-lg" href={post.content.metadata.permalink}>
      <img
        src={imgUrl(post.content.metadata.permalink)}
        loading="lazy"
        className={`
      "rounded md:rounded-lg top-0 left-0 z-0"
        `}
      />
      <div className={teaserClasses} style={textShadow}>
        {post.content.metadata.title}
      </div>
    </Link>
    <ul className="block text-right font-medium -mt-2 z-10 relative">
      {post.content.metadata.tags.map((tag) => (
        <li className="text-sm inline pr-1" key={tag.label}>
          <Link href={tag.permalink} className="text-secondary captalize">
            <span className="badge badge-secondary capitalize">{`${tag.label}`}</span>
          </Link>
        </li>
      ))}
    </ul>
  </div>
)

const ShowcaseItems = ({ items, slug }) => {
  return (
    <>
      {slug.slice(0, 9) === '/showcase' ? (
        <>
          <Breadcrumbs
            breadcrumbs={[
              {
                href: '/',
                label: 'Home',
              },
              {
                href: `/showcase/`,
                label: 'Showcase',
              },
            ]}
          />
          <h1>Showcase</h1>
          <div className="tailwind-container">
            <span className="block font-medium text-sm opacity-70">Browse by design:</span>
            <ul className="mdx flex flex-row flex-wrap mb-4 items-center">
              {showcaseTags.map((d) => (
                <li key={d} className="inline pr-0.5 m-0 leading-5">
                  <Link
                    href={`/showcase/tags/${d}`}
                    className="badge badge-sm badge-secondary capitalize text-xs font-medium"
                  >
                    {d}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </>
      ) : null}
      <div className="tailwind-container">
        <div className="columns-2 lg:columns-3 mb-4">
          {items.map((post) => (
            <ShowcasePostTeaser post={post} key={post.content.metadata.permalink} />
          ))}
        </div>
      </div>
    </>
  )
}

const NewsletterItems = ({ items, slug }) => {
  return (
    <>
      {slug.slice(0, 11) === '/newsletter' ? (
        <>
          <Breadcrumbs
            breadcrumbs={[
              {
                href: '/',
                label: 'home',
              },
              {
                href: `/newsletter/`,
                label: 'Newsletter',
              },
            ]}
          />
          <h1>Newsletter</h1>
        </>
      ) : null}
      <ul className="mdx list list-disc ml-8">
        {items.map((post) => (
          <li key={post.content.metadata.permalink}>
            <Link href={post.content.metadata.permalink}>{post.content.metadata.title}</Link>
          </li>
        ))}
      </ul>
    </>
  )
}
