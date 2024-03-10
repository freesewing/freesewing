// Dependencies
import dynamic from 'next/dynamic'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { nsMerge } from 'shared/utils.mjs'
// Hooks
import { useTranslation } from 'next-i18next'
import { useAccount } from 'shared/hooks/use-account.mjs'
// Components
import { PageWrapper, ns as pageNs } from 'shared/components/wrappers/page.mjs'
import { ns as authNs } from 'shared/components/wrappers/auth/index.mjs'
import { Fingerprint } from 'shared/components/fingerprint.mjs'
import { Role } from 'shared/components/role.mjs'

// Translation namespaces used on this page
const ns = nsMerge('account', 'status', pageNs, authNs)

/*
 * Some things should never generated as SSR
 * So for these, we run a dynamic import and disable SSR rendering
 */
const DynamicAuthWrapper = dynamic(
  () => import('shared/components/wrappers/auth/index.mjs').then((mod) => mod.AuthWrapper),
  { ssr: false }
)

const AccountIDPage = ({ page }) => {
  const { t } = useTranslation(ns)
  const { account } = useAccount()

  return (
    <PageWrapper {...page} title={t('yourAccount')}>
      <DynamicAuthWrapper>
        <div className="flex flex-row flex-wrap items-center">
          <div className="p-2 text-center">
            <h5>{t('account:userId')}</h5>
            <Fingerprint id={account.id} />
          </div>
          <div className="p-2 text-center">
            <h5>{t('account:role')}</h5>
            <Role role={account.role} />
          </div>
        </div>
      </DynamicAuthWrapper>
    </PageWrapper>
  )
}

export default AccountIDPage

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ns)),
      page: {
        locale,
        path: ['id'],
      },
    },
  }
}
