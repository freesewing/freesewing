import Layout from '@theme/Layout'
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

const Card = ({ title, icon, children, href }) => (
  <a style={styles.card} href={href}>
    <h3 style={styles.cardheading}>
      <span>{title}</span>
      <span style={styles.cardicon}>{icon}</span>
    </h3>
    {children}
  </a>
)

export default function Home() {
  return (
    <Layout
      title={`FreeSewing documentation for developers and contributors`}
      description="FreeSewing is an open source Javascript library for parametric sewing patterns"
    >
      <MDXContent>
        <div style={styles.top}>
          <h1>Fixme: Build home page</h1>
        </div>
        <div style={styles.cards}>
          <Card title="FreeSewing Designs" icon="🤓" href="/docs/designs/">
            <p style={styles.cardp}>Documentation for all our designs.</p>
          </Card>
          <Card title="About FreeSewing" icon="👕" href="/docs/about/">
            <p style={styles.cardp}>Documentation about FreeSewing.org and how to use it.</p>
          </Card>
          <Card title="Measurements we use" icon="🚀" href="/docs/measurements/">
            <p style={styles.cardp}>Documentation for all the measurements we use.</p>
          </Card>
          <Card title="Sewing terminology" icon="🧑‍🤝‍🧑" href="/docs/sewing/">
            <p style={styles.cardp}>Documentation for various terms that are used in sewing.</p>
          </Card>
        </div>
      </MDXContent>
    </Layout>
  )
}
