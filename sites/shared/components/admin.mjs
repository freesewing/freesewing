// Depdendencies
import { cloudflareConfig } from 'shared/config/cloudflare.mjs'
import { freeSewingConfig } from 'shared/config/freesewing.config.mjs'
// Context
import { LoadingStatusContext } from 'shared/context/loading-status-context.mjs'
// Hooks
import { useState, useEffect, useContext } from 'react'
import { useBackend } from 'shared/hooks/use-backend.mjs'
import { useAccount } from 'shared/hooks/use-account.mjs'
// Components
import Link from 'next/link'
import { Json } from 'shared/components/json.mjs'
import { Mdx } from 'shared/components/mdx/dynamic.mjs'
import { AccountRole } from 'shared/components/account/role.mjs'
import { AccountStatus } from 'shared/components/account/status.mjs'
import { Loading } from 'shared/components/spinner.mjs'
import { Tabs, Tab } from 'shared/components/tabs.mjs'

const roles = ['user', 'curator', 'bughunter', 'support', 'admin']

export const ImpersonateButton = ({ userId }) => {
  const backend = useBackend()
  const { setLoadingStatus } = useContext(LoadingStatusContext)
  const { impersonate } = useAccount()

  if (!userId) return null

  const impersonateUser = async () => {
    setLoadingStatus([true, 'status:contactingBackend'])
    const result = await backend.adminImpersonateUser(userId)
    if (result.success) {
      impersonate(result.data)
      setLoadingStatus([true, 'status:settingsSaved', true, true])
    } else setLoadingStatus([true, 'status:backendError', true, false])
  }

  return (
    <button className="btn btn-primary" onClick={impersonateUser}>
      Impersonate
    </button>
  )
}

export const Row = ({ title, val }) => (
  <tr className="py-1">
    <td className="text-sm px-2 text-right font-bold">{title}</td>
    <td className="text-sm">{val}</td>
  </tr>
)

export const Hits = ({ results }) => (
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

export const ShowUser = ({ user, button = null }) => (
  <div className="flex flex-row w-full gap-4">
    <div
      className="w-52 h-52 bg-base-100 rounded-lg shadow shrink-0"
      style={{
        backgroundImage: `url(${cloudflareConfig.url}uid-${user.ihash}/sq500)`,
        backgroundSize: 'cover',
        backgroundColor: '#ccc',
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
        <div className="max-w-xs flex flex-col gap-2">{button}</div>
      </div>
      <div className="max-w-full truncate">
        <Mdx md={user.bio} />
      </div>
    </div>
  </div>
)

export const User = ({ user }) => (
  <div className="my-8">
    <ShowUser
      user={user}
      button={
        <Link href={`/admin/user?id=${user.id}`} className="btn btn-primary">
          Manage user
        </Link>
      }
    />
  </div>
)

export const ManageUser = ({ userId }) => {
  // Hooks
  const backend = useBackend()
  const { setLoadingStatus } = useContext(LoadingStatusContext)
  const { account } = useAccount()
  const { role } = account

  // State
  const [user, setUser] = useState({})
  const [patterns, setPatterns] = useState({})
  const [sets, setSets] = useState({})

  // Effect
  useEffect(() => {
    const loadUser = async () => {
      const result = await backend.adminLoadUser(userId)
      if (result.success) {
        setUser(result.data.user)
        setPatterns(result.data.patterns)
        setSets(result.data.sets)
      }
    }
    loadUser()
  }, [userId])

  const updateUser = async (data) => {
    setLoadingStatus([true, 'status:contactingBackend'])
    const result = await backend.adminUpdateUser({ id: userId, data })
    if (result.success) {
      setLoadingStatus([true, 'status:settingsSaved', true, true])
      setUser(result.data.user)
    } else setLoadingStatus([true, 'status:backendError', true, false])
  }

  return user.id ? (
    <div className="my-8">
      <ShowUser
        user={user}
        button={role === 'admin' ? <ImpersonateButton userId={user.id} /> : null}
      />
      {role === 'admin' ? (
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
      ) : null}
      <div className="flex flex-row flex-wrap gap-2 my-2 mb-4">
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
            key={status}
            className="btn btn-warning btn-outline btn-sm"
            onClick={() => updateUser({ status })}
            disabled={Number(status) === user.status}
          >
            Set {freeSewingConfig.statuses[status].name.toUpperCase()} status
          </button>
        ))}
      </div>
      <Tabs tabs="Account, Patterns, Sets">
        <Tab tabId="Account">{user.id ? <Json js={user} /> : null}</Tab>
        <Tab tabId="Patterns">{patterns ? <Json js={patterns} /> : null}</Tab>
        <Tab id="Sets">{sets ? <Json js={sets} /> : null}</Tab>
      </Tabs>
    </div>
  ) : (
    <Loading />
  )
}
