import AppWrapper from 'shared/components/wrappers/app'
import config from '../freesewing.config'
import { getMdxStaticProps } from 'shared/utils/mdx'

const Page = props => {
  return (
    <AppWrapper {...props} title='fixme' noCrumbs>
      <p>Hi there</p>
    </AppWrapper>
  )
}

export const getStaticProps = async (props) => {
  const mdx = await getMdxStaticProps(config.site, config.language)

  return { props: { ...mdx } }
}

export default Page
