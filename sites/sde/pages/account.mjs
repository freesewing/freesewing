// Dependencies
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { nsMerge } from 'shared/utils.mjs'
// Hooks
import { useTranslation } from 'next-i18next'
// Components
import { PageWrapper, ns as pageNs } from 'shared/components/wrappers/page.mjs'

const ns = nsMerge('sde', 'account', pageNs)
/*
 * Each page MUST be wrapped in the PageWrapper component.
 * You also MUST spread props.page into this wrapper component
 * when path and locale come from static props (as here)
 * or set them manually.
 */
const AccountPage = ({ page }) => {
  const { t } = useTranslation(ns)

  return (
    <PageWrapper {...page} title={false}>
      <div className="max-w-prose text-center">
        <h1>{t('header:account')}</h1>
        <h5>To manage your FreeSewing account, please go to FreeSewing.org</h5>
        <p>
          You can use the data in your account, but this development environment does not come with
          account management features.
        </p>
        <a href="https://freesewing.org/" className="btn btn-secondary btn-lg mt-4 px-12">
          FreeSewing.org
        </a>
      </div>
    </PageWrapper>
  )
}

export default AccountPage

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ns)),
      page: {
        locale,
        path: [],
      },
    },
  }
}
