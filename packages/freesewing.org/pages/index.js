import Page from 'shared/components/wrappers/page.js'
import useApp from 'site/hooks/useApp.js'
import Head from 'next/head'
import HelpUs from 'site/components/help-us.js'

const HomePage = (props) => {
  const app = useApp()
  return (
    <Page app={app} title="Welcome to FreeSewing.org">
      <Head>
        <meta property="og:title" content="FreeSewing.org" key="title" />
        <meta property="og:type" content="article" key='type' />
        <meta property="og:description" content="Made-to-measure sewing patterns. Free and Open Source" key='description' />
        <meta property="og:article:author" content='Joost De Cock' key='author' />
        <meta property="og:image" content="https://canary.backend.freesewing.org/og-img/en/org/" key='image' />
        <meta property="og:image:type" content="image/png" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:url" content="https://freesewing.org/" key='url' />
        <meta property="og:locale" content="en_US" key='locale' />
        <meta property="og:site_name" content="freesewing.org" key='site' />
      </Head>
      <div className="max-w-screen-md">
        <p>
          FreeSewing.dev hosts documentation for contributors and developers alike.
          <br />
          For our maker site, and to try our platform, go
          to <a
            href="https://freesewing.org/"
            title="Go to FreeSewing.org"
            className="text-secondary font-bold"
          >freesewing.org</a>.
        </p>

        <div className="bg-cover bg-neutral w-full bg-center rounded-lg shadow p-4 "
          style={{backgroundImage: "url(/support.jpg)"}}
        >
          <h2 className="text-neutral-content p-4 text-4xl font-bold sm:font-light sm:text-6xl drop-shadow">Support FreeSewing</h2>
          <p className="text-neutral-content p-4 font-bold max-w-md text-lg">
            FreeSewing is fuelled by a voluntary subscription model
          </p>
          <p className="text-neutral-content p-4 font-bold max-w-md text-lg">
            If you think what we do is worthwhile,
            and if you can spare a few coins each month without hardship,
            please support our work
          </p>
          <a role="button" className="btn btn-accent btn-wide ml-4 mb-8" href="https://freesewing.org/patrons/join">Become a Patron</a>
        </div>
        <HelpUs slug='/' />
      </div>
    </Page>
  )
}

export default HomePage
