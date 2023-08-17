// Dependencies
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { nsMerge } from 'shared/utils.mjs'
// Components
import { PageWrapper, ns as pageNs } from 'shared/components/wrappers/page.mjs'
import { AuthWrapper, ns as authNs } from 'shared/components/wrappers/auth/index.mjs'
import { ManageUser } from 'shared/components/admin.mjs'

// Translation namespaces used on this page
const namespaces = nsMerge(pageNs, authNs)

const UserAdminPage = ({ page, userId }) => (
  <PageWrapper {...page} title={`User ${userId}`}>
    <AuthWrapper requiredRole="admin">{userId ? <ManageUser userId={userId} /> : null}</AuthWrapper>
  </PageWrapper>
)

export default UserAdminPage

export async function getStaticProps({ locale, params }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, namespaces)),
      userId: params.id,
      page: {
        locale,
        path: ['admin', params.id],
      },
    },
  }
}

export const getStaticPaths = async () => {
  return {
    paths: [],
    fallback: 'blocking',
  }
}
