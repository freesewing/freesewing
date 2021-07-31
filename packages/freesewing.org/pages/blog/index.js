import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useTranslation } from 'next-i18next'
import AppWrapper from '@/shared/components/wrappers/app'
import config from '@/site/freesewing.config'
import { getStrapiStaticProps } from '@/shared/content/strapi'
import Preview from '@/shared/components/strapi/preview'
import BlogMenu from '@/site/components/blog-menu'
import PageTemplate from '@/shared/pages/post/index'
import useBlogposts from '@/shared/hooks/useBlogposts'
import Popout from '@/shared/components/popout'

const Page = props => {
  const { t } = useTranslation('common')
  const posts = useBlogposts(config.language, false)
  return (
    <AppWrapper t={t} title={'FreeSewing '+t('makerBlog')} {...props}>
      <Popout related t={t}>
        FreeSewing&nbsp;
        {t('developerBlog')}:
        <a href="https://freesewing.dev/blog" className='px-2'>
          freesewing.dev/blog
        </a>
      </Popout>
      <PageTemplate {...props} posts={posts} type='blog' />
    </AppWrapper>
  )
}

export const getStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale, ['common']))
  },
})

export default Page
