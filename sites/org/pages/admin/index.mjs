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

// Translation namespaces used on this page
const namespaces = nsMerge(pageNs, authNs)

const AdminPage = ({ page }) => {
  const { t } = useTranslation(namespaces)
  const backend = useBackend()

  const [q, setQ] = useState('')
  const [results, setResults] = useState()
  const [loading, setLoading] = useState(false)

  const search = async (val) => {
    setQ(val)
    if (val.length < 2) return
    /*
     * Search backend
     */
    setLoading(true)
    const result = await backend.adminSearchUsers(val)
    if (result.success) {
      setResults(result.data.users)
    }
    setLoading(false)
  }

  return (
    <PageWrapper {...page} title="Administration">
      <AuthWrapper requiredRole="admin">
        <h5>Search users</h5>
        <input
          autoFocus
          value={q}
          onChange={(evt) => search(evt.target.value)}
          className="input w-full input-bordered flex flex-row"
          type="text"
          placeholder="Username, ID, or E-mail address"
        />
        {loading ? <Loading /> : <Hits {...{ backend, t, results }} />}
      </AuthWrapper>
    </PageWrapper>
  )
}

export default AdminPage

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, namespaces)),
      page: {
        locale,
        path: ['admin'],
      },
    },
  }
}
