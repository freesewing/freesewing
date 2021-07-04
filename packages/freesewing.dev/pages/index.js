import AppWrapper from 'shared/components/wrappers/app'
import config from '../freesewing.config'
import { getMdxStaticProps } from 'shared/utils/mdx'

const Page = props => {
  return (
    <AppWrapper {...props} title='fixme' noCrumbs>
      <p>Hi there</p>
      <p className='p-4'><button className="btn btn-primary">Primary Button</button></p>
      <p className='p-4'><button className="btn btn-secondary bg-transparent">Secondary Button</button></p>
      <p className='p-4'><button className="btn btn-accent">Accent Button</button></p>
      <p className='p-4'><button className="btn btn-info">Info Button</button></p>
      <p className='p-4'><button className="btn btn-success">Success Button</button></p>
      <p className='p-4'><button className="btn btn-warning">Warning Button</button></p>
      <p className='p-4'><button className="btn btn-error">Error Button</button></p>
    </AppWrapper>
  )
}

export const getStaticProps = async (props) => {
  const mdx = await getMdxStaticProps(config.site, config.language)

  return { props: { ...mdx } }
}

export default Page
