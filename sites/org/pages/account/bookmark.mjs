// Dependencies
import dynamic from 'next/dynamic'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { nsMerge, getSearchParam } from 'shared/utils.mjs'
// Context
import { LoadingStatusContext } from 'shared/context/loading-status-context.mjs'
// Hooks
import { useTranslation } from 'next-i18next'
import { useState, useEffect, useContext } from 'react'
import { useBackend } from 'shared/hooks/use-backend.mjs'
// Components
import { PageWrapper, ns as pageNs } from 'shared/components/wrappers/page.mjs'
import { ns as authNs } from 'shared/components/wrappers/auth/index.mjs'
import { ns as bookmarksNs } from 'shared/components/account/bookmarks.mjs'

// Translation namespaces used on this page
const ns = nsMerge(bookmarksNs, authNs, pageNs, 'status')

/*
 * Some things should never generated as SSR
 * So for these, we run a dynamic import and disable SSR rendering
 */
const DynamicAuthWrapper = dynamic(
  () => import('shared/components/wrappers/auth/index.mjs').then((mod) => mod.AuthWrapper),
  { ssr: false }
)

const DynamicBookmark = dynamic(
  () => import('shared/components/account/bookmarks.mjs').then((mod) => mod.Bookmark),
  { ssr: false }
)

/*
 * Each page MUST be wrapped in the PageWrapper component.
 * You also MUST spread props.page into this wrapper component
 * when path and locale come from static props (as here)
 * or set them manually.
 */
const BookmarkPage = ({ page }) => {
  const { t } = useTranslation(ns)
  const backend = useBackend()
  const { setLoadingStatus } = useContext(LoadingStatusContext)

  const [id, setId] = useState()
  const [bookmark, setBookmark] = useState()

  useEffect(() => {
    const getBookmark = async (id) => {
      const result = await backend.getBookmark(id)
      if (result.success) setBookmark(result.data.bookmark)
      else setLoadingStatus([false])
    }
    const newId = getSearchParam('id')
    if (newId !== id) {
      setId(newId)
      getBookmark(newId)
    }
  }, [id, backend, setLoadingStatus])

  return (
    <PageWrapper {...page} title={`${t('bookmarks')}: ${bookmark?.title}`}>
      <DynamicAuthWrapper>
        <DynamicBookmark bookmark={bookmark} />
      </DynamicAuthWrapper>
    </PageWrapper>
  )
}

export default BookmarkPage

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ns)),
      page: {
        locale,
        path: ['account', 'bookmark'],
      },
    },
  }
}
