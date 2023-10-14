// Dependencies
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { nsMerge } from 'shared/utils.mjs'
// Components
import { PageWrapper, ns as pageNs } from 'shared/components/wrappers/page.mjs'
// MDX
import { MdxWrapper } from 'shared/components/wrappers/mdx.mjs'
import { components } from 'shared/components/mdx/index.mjs'
import en, { frontmatter as enFrontmatter } from './en.mdx'
import de, { frontmatter as deFrontmatter } from './de.mdx'
import es, { frontmatter as esFrontmatter } from './es.mdx'
import nl, { frontmatter as nlFrontmatter } from './nl.mdx'
import fr, { frontmatter as frFrontmatter } from './fr.mdx'
import uk, { frontmatter as ukFrontmatter } from './uk.mdx'

const ns = nsMerge(pageNs, 'sde', 'account')

const mdx = { en, de, es, nl, fr, uk }
const frontmatter = {
  en: enFrontmatter,
  de: deFrontmatter,
  es: esFrontmatter,
  nl: nlFrontmatter,
  fr: frFrontmatter,
  uk: ukFrontmatter,
}

/*
 * Each page MUST be wrapped in the PageWrapper component.
 * You also MUST spread props.page into this wrapper component
 * when path and locale come from static props (as here)
 * or set them manually.
 */
const DocsPage = ({ page }) => {
  const Mdx = mdx[page.locale]

  return (
    <PageWrapper {...page} title={false}>
      <h1>{frontmatter[page.locale].title}</h1>
      <MdxWrapper>
        <Mdx components={components('dev')} />
      </MdxWrapper>
    </PageWrapper>
  )
}

export default DocsPage

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ns)),
      page: {
        locale,
        path: ['docs'],
      },
    },
  }
}
