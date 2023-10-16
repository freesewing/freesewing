// Dependencies
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { nsMerge } from 'shared/utils.mjs'
// Hooks
import { useTranslation } from 'next-i18next'
// Components
import { PageWrapper, ns as pageNs } from 'shared/components/wrappers/page.mjs'
import { ns as authNs } from 'shared/components/wrappers/auth/index.mjs'
import { CreatePost, ns as createNs } from 'site/components/github/create-post.mjs'
import { BareLayout } from 'site/components/layouts/bare.mjs'

// Translation namespaces used on this page
const namespaces = nsMerge(createNs, authNs, pageNs)

/*
 * Each page MUST be wrapped in the PageWrapper component.
 * You also MUST spread props.page into this wrapper component
 * when path and locale come from static props (as here)
 * or set them manually.
 */
const NewBlogPage = ({ page }) => {
  const { t } = useTranslation(namespaces)

  return (
    <PageWrapper {...page} title={t('blogNew')} layout={BareLayout}>
      <div className="w-full px-4 mt-8">
        <CreatePost type="blog" />
      </div>
    </PageWrapper>
  )
}

export default NewBlogPage

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, namespaces)),
      page: {
        locale,
        path: ['new', 'blog'],
      },
    },
  }
}
