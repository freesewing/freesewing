// Dependencies
import { horFlexClasses, notEmpty } from '@freesewing/utils'
// Hooks
import React, { useState, useEffect, Fragment, useContext } from 'react'
import { useBackend } from '@freesewing/react/hooks/useBackend'
// Context
import { LoadingStatusContext } from '@freesewing/react/context/LoadingStatus'
import { ModalContext } from '@freesewing/react/context/Modal'
// Components
import { BookmarkIcon, LeftIcon, PlusIcon, TrashIcon } from '@freesewing/react/components/Icon'
import { Link as WebLink } from '@freesewing/react/components/Link'
import { ModalWrapper } from '@freesewing/react/components/Modal'
import { StringInput } from '@freesewing/react/components/Input'

/*
 * Various bookmark types
 */
const types = {
  design: 'Designs',
  pattern: 'Patterns',
  set: 'Measurements Sets',
  cset: 'Curated Measurements Sets',
  doc: 'Documentation',
  custom: 'Custom Bookmarks',
}

/**
 * Component for the account/bookmarks page
 */
export const Bookmarks = () => {
  // Hooks & Context
  const backend = useBackend()
  const { setModal, clearModal } = useContext(ModalContext)
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
        <LoadingProgress val={i} max={selCount} msg="Removing Bookmarks" key="linter" />,
      ])
    }
    setSelected({})
    setRefresh(refresh + 1)
    setLoadingStatus([true, 'Nailed it', true, true])
  }

  const perType = {}
  for (const type in types) perType[type] = bookmarks.filter((b) => b.type === type)

  return (
    <div className="w-full">
      <p className="text-center md:text-right">
        <button
          className="daisy-btn daisy-btn-primary capitalize w-full md:w-auto hover:text-primary-content hover:no-underline"
          onClick={() =>
            setModal(
              <ModalWrapper
                flex="col"
                justify="top lg:justify-center"
                slideFrom="right"
                keepOpenOnClick
              >
                <div className="w-full">
                  <h2>New Bookmark</h2>
                  <NewBookmark onCreated={() => setRefresh(refresh + 1)} />
                </div>
              </ModalWrapper>
            )
          }
        >
          <PlusIcon />
          New Bookmark
        </button>
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
                      <td className="text-base font-medium">{bookmark.title}</td>
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

/*
 * Component to create a new bookmark
 *
 * @param {object} props - All the React props
 * @param {function} onCreated - An optional method to call when the bookmark is created
 */
export const NewBookmark = ({ onCreated = false }) => {
  // Hooks
  const { setLoadingStatus } = useContext(LoadingStatusContext)
  const { clearModal } = useContext(ModalContext)
  const backend = useBackend()

  // State
  const [title, setTitle] = useState('')
  const [url, setUrl] = useState('')

  // This method will create the bookmark
  const createBookmark = async () => {
    setLoadingStatus([true, 'Processing update'])
    const [status, body] = await backend.createBookmark({
      title,
      url,
      type: 'custom',
    })
    if (status === 201) setLoadingStatus([true, 'Bookmark created', true, true])
    else
      setLoadingStatus([
        true,
        'An error occured, the bookmark was not created. Please report this.',
        true,
        false,
      ])
    if (typeof onCreated === 'function') onCreated()
    clearModal()
  }

  // Render the form
  return (
    <div className="max-w-2xl w-full">
      <StringInput
        id="bookmark-title"
        label="Title"
        labelBL="The title/name of your bookmark"
        update={setTitle}
        current={title}
        valid={(val) => val.length > 0}
        placeholder="Bookmark title"
      />
      <StringInput
        id="bookmark-url"
        label="Location"
        labelBL="The location/url of your bookmark"
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
          New bookmark
        </button>
      </div>
    </div>
  )
}

/*
 * A component to add a bookmark from wherever
 *
 * @params {object} props - All React props
 * @params {string} props.href - The bookmark href
 * @params {string} props.title - The bookmark title
 * @params {string} props.type - The bookmark type
 */
export const BookmarkButton = ({ slug, type, title }) => {
  const { setModal } = useContext(ModalContext)
  const typeTitles = { docs: 'page' }

  return (
    <button
      className={`daisy-btn daisy-btn-secondary daisy-btn-outline ${horFlexClasses}`}
      onClick={() =>
        setModal(
          <ModalWrapper flex="col" justify="top lg:justify-center" slideFrom="right">
            <CreateBookmark {...{ type, title, slug }} />
          </ModalWrapper>
        )
      }
    >
      <BookmarkIcon />
      <span>Bookmark this {typeTitles[type] ? typeTitles[type] : type}</span>
    </button>
  )
}

/*
 * A component to create a bookmark, preloaded with props
 *
 * @params {object} props - All React props
 * @params {string} props.href - The bookmark href
 * @params {string} props.title - The bookmark title
 * @params {string} props.type - The bookmark type
 *
 */
export const CreateBookmark = ({ type, title, slug }) => {
  const backend = useBackend()
  const [name, setName] = useState(title)
  const { setLoadingStatus } = useContext(LoadingStatusContext)
  const { setModal } = useContext(ModalContext)

  const url = `/${slug}`

  const bookmark = async (evt) => {
    evt.stopPropagation()
    setLoadingStatus([true, 'Contacting backend'])
    const [status] = await backend.createBookmark({ type, title, url })
    if (status === 201) {
      setLoadingStatus([true, 'Bookmark created', true, true])
      setModal(false)
    } else
      setLoadingStatus([
        true,
        'Something unexpected happened, failed to create a bookmark',
        true,
        false,
      ])
  }

  return (
    <div className="mt-12">
      <h2>New bookmark</h2>
      <StringInput label="Title" current={name} update={setName} valid={notEmpty} labelBL={url} />
      <button className="daisy-btn daisy-btn-primary w-full mt-4" onClick={bookmark}>
        Create bookmark
      </button>
    </div>
  )
}
