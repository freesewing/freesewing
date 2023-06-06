// Dependencies
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { freeSewingConfig } from 'shared/config/freesewing.config.mjs'
// Components
import Head from 'next/head'
import { PageWrapper } from 'shared/components/wrappers/page.mjs'
import { Popout } from 'shared/components/popout.mjs'
import { WebLink } from 'shared/components/web-link.mjs'

const ContactPage = ({ page }) => (
  <PageWrapper {...page}>
    <Head>
      <meta property="og:type" content="article" key="type" />
      <meta
        property="og:description"
        content="Find out the best way to contact a human being involved with FreeSewing"
        key="type"
      />
      <meta property="og:article:author" content="Joost De Cock" key="author" />
      <meta property="og:image" content="https://freesewing.dev/og/contact/og.png" key="image" />
      <meta property="og:image:type" content="image/png" />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:url" content={`https://freesewing.dev/contact`} key="url" />
      <meta property="og:locale" content="en_US" key="locale" />
      <meta property="og:site_name" content="freesewing.dev" key="site" />
    </Head>
    <div className="mdx max-w-prose">
      <p>
        <WebLink
          href="https://github.com/freesewing/"
          txt="FreeSewing is an open source software project"
        />{' '}
        with the aim of becoming the Wikipedia of sewing patterns.
      </p>
      <p>
        We are not interested in fashion, trends, or publishing the hot new pattern of the season.
        Instead, we want to empower makers by distilling the knowledge of the sewing community into
        parametric designs + documentation, and make that information freely available.
      </p>
      <h2>The project</h2>
      <p>
        <b>FreeSewing</b> was created by{' '}
        <WebLink href="https://githubc.com/joostdecock" txt="Joost De Cock" /> who is also its
        maintainer. But that does not mean he does all the work on his own. Much to the contrary.
        <br />
        <WebLink
          txt="A loose-knit team of volunteers from various corners of two world"
          href="https://freesewing.org/contributors"
        />{' '}
        contribute to the ongoing development of FreeSewing.
      </p>
      <p>
        All our source code is{' '}
        <WebLink href="https://github.com/freesewing/freesewing" txt="available on GitHub" />. We
        not only use GitHub to host our repository, but also to coordinate work through{' '}
        <WebLink href="https://github.com/freesewing/freesewing/issues" txt="issues" />,{' '}
        <WebLink href="https://github.com/freesewing/freesewing/issues" txt="discussions" />,{' '}
        <WebLink href="https://github.com/freesewing/freesewing/pulls" txt="pull requests" />, and{' '}
        <WebLink href="https://github.com/freesewing/freesewing/issues" txt="our roadmap" />.
      </p>
      <Popout note>
        FreeSewing follows <b>the all-contributors specification</b>, which means that we strive to
        recognize all contributions big and small.
      </Popout>
      <h2>The patrons</h2>
      <p>
        FreeSewing is financially supported by{' '}
        <WebLink href="https://freesewing.org/patrons" txt="the FreeSewing patrons" />. These
        generous individuals support the project with their hard-earned cash for the benefit of all
        involved.
      </p>
      <p>
        Without our patrons and their support, FreeSewing would not be where it is today, nor would
        it be able to survive, let alone thrive. Their importance cannot be overstated, both to the
        project as a whole, as{' '}
        <WebLink
          href="https://freesewing.org/docs/various/pledge/motivation/"
          txt="to Joost personally"
        />
        .
      </p>
      <Popout tip>
        <h5>Become a FreeSewing patron</h5>
        You too can{' '}
        <WebLink href="https://freesewing.org/patrons/join" txt="join the FreeSewing patrons" /> and
        help support the project.
      </Popout>
      <h2>The community</h2>
      <p>
        A diverse community of users, supporters, contributors, and sewing enthisiasts from all
        walks fo life has sprung up around FreeSewing. Our{' '}
        <WebLink
          href="https://freesewing.org/docs/various/community-standards/"
          txt="community standards"
        />{' '}
        are there to ensure we create an inclusive space where everyone feels welcome.
      </p>
      <p>
        In principle, the FreeSewing community exists anywhere where FreeSewing community members
        gather. But the hotbed of community interaction is{' '}
        <WebLink href="https://discord.freesewing.org/" txt="the FreeSewing Discord server" />.
      </p>
      <p>
        If Discord is <em>not your thing</em> FreeSewing is present on a variety of platforms:
      </p>
      <ul>
        {Object.entries(freeSewingConfig.social).map(([txt, href]) => (
          <li key={txt}>
            <WebLink {...{ txt, href }} />
          </li>
        ))}
      </ul>
      <p>Hopefully one of those will work out for you.</p>
    </div>
  </PageWrapper>
)

export default ContactPage

export async function getStaticProps() {
  return {
    props: {
      ...(await serverSideTranslations('en')),
      page: {
        path: ['about'],
      },
    },
  }
}
