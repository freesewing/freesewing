import React from 'react'

/**
 * A button with an icon and a label. Common across our UI
 *
 * @param {object} props - All React props
 * @param {string} title - The button title
 * @param {string} className - Any EXTRA classes to add
 * @param {string} color - The main button color
 * @param {string} href - Set this to make it a link
 */
export const IconButton = ({
  title = '',
  className = '',
  onClick = false,
  href = false,
  color = 'primary',
  children = [],
  btnProps = {},
}) => {
  const allProps = {
    className: `${staticLinkClasses} daisy-btn-${color} hover:text-${color}-content ${className}`,
    title: title,
    ...btnProps,
  }
  if (onClick) allProps.onClick = onClick
  else if (href) allProps.href = href

  return onClick ? <button {...allProps}>{children}</button> : <a {...allProps}>{children}</a>
}

const staticLinkClasses = `flex flex-row gap-2 lg:gap-12 items-center justify-between w-full lg:w-auto daisy-btn hover:no-underline capitalize my-2`
