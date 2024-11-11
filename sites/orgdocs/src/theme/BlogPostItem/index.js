import React, { useState, useEffect } from 'react'
import clsx from 'clsx'
import { useBlogPost } from '@docusaurus/plugin-content-blog/client'
import BlogPostItemContainer from '@theme/BlogPostItem/Container'
import BlogPostItemHeader from '@theme/BlogPostItem/Header'
import BlogPostItemContent from '@theme/BlogPostItem/Content'
import BlogPostItemFooter from '@theme/BlogPostItem/Footer'
// apply a bottom margin in list view
function useContainerClassName() {
  const { isBlogPostPage } = useBlogPost()
  return !isBlogPostPage ? 'margin-bottom--xl' : undefined
}

const BlogPostHeader = () => {
  const { metadata } = useBlogPost()

  return (
    <>
      <img src={imgUrl(metadata.permalink)} />
      <BlogPostItemHeader />
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

  return (
    <BlogPostItemContainer className={clsx(containerClassName, className)}>
      <BlogPostHeader />
      <BlogPostItemContent>
        <div className="mdx">{children}</div>
      </BlogPostItemContent>
      <BlogPostItemFooter />
    </BlogPostItemContainer>
  )
}
