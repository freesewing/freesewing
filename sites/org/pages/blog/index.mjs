// Dependencies
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
// Hooks
import { useTranslation } from 'next-i18next'
// Components
import { PageWrapper, ns as pageNs } from 'shared/components/wrappers/page.mjs'
import { Popout } from 'shared/components/popout.mjs'

// Translation namespaces used on this page
const namespaces = pageNs

const BlogIndexPage = ({ page, slug }) => {
  const { t } = useTranslation()

  return (
    <PageWrapper {...page}>
      <Popout fixme>Implement blog view</Popout>
    </PageWrapper>
  )
}

export default BlogIndexPage

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, namespaces)),
      slug: 'blog',
      page: {
        locale,
        path: ['blog'],
      },
    },
  }
}
