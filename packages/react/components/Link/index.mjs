import React from 'react'

/*
 * These classes are what makes a link a link
 */
export const linkClasses =
  'underline decoration-2 hover:decoration-4 text-secondary hover:text-secondary-focus'

/**
 * An anchor link component
 *
 * @param {object} props - All React props
 * @param {array} props.children - The content to go in the layout
 * @param {array} props.id - The ID of the anchor to link to
 * @param {array} props.title - An optional link title
 */
export const AnchorLink = ({ children, id = '', title = false }) => (
  <a href={`#${id}`} className={linkClasses} title={title ? title : ''}>
    {children}
  </a>
)

/**
 * A regular link component
 *
 * @param {object} props - All React props
 * @param {array} props.children - The content to go in the layout
 * @param {array} props.href - The target to link to
 * @param {array} props.title - An optional link title
 * @param {string} props.className - Any non-default CSS classes to apply
 */
export const Link = ({ href, title = false, children, className = linkClasses }) => (
  <a href={href} className={className} title={title ? title : ''}>
    {children}
  </a>
)

const BaseLink = Link

export const CardLink = ({ href, title, Icon, children, Link }) => {
  if (!Link) Link = BaseLink

  return (
    <Link className="">
      {title}
      {children}
    </Link>
  )
}
