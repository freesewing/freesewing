import Page from 'site/components/wrappers/page.js'
import useApp from 'site/hooks/useApp.js'
import Layout from 'site/components/layouts/bare'
import Head from 'next/head'
import Robot from 'shared/components/robot'
import Popout from 'shared/components/popout'
import PageLink from 'shared/components/page-link'

const Page404 = (props) => {
  const app = useApp()

  return (
    <Page app={app} title="404: Page not found" layout={Layout}>
      <Head>
        <meta property="og:title" content="Page not found" key="title" />
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
      <div className="flex flex-col gap-4 mt-16 lg:mt-32 text-center">
        <h1>404: Page not found</h1>
        <div className="m-auto max-w-3xl px-4">
          <div className="max-w-md m-auto px-12 mb-4">
            <Robot embed pose="fail" />
          </div>
          <h2>We could not find what you are looking for</h2>
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
      </div>
    </Page>
  )
}

export default Page404
