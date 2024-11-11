import React, { useState, useEffect } from 'react'
import clsx from 'clsx'
import { useBlogPost } from '@docusaurus/plugin-content-blog/client'
import BlogPostItemContainer from '@theme/BlogPostItem/Container'
import BlogPostItemContent from '@theme/BlogPostItem/Content'
import BlogPostItemFooter from '@theme/BlogPostItem/Footer'
import { useLocation } from '@docusaurus/router'
import BlogPostItemHeaderTitle from '@theme/BlogPostItem/Header/Title'
import BlogPostItemHeaderInfo from '@theme/BlogPostItem/Header/Info'
import BlogPostItemHeaderAuthors from '@theme/BlogPostItem/Header/Authors'
import { Breadcrumbs } from '../BlogPostItems/index.js'

// apply a bottom margin in list view
function useContainerClassName() {
  const { isBlogPostPage } = useBlogPost()
  return !isBlogPostPage ? 'margin-bottom--xl' : undefined
}

const BlogPostHeader = ({ type }) => {
  const { metadata } = useBlogPost()

  return (
    <>
      <header>
        <Breadcrumbs
          breadcrumbs={[
            {
              href: '/',
              label: 'Home',
            },
            {
              href: `${type}`,
              label: type,
            },
            {
              href: metadata.permalink,
              label: metadata.title,
            },
          ]}
        />
        <h1>
          <span className="block text-sm capitalize">{type}:</span>
          {metadata.title}
        </h1>
        <BlogPostItemHeaderInfo />
        <BlogPostItemHeaderAuthors />
      </header>
      {type === 'newsletter' ? null : <img src={imgUrl(metadata.permalink)} />}
    </>
  )
}

/*
 * Get blog post image from permalink
 */
export const imgPrefix = 'https://imagedelivery.net/ouSuR9yY1bHt-fuAokSA5Q/'
export const imgUrl = (permalink) => `${imgPrefix}${permalink.slice(1).split('/').join('-')}/public`

export default function BlogPostItem(props) {
  const { children, className } = props
  const containerClassName = useContainerClassName()
  const location = useLocation()
  /*
   * This code is shared between all blog instances
   * which means: blog, showcase, and newsletter
   * so we need to figure out which it is
   */
  const type = location.pathname.split('/')[1]

  return (
    <BlogPostItemContainer className={clsx(containerClassName, className)}>
      <BlogPostHeader type={type} />
      <BlogPostItemContent>
        <div className="mdx">{children}</div>
      </BlogPostItemContent>
      <BlogPostItemFooter />
    </BlogPostItemContainer>
  )
}
