import Page from 'shared/components/wrappers/page.js'
import useApp from 'site/hooks/useApp.js'
import Head from 'next/head'
import Link from 'next/link'
import config from 'site/freesewing.config.js'
import About from 'site/components/about.js'

const links = (section, list) => list.map(design => (
  <li key={design} className="">
    <Link href={`/${section}/${design}`}>
      <a className="text-secondary text-xl capitalize">{design}</a>
    </Link>
  </li>
))

const PatternListPageTemplate = ({ sections=Object.keys(config.patterns) }) => {
  const app = useApp()
  return (
    <Page app={app} title="FreeSewing Lab" noSearch>
      <Head>
        <meta property="og:title" content="lab.FreeSewing.dev" key="title" />
        <meta property="og:type" content="article" key='type' />
        <meta property="og:description" content="The FreeSewing lab is an online test environment for all our patterns" key='description' />
        <meta property="og:article:author" content='Joost De Cock' key='author' />
        <meta property="og:image" content="https://canary.backend.freesewing.org/og-img/en/lab/" key='image' />
        <meta property="og:image:type" content="image/png" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:url" content="https://lab.freesewing.dev/" key='url' />
        <meta property="og:locale" content="en_US" key='locale' />
        <meta property="og:site_name" content="lab.freesewing.dev" key='site' />
      </Head>
      <div className="max-w-screen-md">
        {Object.keys(config.navigation).map(section => {
          if (sections.indexOf(section) !== -1) return (
            <div key={section}>
              <h2>{config.navigation[section].__title}</h2>
              <ul className="flex flex-row flex-wrap gap-2">
                {links(section, config.patterns[section])}
              </ul>
            </div>
          )
          else return null
        })}
        <About />
      </div>
    </Page>
  )
}

export default PatternListPageTemplate
