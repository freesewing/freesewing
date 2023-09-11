// Context
import { LoadingStatusContext } from 'shared/context/loading-status-context.mjs'
// Hooks
import { useState, useEffect, Fragment, useContext } from 'react'
import { useTranslation } from 'next-i18next'
import { useBackend } from 'shared/hooks/use-backend.mjs'
import { useRouter } from 'next/router'
// Components
import { BackToAccountButton } from './shared.mjs'
import { PlusIcon, TrashIcon, LeftIcon } from 'shared/components/icons.mjs'
import { PageLink, WebLink, Link } from 'shared/components/link.mjs'
import { DisplayRow } from './shared.mjs'
import { StringInput } from 'shared/components/inputs.mjs'
import { DynamicOrgDocs } from 'site/components/dynamic-org-docs.mjs'

export const ns = ['account', 'status']

export const types = ['design', 'pattern', 'set', 'cset', 'doc', 'custom']

export const Bookmark = ({ bookmark }) => {
  const { t } = useTranslation(ns)

  return bookmark ? (
    <div>
      <DisplayRow title={t('title')}>{bookmark.title}</DisplayRow>
      <DisplayRow title={t('url')}>
        {bookmark.url.length > 30 ? bookmark.url.slice(0, 30) + '...' : bookmark.url}
      </DisplayRow>
      <DisplayRow title={t('type')}>{t(`${bookmark.type}Bookmark`)}</DisplayRow>
      <div className="flex flex-row flex-wrap md:gap-2 md:items-center md:justify-between mt-8">
        <Link
          href="/account/bookmarks"
          className="w-full md:w-auto btn btn-secondary pr-6 flex flex-row items-center gap-2"
        >
          <LeftIcon />
          {t('bookmarks')}
        </Link>
      </div>
    </div>
  ) : null
}

// Component for the 'new/apikey' page
export const NewBookmark = () => {
  // Hooks
  const { setLoadingStatus } = useContext(LoadingStatusContext)
  const router = useRouter()
  const backend = useBackend()
  const { t, i18n } = useTranslation(ns)
  // FIXME: implement a solution for loading docs dynamically the is simple and work as expected
  const docs = {}
  for (const option of ['title', 'location', 'type']) {
    docs[option] = <DynamicOrgDocs language={i18n.language} path={`site/bookmarks/${option}`} />
  }

  // State
  const [title, setTitle] = useState('')
  const [url, setUrl] = useState('')

  const createBookmark = async () => {
    setLoadingStatus([true, 'processingUpdate'])
    const result = await backend.createBookmark({
      title,
      url,
      type: 'custom',
    })
    if (result.success) {
      setLoadingStatus([true, 'nailedIt', true, true])
      router.push('/account/bookmarks')
    } else setLoadingStatus([true, 'backendError', true, false])
  }

  return (
    <div className="max-w-2xl xl:pl-4">
      <StringInput
        id="bookmark-title"
        label={t('title')}
        docs={docs.title}
        update={setTitle}
        current={title}
        valid={(val) => val.length > 0}
        placeholder={t('account')}
      />
      <StringInput
        id="bookmark-url"
        label={t('location')}
        docs={docs.location}
        update={setUrl}
        current={url}
        valid={(val) => val.length > 0}
        placeholder={'https://freesewing.org/account'}
      />
      <div className="flex flex-row gap-2 items-center w-full my-8">
        <button
          className="btn btn-primary grow capitalize"
          disabled={!(title.length > 0 && url.length > 0)}
          onClick={createBookmark}
        >
          {t('newBookmark')}
        </button>
      </div>
    </div>
  )
}

// Component for the account/bookmarks page
export const Bookmarks = () => {
  // Hooks
  const backend = useBackend()
  const { t } = useTranslation(ns)
  const { setLoadingStatus, LoadingProgress } = useContext(LoadingStatusContext)

  // State
  const [bookmarks, setBookmarks] = useState([])
  const [selected, setSelected] = useState({})
  const [refresh, setRefresh] = useState(0)

  // Helper var to see how many are selected
  const selCount = Object.keys(selected).length

  // Effects
  useEffect(() => {
    const getBookmarks = async () => {
      const result = await backend.getBookmarks()
      if (result.success) setBookmarks(result.data.bookmarks)
    }
    getBookmarks()
  }, [refresh])

  // Helper method to toggle single selection
  const toggleSelect = (id) => {
    const newSelected = { ...selected }
    if (newSelected[id]) delete newSelected[id]
    else newSelected[id] = 1
    setSelected(newSelected)
  }

  // Helper method to toggle select all
  const toggleSelectAll = () => {
    if (selCount === bookmarks.length) setSelected({})
    else {
      const newSelected = {}
      for (const bookmark of bookmarks) newSelected[bookmark.id] = 1
      setSelected(newSelected)
    }
  }

  // Helper to delete one or more bookmarks
  const removeSelectedBookmarks = async () => {
    let i = 0
    for (const id in selected) {
      i++
      await backend.removeBookmark(id)
      setLoadingStatus([
        true,
        <LoadingProgress val={i} max={selCount} msg={t('removingBookmarks')} key="linter" />,
      ])
    }
    setSelected({})
    setRefresh(refresh + 1)
    setLoadingStatus([true, 'nailedIt', true, true])
  }

  const perType = {}
  for (const type of types) perType[type] = bookmarks.filter((b) => b.type === type)

  return (
    <div className="max-w-4xl xl:pl-4">
      <p className="text-center md:text-right">
        <Link
          className="btn btn-primary capitalize w-full md:w-auto"
          bottom
          primary
          href="/new/bookmark"
        >
          <PlusIcon />
          {t('newBookmark')}
        </Link>
      </p>
      {selCount ? (
        <button className="btn btn-error" onClick={removeSelectedBookmarks}>
          <TrashIcon /> {selCount} {t('bookmarks')}
        </button>
      ) : null}
      {types.map((type) =>
        perType[type].length > 0 ? (
          <Fragment key={type}>
            <h2>{t(`${type}Bookmark`)}</h2>
            <table className="table table-auto">
              <thead className="border border-base-300 border-b-2 border-t-0 border-x-0">
                <tr className="b">
                  <th className="text-base-300 text-base">
                    <input
                      type="checkbox"
                      className="checkbox checkbox-secondary"
                      onClick={toggleSelectAll}
                      checked={bookmarks.length === selCount}
                    />
                  </th>
                  <th className="text-base-300 text-base">{t('title')}</th>
                  <th className="text-base-300 text-base">{t('location')}</th>
                </tr>
              </thead>
              <tbody>
                {bookmarks.map((bookmark, i) => (
                  <tr key={i}>
                    <td className="text-base font-medium">
                      <input
                        type="checkbox"
                        checked={selected[bookmark.id] ? true : false}
                        className="checkbox checkbox-secondary"
                        onClick={() => toggleSelect(bookmark.id)}
                      />
                    </td>
                    <td className="text-base font-medium">
                      <PageLink href={`/account/bookmarks/${bookmark.id}`} txt={bookmark.title} />
                    </td>
                    <td className="text-base font-medium">
                      <WebLink
                        href={bookmark.url}
                        txt={
                          bookmark.url.length > 30
                            ? bookmark.url.slice(0, 30) + '...'
                            : bookmark.url
                        }
                      />
                    </td>
                    <td className="text-base font-medium"></td>
                    <td className="text-base font-medium hidden md:block"></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Fragment>
        ) : null
      )}
      <BackToAccountButton />
    </div>
  )
}
