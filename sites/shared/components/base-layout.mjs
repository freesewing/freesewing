/*
 * The default full-page FreeSewing layout
 */
export const BaseLayout = ({ children = [] }) => (
  <div className="flex flex-row items-start mt-8 w-full justify-between 2xl:px-36 xl:px-12 px-4">
    {children}
  </div>
)

/*
 * The left column of the default layout
 */
export const BaseLayoutLeft = ({ children = [] }) => (
  <div className="max-w-96 w-1/4 mt-8 hidden lg:block shrink-0">{children}</div>
)

/*
 * The right column of the default layout
 */
export const BaseLayoutRight = ({ children = [] }) => (
  <div className="max-w-96 w-1/4 mt-8 hidden xl:block">{children}</div>
)

/*
 * The main column for prose (text like docs and so on)
 */
export const BaseLayoutProse = ({ children = [] }) => (
  <div className="grow w-full m-auto max-w-prose mt-0 mb-8">{children}</div>
)

/*
 * The central column for wide content (no max-width)
 */
export const BaseLayoutWide = ({ children = [] }) => (
  <div className="grow w-full m-auto mt-0 mb-8 grow">{children}</div>
)
