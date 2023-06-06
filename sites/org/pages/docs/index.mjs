// Dependencies
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
// Hooks
import { useState, useEffect } from 'react'
// Components
import { ns } from 'shared/components/wrappers/page.mjs'
import { components } from 'shared/components/mdx/index.mjs'
//import { TocWrapper } from 'shared/components/wrappers/toc.mjs'
import { Loading, Page } from './[...slug].mjs'

const DocsHomePage = ({ page, slug, locale }) => {
  // State
  const [frontmatter, setFrontmatter] = useState({ title: 'FreeSewing.org' })
  const [MDX, setMDX] = useState(<Loading />)

  /* Load MDX dynamically */
  useEffect(() => {
    const loadMDX = async () => {
      import(`../../../../markdown/org/docs/${locale}.md`).then((mod) => {
        setFrontmatter(mod.frontmatter)
        const Component = mod.default
        setMDX(<Component components={components} />)
      })
    }
    loadMDX()
  }, [slug])

  return <Page {...{ page, slug, frontmatter, MDX, locale }} />
}

export default DocsHomePage

/*
 * getStaticProps() is used to fetch data at build-time.
 * To learn more, see: https://nextjs.org/docs/basic-features/data-fetching
 */
export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations('en', ['docs', ...ns])),
      slug: 'docs',
      locale,
      page: {
        locale,
        path: ['docs'],
      },
    },
  }
}
