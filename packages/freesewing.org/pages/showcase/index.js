import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useTranslation } from 'next-i18next'
import AppWrapper from '@/shared/components/wrappers/app'
import config from '@/site/freesewing.config'
import { getStrapiStaticProps } from '@/shared/content/strapi'
import Preview from '@/shared/components/strapi/preview'
import BlogMenu from '@/site/components/blog-menu'
import PageTemplate from '@/shared/pages/post/index'
import useShowcaseposts from '@/shared/hooks/useShowcaseposts'

const Page = props => {
  const { t } = useTranslation('common')
  const posts = useShowcaseposts(config.language, false)
  return (
    <AppWrapper
      {...props}
      title={'FreeSewing ' + t('showcase')}
      crumbs={[]}
      sidebar={<BlogMenu posts={posts}/>}
      t={t}
    >
      <PageTemplate {...props} posts={posts} type='showcase'/>
    </AppWrapper>
  )
}

export const getStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale, ['common']))
  },
})

export default Page
