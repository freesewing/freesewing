// Components that are available in MDX content
import { components as baseComponents } from 'shared/components/mdx/index.mjs'

// Previous-Next navigation
//import { PrevNext } from '../mdx/prev-next.mjs'

export const MdxWrapper = ({ MDX, frontmatter = {}, components = {} }) => {
  const allComponents = { ...baseComponents, ...components }

  return (
    <div className="text-primary mdx max-w-prose text-base-content max-w-prose text-base">
      <MDX components={allComponents} />
    </div>
  )
}
