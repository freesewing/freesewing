// Dependencies
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { nsMerge, getSearchParam } from 'shared/utils.mjs'
// Hooks
import { useState, useEffect } from 'react'
// Components
import { PageWrapper, ns as pageNs } from 'shared/components/wrappers/page.mjs'
import { AuthWrapper, ns as authNs } from 'shared/components/wrappers/auth/index.mjs'
import { ManageUser } from 'shared/components/admin.mjs'

// Translation namespaces used on this page
const namespaces = nsMerge(pageNs, authNs)

const UserAdminPage = ({ page }) => {
  const [id, setId] = useState()

  useEffect(() => {
    const newId = getSearchParam('id')
    if (newId !== id) setId(newId)
  }, [id])

  return (
    <PageWrapper {...page} title={`User ${id}`}>
      <AuthWrapper requiredRole="support">{id ? <ManageUser userId={id} /> : null}</AuthWrapper>
    </PageWrapper>
  )
}

export default UserAdminPage

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, namespaces)),
      page: {
        locale,
        path: ['admin', 'user'],
      },
    },
  }
}
