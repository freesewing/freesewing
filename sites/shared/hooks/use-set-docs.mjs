// Hooks
import { useCallback } from 'react'
import { useDynamicMdx } from 'shared/hooks/use-dynamic-mdx.mjs'
// Components
import { MdxWrapper } from 'shared/components/wrappers/mdx.mjs'

export const useSetDocs = (locale) => {
  const loader = (option) =>
    useCallback(
      () =>
        import(
          /* webpackInclude: /docs\/site\/sets\/[a-z]+\/[a-z][a-z]\.md$/ */ `orgmarkdown/docs/site/sets//${option}/${locale}.md`
        ),
      [locale]
    )

  const docs = {}

  for (const option of ['name', 'units', 'public', 'notes', 'image']) {
    const { MDX, frontmatter } = useDynamicMdx(loader(option))
    docs[option] = (
      <>
        <h2>{frontmatter.title}</h2>
        <MdxWrapper>{MDX}</MdxWrapper>
      </>
    )
  }

  return docs
}
