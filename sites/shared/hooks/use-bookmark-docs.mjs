// Hooks
import { useCallback } from 'react'
import { useDynamicMdx } from 'shared/hooks/use-dynamic-mdx.mjs'
// Components
import { MdxWrapper } from 'shared/components/wrappers/mdx.mjs'

export const useBookmarkDocs = (locale) => {
  const loader = (option) =>
    useCallback(
      () =>
        import(
          /* webpackInclude: /docs\/site\/bookmarks\/[a-z]+\/[a-z][a-z]\.md$/ */ `markdown/docs/site/bookmarks/${option}/${locale}.md`
        ),
      [locale]
    )

  const docs = {}

  for (const option of ['title', 'location', 'type']) {
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
