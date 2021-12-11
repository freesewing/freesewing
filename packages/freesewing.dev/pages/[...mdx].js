import Page from 'shared/components/wrappers/page.js'
import useApp from 'site/hooks/useApp.js'

const MdxPage = props => {
  const app = useApp()

  return (
    <Page app={app} title='This is not a homepage'>
      <pre>{JSON.stringify(props, null, 2)}</pre>
    </Page>
  )
}

export default MdxPage

export const getStaticProps = async () => {

  return { props: { example: 'yes'} }
}

export const getStaticPaths = async () => {
  const paths = [
    {
      params: {
        mdx: ['test'],
      },
    },
    {
      params: {
        mdx: ['tost'],
      },
    },
  ]

  return { paths, fallback: false }
}

