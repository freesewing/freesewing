import React from 'react'
import { linkClasses } from '@freesewing/utils'

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
 * @param {string} props.style - Any non-default styles to apply
 */
export const Link = ({ href, title = false, children, className = linkClasses, style = {} }) => (
  <a href={href} className={className} title={title ? title : ''} style={style}>
    {children}
  </a>
)

const BaseLink = Link

/**
 * A regular link, but on a success background
 *
 * @param {object} props - All React props
 * @param {array} props.children - The content to go in the layout
 * @param {array} props.href - The target to link to
 * @param {array} props.title - An optional link title
 * @param {string} props.className - Any non-default CSS classes to apply
 * @param {string} props.style - Any non-default styles to apply
 */
export const SuccessLink = ({
  href,
  title = false,
  children,
  className = `${linkClasses} tw-text-success-content hover:tw-text-success-content`,
  style = {},
}) => (
  <a href={href} className={className} title={title ? title : ''} style={style}>
    {children}
  </a>
)

export const CardLink = ({
  href,
  title,
  icon,
  children,
  Link,
  className = 'tw-bg-base-200 tw-text-base-content',
}) => {
  if (!Link) Link = BaseLink

  return (
    <Link
      href={href}
      className={`tw-px-8 tw-py-10 tw-rounded-lg tw-block ${className}
      hover:tw-bg-secondary hover:tw-bg-opacity-10 tw-shadow-lg
      tw-transition-color tw-duration-300 grow hover:tw-no-underline hover:tw-text-base-content`}
    >
      <h2 className="tw-mb-4 tw-text-inherit tw-flex tw-flex-row tw-gap-4 tw-justify-between tw-items-center">
        {title}
        <span className="tw-shrink-0">{icon}</span>
      </h2>
      {children}
    </Link>
  )
}
