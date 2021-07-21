import AppWrapper from '@/shared/components/wrappers/app'
import config from '@/site/freesewing.config'
import { getStrapiStaticProps } from '@/shared/content/strapi'
import Preview from '@/shared/components/strapi/preview'
import BlogMenu from '@/site/components/blog-menu'
import PageTemplate from '@/shared/pages/blog/index'
import useBlogposts from '@/shared/hooks/useBlogposts'

const Page = props => {
  const posts = useBlogposts(config.language, false)
  return (
    <AppWrapper
      {...props}
      title='FreeSewing Maker Blog'
      crumbs={[]}
      sidebar={<BlogMenu posts={posts}/>}
    >
      <PageTemplate {...props} posts={posts} />
    </AppWrapper>
  )
}

export default Page
