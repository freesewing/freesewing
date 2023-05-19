// Dependencies
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
// Components
import Head from 'next/head'
import { PageWrapper } from 'shared/components/wrappers/page.mjs'
import { Popout } from 'shared/components/popout.mjs'
import { PageLink } from 'shared/components/page-link.mjs'
import { Icons } from 'shared/components/navigation/primary.mjs'
import { Highlight } from 'shared/components/mdx/highlight.mjs'
import { WebLink } from 'shared/components/web-link.mjs'

const title = 'Welcome to FreeSewing.dev'

/*
 * Each page MUST be wrapped in the PageWrapper component.
 * You also MUST spread props.page into this wrapper component
 * when path comes from static props (as here)
 * or set them manually.
 */
const HomePage = ({ page }) => (
  <PageWrapper {...page}>
    <Head>
      <meta property="og:type" content="article" key="type" />
      <meta
        property="og:description"
        content="Documentation and tutorials for FreeSewing developers and contributors"
        key="description"
      />
      <meta property="og:article:author" content="Joost De Cock" key="author" />
      <meta property="og:image" content="https://freesewing.dev/og/og.png" key="image" />
      <meta property="og:image:type" content="image/png" />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:url" content="https://freesewing.dev/" key="url" />
      <meta property="og:locale" content="en_US" key="locale" />
      <meta property="og:site_name" content="freesewing.dev" key="site" />
      <title>{title}</title>
    </Head>
    <div>
      <Popout fixme>Create a new home page</Popout>
      <div className="py-1">
        <div className="max-w-7xl m-auto my-12 lg:my-32 px-4">
          <h2>FreeSewing 3</h2>
          <div className="flex flex-row flex-wrap gap-4 justify-between">
            <div className="max-w-xl">
              <h3>We&apos;re working on it 🤓</h3>
              <p>
                The upcoming version 3 of FreeSewing is currently under development. Our core
                library has stabilized and we have updated our documentation for FreeSewing version
                3.
              </p>
              <Popout note>
                <h5>Looking for v2 documentation?</h5>
                <p>
                  Visit <WebLink href="https://v2.freesewing.dev/" txt="v2.freesewing.dev" /> for
                  the documentation for version 2 of FreeSewing.
                </p>
              </Popout>
            </div>
            <div className="max-w-xl">
              <h3>What&apos;s changed?</h3>
              <p>
                Check{' '}
                <PageLink
                  href="/guides/v3/migration"
                  txt="the FreeSewing version 3 migration guide"
                />{' '}
                to learn about what is new in version 3 of FreeSewing, and what changes you should
                make in your own designs to port them to version 3.
              </p>
              <Popout tip>
                <p>
                  If you have any questions to which you can&apos;t find the answers here, please{' '}
                  <WebLink
                    href="https://discord.freesewing.org/"
                    txt="reach out to us on Discord"
                  />
                  .
                </p>
              </Popout>
            </div>
          </div>
        </div>
      </div>
      <div className="max-w-7xl m-auto lg:my-32 px-4">
        <h2>TL;DR</h2>
        <div className="flex flex-row flex-wrap gap-4 justify-between">
          <div className="max-w-xl">
            <h3>
              Got node? <span role="img">🤔</span>
            </h3>
            <p>
              All you need is <strong>NodeJS</strong>; Then run the following command in a terminal:
            </p>
            <Highlight language="shell">npx @freesewing/new-design</Highlight>
            <p>This command will setup the FreeSewing development environment for you.</p>
            <Popout tip compact>
              Refer to our{' '}
              <PageLink
                href="/tutorials/getting-started-linux/dev-setup"
                txt="getting started guides"
              />{' '}
              for more info on setting up your development environment.
            </Popout>
          </div>
          <div className="max-w-xl">
            <h3>
              Need help? <span role="img">🤯</span>
            </h3>
            <p>
              When you have questions or find yourself scratching your head you can{' '}
              <PageLink href="/contact" txt="contact us" /> in various ways.
            </p>
            <Popout note compact>
              While we are all volunteers, we have a pretty good track record of helping people, and
              we plan to keep it that way. So <PageLink href="/contact" txt="don't be shy" />{' '}
              <span role="img">💜</span>
            </Popout>
          </div>
        </div>
      </div>
      <div className="w-full m-auto lg:my-32">
        <div
          className="bg-cover bg-neutral w-full bg-center shadow p-4 py-12"
          style={{ backgroundImage: 'url(/support.jpg)' }}
        >
          <div className="max-w-6xl m-auto">
            <h2 className="text-neutral-content p-4 text-4xl font-bold sm:font-light sm:text-6xl drop-shadow">
              Support FreeSewing
            </h2>
            <p className="text-neutral-content p-4 font-bold max-w-md text-lg drop-shadow">
              FreeSewing is fuelled by a voluntary subscription model
            </p>
            <p className="text-neutral-content p-4 font-bold max-w-md text-lg drop-shadow">
              If you think what we do is worthwhile, and if you can spare a few coins each month
              without hardship, please support our work
            </p>
            <a
              role="button"
              className="btn btn-accent btn-wide ml-4 mb-8"
              href="https://freesewing.org/patrons/join"
            >
              Become a Patron
            </a>
          </div>
        </div>
      </div>
      <div className="max-w-7xl m-auto my-8 lg:my-32">
        <div className="px-8 text-base-content">
          <Icons
            ulClasses="grid grid-cols-2 gap-4 w-full lg:grid-cols-4 lg:gap-8 mt-8 max-w-6xl"
            liClasses=""
            linkClasses={`
            text-lg lg:text-xl py-1 text-base-content
            hover:text-secondary sm:hover:text-secondary-focus hover:cursor-pointer
            flex flex-col items-center capitalize`}
          />
        </div>
      </div>
    </div>
  </PageWrapper>
)

export default HomePage

export async function getStaticProps() {
  return {
    props: {
      ...(await serverSideTranslations('en')),
      page: {
        path: [],
      },
    },
  }
}
