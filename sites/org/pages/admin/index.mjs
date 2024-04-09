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
import { PageLink } from 'shared/components/link.mjs'
import { SearchIcon } from 'shared/components/icons.mjs'

// Translation namespaces used on this page
const namespaces = nsMerge(pageNs, authNs)

const AdminMenu = () => (
  <aside className="max-w-sm">
    <h4>Admin Links</h4>
    <ul className="list list-inside list-disc ml-4">
      <li>
        <PageLink href="/admin" txt="Manage Users" />
      </li>
      <li>
        <PageLink href="/admin/csets" txt="Manage curated measurement sets" />
      </li>
      <li>
        <PageLink href="/admin/subscribers" txt="Manage newsletter Subscribers" />
      </li>
    </ul>
  </aside>
)

const AdminPage = ({ page }) => {
  const { t } = useTranslation(namespaces)
  const backend = useBackend()

  const [q, setQ] = useState('')
  const [results, setResults] = useState()
  const [loading, setLoading] = useState(false)

  const search = async () => {
    /*
     * Search backend
     */
    setLoading(true)
    const result = await backend.adminSearchUsers(q)
    if (result.success) {
      setResults(result.data.users)
    }
    setLoading(false)
  }

  return (
    <PageWrapper {...page} title="Administration">
      <AuthWrapper requiredRole="support">
        <div className="flex flex-row gap-8 items-start w-full">
          <div className="grow">
            <h5>Search users</h5>
            <div className="flex flex-row gap-2 items-center">
              <input
                autoFocus
                value={q}
                onChange={(evt) => setQ(evt.target.value)}
                className="input w-full input-bordered flex flex-row"
                type="text"
                placeholder="Username, ID, or E-mail address"
              />
              <button onClick={search} className="btn btn-primary">
                <SearchIcon />
              </button>
            </div>
            {loading ? <Loading /> : <Hits {...{ backend, t, results }} />}
          </div>
          <AdminMenu />
        </div>
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
