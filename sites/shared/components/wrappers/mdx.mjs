//  __SDEFILE__ - This file is a dependency for the stand-alone environment
// Dependencies
import * as runtime from 'react/jsx-runtime'
import { run, runSync } from '@mdx-js/mdx'
import { useState, useEffect } from 'react'
// Components that are available in MDX content
import { components as baseComponents } from 'shared/components/mdx/index.mjs'
// Loading component when running async
import { Loading } from 'shared/components/spinner.mjs'

/*
 * This runs MDX that is compiled as function-body
 * By run, I mean it turns it into a React component
 * This is the default async version
 */
const runMdx = async (mdx) => {
  const { default: Content } = await run(mdx, runtime)

  return Content
}

/*
 * This runs MDX that is compiled as function-body
 * By run, I mean it turns it into a React component
 * This is the sync version because SSR does not run effects
 */
const runMdxSync = (mdx) => {
  const { default: Content } = runSync(mdx, runtime)

  return Content
}

export const PlainMdxWrapperAsync = ({ mdx = false, components = {}, site = 'org', slug = [] }) => {
  /*
   * Merge passed-in components with the base components
   */
  const allComponents = { ...baseComponents(site, slug), ...components }

  /*
   * Set up state for MDX as running it is handled async in useEffect
   */
  const [MDX, setMDX] = useState(false)

  /*
   * Run the mdx compiled as function-body and turn it into a component
   */
  useEffect(() => {
    const run = async () => {
      const Content = await runMdx(mdx)
      setMDX(<Content components={allComponents} />)
    }
    if (mdx) run()
  }, [mdx])

  return <div className="searchme">{MDX ? MDX : <Loading />}</div>
}

export const PlainMdxWrapperSync = ({ mdx = false, components = {}, site = 'org', slug = [] }) => {
  /*
   * Merge passed-in components with the base components
   */
  const allComponents = { ...baseComponents(site, slug), ...components }

  /*
   * Run mdx sync
   */
  const Content = runMdxSync(mdx)

  return (
    <div className="searchme">
      <Content components={allComponents} />
    </div>
  )
}

export const MdxWrapper = ({
  mdx = false,
  components = {},
  site = 'org',
  async = false,
  slug = [],
  wide = false,
}) => (
  <div
    className={`text-base-content mdx max-w-${wide ? 'full' : 'prose'} text-base-content text-base`}
  >
    {async ? (
      <PlainMdxWrapperAsync {...{ mdx, components, site, slug }} />
    ) : (
      <PlainMdxWrapperSync {...{ mdx, components, site, slug }} />
    )}
  </div>
)
