// Dependencies
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
//import { useTranslation } from 'next-i18next'
import Head from 'next/head'
// Components
import { PageWrapper } from 'shared/components/wrappers/page.mjs'
import { Popout } from 'shared/components/popout.mjs'
import { PageLink } from 'shared/components/page-link.mjs'
import { BareLayout } from 'site/components/layouts/bare.mjs'
import MDX, { frontmatter } from 'markdown/docs/site/draft/core-settings/sabool/en.md'
import { components } from 'shared/components/mdx/index.mjs'
import { MdxWrapper } from 'shared/components/wrappers/mdx.mjs'

/*
 * Each page MUST be wrapped in the PageWrapper component.
 * You also MUST spread props.page into this wrapper component
 * when path and locale come from static props (as here)
 * or set them manually.
 */

console.log(MDX, frontmatter)
const HomePage = ({ page }) => (
  <PageWrapper {...page} layout={BareLayout}>
    <Head>
      <title>Welcome to FreeSewing.org</title>
    </Head>
    <div>
      <div className="max-w-xl m-auto my-32 px-6">
        <Popout fixme>
          Create homepage. Meanwhile check <PageLink href="/signup" txt="the signup flow" />
        </Popout>

        <MdxWrapper {...{ MDX, frontmatter }} />
        <MDX components={components} />
        <h2>What is FreeSewing?</h2>
        <small>(by ChatGPT)</small>
        <p>
          Freesewing is an open-source pattern making software that allows users to generate custom
          sewing patterns based on their own measurements. It is designed to be flexible and
          customizable, and can be used to create a wide range of garments, from simple t-shirts and
          skirts to more complex dresses and jackets.
        </p>
        <p>
          Freesewing is available for free, and users can access a wide range of pre-made patterns
          or create their own from scratch. The software is designed to be easy to use, with an
          intuitive interface that guides users through the process of creating a pattern
          step-by-step.
        </p>
        <p>
          In addition to the pattern making software, freesewing also has an active online community
          of sewists and pattern makers who share tips, techniques, and advice on all aspects of
          sewing. The community also collaborates on creating new patterns and improving existing
          ones, and users can contribute their own patterns to the project as well.
        </p>
        <p>
          Overall, freesewing is a powerful tool for anyone interested in sewing and pattern making,
          whether they are seasoned professionals or beginners just starting out.
        </p>
      </div>
    </div>
  </PageWrapper>
)

export default HomePage

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale)),
      page: {
        locale,
        path: [],
      },
    },
  }
}
