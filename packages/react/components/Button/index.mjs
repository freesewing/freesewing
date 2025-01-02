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
    className: `${staticLinkClasses} tw-daisy-btn-${color} hover:tw-text-${color}-content ${className}`,
    title: title,
    ...btnProps,
  }
  if (onClick) allProps.onClick = onClick
  else if (href) allProps.href = href

  return onClick ? <button {...allProps}>{children}</button> : <a {...allProps}>{children}</a>
}

const staticLinkClasses =
  'tw-flex tw-flex-row tw-gap-2 lg:tw-gap-6 tw-items-center tw-grow ' +
  'tw-justify-between tw-w-full md:tw-w-auto tw-daisy-btn hover:tw-no-underline tw-capitalize'
