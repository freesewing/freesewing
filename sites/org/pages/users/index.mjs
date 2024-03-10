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

// Translation namespaces used on this page
const ns = nsMerge(authNs, pageNs, 'status')

/*
 * Each page MUST be wrapped in the PageWrapper component.
 * You also MUST spread props.page into this wrapper component
 * when path and locale come from static props (as here)
 * or set them manually.
 */
const UsersPage = ({ page }) => {
  const { t } = useTranslation(ns)
  const backend = useBackend()

  const [id, setId] = useState()
  const [count, setCount] = useState(false)

  useEffect(() => {
    const loadCount = async () => {
      const result = await backend.getUserCount()
      if (result.success && result.data) {
        setCount(result.data.users)
      } else setId(false)
    }
    if (!count) loadCount()
  }, [])

  useEffect(() => {
    const newId = getSearchParam('id')
    if (newId !== id) setId(newId)
  }, [id])

  if (!count)
    return (
      <PageWrapper {...page} title={t('users')}>
        <Loading />
      </PageWrapper>
    )

  return (
    <PageWrapper {...page} title={t('users')}>
      <div className="stats shadow">
        <div className="stat">
          <div className="stat-title">Total User Count</div>
          <div className="stat-value">{count}</div>
          <div className="stat-desc">FreeSewing.org</div>
        </div>
      </div>
    </PageWrapper>
  )
}

export default UsersPage

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
