// Dependencies
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { nsMerge } from 'shared/utils.mjs'
import { cloudflareConfig } from 'shared/config/cloudflare.mjs'
import { formatNumber } from 'shared/utils.mjs'
// Hooks
import { useState } from 'react'
import { useTranslation } from 'next-i18next'
import { useBackend } from 'shared/hooks/use-backend.mjs'
import { useAccount } from 'shared/hooks/use-account.mjs'
import { useToast } from 'shared/hooks/use-toast.mjs'
// Components
import Link from 'next/link'
import Markdown from 'react-markdown'
import { PageWrapper, ns as pageNs } from 'shared/components/wrappers/page.mjs'
import { AuthWrapper, ns as authNs } from 'shared/components/wrappers/auth/index.mjs'
import { Popout } from 'shared/components/popout/index.mjs'
import { Collapse } from 'shared/components/collapse.mjs'
import { Spinner } from 'shared/components/spinner.mjs'
import { Json } from 'shared/components/json.mjs'
import { AccountRole } from 'shared/components/account/role.mjs'
import { AccountStatus } from 'shared/components/account/status.mjs'

const Hits = ({ results, t }) => (
  <>
    {results && results.username && results.username.length > 0 && (
      <>
        <h2>Results based on username</h2>
        {results.username.map((user) => (
          <User user={user} key={user.id} />
        ))}
      </>
    )}
    {results && results.email && results.email.length > 0 && (
      <>
        <h2>Results based on E-mail address</h2>
        {results.email.map((user) => (
          <User user={user} key={user.id} />
        ))}
      </>
    )}
  </>
)

const Row = ({ title, val }) => (
  <tr className="py-1">
    <td className="text-sm px-2 text-right font-bold">{title}</td>
    <td className="text-sm">{val}</td>
  </tr>
)

export const User = ({ user, detail = false }) => (
  <div className="my-8">
    <div className="flex flex-row w-full gap-4">
      <div
        className="w-52 h-52 bg-base-100 rounded-lg shadow shrink-0"
        style={{
          backgroundImage: `url(${cloudflareConfig.url}${user.img}/sq500)`,
          backgroundSize: 'cover',
        }}
      ></div>
      <div className="w-full">
        <h6 className="flex flex-row items-center gap-2 flex-wrap">
          {user.username}
          <span className="font-light">|</span>
          <AccountRole role={user.role} />
          <span className="font-light">|</span>
          <AccountStatus status={user.status} />
          <span className="font-light">|</span>
          {user.id}
        </h6>
        <div className="flex flex-row flex-wrap gap-4 w-full">
          <div className="max-w-xs">
            <table>
              <tbody>
                <Row title="Email" val={user.email} />
                <Row title="Initial" val={user.initial} />
                <Row title="GitHub" val={user.github} />
                <Row title="MFA" val={user.mfaEnabled ? 'Yes' : 'No'} />
                <Row title="Passhash" val={user.passwordType} />
              </tbody>
            </table>
          </div>
          <div className="max-w-xs">
            <table>
              <tbody>
                <Row title="Patron" val={user.patron} />
                <Row title="Consent" val={user.consent} />
                <Row title="Control" val={user.control} />
                <Row title="Calls (jwt)" val={user.jwtCalls} />
                <Row title="Calls (key)" val={user.keyCalls} />
              </tbody>
            </table>
          </div>
          <div className="max-w-xs flex flex-col gap-2">
            <button className="btn btn-primary">Impersonate</button>
            {detail ? (
              <Link href={`/admin/user/${user.id}`} className="btn btn-primary btn-outline">
                More options
              </Link>
            ) : (
              <Link href="/admin" className="btn btn-primary btn-outline">
                Search other users
              </Link>
            )}
          </div>
        </div>
        <div className="max-w-full truncate">
          <Markdown>{user.bio}</Markdown>
        </div>
      </div>
    </div>
  </div>
)

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
        {loading ? <Spinner /> : <Hits {...{ backend, t, results }} />}
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
