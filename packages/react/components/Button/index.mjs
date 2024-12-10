import React from 'react'

const sizes = {
  lg: 'text-lg padding-4',
  base: 'text-base padding-2',
  sm: 'text-sm padding-2',
  xs: 'text-xs padding-1',
}

const variants = {
  base: '',
  outline: '',
  ghost: '',
  link: '',
}

const shared = 'gap-2 font-semibold no-underline duration-200 ease-out'

/**
 * A button component
 *
 * @param {object} props - All React props
 * @param {array} props.children - Content to go inside the button
 * @param {string} props.color - One of the named colors (primary, secondary, accent, neutral, warning, error, success, info)
 * @param {string} props.size - One of the sizes (lg, base, sm, xs)
 * @param {string} props.variant - The button variant, one of base, outline, ghost, or link
 * @param {string} className - Any additional CSS classes to add
 */
export const Button = ({ children = [], color = 'primary', size = 'base', variant = 'base' }) => {
  //if (variant === "outline") return <OutlineButton {...props} />

  return <button className={`${shared} ${sizes[size]}`}>{children}</button>
}
