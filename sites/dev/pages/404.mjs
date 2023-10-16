// Dependencies
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
// Components
import Head from 'next/head'
import { PageWrapper, ns as pageNs } from 'shared/components/wrappers/page.mjs'
import { Robot } from 'shared/components/robot/index.mjs'
import { Popout } from 'shared/components/popout/index.mjs'
import { PageLink } from 'shared/components/link.mjs'
import { BaseLayout, BaseLayoutLeft, BaseLayoutWide } from 'shared/components/base-layout.mjs'
import { NavLinks, MainSections } from 'shared/components/navigation/sitenav.mjs'

const namespaces = [...pageNs]

const Page404 = () => (
  <PageWrapper title="404: Page not found">
    <Head>
      <meta property="og:type" content="article" key="type" />
      <meta
        property="og:description"
        content="There's nothing here. If you followed a link to get here, that link is broken"
        key="description"
      />
      <meta property="og:article:author" content="Joost De Cock" key="author" />
      <meta property="og:image" content={`https://freesewing.dev/og/404/og.png`} key="image" />
      <meta property="og:image:type" content="image/png" />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:url" content={`https://freesewing.dev/`} key="url" />
      <meta property="og:locale" content="en_US" key="locale" />
      <meta property="og:site_name" content="freesewing.dev" key="site" />
    </Head>
    <BaseLayout>
      <BaseLayoutLeft>
        <MainSections />
        <NavLinks />
      </BaseLayoutLeft>
      <BaseLayoutWide>
        <div className="max-w-2xl">
          <h1>404: Page not found</h1>
          <div className="max-w-sm m-auto px-12 mb-4">
            <Robot embed pose="fail" />
          </div>
          <h3>We could not find what you are looking for</h3>
          <div className="text-left">
            <Popout comment by="joost">
              <h5>Did you arrive here from a link?</h5>
              <p>In that case, that link is broken.</p>
              <p>
                If it was one of our links, please <PageLink href="/contact" txt="let us know" /> so
                we can fix it.
              </p>
            </Popout>
          </div>
        </div>
      </BaseLayoutWide>
    </BaseLayout>
  </PageWrapper>
)

export default Page404

export async function getStaticProps() {
  return {
    props: {
      ...(await serverSideTranslations('en', namespaces)),
      page: {
        path: ['404'],
      },
    },
  }
}
