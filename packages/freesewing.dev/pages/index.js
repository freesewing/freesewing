import Page from 'shared/components/wrappers/page.js'
import useApp from 'site/hooks/useApp.js'
import Head from 'next/head'
import HelpUs from 'site/components/help-us.js'
import Link from 'next/link'
import Script from 'next/script'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

const HomePage = (props) => {
  const app = useApp()
  return (
    <Page app={app} title="Welcome to FreeSewing.dev">
      <Head>
        <meta property="og:title" content="FreeSewing.dev" key="title" />
        <meta property="og:type" content="article" key='type' />
        <meta property="og:description" content="Documentation and tutorials for FreeSewing developers and contributors. Plus our Developers Blog" key='description' />
        <meta property="og:article:author" content='Joost De Cock' key='author' />
        <meta property="og:image" content="https://canary.backend.freesewing.org/og-img/en/dev/" key='image' />
        <meta property="og:image:type" content="image/png" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:url" content="https://freesewing.dev/" key='url' />
        <meta property="og:locale" content="en_US" key='locale' />
        <meta property="og:site_name" content="freesewing.dev" key='site' />
      </Head>
      <Script src="/sw.js"></Script>
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
        <h2 className="mt-8">What is FreeSewing?</h2>
        <div className="theme-gradient p-1 -mt-2 mb-2 "></div>
        <p className="text-2xl sm:text-3xl">
          FreeSewing is an open source platform for made-to-measure sewing patterns.
        </p>
        <p className="text-xl sm:text-2xl">
          <b>@freeSewing/core</b> is a Javascript library for 2D parametric design
        </p>
        <p>
          It has a primary focus is on sewing patterns,
          but can be utilized for a variety of similar 2D design tasks.
        </p>

        <h2 className='mt-8'>How can I try it out?</h2>
        <div className="theme-gradient p-1 -mt-2 mb-2 "></div>
        <p className="text-2xl sm:text-3xl">
          You can try it <Link
            href="/howtos/environments/browser">
              <a className="text-secondary">in the browser</a>
            </Link>, <Link
            href="/howtos/environments/node">
              <a className="text-secondary">in NodeJS</a>
            </Link>,
          or on any Javascript runtime.
        </p>
        <p className="text-xl sm:text-2xl">
          The includes Deno, AWS Lamba, Cloudflare workers, Vercel Edge functions, Netlify functions, and so on.
        </p>
        <p>
          Or save yourself the trouble, and check <a
            href="https://freesewing.org/"
            title="Go to FreeSewing.org"
            className="text-secondary font-bold"
          >freesewing.org</a> for a showcase of our software.
        </p>

        <h2 className='mt-8'>
          You son of a bitch, I&apos;m in
          <sup>
            <a
              href="https://www.youtube.com/watch?v=nKxvDYHkfSY"
              className="text-secondary"
            >*</a>
          </sup>
        </h2>
        <div className="theme-gradient p-1 -mt-2 mb-2 "></div>
        <p className="text-2xl sm:text-3xl">
          We are an <a
            href="https://allcontributors.org/"
            className="text-secondary"
          >all-contributors</a> project
          and welcome all contributions.
        </p>
        <p className="text-xl sm:text-2xl">
          <a
            href="https://discord.freesewing.org/"
            className="text-secondary"
          >Come say hi on Discord</a>,
          or check out <Link
              href="/howtos/ways-to-contribute"><a
              className="text-secondary">ways to contribute</a>
          </Link> to get inspired.
        </p>
        <p>
          Last but certainly not least, you can also support FreeSewing financially:
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

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale)),
    }
  }
}

