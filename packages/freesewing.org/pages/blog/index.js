import AppWrapper from 'shared/components/wrappers/app'
import config from 'site/freesewing.config'
import { getStrapiStaticProps } from 'shared/content/strapi'
import Preview from 'shared/components/strapi/preview'
import BlogMenu from 'site/components/blog-menu'

const Page = props => {
  return (
    <AppWrapper
      {...props}
      title='FreeSewing Maker Blog'
      crumbs={[]}
      sidebar={<BlogMenu posts={props.posts}/>}
    >
      <div className="flex flex-row flex-wrap">
        {Object.values(props.posts).reverse().map(post => <Preview post={post}/>)}
      </div>
    </AppWrapper>
  )
}

export const getStaticProps = async (props) => {
  const posts = await getStrapiStaticProps('blog', config.site, config.language)

  return { props: { ...posts } }
}

export default Page
