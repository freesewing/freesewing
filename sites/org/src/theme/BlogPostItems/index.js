import React from 'react'
import Link from '@docusaurus/Link'
import { imgUrl } from '../BlogPostItem/index.js'
import { useLocation } from '@docusaurus/router'
import { tags as showcaseTags } from '@site/showcase-tags.mjs'

const textShadow = {
  textShadow:
    'rgb(0, 0, 0) 1px 1px 1px, rgb(0, 0, 0) -1px -1px 1px, rgb(0, 0, 0) 1px -1px 1px, rgb(0, 0, 0) -1px 1px 1px, rgb(0, 0, 0) 2px 2px 1px;',
  lineHeight: 1.25,
  color: 'white',
}

const teaserClasses = `tw-absolute tw-bottom-4 tw-right-0 tw-ml-3
  tw-rounded-l md:tw-rounded-l-lg tw-bg-neutral tw-bg-opacity-80 tw-p-1 tw-px-4 tw-font-medium
  tw-text-neutral-content tw-text-right tw-text-sm md:tw-text-lg`

const BlogPostTeaser = ({ post }) => (
  <Link
    className="tw-aspect-video tw-relative tw-shadow tw-rounded-lg"
    href={post.content.metadata.permalink}
  >
    <img
      src={imgUrl(post.content.metadata.permalink)}
      loading="lazy"
      className={`
    "tw-rounded md:tw-rounded-lg tw-top-0 tw-left-0"
      `}
    />
    <div className={teaserClasses} style={textShadow}>
      {post.content.metadata.title}
    </div>
  </Link>
)

const Breadcrumb = ({ crumb, active }) => (
  <li className="breadcrumbs__item">
    <Link href={crumb.href} className="tw-capitalize tw-text-sm tw-breadcrumbs__link">
      {crumb.label}
    </Link>
  </li>
)
export const Breadcrumbs = ({ breadcrumbs }) => {
  return (
    <ul className="tw-breadcrumbs tw-text-sm">
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
      <div className="tw-grid tw-grid-cols-1 tw-gap-2 lg:tw-grid-cols-2 tw-max-w-7xl tw-mb-8">
        {items.map((post) => (
          <BlogPostTeaser post={post} key={post.content.metadata.permalink} />
        ))}
      </div>
    </>
  )
}

export default BlogPostItems

const ShowcasePostTeaser = ({ post }) => (
  <div className="tw-mb-4 tw-break-inside-avoid-column">
    <Link
      className="tw-relative tw-block tw-p-0 tw-rounded-lg tw-drop-shadow-lg"
      href={post.content.metadata.permalink}
    >
      <img
        src={imgUrl(post.content.metadata.permalink)}
        loading="lazy"
        className={`
      "tw-rounded md:tw-rounded-lg tw-top-0 tw-left-0 tw-z-0 tw-drop-shadow-lg"
        `}
      />
      <div className={teaserClasses} style={textShadow}>
        {post.content.metadata.title}
      </div>
    </Link>
    <ul className="tw-block tw-text-right tw-font-medium tw--mt-4 tw-z-10 tw-relative">
      {post.content.metadata.tags.map((tag) => (
        <li className="tw-text-sm tw-inline tw-pr-1" key={tag.label}>
          <Link href={tag.permalink} className="tw-text-secondary tw-captalize">
            <span className="tw-daisy-badge tw-daisy-badge-secondary tw-capitalize">{`${tag.label}`}</span>
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
            <span className="tw-block tw-font-medium tw-text-sm tw-opacity-70">
              Browse by design:
            </span>
            <ul className="mdx tw-flex tw-flex-row tw-flex-wrap tw-mb-4 tw-items-center">
              {showcaseTags.map((d) => (
                <li key={d} className="tw-inline tw-pr-0.5 tw-m-0 tw-leading-5">
                  <Link
                    href={`/showcase/tags/${d}`}
                    className="tw-daisy-badge tw-daisy-badge-sm tw-daisy-badge-secondary tw-capitalize tw-text-xs tw-font-medium"
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
        <div className="tw-columns-2 lg:tw-columns-3 tw-mb-4">
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
      <ul className="mdx tw-list tw-list-disc tw-ml-8">
        {items.map((post) => (
          <li key={post.content.metadata.permalink}>
            <Link href={post.content.metadata.permalink}>{post.content.metadata.title}</Link>
          </li>
        ))}
      </ul>
    </>
  )
}
