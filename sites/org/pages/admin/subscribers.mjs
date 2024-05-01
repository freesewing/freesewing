// Dependencies
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { nsMerge } from 'shared/utils.mjs'
// Hooks
import { useState } from 'react'
import { useBackend } from 'shared/hooks/use-backend.mjs'
// Components
import { PageWrapper, ns as pageNs } from 'shared/components/wrappers/page.mjs'
import { AuthWrapper, ns as authNs } from 'shared/components/wrappers/auth/index.mjs'
import { SearchIcon } from 'shared/components/icons.mjs'

// Translation namespaces used on this page
const ns = nsMerge(pageNs, authNs)

const SubscribersPage = ({ page }) => {
  const [subscribers, setSubscribers] = useState()
  const [q, setQ] = useState()
  const [hits, setHits] = useState([])
  const backend = useBackend()

  const loadSubscribers = async () => {
    const result = await backend.adminLoadSubscribers()
    if (result.success) setSubscribers(result.data.subscribers)
  }

  const search = async () => {
    if (!subscribers) await loadSubscribers()
    const found = []
    for (const lang in subscribers) {
      found.push(
        ...subscribers[lang]
          .filter((sub) => sub.email.toLowerCase().includes(q.toLowerCase()))
          .map((sub) => ({ ...sub, lang }))
      )
    }
    setHits(found)
  }

  const unsubscribe = async (ehash) => {
    await backend.newsletterUnsubscribe(ehash)
    await loadSubscribers()
    await search()
  }

  return (
    <PageWrapper {...page} title="Subscribers">
      <AuthWrapper requiredRole="admin">
        {subscribers ? (
          <>
            <h5>Search subscribers</h5>
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
            <table className="table">
              <thead>
                <tr>
                  <th className="text-right">Email</th>
                  <th className="w=12">Language</th>
                  <th>Unsubscribe</th>
                </tr>
              </thead>
              <tbody>
                {hits.map((hit, i) => (
                  <tr key={i}>
                    <td className="text-right">
                      <b>{hit.email}</b>
                    </td>
                    <td className="w-12">{hit.lang.toUpperCase()}</td>
                    <td className="w-full">
                      <button className="btn btn-link" onClick={() => unsubscribe(hit.ehash)}>
                        Unsubscribe
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </>
        ) : (
          <button className="btn btn-primary btn-lg" onClick={loadSubscribers}>
            Load Subscribers
          </button>
        )}
      </AuthWrapper>
    </PageWrapper>
  )
}

export default SubscribersPage

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ns)),
      page: {
        locale,
        path: ['admin', 'subscribers'],
      },
    },
  }
}
