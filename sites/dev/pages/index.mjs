// Dependencies
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
// Components
import { PageWrapper } from 'shared/components/wrappers/page.mjs'
import { PageLink } from 'shared/components/link.mjs'
import { Highlight } from 'shared/components/mdx/highlight.mjs'
import { FreeSewingIcon, CisFemaleIcon, CodeIcon } from 'shared/components/icons.mjs'
import { CardLink } from 'shared/components/link.mjs'
import { ReadMore } from 'shared/components/mdx/read-more.mjs'
import { MastodonVerification } from 'shared/components/social/mastodon-verification.mjs'

const Card = ({ bg = 'bg-base-200', textColor = 'text-base-content', title, children, icon }) => (
  <div className={`px-8 ${bg} py-10 rounded-lg block ${textColor} shadow-lg grow`}>
    <h2 className="mb-4 text-inherit flex flex-row gap-4 justify-between items-center font-medium text-left">
      {title}
      {icon}
    </h2>
    {children}
  </div>
)

/*
 * Each page MUST be wrapped in the PageWrapper component.
 * You also MUST spread props.page into this wrapper component
 * when path comes from static props (as here)
 * or set them manually.
 */
const HomePage = ({ page }) => (
  <PageWrapper
    {...page}
    title="FreeSewing.dev"
    intro="Documentation and tutorials for FreeSewing developers and contributors"
  >
    <div className="max-w-7xl m-auto px-0 mt-24 px-4">
      <FreeSewingIcon className="h-36 w-36 m-auto" />
      <h1 className="text-center font-heavy drop-shadow-md px-4">
        <span style={{ letterSpacing: '-0.2rem' }} className="text-5xl lg:text-6xl">
          FreeSewing
        </span>
        <span className="block text-sm lg:text-xl m-1">
          An open source Javascript library for parametric sewing patterns
        </span>
      </h1>

      <div className="flex flex-col gap-8 lg:grid lg:grid-cols-2 lg:gap-4 mt-12">
        <Card
          title="Custom-Fit Fashion"
          icon={<CisFemaleIcon className="w-12 h-12 shrink-0" fill stroke={0} />}
        >
          <p className="font-medium text-lg">
            FreeSewing is the leading open source library for on-demand garment manufacturing.
          </p>
          <p className="font-medium text-lg">
            Loved by home sewers and fashion entrepreneurs alike, we provide the tech stack for your
            creative endeavours.
          </p>
        </Card>

        <Card title="Patterns as Code" icon={<CodeIcon className="w-12 h-12 shrink-0" />}>
          <p className="font-medium text-lg">
            FreeSewing designs are implemented as code giving you unmatched power and flexibility.
          </p>
          <p className="font-medium text-lg">
            You can mix and match parts from different designs, extend them, or add options that
            turn one base design into many.
          </p>
        </Card>
      </div>

      <h2 className="lg:text-center mb-4 mt-12">Documentation</h2>
      <div className="flex flex-col gap-5 md:grid md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 lg:gap-4 mt-12 mb-24">
        <div>
          <h4>Guides</h4>
          <ReadMore recurse root="guides" depth={3} />
        </div>
        <div>
          <h4>Howtos</h4>
          <ReadMore recurse root="howtos" depth={3} />
        </div>
        <div>
          <h4>Reference</h4>
          <ReadMore recurse root="reference" depth={3} />
        </div>
        <div>
          <h4>Tutorials</h4>
          <ReadMore recurse root="tutorials" depth={3} />
          <h4>Training</h4>
          <ReadMore recurse root="training" depth={3} />
        </div>
      </div>

      <h2 className="lg:text-center mb-4 mt-12">Using FreeSewing: TL;DR</h2>
      <div className="grid w-full m-auto  md:grid-cols-2 gap-4 justify-between">
        <div className="max-w-xl w-full">
          <h3>
            To go fast, go alone <span role="img">🚀</span>
          </h3>
          <p>
            All you need is <strong>NodeJS</strong>; Then run:
          </p>
          <Highlight language="shell">npx @freesewing/new-design</Highlight>
          <p>
            This command will setup the stand-alone FreeSewing development environment for you.{' '}
            <PageLink
              href="/tutorials/getting-started-linux/dev-setup#stand-alone-development"
              txt="Learn more"
            />
            .
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
            and set it up for development.{' '}
            <PageLink
              href="/tutorials/getting-started-linux/dev-setup#monorepo-development"
              txt="Learn more"
            />
            .
          </p>
        </div>
      </div>

      <div className="flex flex-col gap-5 md:grid lg:grid-cols-2 lg:gap-4 mt-12">
        <CardLink
          href="/reference/api"
          title="Core API"
          text="Reference documentation for our core library"
        />
        <CardLink
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

      <div className="flex flex-col gap-5 lg:grid lg:grid-cols-2 lg:gap-4 mt-12 mb-24">
        <CardLink
          href="/tutorials/pattern-design"
          title="Design Tutorial"
          text="Step by step instructions to create your first FreeSewing design"
        />
        <CardLink
          href="https://next.freesewing.org/support"
          title="Need Help?"
          text="Learn about the various ways you can reach out for help"
        />
      </div>
    </div>
    <MastodonVerification />
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
