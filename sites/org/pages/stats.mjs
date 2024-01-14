import { NavigationContext } from 'shared/context/navigation-context.mjs'
// Dependencies
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { nsMerge, getSearchParam } from 'shared/utils.mjs'
// Hooks
import { useTranslation } from 'next-i18next'
import { useState, useEffect } from 'react'
import { useBackend } from 'shared/hooks/use-backend.mjs'
// Components
import { PageWrapper, ns as pageNs } from 'shared/components/wrappers/page.mjs'
import { ns as authNs } from 'shared/components/wrappers/auth/index.mjs'
import { Loading } from 'shared/components/spinner.mjs'
import { PageLink } from 'shared/components/link.mjs'

// Translation namespaces used on this page
const ns = nsMerge(authNs, pageNs, 'status', 'stats')

/*
 * Each page MUST be wrapped in the PageWrapper component.
 * You also MUST spread props.page into this wrapper component
 * when path and locale come from static props (as here)
 * or set them manually.
 */
const StatsPage = ({ page }) => {
  const { t } = useTranslation(ns)
  const backend = useBackend()

  const [id, setId] = useState()
  const [stats, setStats] = useState(false)

  useEffect(() => {
    const loadStats = async () => {
      const result = await backend.getStats()
      if (result.success && result.data) {
        setStats(result.data)
      }
    }
    if (!stats) loadStats()
  }, [])

  if (!stats)
    return (
      <PageWrapper {...page} title={t('stats')}>
        <Loading />
      </PageWrapper>
    )

  return (
    <PageWrapper {...page} title={t('stats')}>
      <div className="flex flex-row gap-2 flex-wrap">
        <div className="stats shadow">
          <div className="stat">
            <div className="stat-title">{t('stats:users')}</div>
            <div className="stat-value">{stats.user}</div>
            <div className="stat-desc">{t('stats:totalNumberStored')}</div>
          </div>
        </div>
        <div className="stats shadow">
          <div className="stat">
            <div className="stat-title">{t('stats:patterns')}</div>
            <div className="stat-value">{stats.pattern}</div>
            <div className="stat-desc">{t('stats:totalNumberStored')}</div>
          </div>
        </div>
        <div className="stats shadow">
          <div className="stat">
            <div className="stat-title">{t('stats:sets')}</div>
            <div className="stat-value">{stats.set}</div>
            <div className="stat-desc">{t('stats:totalNumberStored')}</div>
          </div>
        </div>
        <div className="stats shadow">
          <div className="stat">
            <div className="stat-title">{t('stats:csets')}</div>
            <div className="stat-value">{stats.curatedSet}</div>
            <div className="stat-desc">{t('stats:totalNumberStored')}</div>
          </div>
        </div>
        <div className="stats shadow">
          <div className="stat">
            <div className="stat-title">{t('stats:bookmarks')}</div>
            <div className="stat-value">{stats.bookmark}</div>
            <div className="stat-desc">{t('stats:totalNumberStored')}</div>
          </div>
        </div>
        <div className="stats shadow">
          <div className="stat">
            <div className="stat-title">{t('stats:apikeys')}</div>
            <div className="stat-value">{stats.apikey}</div>
            <div className="stat-desc">{t('stats:totalNumberStored')}</div>
          </div>
        </div>
        <div className="stats shadow">
          <div className="stat">
            <div className="stat-title">{t('stats:jwtCalls')}</div>
            <div className="stat-value">{stats.activity.jwt}</div>
            <div className="stat-desc">{t('stats:totalNumberSeen')}</div>
          </div>
        </div>
        <div className="stats shadow">
          <div className="stat">
            <div className="stat-title">{t('stats:keyCalls')}</div>
            <div className="stat-value">{stats.activity.key}</div>
            <div className="stat-desc">{t('stats:totalNumberSeen')}</div>
          </div>
        </div>
      </div>
      <h2>{t('topUsers')}</h2>
      <ol className="list list-inside list-decimal ml-4">
        {stats.topUsers.map((u) => (
          <li key={u.id}>
            <PageLink href={`/users/user?id=${u.id}`}>{u.username}</PageLink>
          </li>
        ))}
      </ol>
      <h2>{t('topDesigns')}</h2>
      <ol className="list list-inside list-decimal ml-4">
        {Object.entries(stats.designs).map(([d, c]) => (
          <li key={d}>
            <PageLink href={`/designs/${d}`}>
              <b className="capitalize">{d}</b>
            </PageLink>
            : {c}
          </li>
        ))}
      </ol>
    </PageWrapper>
  )
}

export default StatsPage

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ns)),
      page: {
        locale,
        path: ['users'],
      },
    },
  }
}
