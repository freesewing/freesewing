import Link from '@docusaurus/Link'
import Layout from '@theme/Layout'
import NewDesign from './_new-design.md'
import SetupMonorepo from './_setup-monorepo.md'
import MDXContent from '@theme/MDXContent'

const styles = {
  top: {
    margin: 'auto',
    textAlign: 'center',
    paddingTop: '2rem',
  },
  logo: {
    maxWidth: '140px',
  },
  cards: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    maxWidth: '1600px',
    margin: 'auto',
    padding: '1rem',
    gap: '1.5rem',
    justifyContent: 'center',
    marginBottom: '3rem',
  },
  card: {
    width: '100%',
    maxWidth: '600px',
    boxShadow: '1px 1px 5px #0004',
    borderRadius: '0.5rem',
    padding: '1rem 1.5rem',
    backgroundColor: 'var(--ifm-footer-background-color)',
  },
  cardheading: {
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cardicon: {
    fontSize: '2rem',
  },
  cardp: {
    fontSize: '1.15rem',
  },
}

const Card = ({ title, icon, children }) => (
  <div style={styles.card}>
    <h3 style={styles.cardheading}>
      <span>{title}</span>
      <span style={styles.cardicon}>{icon}</span>
    </h3>
    {children}
  </div>
)

export default function Home() {
  return (
    <Layout
      title={`FreeSewing documentation for developers and contributors`}
      description="FreeSewing is an open source Javascript library for parametric sewing patterns"
    >
      <MDXContent>
        <div style={styles.top}>
          <img style={styles.logo} src="/img/logo.svg" />
          <h1>FreeSewing</h1>
          <h2>An open source Javascript library for parametric sewing patterns</h2>
        </div>
        <div style={styles.cards}>
          <Card title="Custom-Fit Fashion" icon="👕">
            <p style={styles.cardp}>
              FreeSewing is the leading open source library for on-demand garment manufacturing.
            </p>
            <p style={styles.cardp}>
              Loved by home sewers and fashion entrepreneurs alike, we provide the tech stack for
              your creative endeavours.
            </p>
          </Card>
          <Card title="Patterns as Code" icon="🤓">
            <p style={styles.cardp}>
              FreeSewing designs are implemented as code giving you unmatched power and flexibility.
            </p>
            <p style={styles.cardp}>
              You can mix and match parts from different designs, extend them, or add options that
              turn one base design into many.
            </p>
          </Card>
          <Card title="To go fast, go alone" icon="🚀">
            <p style={styles.cardp}>
              All you need is <a href="https://nodejs.org/">NodeJS</a>, then run:
            </p>
            <NewDesign />
            <p style={styles.cardp}>
              This command will setup the stand-alone FreeSewing development environment for you.{' '}
              <Link href="/tutorials/getting-started-linux/dev-setup">Learn more</Link>.
            </p>
          </Card>
          <Card title="To go far, go together" icon="🧑‍🤝‍🧑">
            <p style={styles.cardp}>
              First,{' '}
              <a href="https://github.com/freesewing/freesewing/fork">
                fork our monorepo on GitHub
              </a>
              , then run:
            </p>
            <SetupMonorepo />
            <p style={styles.cardp}>
              This will set up the FreeSewing monorepo on your local system.
            </p>
          </Card>
          <Card title="Documentation for developers & contributors" icon="📖">
            <p style={styles.cardp}>
              We have <Link href="/guides/">Guides</Link>, <Link href="/howtos/">Howtos</Link>,{' '}
              <Link href="/tutorials/">Tutorials</Link>, as well as{' '}
              <Link href="/reference/">Reference Documentation</Link> covering the FreeSewing
              ecosystem.
            </p>
            <p style={styles.cardp}>
              For documentation for makers, please refer to{' '}
              <a href="https://freesewing.org">FreeSewing.org</a>.
            </p>
          </Card>
          <Card title="Git good scrub" icon="🐙">
            <p style={styles.cardp}>
              If you come from a maker background -- rather than a developer background -- learning
              to use <a href="https://git-scm.com/">git</a> may seem like a daunting task.
            </p>
            <p style={styles.cardp}>
              Fear not, we have created a <Link href="/training/git/">git training course</Link>{' '}
              that will take you from zero to hero in a couple of hours.
            </p>
          </Card>
        </div>
      </MDXContent>
    </Layout>
  )
}
