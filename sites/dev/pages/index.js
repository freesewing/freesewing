import Page from 'site/components/wrappers/page.js'
import useApp from 'site/hooks/useApp.js'
import Head from 'next/head'
import HelpUs from 'site/components/help-us.js'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import Layout from 'site/components/layouts/bare'
import { Icons } from 'shared/components/navigation/primary'
import Highlight from 'shared/components/mdx/highlight'
import Popout from 'shared/components/popout'
import WebLink from 'shared/components/web-link'
import Code from 'shared/components/code'

const HomePage = (props) => {
  const app = useApp()
  return (
    <Page app={app} title="Welcome to FreeSewing.dev" layout={Layout}>
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
        <section
          style={{
            backgroundImage: "url('/img/splash.jpg')",
            backgroundSize: 'cover',
            backgroundPosition: '40% 50%',
          }}
          className="m-0 p-0 shadow drop-shadow-lg w-full mb-8"
        >
          <div className="mx-auto px-8 flex flex-col items-center justify-center min-h-screen lg:min-h-0 lg:py-96">
            <div className="flex flex-col items-end max-w-4xl">
              <h1
                className={`
                  text-4xl font-black text-right px-4
                  sm:text-6xl
                  md:text-7xl px-6
                  lg:px-8
                  bg-secondary
                  `}
                style={{ textShadow: '1px 1px 3px #000', color: 'white' }}
              >
                FreeSewing
                <span className="font-light">.dev</span>
              </h1>
              <h2
                className={`
                  text-right text-2xl mr-0
                  sm:text-3xl
                  md:text-4xl
                  lg:max-w-1/2 lg:text-4xl xl:pr-0 `}
                style={{ textShadow: '1px 1px 3px #000', color: 'white' }}
              >
                Documentation for FreeSewing contributors & developers
              </h2>
            </div>
            <Icons app={app}  active='/'
              ulClasses="flex flex-row flex-wrap mt-8 justify-around w-full max-w-6xl"
              liClasses="text-neutral-content w-1/3 my-4 lg:mx-2 lg:w-24"
              linkClasses={`
                text-lg lg:text-xl py-1 text-secondary
                hover:text-secondary sm:hover:text-secondary-focus hover:cursor-pointer
                flex flex-col items-center capitalize`}
            />
            <p className="text-neutral-content text-center mt-8">
              To learn more about FreeSewing and try our platform
              go to <a
                href="https://freesewing.org/"
                title="Go to FreeSewing.org"
                className="text-secondary font-bold"
              >freesewing.org</a>
            </p>
          </div>
        </section>
      <div>
      <div className="max-w-7xl m-auto my-32">
        <h2>TL;DR</h2>
        <div className="flex flex-row flex-wrap gap-4 justify-between">
          <div className="max-w-xl">
            <h3>To go fast, go alone</h3>
            <p>All you need is <strong>NodeJS</strong>; Then run:</p>
            <Highlight language="js">
              npx @freesewing/new-design
            </Highlight>
            <p>This command will setup our stand-alone development environment for you</p>
            <Popout tip compact>
              Use this if you want to do your own thing, and not contribute to FreeSewing
            </Popout>
          </div>
          <div className="max-w-xl">
            <h3>To go far, go together</h3>
            <p>
              First, <WebLink
                href="https://github.com/freesewing/freesewing/fork"
                txt="fork our monorepo"
              />, then run:
            </p>
            <Highlight language="shell">
              git clone {`<url to your fork>`}
              <br />
              cd freesewing
              <br />
              yarn kickstart
            </Highlight>
            <p>
              These commands will clone your fork of <WebLink
                href="https://github.com/freesewing/freesewing"
                txt="the freesewing/freesewing repository on Github"
              /> and set it up for development.
            </p>
            <Popout tip compact>
              Use this if you want to contribute to FreeSewing, for the betterment of all involved
            </Popout>
            <Popout note>
              <ul className="list-inside list-disc">
                <li>You need <WebLink href="https://yarnpkg.com/" txt="yarn"/> to work with our monorepo</li>
                <li>
                  Clone the URL to your own fork:
                  <Code>{`https://github.com/your-username-here/freesewing`}</Code></li>
              </ul>
            </Popout>
          </div>
        </div>
      </div>
      <div className="max-w-7xl m-auto my-32">
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
      </div>
      <div className="max-w-7xl m-auto my-32">
        <div className="px-8 text-base-content">
          <Icons app={app}
            active='/'
            ulClasses="flex flex-row flex-wrap mt-8 justify-around w-full max-w-6xl"
            liClasses="w-1/3 my-4 lg:mx-2 lg:w-24"
            linkClasses={`
              text-lg lg:text-xl py-1 text-base-content
              hover:text-secondary sm:hover:text-secondary-focus hover:cursor-pointer
              flex flex-col items-center capitalize`}
          />
        </div>
      </div>
      <div className="max-w-xl m-auto my-32">
        <HelpUs slug='/' />
      </div>
    </div>

    </Page>
  )
}

export default HomePage

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations('en')),
    }
  }
}

