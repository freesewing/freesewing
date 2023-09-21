// Components that are available in MDX content
import { components as baseComponents } from 'shared/components/mdx/index.mjs'

export const PlainMdxWrapper = ({ MDX = false, components = {}, children, site = 'org' }) => {
  const allComponents = { ...baseComponents(site), ...components }

  return <div className="searchme">{MDX ? <MDX components={allComponents} /> : children}</div>
}

export const MdxWrapper = ({ MDX = false, components = {}, children = [], site = 'org' }) => (
  <div className="text-primary mdx max-w-prose text-base-content max-w-prose text-base">
    <PlainMdxWrapper {...{ MDX, components, children, site }} />
  </div>
)
