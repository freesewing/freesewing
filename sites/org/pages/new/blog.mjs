// Dependencies
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { nsMerge } from 'shared/utils.mjs'
// Hooks
import { useTranslation } from 'next-i18next'
// Components
import { PageWrapper, ns as pageNs } from 'shared/components/wrappers/page.mjs'
import { ns as authNs } from 'shared/components/wrappers/auth/index.mjs'
import { ns as apikeysNs } from 'shared/components/account/apikeys.mjs'
//import { BareLayout } from 'site/components/layouts/bare.mjs'
import { Popout } from 'shared/components/popout/index.mjs'

// Translation namespaces used on this page
const namespaces = nsMerge(authNs, pageNs)

/*
 * Each page MUST be wrapped in the PageWrapper component.
 * You also MUST spread props.page into this wrapper component
 * when path and locale come from static props (as here)
 * or set them manually.
 */
const NewBlogPage = ({ page }) => {
  const { t } = useTranslation(namespaces)

  return (
    <PageWrapper {...page} title={t('blogNew')}>
      <div className="w-full px-4 mt-8">
        <Popout fixme compact>
          This is not (yet) implemented
        </Popout>
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
        path: ['new', 'showcase'],
      },
    },
  }
}
