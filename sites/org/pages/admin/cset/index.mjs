// Dependencies
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { nsMerge } from 'shared/utils.mjs'
// Hooks
import { useState } from 'react'
import { useTranslation } from 'next-i18next'
import { useBackend } from 'shared/hooks/use-backend.mjs'
// Components
import { PageWrapper, ns as pageNs } from 'shared/components/wrappers/page.mjs'
import { AuthWrapper, ns as authNs } from 'shared/components/wrappers/auth/index.mjs'
import { Loading } from 'shared/components/spinner.mjs'
import { Hits } from 'shared/components/admin.mjs'
import { CuratedSetsList } from 'shared/components/curated-sets.mjs'

// Translation namespaces used on this page
const namespaces = nsMerge(pageNs, authNs)

const AdminPage = ({ page }) => (
  <PageWrapper {...page} title="Manage Curated Sets">
    <AuthWrapper requiredRole="admin">
      <CuratedSetsList href={(id) => `/admin/cset/${id}`} />
    </AuthWrapper>
  </PageWrapper>
)

export default AdminPage

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, namespaces)),
      page: {
        locale,
        path: ['admin', 'cset'],
      },
    },
  }
}
