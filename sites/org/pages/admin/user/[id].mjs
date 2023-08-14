// Dependencies
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { nsMerge } from 'shared/utils.mjs'
import { freeSewingConfig } from 'shared/config/freesewing.config.mjs'
// Hooks
import { useState, useEffect } from 'react'
import { useTranslation } from 'next-i18next'
import { useBackend } from 'shared/hooks/use-backend.mjs'
import { useToast } from 'shared/hooks/use-toast.mjs'
// Components
import Link from 'next/link'
import { PageWrapper, ns as pageNs } from 'shared/components/wrappers/page.mjs'
import { AuthWrapper, ns as authNs } from 'shared/components/wrappers/auth/index.mjs'
import { Json } from 'shared/components/json.mjs'
import { User } from 'site/pages/admin/index.mjs'

// Translation namespaces used on this page
const namespaces = nsMerge(pageNs, authNs)

const roles = ['user', 'curator', 'bughunter', 'support', 'admin']

const UserAdminPage = ({ page, userId }) => {
  const { t } = useTranslation(namespaces)
  const toast = useToast()
  const backend = useBackend()

  const [user, setUser] = useState({})

  useEffect(() => {
    const loadUser = async () => {
      const result = await backend.adminLoadUser(userId)
      if (result.success) setUser(result.data.user)
    }
    loadUser()
  }, [userId])

  const updateUser = async (data) => {
    const result = await backend.adminUpdateUser({ id: userId, data })
    if (result.success) {
      toast.for.settingsSaved()
      setUser(result.data.user)
    } else toast.for.backendError()
  }

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
    <PageWrapper {...page} title={user.id ? user.username : 'One moment please...'}>
      <AuthWrapper requiredRole="admin">
        {user.id ? <User user={user} /> : null}
        <div className="flex flex-row flex-wrap gap-2 my-2">
          {roles.map((role) => (
            <button
              key={role}
              className="btn btn-primary btn-outline btn-sm"
              onClick={() => updateUser({ role })}
              disabled={role === user.role}
            >
              Assign {role} role
            </button>
          ))}
        </div>
        <div className="flex flex-row flex-wrap gap-2 my-2">
          {user.mfaEnabled && (
            <button
              className="btn btn-warning btn-outline btn-sm"
              onClick={() => updateUser({ mfaEnabled: false })}
            >
              Disable MFA
            </button>
          )}
          {Object.keys(freeSewingConfig.statuses).map((status) => (
            <button
              className="btn btn-warning btn-outline btn-sm"
              onClick={() => updateUser({ status })}
              disabled={Number(status) === user.status}
            >
              Set {freeSewingConfig.statuses[status].name.toUpperCase()} status
            </button>
          ))}
        </div>
        {user.id ? <Json js={user} /> : null}
      </AuthWrapper>
    </PageWrapper>
  )
}

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
