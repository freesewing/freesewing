// Dependencies
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
// Components
import Head from 'next/head'
import { PageWrapper } from 'shared/components/wrappers/page.mjs'
import { PageLink } from 'shared/components/link.mjs'
import { Highlight } from 'shared/components/mdx/highlight.mjs'
import { FreeSewingIcon } from 'shared/components/icons.mjs'
import Link from 'next/link'

const title = 'Welcome to FreeSewing.dev'

const BoldLink = ({ href, children }) => (
  <a href={href} className="font-bold underline hover:decoration-4">
    {children}
  </a>
)

const CardLink = ({ color = 'primary', href, title, text }) => (
  <div className={`p-1 bg-${color} rounded-none lg:rounded-xl lg:shadow flex flex-col`}>
    <Link
      href={href}
      className={`px-4 lg:px-8 py-10 rounded-none lg:rounded-lg block
      bg-base-100 text-base-content hover:bg-${color} hover:text-${color}-content
      transition-color duration-300 grow`}
    >
      <h2 className="mb-4 text-inherit">{title}</h2>
      <p className="font-medium text-inherit">{text}</p>
    </Link>
  </div>
)

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

    <div className="max-w-7xl m-auto px-0 mt-24 text-center">
      <FreeSewingIcon className="h-36 w-36 m-auto" />
      <h1 className="text-center font-heavy drop-shadow-md px-4">
        <span style={{ letterSpacing: '-0.2rem' }} className="text-5xl lg:text-6xl">
          FreeSewing
        </span>
        <span className="block text-sm lg:text-xl m-1">
          The library for parametric sewing patterns
        </span>
      </h1>

      <div className="flex flex-col gap-8 lg:grid lg:grid-cols-3 lg:gap-4 mt-12">
        <div className="p-1 bg-gradient-to-tr from-accent to-primary rounded-none lg:rounded-xl lg:shadow flex flex-col">
          <div className="px-4 lg:px-8 bg-base-100 rounded-none lg:rounded-lg grow">
            <h2 className="mb-4">Custom-Fit Fashion</h2>
            <p className="font-medium">
              FreeSewing is the leading open source library for on-demand garment manufacturing.
            </p>
            <p className="font-medium">
              Loved by home sewers and fashion entrepreneurs alike, we provide the tech stack for
              your creative endeavours.
            </p>
          </div>
        </div>

        <div className="p-1 bg-gradient-to-tr from-info to-neutral rounded-none lg:rounded-xl lg:shadow flex flex-col">
          <div className="px-4 lg:px-8 bg-base-100 rounded-none lg:rounded-lg grow">
            <h2 className="mb-4">Patterns as Code</h2>
            <p className="font-medium">
              FreeSewing designs are implemented as code giving you unmatched power and flexibility.
            </p>
            <p className="font-medium">
              You can mix and match parts from different designs, extend them, or add options that
              turn one base design into many.
            </p>
          </div>
        </div>

        <div className="p-1 bg-gradient-to-tr from-primary to-secondary rounded-none lg:rounded-xl lg:shadow flex flex-col">
          <div className="px-4 lg:px-8 bg-base-100 rounded-none lg:rounded-lg grow">
            <h2 className="mb-4">License: MIT</h2>
            <p className="font-medium">
              FreeSewing is an open source project under{' '}
              <BoldLink href="https://en.wikipedia.org/wiki/MIT_License">the MIT license</BoldLink>.
            </p>
            <p className="font-medium">
              Which means it is ok to use our code to help you put food on the table.
            </p>
          </div>
        </div>
      </div>

      <div className="p-0 bg-gradient-to-tr from-neutral to-primary mt-12 rounded-none lg:rounded-xl lg:shadow text-neutral-content">
        <div
          className="bg-cover bg-neutral w-full bg-center shadow rounded-none lg:rounded-xl"
          style={{ backgroundImage: 'url(/support.jpg)' }}
        >
          <div className="bg-neutral bg-opacity-50 p-4 py-12 rounded-none lg:rounded-xl">
            <h2 className="text-inherit mb-4">Support FreeSewing</h2>
            <p className="text-inherit font-medium max-w-sm m-auto drop-shadow-md text-lg">
              FreeSewing is fuelled by a voluntary subscription model
            </p>
            <p className="text-inherit font-medium max-w-prose max-w-sm m-auto text-lg">
              If you think what we do is worthwhile, and if you can spare a few coins each month
              without hardship, please support our work
            </p>
            <p>
              <a
                role="button"
                className="btn btn-accent hover:btn-success px-12 ml-4 mb-8 btn-lg"
                href="https://freesewing.org/patrons/join"
              >
                Become a Patron
              </a>
            </p>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-5 lg:grid lg:grid-cols-3 lg:gap-4 mt-12">
        <CardLink
          color="primary"
          href="/tutorials/pattern-design"
          title="Design Tutorial"
          text="Step by step instructions to create your first FreeSewing design"
        />
        <CardLink
          color="neutral"
          href="/reference/core"
          title="Core API"
          text="Reference documentation for our core library"
        />
        <CardLink
          color="accent"
          href="/reference/backend"
          title="Backend API"
          text={
            <span>
              No backend?
              <br />
              No problem, you can use ours.
            </span>
          }
        />
      </div>

      <div className="p-1 bg-gradient-to-tr from-neutral to-primary mt-12 rounded-none lg:rounded-xl lg:shadow text-neutral-content">
        <div className="flex flex-col gap-8 lg:grid lg:grid-cols-2">
          <div className="px-4 lg:px-12 pt-12 lg:py-12">
            <h2 className="text-inherit mb-4 text-center lg:text-left">
              FreeSewing v3: It&apos;s coming
            </h2>
            <p className="text-inherit font-medium text-center lg:text-left">
              The upcoming version 3 of FreeSewing is currently under development. All of the
              documentation here is being kept up-to-date with the upcoming v3 release.
            </p>
            <p className="text-inherit font-medium text-center lg:text-left">
              Visit <BoldLink href="https://v2.freesewing.dev/">v2.freesewing.dev</BoldLink> for the
              documentation for version 2 of FreeSewing.
            </p>
          </div>
          <div className="px-4 lg:px-12 pb-12 lg:py-12">
            <h2 className="text-inherit mb-4 text-center lg:text-left">What&apos;s changed?</h2>
            <p className="text-inherit font-medium text-center lg:text-left">
              Check{' '}
              <BoldLink href="/guides/v3/migration">
                the FreeSewing version 3 migration guide
              </BoldLink>{' '}
              to learn about what is new in version 3 of FreeSewing, and what changes you should
              make in your own designs to port them to version 3.
            </p>
            <p className="text-inherit font-medium text-center lg:text-left">
              If you have any questions to which you can&apos;t find the answers here, please{' '}
              <BoldLink href="https://discord.freesewing.org/">reach out to us on Discord</BoldLink>
              .
            </p>
          </div>
        </div>
      </div>
    </div>

    <div className="max-w-7xl m-auto mt-12 px-4">
      <h2 className="text-left lg:text-center mb-4">Using FreeSewing: TL;DR</h2>
      <div className="flex flex-row flex-wrap gap-4 justify-between">
        <div className="max-w-xl w-full">
          <h3>
            To go fast, go alone <span role="img">🚀</span>
          </h3>
          <p>
            All you need is <strong>NodeJS</strong>; Then run:
          </p>
          <Highlight language="shell">npx @freesewing/new-design@next</Highlight>
          <p>
            This command will setup the stand-alone FreeSewing development environment for you.{' '}
            <PageLink href="/tutorials/getting-started-linux/dev-setup" txt="Learn more" />.
          </p>
        </div>
        <div className="max-w-xl w-full">
          <h3>
            To go far, go together <span role="img">🧑‍🤝‍🧑</span>
          </h3>
          <p>
            First,{' '}
            <a href="https://github.com/freesewing/freesewing/fork">fork our monorepo on GitHub</a>,
            then run:
          </p>
          <Highlight language="shell">
            git clone &lt;url to your fork&gt;
            <br />
            cd freesewing
            <br />
            yarn kickstart
          </Highlight>
          <p>
            These commands will clone your fork of{' '}
            <a href="https://github.com/freesewing/freesewing">
              the freesewing/freesewing repository on GitHub
            </a>{' '}
            and set it up for development. <PageLink href="/infra" txt="Learn more" />.
          </p>
        </div>
      </div>
    </div>

    <div className="max-w-7xl m-auto px-0 mt-12">
      <div className="p-1 bg-gradient-to-tr from-accent to-warning mt-24 rounded-none lg:rounded-xl lg:shadow mb-12">
        <div className="p-0 bg-base-100 rounded-none lg:rounded-lg">
          <div className="flex flex-col lg:grid lg:grid-cols-2">
            <div className="px-4 lg:px-12 pt-12 lg:py-12">
              <h2 className="mb-4 text-center lg:text-left">Questions?</h2>
              <p className="font-medium text-center lg:text-left">
                When you have questions or find yourself scratching your head you can{' '}
                <b>
                  <PageLink href="/contact" txt="contact us" />
                </b>{' '}
                in various ways.
              </p>
            </div>
            <div className="px-4 lg:px-12 py-12">
              <h2 className="mb-4 text-center lg:text-left">Need Help?</h2>
              <p className="font-medium text-center lg:text-left">
                While we are all volunteers, we have a good track record of helping people. So{' '}
                <b>
                  <PageLink href="/contact" txt="don't be shy" />
                </b>
                .
              </p>
            </div>
          </div>
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
