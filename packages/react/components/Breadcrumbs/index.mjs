import React from 'react'

/*
 * The actual Breadcrumbs component
 *
 * @param {object} props - All the React props
 * @param {array} props.crumbs - The crumbs, an array with objects with href, label keys
 * @param {function} Link - An optional custom component to use to render the Link
 * @param {text} title - The title of the current page
 */
export const Breadcrumbs = ({ crumbs = [], title, Link = false }) => {
  if (Link === false) Link = RegularLink

  return (
    <div className="tw-tailwind-container tw-p-0">
      <ul
        className="tw-flex tw-flex-row tw-items-center tw-gap-2 tw-m-0 tw-py-4"
        style={{ paddingLeft: 0 }}
      >
        <li className="tw-inline">
          <Link href="/">Home</Link>
        </li>
        <Spacer />
        {crumbs.map((crumb, i) => (
          <li key={i} className="tw-inline">
            <Link href={crumb.href}>{crumb.label}</Link>
          </li>
        ))}
        <li className="tw-inline">{title}</li>
      </ul>
    </div>
  )
}

/*
 * People can pass in a custom Link component,
 * which is useful when using one from your framework.
 * If not, we use a regular a tag
 */
const RegularLink = ({ href, children }) => <a href={href}>{children}</a>

/*
 * This goes between breadcrumbs
 */
const Spacer = () => <li className="tw-inline">&raquo;</li>
