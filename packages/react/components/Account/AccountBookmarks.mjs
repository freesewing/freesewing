// Hooks
import React, { useState, useEffect, Fragment, useContext } from 'react'
import { useBackend } from '@freesewing/react/hooks/useBackend'
// Context
import { LoadingStatusContext } from '@freesewing/react/context/LoadingStatus'
// Components
import { PlusIcon, TrashIcon, LeftIcon } from '@freesewing/react/components/Icon'
import { Link as WebLink } from '@freesewing/react/components/Link'
//import { DisplayRow } from './shared.mjs'
//import { StringInput } from 'shared/components/inputs.mjs'
//import { DynamicMdx } from 'shared/components/mdx/dynamic.mjs'

/**
 * Component for the account/bookmarks page
 *
 * @param {object} props - All React props
 * @param {function} Link - An optional custom Link component
 */
export const AccountBookmarks = ({ Link = false }) => {
  if (!Link) Link = WebLink

  // Hooks
  const backend = useBackend()
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
      const [status, body] = await backend.getBookmarks()
      if (status === 200 && body.result === 'success') setBookmarks(body.bookmarks)
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
  for (const type in types) perType[type] = bookmarks.filter((b) => b.type === type)

  return (
    <div className="max-w-4xl xl:pl-4">
      <p className="text-center md:text-right">
        <Link
          className="daisy-btn daisy-btn-primary capitalize w-full md:w-auto hover:text-primary-content hover:no-underline"
          href="/new/bookmark"
        >
          <PlusIcon />
          New Bookmark
        </Link>
      </p>
      {bookmarks.length > 0 ? (
        <button
          className="daisy-btn daisy-btn-error"
          onClick={removeSelectedBookmarks}
          disabled={selCount < 1}
        >
          <TrashIcon /> {selCount} Bookmarks
        </button>
      ) : null}
      {Object.entries(types).map(([type, title]) =>
        perType[type].length > 0 ? (
          <Fragment key={type}>
            <h2>{title}</h2>
            <table className="table tableauto w-full">
              <thead className="border border-base-300 border-b-2 border-t-0 border-x-0">
                <tr>
                  <th className="text-base-300 text-base text-left w-8">
                    <input
                      type="checkbox"
                      className="daisy-checkbox daisy-checkbox-secondary"
                      onClick={toggleSelectAll}
                      checked={bookmarks.length === selCount}
                    />
                  </th>
                  <th className="w-1/2">Title</th>
                  <th>Location</th>
                </tr>
              </thead>
              <tbody>
                {bookmarks
                  .filter((bookmark) => bookmark.type === type)
                  .map((bookmark, i) => (
                    <tr key={i}>
                      <td className="text-base font-medium">
                        <input
                          type="checkbox"
                          checked={selected[bookmark.id] ? true : false}
                          className="daisy-checkbox daisy-checkbox-secondary"
                          onClick={() => toggleSelect(bookmark.id)}
                        />
                      </td>
                      <td className="text-base font-medium">
                        <Link href={`/account/bookmark?id=${bookmark.id}`}>{bookmark.title}</Link>
                      </td>
                      <td className="text-base font-medium">
                        <WebLink href={bookmark.url}>
                          {bookmark.url.length > 30
                            ? bookmark.url.slice(0, 30) + '...'
                            : bookmark.url}
                        </WebLink>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </Fragment>
        ) : null
      )}
    </div>
  )
}

const types = {
  design: 'Designs',
  pattern: 'Patterns',
  set: 'Measurements Sets',
  cset: 'Curated Measurements Sets',
  doc: 'Documentation',
  custom: 'Custom Bookmarks',
}

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
          className="w-full md:w-auto daisy-btn daisy-btn-secondary pr-6 flex flex-row items-center gap-2"
        >
          <LeftIcon />
          {t('bookmarks')}
        </Link>
      </div>
    </div>
  ) : null
}

// Component for the 'new/bookmark' page
export const NewBookmark = () => {
  // Hooks
  const { setLoadingStatus } = useContext(LoadingStatusContext)
  const router = useRouter()
  const backend = useBackend()
  const { t, i18n } = useTranslation(ns)
  const docs = {}
  for (const option of ['title', 'location', 'type']) {
    docs[option] = (
      <DynamicMdx language={i18n.language} slug={`docs/about/site/bookmarks/${option}`} />
    )
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
          className="daisy-btn daisy-btn-primary grow capitalize"
          disabled={!(title.length > 0 && url.length > 0)}
          onClick={createBookmark}
        >
          {t('newBookmark')}
        </button>
      </div>
    </div>
  )
}

const t = (input) => input
