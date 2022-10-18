import Page from 'site/components/wrappers/page.js'
import useApp from 'site/hooks/useApp.js'
import Head from 'next/head'
import WebLink from 'shared/components/web-link'
import Popout from 'shared/components/popout'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

const Yes = () => (
  <span role="img" className="pr-4">
    ✅
  </span>
)
const No = () => (
  <span role="img" className="pr-4">
    ❌
  </span>
)

const ContactPage = (props) => {
  const app = useApp()
  const title = 'Contact information'

  return (
    <Page app={app} title="Contact information" slug="contact" crumbs={[[title, 'contact']]}>
      <Head>
        <meta property="og:title" content={title} key="title" />
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
      <div className="grid grid-cols-3 lg:gap-4 text-xl">
        <div className="mb-8 w-full col-span-3 row-start-1 col-start-1 xl:col-span-1 xl:col-start-3">
          <div
            className={`
            mdx mdx-toc text-base-content text-lg lg:text-xl
            sticky top-16 max-h-screen overflow-y-auto
            border-2 bg-base-200 bg-opacity-30 p-4 rounded-lg border-base-200
          `}
          >
            <h4 id="table-of-contents">Table of contents</h4>
            <ul>
              <li>
                <a href="#freesewing-on-discord">FreeSewing on Discord</a>
              </li>
              <li>
                <a href="#freesewing-on-github">FreeSewing on Github</a>
              </li>
              <li>
                <a href="#freesewing-on-twitter">FreeSewing on Twitter</a>
              </li>
              <li>
                <a href="#email-joost">Email Joost</a>
              </li>
            </ul>
          </div>
        </div>
        <div className="mdx col-span-3 col-start-1 xl:col-span-2 xl:row-start-1 row-start-2 xl:pl-4">
          <p>
            There are various ways to contact a human being involved with FreeSewing. Based on what
            type of question you have, one or more are likely to fit your needs.
          </p>
          <ul className="text-xl">
            <li>
              <a href="#freesewing-on-discord">FreeSewing on Discord</a>
            </li>
            <li>
              <a href="#freesewing-on-github">FreeSewing on Github</a>
            </li>
            <li>
              <a href="#freesewing-on-twitter">FreeSewing on Twitter</a>
            </li>
            <li>
              <a href="#email-joost">Email Joost</a>
            </li>
          </ul>
          <Popout tip>
            <p className="text-xl">
              To help you make your choice, we have ranked the different communication channels
              according to the following parameters:
            </p>
            <h5>Does it scale?</h5>
            <p className="pt-0 text-xl">
              Are you reaching out to the community, or can only one or a handful of people respond.
            </p>
            <h5>Is it time-zone independent?</h5>
            <p className="pt-0 text-xl">
              Are people all over the world available, or only in certain time zones?
            </p>
            <h5>Is it private?</h5>
            <p className="pt-0 text-xl">Is it a private communication channel, or a public one?</p>
            <h5>Will the answer be authoritative?</h5>
            <p className="pt-0 text-xl">Are the answers vetted or provided by experts?</p>
          </Popout>
          <h2 id="freesewing-on-discord">
            <a className="heading-autolink" href="#freesewing-on-discord">
              Via Discord
            </a>
          </h2>
          <p>
            The best way to reach out is probably to head over to{' '}
            <WebLink href="https://discord.freesewing.org/" txt="discord.freesewing.org" /> to join
            the FreeSewing community on Discord.
          </p>
          <ul className="text-xl">
            <li className="list-none">
              <Yes /> Does it scale?
            </li>
            <li className="list-none">
              <Yes /> Is it time-zone independent?
            </li>
            <li className="list-none">
              <No /> Is it private?
            </li>
            <li className="list-none">
              <No /> Will the answer be authoritative?
            </li>
          </ul>
          <h2 id="freesewing-on-github">
            <a className="heading-autolink" href="#freesewing-on-github">
              Via Github
            </a>
          </h2>
          <p>
            If Discord is not your thing, you can use{' '}
            <WebLink
              href="https://github.com/freesewing/freesewing/discussions"
              txt="discussions on Github"
            />
            . We use Github discussions — essentially a forum — where you can ask (or answer)
            questions. While response time might be slower than on Discord, somebody will get around
            to it.
          </p>
          <ul className="text-xl">
            <li className="list-none">
              <Yes /> Does it scale?
            </li>
            <li className="list-none">
              <Yes /> Is it time-zone independent?
            </li>
            <li className="list-none">
              <No /> Is it private?
            </li>
            <li className="list-none">
              <No /> Will the answer be authoritative?
            </li>
          </ul>
          <h2 id="freesewing-on-twitter">
            <a className="heading-autolink" href="#freesewing-on-twitter">
              Via Twitter
            </a>
          </h2>
          <p>
            If you are looking for a more private conversation, you can send a direct message to{' '}
            <WebLink href="https://twitter.com/freesewing_org" txt="@freesewing_org" /> on Twitter.
          </p>
          <ul className="text-xl">
            <li className="list-none">
              <No /> Does it scale?
            </li>
            <li className="list-none">
              <No /> Is it time-zone independent?
            </li>
            <li className="list-none">
              <Yes /> Is it private?
            </li>
            <li className="list-none">
              <Yes /> Will the answer be authoritative? (
              <a href="https://twitter.com/j__st">joost</a> runs the Twitter account)
            </li>
          </ul>
          <h2 id="email-joost">
            <a className="heading-autolink" href="#email-joost">
              Via Email
            </a>
          </h2>
          <p>
            Joost De Cock is the FreeSewing maintainer. You you can contact them via email at{' '}
            <a href="mailto:joost@freesewing.org">joost@freesewing.org</a>.
          </p>
          <ul className="text-xl">
            <li className="list-none">
              <No /> Does it scale?
            </li>
            <li className="list-none">
              <No /> Is it time-zone independent?
            </li>
            <li className="list-none">
              <Yes /> Is it private?
            </li>
            <li className="list-none">
              <Yes /> Will the answer be authoritative?
            </li>
          </ul>
        </div>
      </div>
    </Page>
  )
}

export default ContactPage

export async function getStaticProps() {
  return {
    props: {
      ...(await serverSideTranslations('en')),
    },
  }
}
