import AppWrapper from '@/shared/components/wrappers/app'
import PageTemplate from '@/shared/pages/blog/index'
import Preview from '@/shared/components/strapi/preview'
import useBlogposts from '@/shared/hooks/useBlogposts'
import config from '@/site/freesewing.config'

const Page = props => {
  const posts = useBlogposts(config.language, false)
  return (
    <AppWrapper
      {...props}
      title='FreeSewing Developer Blog'
      crumbs={[]}
    >
      <PageTemplate {...props} posts={posts} />
    </AppWrapper>
  )
}

export default Page
