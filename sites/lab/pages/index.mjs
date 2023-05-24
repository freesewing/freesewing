// Dependencies
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
//import { useTranslation } from 'next-i18next'
import Head from 'next/head'
// Components
import { PageWrapper } from 'shared/components/wrappers/page.mjs'
import { Popout } from 'shared/components/popout.mjs'
import { PageLink } from 'shared/components/page-link.mjs'

/*
 * Each page MUST be wrapped in the PageWrapper component.
 * You also MUST spread props.page into this wrapper component
 * when path and locale come from static props (as here)
 * or set them manually.
 */
const HomePage = ({ page }) => (
  <PageWrapper {...page}>
    <Head>
      <title>Welcome to FreeSewing.org</title>
    </Head>
    <div>
      <div className="max-w-xl m-auto my-32 px-6">
        <Popout fixme>
          Create homepage. Meanwhile check <PageLink href="/signup" txt="the signup flow" />
        </Popout>
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
