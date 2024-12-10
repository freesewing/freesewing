import React from 'react'
import { Breadcrumbs } from '@freesewing/react/components/Breadcrumbs'
import { Link as DefaultLink } from '@freesewing/react/components/Link'

/*
 * This is the default layout, including title and breadcrumbs
 *
 * @param {object} props - All React props
 * @param {array} props.children - The content to go in the layout
 * @param {array} props.crumbs - Data for the breadcrumbs
 * @param {string} props.description - The page description
 * @param {function} props.Link - An optional framework specific Link component
 * @param {string} props.title - The page title
 */
export const Layout = ({ children = [], crumbs = [], description, Link = false, title }) => {
  if (!Link) Link = DefaultLink

  return (
    <BaseLayout>
      <div className="max-w-xl w-full mx-auto">
        <Breadcrumbs {...{ crumbs, title, Link }} />
        <h1 className="break-words">{title}</h1>
        <div className="xl:pl-4">{children}</div>
      </div>
    </BaseLayout>
  )
}

/*
 * This is the base layout
 *
 * @param {object} props - All React props
 * @param {array} props.children - The content to go in the layout
 */
export const BaseLayout = ({ children }) => (
  <div className="flex flex-row items-start w-full justify-between 2xl:px-36 xl:px-12 px-4 gap-0 lg:gap-4 xl:gap-8 3xl: gap-12">
    {children}
  </div>
)

/*
 * The left column of the base layout
 *
 * @param {object} props - All React props
 * @param {array} props.children - The content to go in the layout
 */
export const BaseLayoutLeft = ({ children = [] }) => (
  <div className="max-w-96 w-1/4 hidden lg:block shrink-0 my-8 sticky top-4 max-h-screen overflow-scroll">
    {children}
  </div>
)

/*
 * The right column of the base layout
 *
 * @param {object} props - All React props
 * @param {array} props.children - The content to go in the layout
 */
export const BaseLayoutRight = ({ children = [] }) => (
  <div className="max-w-96 w-1/4 hidden xl:block my-8 sticky top-2">{children}</div>
)

/*
 * The main column for prose (text like docs and so on)
 *
 * @param {object} props - All React props
 * @param {array} props.children - The content to go in the layout
 * @param {array} props.wide - Whether or not to use the wide view
 */
export const BaseLayoutProse = ({ children = [], wide = false }) => (
  <div className={`grow w-full m-auto max-w-${wide ? 'full' : 'prose'} my-8`}>{children}</div>
)

/*
 * The central column for wide content (no max-width)
 *
 * @param {object} props - All React props
 * @param {array} props.children - The content to go in the layout
 */
export const BaseLayoutWide = ({ children = [] }) => (
  <div className="grow w-full m-auto my-8 grow">{children}</div>
)

/*
 * A layout for pages that do their own title/layout, like the sign in page
 *
 * @param {object} props - All React props
 * @param {array} props.children - The content to go in the layout
 */
export const NoTitleLayout = ({ children }) => {
  return (
    <BaseLayout>
      <div className="max-w-xl w-full mx-auto">
        <div className="xl:pl-4">{children}</div>
      </div>
    </BaseLayout>
  )
}
