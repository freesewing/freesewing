// Dependencies
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { loadMdxAsStaticProps } from 'shared/mdx/load.mjs'
import { nsMerge } from 'shared/utils.mjs'
// Hooks
import { useState } from 'react'
// Components
import { PageWrapper, ns as pageNs } from 'shared/components/wrappers/page.mjs'
import { MdxWrapper } from 'shared/components/wrappers/mdx.mjs'
import { DocsLayout, ns as layoutNs } from 'site/components/layouts/docs.mjs'

export const ns = nsMerge('docs', pageNs, layoutNs)

const DocsHomePage = ({ page, locale, frontmatter, mdx, mdxSlug }) => {
  const [wide, setWide] = useState(false)

  return (
    <PageWrapper
      {...page}
      locale={locale}
      title={frontmatter.title}
      intro={frontmatter.intro || frontmatter.lead}
      layout={(props) => (
        <DocsLayout {...props} {...{ slug: page.path.join('/'), frontmatter, wide, setWide }} />
      )}
    >
      <MdxWrapper mdx={mdx} site="org" slug={mdxSlug} wide={wide} />
    </PageWrapper>
  )
}

export default DocsHomePage

/*
 * getStaticProps() is used to fetch data at build-time.
 * To learn more, see: https://nextjs.org/docs/basic-features/data-fetching
 */
export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ns)),
      ...(await loadMdxAsStaticProps({
        language: locale,
        site: 'org',
        slug: 'docs',
      })),
      slug: 'docs',
      locale,
      page: {
        locale,
        path: ['docs'],
      },
    },
  }
}
